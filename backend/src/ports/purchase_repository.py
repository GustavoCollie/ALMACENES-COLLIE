from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID
from src.domain.purchase_entities import Supplier, PurchaseOrder

class PurchaseRepository(ABC):
    @abstractmethod
    def add_supplier(self, supplier: Supplier) -> Supplier:
        pass
    
    @abstractmethod
    def get_suppliers(self) -> List[Supplier]:
        pass
    
    @abstractmethod
    def add_purchase_order(self, order: PurchaseOrder) -> PurchaseOrder:
        pass
    
    @abstractmethod
    def get_purchase_orders(self) -> List[PurchaseOrder]:
        pass
    
    @abstractmethod
    def get_purchase_order(self, order_id: UUID) -> Optional[PurchaseOrder]:
        pass
    
    @abstractmethod
    def update_purchase_order(self, order: PurchaseOrder) -> PurchaseOrder:
        pass
