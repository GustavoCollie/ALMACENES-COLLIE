"""
Crear usuario admin OTRA VEZ con manejo de errores mejorado.
"""
from sqlalchemy import create_engine, text
import bcrypt

DATABASE_URL = "postgresql://postgres:Dj3sMDnIv7qdQpp7@db.zinshpnfzneiduwvwesx.supabase.co:5432/postgres"

EMAIL = "hello@gusmi-store.com"
USERNAME = "admin"
PASSWORD = "Gustavito2601"

print("👤 Creando/Verificando usuario admin...")

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Primero verificar si existe
        result = conn.execute(text("SELECT id, email, hashed_password FROM users WHERE email = :email"), {"email": EMAIL})
        existing = result.fetchone()
        
        if existing:
            print(f"\n✅ Usuario ya existe:")
            print(f"   ID: {existing[0]}")
            print(f"   Email: {existing[1]}")
            
            # Verificar password
            import bcrypt
            stored_hash = existing[2].encode('utf-8')
            if bcrypt.checkpw(PASSWORD.encode('utf-8'), stored_hash):
                print(f"   Password: ✅ CORRECTO")
            else:
                print(f"   Password: ❌ INCORRECTO - eliminando y recreando...")
                conn.execute(text("DELETE FROM users WHERE email = :email"), {"email": EMAIL})
                conn.commit()
                existing = None  # Forzar recreación
        
        if not existing:
            # Crear usuario
            password_hash = bcrypt.hashpw(PASSWORD.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            conn.execute(text("""
                INSERT INTO users (email, username, hashed_password, is_active, is_verified)
                VALUES (:email, :username, :password_hash, :is_active, :is_verified)
            """), {
                "email": EMAIL,
                "username": USERNAME,
                "password_hash": password_hash,
                "is_active": True,
                "is_verified": True
            })
            conn.commit()
            
            print(f"\n✅ Usuario creado exitosamente!")
            
        print(f"\n🔑 Credenciales:")
        print(f"   Email: {EMAIL}")
        print(f"   Password: {PASSWORD}")
        
        # Verificar total de usuarios
        result = conn.execute(text("SELECT COUNT(*) FROM users"))
        count = result.fetchone()[0]
        print(f"\nTotal usuarios en DB: {count}")
            
except Exception as e:
    print(f"\n❌ ERROR:")
    print(f"   {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
