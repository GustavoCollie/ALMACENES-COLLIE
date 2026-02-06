
import os
import sys
from sqlalchemy import create_engine
from passlib.context import CryptContext

# Configuration
DATABASE_URL = "postgresql://postgres:ZksWew7slD1h1Ais@db.wbjikwsuakjrcokgklxl.supabase.co:5432/postgres"
EMAIL = "hello@collievalley.com"
PASSWORD = "Gustavito2601"

# Ensure backend/src is in path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from src.infrastructure.database.config import Base
from src.infrastructure.database.models import (
    ProductModel, UserModel, MovementModel, CustomerModel,
    SupplierModel, PurchaseOrderModel, SalesOrderModel
)

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def init_prod():
    print(f"🚀 Initializing Production DB: {DATABASE_URL.split('@')[-1]}")
    engine = create_engine(DATABASE_URL)
    
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables initialized.")
    
    from sqlalchemy.orm import sessionmaker
    Session = sessionmaker(bind=engine)
    session = Session()
    
    # Check if admin exists
    admin = session.query(UserModel).filter_by(email=EMAIL).first()
    if admin:
        print(f"Admin {EMAIL} already exists. Updating password hash...")
        admin.hashed_password = pwd_context.hash(PASSWORD)
        admin.is_verified = True
        admin.is_active = True
    else:
        print(f"Creating admin {EMAIL}...")
        import uuid
        admin = UserModel(
            id=str(uuid.uuid4()),
            email=EMAIL,
            hashed_password=pwd_context.hash(PASSWORD),
            is_active=True,
            is_verified=True
        )
        session.add(admin)
    
    session.commit()
    print("✅ Admin user ready.")
    session.close()

if __name__ == "__main__":
    init_prod()
