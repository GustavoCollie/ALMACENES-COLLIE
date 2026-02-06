import os
import sys
from sqlalchemy import create_engine, text

# Nueva base de datos Supabase
DATABASE_URL = "postgresql://postgres:Dj3sMDnIv7qdQpp7@db.zinshpnfzneiduwvwesx.supabase.co:5432/postgres"

print("🔗 Conectando a la nueva base de datos Supabase...")
print(f"   Host: db.zinshpnfzneiduwvwesx.supabase.co")

try:
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        version = result.fetchone()[0]
        print(f"\n✅ CONEXIÓN EXITOSA!")
        print(f"   PostgreSQL version: {version}")
        
        # Verificar tablas existentes
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """))
        tables = result.fetchall()
        
        if tables:
            print(f"\n📋 Tablas encontradas ({len(tables)}):")
            for table in tables:
                print(f"   - {table[0]}")
        else:
            print("\n⚠️  Base de datos VACÍA - no hay tablas creadas")
            print("   Necesitas ejecutar el script de inicialización")
            
except Exception as e:
    print(f"\n❌ ERROR DE CONEXIÓN:")
    print(f"   {type(e).__name__}: {e}")
    sys.exit(1)
