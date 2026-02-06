"""
Script para inicializar la nueva base de datos Supabase con todas las tablas.
"""
import os
import sys

# Asegurar que el directorio backend esté en el path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from dotenv import load_dotenv
load_dotenv()

from backend.src.infrastructure.database.config import Base, engine
from backend.src.infrastructure.database.models import (
    ProductModel, UserModel, MovementModel, CustomerModel,
    SupplierModel, PurchaseOrderModel, SalesOrderModel
)

print("🗄️  Inicializando base de datos...")
print(f"   URL: {os.getenv('DATABASE_URL', '')[:50]}...")

try:
    # Crear todas las tablas
    Base.metadata.create_all(bind=engine)
    
    print("\n✅ Tablas creadas exitosamente:")
    print("   - users")
    print("   - products")
    print("   - movements")
    print("   - customers")
    print("   - suppliers")
    print("   - purchase_orders")
    print("   - sales_orders")
    
    print("\n🎉 Base de datos inicializada correctamente!")
    print("   Siguiente paso: Crear usuario admin")
    
except Exception as e:
    print(f"\n❌ ERROR al crear tablas:")
    print(f"   {type(e).__name__}: {e}")
    sys.exit(1)
