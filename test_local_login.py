"""
Probar login LOCAL con la nueva base de datos.
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from dotenv import load_dotenv
load_dotenv()

from backend.src.infrastructure.database.config import SessionLocal
from backend.src.infrastructure.repositories.postgres_user_repository import PostgresUserRepository
from backend.src.application.auth_service import AuthService
from backend.src.domain.schemas import UserLogin

async def test_login():
    db = SessionLocal()
    try:
        user_repo = PostgresUserRepository(db)
        auth_service = AuthService(user_repo)
        
        login_data = UserLogin(
            email="hello@gusmi-store.com",
            password="Gustavito2601"
        )
        
        print("🔐 Probando login LOCAL...")
        print(f"   Email: {login_data.email}")
        print(f"   Password: (oculta)")
        print(f"   Database: db.zinshpnfzneiduwvwesx.supabase.co")
        
        token_response = await auth_service.authenticate_user(login_data)
        
        print(f"\n✅ LOGIN EXITOSO!")
        print(f"   Access Token: {token_response.access_token[:50]}...")
        print(f"   Token Type: {token_response.token_type}")
        
        print(f"\n🎉 Base de datos configurada correctamente!")
        print(f"   Siguiente paso: Actualizar variables en Vercel")
        
    except Exception as e:
        print(f"\n❌ LOGIN FALLIDO:")
        print(f"   {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(test_login())
