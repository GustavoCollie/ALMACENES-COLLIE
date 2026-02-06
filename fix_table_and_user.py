"""
Verificar la estructura de la tabla users y crear usuario admin.
"""
from sqlalchemy import create_engine, text
import bcrypt

DATABASE_URL = "postgresql://postgres:Dj3sMDnIv7qdQpp7@db.zinshpnfzneiduwvwesx.supabase.co:5432/postgres"

print("🔍 Verificando estructura de tabla users...")

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        # Ver estructura de la tabla
        result = conn.execute(text("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position
        """))
        
        columns = result.fetchall()
        
        if not columns:
            print("\n❌ Tabla 'users' NO EXISTE")
        else:
            print(f"\n✅ Tabla 'users' existe con {len(columns)} columnas:")
            for col in columns:
                print(f"   - {col[0]}: {col[1]} (nullable: {col[2]})")
        
        # Contar usuarios existentes
        result = conn.execute(text("SELECT COUNT(*) FROM users"))
        count = result.fetchone()[0]
        print(f"\nUsuarios existentes: {count}")
        
        if count == 0:
            print("\n👤 Creando usuario admin...")
            
            # Generar hash de contraseña
            password_hash = bcrypt.hashpw("Gustavito2601".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            # Insertar usuario
           result = conn.execute(text("""
                INSERT INTO users (email, username, hashed_password, is_active, is_verified)
                VALUES (:email, :username, :password_hash, TRUE, TRUE)
                RETURNING id, email
            """), {
                "email": "hello@collievalley.com",
                "username": "admin",
                "password_hash": password_hash
            })
            
            user_row = result.fetchone()
            conn.commit()
            
            print(f"✅ Usuario creado:")
            print(f"   ID: {user_row[0]}")
            print(f"   Email: {user_row[1]}")
        else:
            # Mostrar usuarios existentes
            result = conn.execute(text("SELECT id, email, username FROM users"))
            users = result.fetchall()
            print("\nUsuarios en DB:")
            for u in users:
                print(f"   - ID {u[0]}: {u[1]} ({u[2]})")
                
except Exception as e:
    print(f"\n❌ ERROR:")
    print(f"   {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
