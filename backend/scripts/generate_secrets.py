import secrets
import string

def generate_secure_string(length=32):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

if __name__ == "__main__":
    print("-" * 40)
    print("PRODUCTION SECRETS GENERATOR")
    print("-" * 40)
    print(f"SECRET_KEY: {generate_secure_string(64)}")
    print(f"API_KEY:    {generate_secure_string(32)}")
    print("-" * 40)
    print("Copy these to your production .env file.")
    print("CAUTION: Do not share these or commit them to version control.")
    print("-" * 40)
