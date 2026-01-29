from decimal import Decimal
from uuid import UUID
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class SupplierCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: str = Field(..., description="Contact email")
    phone: Optional[str] = Field(None, max_length=50)

class SupplierResponse(BaseModel):
    id: UUID
    name: str
    email: str
    phone: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class PurchaseOrderCreate(BaseModel):
    supplier_id: UUID
    product_id: UUID
    quantity: int = Field(..., gt=0)
    unit_price: Decimal = Field(..., gt=0)
    expected_delivery_date: Optional[datetime] = None
    savings_amount: Decimal = Field(default=Decimal("0.00"))

class PurchaseOrderUpdate(BaseModel):
    status: Optional[str] = None # RECEIVED, REJECTED
    actual_delivery_date: Optional[datetime] = None
    is_rejected: Optional[bool] = None
    rejection_reason: Optional[str] = None

class PurchaseOrderResponse(BaseModel):
    id: UUID
    supplier_id: UUID
    product_id: UUID
    quantity: int
    unit_price: Decimal
    total_amount: Decimal
    savings_amount: Decimal
    status: str
    is_rejected: bool
    rejection_reason: Optional[str] = None
    expected_delivery_date: Optional[datetime] = None
    actual_delivery_date: Optional[datetime] = None
    created_at: datetime
    
    supplier_name: Optional[str] = None
    product_name: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class PurchaseKPIsResponse(BaseModel):
    quality_rate: float
    total_cta: Decimal
    total_savings: Decimal
    on_time_delivery_rate: float
    total_orders: int
    rejected_orders: int
