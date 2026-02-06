"""
Crear usuario admin en la nueva base de datos usando SQL directo.
"""
from sqlalchemy import create_engine, text
import bcrypt

DATABASE_URL = "postgresql://postgres:Dj3sMDnIv7qdQpp7@db.zinshpnfzneiduwvwesx.supabase.co:5432/postgres"

# Credenciales del admin
EMAIL = "hello@collievalley.com"
USERNAME = "admin"
PASSWORD = "Gustavito2601"

# Hash de la contraseña con bcrypt
password_bytes =PASSWORD.encode('utf-8')
hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
password_hash = hashed.decode('utf-8')

print("👤 Creando usuario admin...")
print(f"   Email: {EMAIL}")
print(f"   Username: {USERNAME}")

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Verificar si ya existe
        result = conn.execute(text("SELECT id, email FROM users WHERE email = :email"), {"email": EMAIL})
        existing = result.fetchone()
        
        if existing:
            print(f"\n⚠️  Usuario ya existe:")
            print(f"   ID: {existing[0]}")
            print(f"   Email: {existing[1]}")
        else:
            # Crear usuario
            conn.execute(text("""
                INSERT INTO users (email, username, hashed_password, is_active, is_verified)
                VALUES (:email, :username, :password_hash, true, true)
            """), {
                "email": EMAIL,
                "username": USERNAME,
                "password_hash": password_hash
            })
            conn.commit()
            
            print(f"\n✅ Usuario admin creado exitosamente!")
            print(f"\n🔑 Credenciales de acceso:")
            print(f"   Email: {EMAIL}")
            print(f"   Password: {PASSWORD}")
            
except Exception as e:
    print(f"\n❌ ERROR:")
    print(f"   {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
