from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from src.domain.purchase_entities import Supplier, PurchaseOrder
from src.ports.purchase_repository import PurchaseRepository
from src.infrastructure.database.models import SupplierModel, PurchaseOrderModel, ProductModel

class PostgresPurchaseRepository(PurchaseRepository):
    def __init__(self, session: Session):
        self.session = session

    def add_supplier(self, supplier: Supplier) -> Supplier:
        model = SupplierModel(
            id=str(supplier.id),
            name=supplier.name,
            email=supplier.email,
            phone=supplier.phone
        )
        self.session.add(model)
        self.session.commit()
        return supplier

    def get_suppliers(self) -> List[Supplier]:
        models = self.session.query(SupplierModel).all()
        return [
            Supplier(
                id=UUID(m.id),
                name=m.name,
                email=m.email,
                phone=m.phone
            ) for m in models
        ]

    def add_purchase_order(self, order: PurchaseOrder) -> PurchaseOrder:
        model = PurchaseOrderModel(
            id=str(order.id),
            supplier_id=str(order.supplier_id),
            product_id=str(order.product_id),
            quantity=order.quantity,
            unit_price=order.unit_price,
            total_amount=order.total_amount,
            savings_amount=order.savings_amount,
            status=order.status,
            is_rejected=order.is_rejected,
            rejection_reason=order.rejection_reason,
            expected_delivery_date=order.expected_delivery_date,
            actual_delivery_date=order.actual_delivery_date,
            created_at=order.created_at
        )
        self.session.add(model)
        self.session.commit()
        return order

    def get_purchase_orders(self) -> List[PurchaseOrder]:
        models = self.session.query(PurchaseOrderModel).all()
        orders = []
        for m in models:
            # We don't need to join here for the entity, 
            # but we might want the names for the response (handled in service or schema)
            orders.append(self._to_entity(m))
        return orders

    def get_purchase_order(self, order_id: UUID) -> Optional[PurchaseOrder]:
        model = self.session.query(PurchaseOrderModel).filter(PurchaseOrderModel.id == str(order_id)).first()
        if not model:
            return None
        return self._to_entity(model)

    def update_purchase_order(self, order: PurchaseOrder) -> PurchaseOrder:
        model = self.session.query(PurchaseOrderModel).filter(PurchaseOrderModel.id == str(order.id)).first()
        if model:
            model.status = order.status
            model.is_rejected = order.is_rejected
            model.rejection_reason = order.rejection_reason
            model.actual_delivery_date = order.actual_delivery_date
            self.session.commit()
        return order

    def _to_entity(self, m: PurchaseOrderModel) -> PurchaseOrder:
        return PurchaseOrder(
            id=UUID(m.id),
            supplier_id=m.supplier_id,
            product_id=m.product_id,
            quantity=m.quantity,
            unit_price=m.unit_price,
            total_amount=m.total_amount,
            savings_amount=m.savings_amount,
            status=m.status,
            is_rejected=m.is_rejected,
            rejection_reason=m.rejection_reason,
            expected_delivery_date=m.expected_delivery_date,
            actual_delivery_date=m.actual_delivery_date,
            created_at=m.created_at
        )
