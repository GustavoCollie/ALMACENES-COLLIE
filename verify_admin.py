"""
Verificar usuario admin en la base de datos.
"""
from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:Dj3sMDnIv7qdQpp7@db.zinshpnfzneiduwvwesx.supabase.co:5432/postgres"

print("🔍 Verificando usuario admin en DB...")

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Buscar el usuario
        result = conn.execute(text("""
            SELECT id, email, username, is_active, is_verified, hashed_password
            FROM users 
            WHERE email = 'hello@collievalley.com'
        """))
        
        user = result.fetchone()
        
        if user:
            print(f"\n✅ Usuario encontrado:")
            print(f"   ID: {user[0]}")
            print(f"   Email: {user[1]}")
            print(f"   Username: {user[2]}")
            print(f"   Active: {user[3]}")
            print(f"   Verified: {user[4]}")
            print(f"   Password Hash: {user[5][:50]}...")
            
            # Verificar el hash de la contraseña
            import bcrypt
            test_password = "Gustavito2601"
            stored_hash = user[5].encode('utf-8')
            
            if bcrypt.checkpw(test_password.encode('utf-8'), stored_hash):
                print(f"\n✅ Password hash CORRECTO")
                print(f"   'Gustavito2601' coincide con el hash almacenado")
            else:
                print(f"\n❌ Password hash INCORRECTO")
                print(f"   'Gustavito2601' NO coincide con el hash")
        else:
            print(f"\n❌ Usuario NO encontrado en la base de datos")
            print(f"   Email buscado: hello@collievalley.com")
            
        # Contar todos los usuarios
        result = conn.execute(text("SELECT COUNT(*) FROM users"))
        count = result.fetchone()[0]
        print(f"\nTotal de usuarios en DB: {count}")
            
except Exception as e:
    print(f"\n❌ ERROR:")
    print(f"   {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
