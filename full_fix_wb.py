
from sqlalchemy import create_engine, text
from passlib.context import CryptContext

DATABASE_URL = "postgresql://postgres:ZksWew7slD1h1Ais@db.wbjikwsuakjrcokgklxl.supabase.co:5432/postgres"

def run_sql():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        print("Finalizing ALL tables via Raw SQL in wbjik...")
        
        # 1. Users
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
        
        # 2. Products
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description VARCHAR(1000) NOT NULL,
                stock INTEGER DEFAULT 0,
                sku VARCHAR(50) UNIQUE NOT NULL,
                retail_price NUMERIC(10, 2),
                image_path VARCHAR(500),
                tech_sheet_path VARCHAR(500),
                stripe_price_id VARCHAR(100),
                is_preorder BOOLEAN DEFAULT FALSE,
                preorder_price NUMERIC(10, 2),
                estimated_delivery_date TIMESTAMP,
                preorder_description VARCHAR(500),
                updated_at TIMESTAMP
            );
        """))
        
        # 3. Suppliers
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS suppliers (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                ruc VARCHAR(20),
                address VARCHAR(500),
                phone VARCHAR(50),
                email VARCHAR(255),
                contact_person VARCHAR(200)
            );
        """))
        
        # 4. Supplier_Product
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS supplier_product (
                supplier_id VARCHAR(36) REFERENCES suppliers(id) ON DELETE CASCADE,
                product_id VARCHAR(36) REFERENCES products(id) ON DELETE CASCADE,
                PRIMARY KEY (supplier_id, product_id)
            );
        """))
        
        # 5. Movements
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS movements (
                id VARCHAR(36) PRIMARY KEY,
                product_id VARCHAR(36) REFERENCES products(id) ON DELETE CASCADE,
                quantity INTEGER NOT NULL,
                type VARCHAR(20) NOT NULL,
                reference VARCHAR(100) NOT NULL,
                document_path VARCHAR(500),
                applicant VARCHAR(100),
                applicant_area VARCHAR(100),
                is_returnable BOOLEAN DEFAULT FALSE,
                return_deadline TIMESTAMP,
                recipient_email VARCHAR(255),
                sales_order_id VARCHAR(36),
                created_at TIMESTAMP
            );
        """))

        # 6. Customers
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS customers (
                id VARCHAR(36) PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                full_name VARCHAR(200),
                phone VARCHAR(50),
                hashed_password VARCHAR(255),
                google_id VARCHAR(255),
                auth_provider VARCHAR(50),
                has_discount BOOLEAN DEFAULT FALSE,
                is_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP
            );
        """))

        # 7. Purchase Orders
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS purchase_orders (
                id VARCHAR(36) PRIMARY KEY,
                product_id VARCHAR(36) REFERENCES products(id),
                supplier_id VARCHAR(36) REFERENCES suppliers(id),
                quantity INTEGER NOT NULL,
                unit_cost NUMERIC(10, 2) NOT NULL,
                total_cost NUMERIC(10, 2) NOT NULL,
                status VARCHAR(50) DEFAULT 'PENDING',
                order_date TIMESTAMP,
                delivery_date TIMESTAMP,
                notes TEXT
            );
        """))

        # 8. Sales Orders
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS sales_orders (
                id VARCHAR(36) PRIMARY KEY,
                product_id VARCHAR(36) REFERENCES products(id),
                customer_id VARCHAR(36) REFERENCES customers(id),
                quantity INTEGER NOT NULL,
                unit_price NUMERIC(10, 2) NOT NULL,
                total_price NUMERIC(10, 2) NOT NULL,
                status VARCHAR(50) DEFAULT 'COMPLETED',
                order_date TIMESTAMP,
                shipping_address TEXT,
                notes TEXT
            );
        """))
        
        # Add admin
        pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
        h = pwd_context.hash("Gustavito2601")
        
        conn.execute(text("""
            INSERT INTO users (id, email, hashed_password, is_active, is_verified)
            VALUES ('admin-uuid-1234', 'hello@gusmi-store.com', :h, TRUE, TRUE)
            ON CONFLICT (email) DO UPDATE SET hashed_password = EXCLUDED.hashed_password;
        """), {"h": h})
        
        conn.commit()
        print("✅ ALL 8 Tables and Admin created in wbjikwsuakjrcokgklxl")

if __name__ == "__main__":
    run_sql()
