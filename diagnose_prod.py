
import os
import uuid
import sys
from sqlalchemy import create_engine, text

# Try to import passlib, if not available use a placeholder or install it
try:
    from passlib.context import CryptContext
    HAS_PASSLIB = True
except ImportError:
    HAS_PASSLIB = False

# Configuration
# Checking project wbjikwsuakjrcokgklxl
DATABASE_URL = "postgresql://postgres:ZksWew7slD1h1Ais@db.wbjikwsuakjrcokgklxl.supabase.co:5432/postgres"
EMAIL = "hello@collievalley.com"
PASSWORD = "Gustavito2601"

if HAS_PASSLIB:
    pwd_context = CryptContext(
        schemes=["pbkdf2_sha256"],
        deprecated="auto"
    )
else:
    print("WARNING: passlib not found. Password hashing will be skipped/limited.")

def diagnose():
    print(f"Connecting to: {DATABASE_URL.split('@')[-1]}")
    engine = create_engine(DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            print("\n--- [1] Checking Tables in all schemas ---")
            res = conn.execute(text("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog')"))
            tables = [f"{row[0]}.{row[1]}" for row in res.fetchall()]
            print(f"Total tables found: {len(tables)}")
            print(f"Tables: {', '.join(tables)}")
            
            if 'users' not in tables:
                print("\n❌ Table 'users' MISSING! Creating it now...")
                conn.execute(text("""
                    CREATE TABLE users (
                        id VARCHAR(36) PRIMARY KEY,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        hashed_password VARCHAR(255) NOT NULL,
                        is_active BOOLEAN DEFAULT TRUE,
                        is_verified BOOLEAN DEFAULT FALSE,
                        verification_token VARCHAR(500)
                    )
                """))
                conn.commit()
                print("✅ Table 'users' created.")
            
            print("\n--- [2] Checking columns in 'users' ---")
            res = conn.execute(text("""
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users'
                ORDER BY ordinal_position
            """))
            cols = res.fetchall()
            col_names = [c[0] for c in cols]
            for col in cols:
                print(f"Column: {col[0]} ({col[1]})")
            
            # Check if username exists (it shouldn't according to the model)
            if 'username' in col_names:
                print("⚠️  Warning: 'username' column exists but is not in the SQLAlchemy model.")

            print("\n--- [3] Checking Admin User ---")
            res = conn.execute(text("SELECT id, email, hashed_password, is_verified FROM users WHERE email = :email"), {"email": EMAIL})
            user = res.fetchone()
            
            if user:
                print(f"✅ User found: {user[1]}")
                print(f"   ID: {user[0]}")
                print(f"   Verified: {user[3]}")
                
                if HAS_PASSLIB:
                    # Check password
                    is_correct = False
                    try:
                        is_correct = pwd_context.verify(PASSWORD, user[2])
                    except Exception as e:
                        print(f"   Password check error: {e}")
                    
                    if is_correct:
                        print("   Password: OK (matches PBKDF2)")
                    else:
                        print("   Password: ❌ INVALID (hash mismatch or unknown format)")
                        print("   Fixing password hash...")
                        new_hash = pwd_context.hash(PASSWORD)
                        conn.execute(text("""
                            UPDATE users 
                            SET hashed_password = :h, is_verified = TRUE, is_active = TRUE 
                            WHERE email = :e
                        """), {"h": new_hash, "e": EMAIL})
                        conn.commit()
                        print("   ✅ Password hash updated to PBKDF2.")
                else:
                    print("   Skipping password verification (passlib missing).")
            else:
                print(f"❌ User NOT found. Creating admin user...")
                user_id = str(uuid.uuid4())
                if HAS_PASSLIB:
                    new_hash = pwd_context.hash(PASSWORD)
                else:
                    # Very insecure fallback if passlib is missing just to get it working
                    # but we should really have passlib.
                    new_hash = "INSECURE_PLEASE_FIX_" + PASSWORD
                
                conn.execute(text("""
                    INSERT INTO users (id, email, hashed_password, is_active, is_verified)
                    VALUES (:id, :email, :hashed_password, TRUE, TRUE)
                """), {
                    "id": user_id,
                    "email": EMAIL,
                    "hashed_password": new_hash
                })
                conn.commit()
                print(f"✅ User created with ID: {user_id}")

            print("\n--- [4] Summary ---")
            res = conn.execute(text("SELECT COUNT(*) FROM users"))
            count = res.fetchone()[0]
            print(f"Total users in DB: {count}")
            
    except Exception as e:
        print(f"\n❌ ERROR during diagnosis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    diagnose()
