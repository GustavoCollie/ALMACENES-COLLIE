from typing import List, Optional
from uuid import UUID
from decimal import Decimal
from datetime import datetime
from src.domain.purchase_entities import Supplier, PurchaseOrder, PurchaseKPIs
from src.ports.purchase_repository import PurchaseRepository

class PurchaseService:
    def __init__(self, repo: PurchaseRepository):
        self.repo = repo

    def create_supplier(self, name: str, email: str, phone: Optional[str] = None) -> Supplier:
        supplier = Supplier(name=name, email=email, phone=phone or "")
        return self.repo.add_supplier(supplier)

    def list_suppliers(self) -> List[Supplier]:
        return self.repo.get_suppliers()

    def create_purchase_order(
        self, 
        supplier_id: UUID, 
        product_id: UUID, 
        quantity: int, 
        unit_price: Decimal,
        expected_delivery_date: Optional[datetime] = None,
        savings_amount: Decimal = Decimal("0.00")
    ) -> PurchaseOrder:
        total_amount = Decimal(quantity) * unit_price
        order = PurchaseOrder(
            supplier_id=str(supplier_id),
            product_id=str(product_id),
            quantity=quantity,
            unit_price=unit_price,
            total_amount=total_amount,
            savings_amount=savings_amount,
            expected_delivery_date=expected_delivery_date,
            status="PENDING"
        )
        return self.repo.add_purchase_order(order)

    def list_purchase_orders(self) -> List[PurchaseOrder]:
        return self.repo.get_purchase_orders()

    def update_order_status(
        self, 
        order_id: UUID, 
        status: str, 
        actual_delivery_date: Optional[datetime] = None,
        is_rejected: bool = False,
        rejection_reason: Optional[str] = None
    ) -> PurchaseOrder:
        order = self.repo.get_purchase_order(order_id)
        if not order:
            raise ValueError("Order not found")
        
        order.status = status
        order.is_rejected = is_rejected
        order.rejection_reason = rejection_reason
        if actual_delivery_date:
            order.actual_delivery_date = actual_delivery_date
        
        return self.repo.update_purchase_order(order)

    def calculate_kpis(self) -> PurchaseKPIs:
        orders = self.repo.get_purchase_orders()
        total_orders = len(orders)
        if total_orders == 0:
            return PurchaseKPIs(0.0, Decimal("0.00"), Decimal("0.00"), 0.0, 0, 0)

        # Quality: % rejected orders
        rejected_orders = [o for o in orders if o.is_rejected or o.status == "REJECTED"]
        quality_rate = (len(rejected_orders) / total_orders) * 100

        # Costs: CTA and Savings
        total_cta = sum((o.total_amount for o in orders), Decimal("0.00"))
        total_savings = sum((o.savings_amount for o in orders), Decimal("0.00"))

        # Plazos: Compliance (on-time / total finished)
        finished_orders = [o for o in orders if o.actual_delivery_date is not None]
        if not finished_orders:
            on_time_rate = 0.0
        else:
            on_time_orders = [
                o for o in finished_orders 
                if o.expected_delivery_date and o.actual_delivery_date <= o.expected_delivery_date
            ]
            on_time_rate = (len(on_time_orders) / len(finished_orders)) * 100

        return PurchaseKPIs(
            quality_rate=quality_rate,
            total_cta=total_cta,
            total_savings=total_savings,
            on_time_delivery_rate=on_time_rate,
            total_orders=total_orders,
            rejected_orders=len(rejected_orders)
        )
