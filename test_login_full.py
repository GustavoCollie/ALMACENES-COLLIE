import requests

URL = "https://almacenes-collie.vercel.app/api/v1/auth/login"
HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": "26012025"
}
DATA = {
    "email": "hello@collievalley.com",
    "password": "Gustavito2601"
}

print(f"Testing login to: {URL}")
response = requests.post(URL, json=DATA, headers=HEADERS, timeout=15)
print(f"\n=== RESPONSE ===")
print(f"Status: {response.status_code}")
print(f"Headers: {dict(response.headers)}")
print(f"\nBody:\n{response.text}")

if response.status_code == 200:
    print("\n✅ LOGIN SUCCESS!")
else:
    print(f"\n❌ LOGIN FAILED")
