from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from uuid import UUID
from datetime import datetime

from src.application.purchase_service import PurchaseService
from src.domain.purchase_schemas import (
    SupplierCreate, SupplierResponse, 
    PurchaseOrderCreate, PurchaseOrderResponse, 
    PurchaseOrderUpdate, PurchaseKPIsResponse
)
from src.infrastructure.api.dependencies import get_db
from src.infrastructure.repositories.postgres_purchase_repository import PostgresPurchaseRepository
from src.infrastructure.api.security import get_api_key

router = APIRouter(
    tags=["Purchasing"],
    dependencies=[Depends(get_api_key)]
)

def get_purchase_service(db=Depends(get_db)) -> PurchaseService:
    repo = PostgresPurchaseRepository(db)
    return PurchaseService(repo)

@router.post("/suppliers", response_model=SupplierResponse, status_code=status.HTTP_201_CREATED)
def create_supplier(
    request: SupplierCreate,
    service: Annotated[PurchaseService, Depends(get_purchase_service)]
):
    supplier = service.create_supplier(request.name, request.email, request.phone)
    return SupplierResponse.model_validate(supplier)

@router.get("/suppliers", response_model=List[SupplierResponse])
def list_suppliers(service: Annotated[PurchaseService, Depends(get_purchase_service)]):
    return service.list_suppliers()

@router.post("/orders", response_model=PurchaseOrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    request: PurchaseOrderCreate,
    service: Annotated[PurchaseService, Depends(get_purchase_service)]
):
    try:
        order = service.create_purchase_order(
            supplier_id=request.supplier_id,
            product_id=request.product_id,
            quantity=request.quantity,
            unit_price=request.unit_price,
            expected_delivery_date=request.expected_delivery_date,
            savings_amount=request.savings_amount
        )
        return PurchaseOrderResponse.model_validate(order)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/orders", response_model=List[PurchaseOrderResponse])
def list_orders(service: Annotated[PurchaseService, Depends(get_purchase_service)]):
    orders = service.list_purchase_orders()
    # Note: In a real app we'd join with Supplier/Product to get names.
    # For now, we'll return the IDs and names if available.
    return [PurchaseOrderResponse.model_validate(o) for o in orders]

@router.patch("/orders/{order_id}", response_model=PurchaseOrderResponse)
def update_order(
    order_id: UUID,
    request: PurchaseOrderUpdate,
    service: Annotated[PurchaseService, Depends(get_purchase_service)]
):
    try:
        order = service.update_order_status(
            order_id=order_id,
            status=request.status,
            actual_delivery_date=request.actual_delivery_date,
            is_rejected=request.is_rejected,
            rejection_reason=request.rejection_reason
        )
        return PurchaseOrderResponse.model_validate(order)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/kpis", response_model=PurchaseKPIsResponse)
def get_kpis(service: Annotated[PurchaseService, Depends(get_purchase_service)]):
    return service.calculate_kpis()
