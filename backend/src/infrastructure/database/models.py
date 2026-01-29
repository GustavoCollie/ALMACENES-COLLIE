"""
Modelos de SQLAlchemy para la base de datos.
"""
from sqlalchemy import Column, String, Integer, Numeric, Index, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import uuid


from .config import Base
from datetime import datetime, timedelta, timezone

def get_local_time():
    # Para Perú (GMT-5)
    tz = timezone(timedelta(hours=-5))
    return datetime.now(tz)


class ProductModel(Base):
    """
    Modelo SQLAlchemy para la tabla products.
    
    Representa la persistencia de la entidad Product del dominio.
    """
    
    __tablename__ = "products"
    
    # Columnas
    id = Column(String(36), primary_key=True, nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(String(1000), nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    sku = Column(String(50), unique=True, nullable=False)
    updated_at = Column(DateTime, default=get_local_time, onupdate=get_local_time)
    
    # Cascade delete movements when product is deleted
    movements = relationship("MovementModel", cascade="all, delete-orphan", back_populates="product")
    purchase_orders = relationship("PurchaseOrderModel", back_populates="product")
    
    # Índices para mejorar performance
    __table_args__ = (
        Index('idx_product_sku', 'sku'),
        Index('idx_product_name', 'name'),
    )
    
    def __repr__(self) -> str:
        return f"<ProductModel(id={self.id}, sku={self.sku}, name={self.name})>"


class UserModel(Base):
    """
    Modelo SQLAlchemy para la tabla users.
    """
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String(500), nullable=True)
    
    def __repr__(self):
        return f"<UserModel(email={self.email})>"




class MovementModel(Base):
    """
    Modelo SQLAlchemy para registrar movimientos (entradas y salidas).
    """
    __tablename__ = "movements"
    
    id = Column(String(36), primary_key=True)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    type = Column(String(20), nullable=False)  # 'ENTRY', 'EXIT'
    reference = Column(String(100), nullable=False, index=True)
    document_path = Column(String(500), nullable=True)
    applicant = Column(String(100), nullable=True)
    applicant_area = Column(String(100), nullable=True)
    is_returnable = Column(Boolean, default=False)
    return_deadline = Column(DateTime, nullable=True)
    recipient_email = Column(String(255), nullable=True)
    date = Column(DateTime, default=get_local_time)
    
    # Relación
    product = relationship("ProductModel", back_populates="movements")
    
    def __repr__(self) -> str:
        return f"<MovementModel(id={self.id}, type={self.type}, product={self.product_id})>"


class SupplierModel(Base):
    __tablename__ = "suppliers"
    
    id = Column(String(36), primary_key=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    
    purchase_orders = relationship("PurchaseOrderModel", back_populates="supplier")

    def __repr__(self):
        return f"<SupplierModel(name={self.name})>"


class PurchaseOrderModel(Base):
    __tablename__ = "purchase_orders"
    
    id = Column(String(36), primary_key=True)
    supplier_id = Column(String(36), ForeignKey("suppliers.id"), nullable=False)
    product_id = Column(String(36), ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    savings_amount = Column(Numeric(10, 2), default=0)
    status = Column(String(20), default="PENDING") # PENDING, RECEIVED, REJECTED
    is_rejected = Column(Boolean, default=False)
    rejection_reason = Column(String(500), nullable=True)
    expected_delivery_date = Column(DateTime, nullable=True)
    actual_delivery_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=get_local_time)
    
    # Relationships
    supplier = relationship("SupplierModel", back_populates="purchase_orders")
    product = relationship("ProductModel", back_populates="purchase_orders")

    def __repr__(self):
        return f"<PurchaseOrderModel(id={self.id}, status={self.status})>"
