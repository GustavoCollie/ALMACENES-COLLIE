"""
Crear usuario admin en la nueva base de datos.
"""
import os
import sys
import asyncio

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from dotenv import load_dotenv
load_dotenv()

from backend.src.infrastructure.database.config import SessionLocal
from backend.src.infrastructure.repositories.postgres_user_repository import PostgresUserRepository
from backend.src.application.auth_service import AuthService
from backend.src.domain.schemas import UserCreate

async def create_admin():
    db = SessionLocal()
    try:
        user_repo = PostgresUserRepository(db)
        auth_service = AuthService(user_repo)
        
        admin_data = UserCreate(
            email="hello@collievalley.com",
            password="Gustavito2601",
            username="admin"
        )
        
        print("👤 Creando usuario admin...")
        print(f"   Email: {admin_data.email}")
        print(f"   Username: {admin_data.username}")
        
        # Verificar si ya existe
        existing = await user_repo.find_by_email(admin_data.email)
        if existing:
            print(f"\n⚠️  Usuario ya existe con ID: {existing.id}")
            return
        
        user = await auth_service.register_user(admin_data)
        
        print(f"\n✅ Usuario admin creado exitosamente!")
        print(f"   ID: {user.id}")
        print(f"   Email: {user.email}")
        print(f"   Username: {user.username}")
        print(f"\n🔑 Credenciales:")
        print(f"   Email: hello@collievalley.com")
        print(f"   Password: Gustavito2601")
        
    except Exception as e:
        print(f"\n❌ ERROR:")
        print(f"   {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(create_admin())
