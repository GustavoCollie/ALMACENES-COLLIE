
from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:ZksWew7slD1h1Ais@db.wbjikwsuakjrcokgklxl.supabase.co:5432/postgres"

def run_sql():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        print("Creating tables via Raw SQL...")
        
        # Users table
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(36) PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                hashed_password VARCHAR(255) NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                is_verified BOOLEAN DEFAULT FALSE,
                verification_token VARCHAR(500)
            );
        """))
        
        # Products table
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description VARCHAR(1000) NOT NULL,
                stock INTEGER DEFAULT 0,
                sku VARCHAR(50) UNIQUE NOT NULL,
                retail_price NUMERIC(10, 2),
                updated_at TIMESTAMP
            );
        """))
        
        # Add admin
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
        h = pwd_context.hash("Gustavito2601")
        
        conn.execute(text("""
            INSERT INTO users (id, email, hashed_password, is_active, is_verified)
            VALUES ('admin-uuid-1234', 'hello@collievalley.com', :h, TRUE, TRUE)
            ON CONFLICT (email) DO UPDATE SET hashed_password = EXCLUDED.hashed_password;
        """), {"h": h})
        
        conn.commit()
        print("✅ Tables and Admin created in wbjikwsuakjrcokgklxl")

if __name__ == "__main__":
    run_sql()
