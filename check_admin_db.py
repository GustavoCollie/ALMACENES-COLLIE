"""
Verificar si el usuario admin existe y si el password es correcto.
"""
from sqlalchemy import create_engine, text
import bcrypt

DATABASE_URL = "postgresql://postgres:Dj3sMDnIv7qdQpp7@db.zinshpnfzneiduwvwesx.supabase.co:5432/postgres"

print("🔍 Verificando usuario en base de datos...")

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Buscar usuario
        result = conn.execute(text("""
            SELECT id, email, username, hashed_password, is_active, is_verified
            FROM users 
            WHERE email = 'hello@gusmi-store.com'
        """))
        
        user = result.fetchone()
        
        if not user:
            print("\n❌ USUARIO NO EXISTE en la base de datos")
            print("   Necesitas crear el usuario admin primero")
        else:
            user_id, email, username, password_hash, is_active, is_verified = user
            
            print(f"\n✅ Usuario encontrado:")
            print(f"   ID: {user_id}")
            print(f"   Email: {email}")
            print(f"   Username: {username}")
            print(f"   Active: {is_active}")
            print(f"   Verified: {is_verified}")
            print(f"   Hash: {password_hash[:60]}...")
            
            # Probar contraseña
            test_password = "Gustavito2601"
            
            try:
                if bcrypt.checkpw(test_password.encode('utf-8'), password_hash.encode('utf-8')):
                    print(f"\n✅ PASSWORD CORRECTO")
                    print(f"   '{test_password}' coincide con el hash")
                else:
                    print(f"\n❌ PASSWORD INCORRECTO")
                    print(f"   '{test_password}' NO coincide con el hash")
            except Exception as e:
                print(f"\n❌ ERROR verificando password:")
                print(f"   {e}")
                
except Exception as e:
    print(f"\n❌ ERROR de conexión:")
    print(f"   {type(e).__name__}: {e}")
