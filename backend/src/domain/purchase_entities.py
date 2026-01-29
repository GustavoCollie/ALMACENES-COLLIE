from dataclasses import dataclass, field
from decimal import Decimal
from uuid import UUID, uuid4
from typing import Optional, List
from datetime import datetime, timezone, timedelta

def get_local_time():
    tz = timezone(timedelta(hours=-5))
    return datetime.now(tz)

@dataclass
class Supplier:
    name: str
    email: str
    phone: str
    id: UUID = field(default_factory=uuid4)

@dataclass
class PurchaseOrder:
    supplier_id: str
    product_id: str
    quantity: int
    unit_price: Decimal
    total_amount: Decimal  # Coste Total de Adquisición (CTA)
    savings_amount: Decimal = Decimal("0.00") # Ahorro Total de Costes
    status: str = "PENDING"  # PENDING, RECEIVED, REJECTED
    expected_delivery_date: Optional[datetime] = None
    actual_delivery_date: Optional[datetime] = None
    is_rejected: bool = False
    rejection_reason: Optional[str] = None
    id: UUID = field(default_factory=uuid4)
    created_at: datetime = field(default_factory=get_local_time)

@dataclass
class PurchaseKPIs:
    quality_rate: float  # % pedidos rechazados
    total_cta: Decimal   # Total Cost of Acquisition
    total_savings: Decimal # Total savings
    on_time_delivery_rate: float # % compliance with deadlines
    total_orders: int
    rejected_orders: int
