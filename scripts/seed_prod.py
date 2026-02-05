
import os
import sys
import bcrypt

# Add the project root to python path
# Add the project root/backend to python path to find 'src'
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
backend_path = os.path.join(project_root, 'backend')
sys.path.insert(0, backend_path)
print(f"Backend path added to sys.path: {backend_path}")

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Import models to register them with Base
from src.infrastructure.database.models import Base, UserModel, ProductModel, SupplierModel
from src.infrastructure.database.config import Base

# Direct PROD connection string from previous message
# We use port 5432 for schema changes (Direct Connection) as recommended by Supabase for migrations
POSTGRES_URL = "postgresql://postgres:ZksWew7slD1h1Ais@db.wbjikwsuakjrcokgklxl.supabase.co:5432/postgres"

def seed_production():
    print(f"Connecting to Production DB: {POSTGRES_URL.split('@')[1]}...")
    
    engine = create_engine(POSTGRES_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # 1. Create Tables
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

    # 2. Seed Admin User
    db = SessionLocal()
    try:
        admin_email = "hello@collievalley.com"
        existing_user = db.query(UserModel).filter(UserModel.email == admin_email).first()
        
        if not existing_user:
            print(f"Creating admin user: {admin_email}")
            # Hash password "Gustavito2601"
            hashed_pw = bcrypt.hashpw("Gustavito2601".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            
            admin_user = UserModel(
                id=str(os.urandom(16).hex()), # UUID as hex string or just string
                email=admin_email,
                hashed_password=hashed_pw,
                full_name="Collie Admin",
                is_active=True,
                is_verified=True,
                role="admin"  # Assuming role column exists or defaults
            )
            db.add(admin_user)
            db.commit()
            print("Admin user created successfully! ✅")
        else:
            print("Admin user already exists. Checking password...")
            # Optionally update password to be sure
            hashed_pw = bcrypt.hashpw("Gustavito2601".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            existing_user.hashed_password = hashed_pw
            db.commit()
            print("Admin password updated to 'Gustavito2601' ✅")
            
    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_production()
