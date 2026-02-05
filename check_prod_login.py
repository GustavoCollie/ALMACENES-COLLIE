
import requests
import json

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
try:
    response = requests.post(URL, json=DATA, headers=HEADERS)
    print(f"Status Code: {response.status_code}")
    try:
        data = response.json()
        print(f"Error Type: {data.get('type')}")
        print(f"Error Message: {data.get('message')}")
    except:
        print("Raw Response:", response.text)
        
    if response.status_code == 200:
        print("\n✅ LOGIN SUCCESS! Backend and DB are 100% working.")
    else:
        print("\n❌ LOGIN FAILED.")
except Exception as e:
    print(f"\n❌ REQUEST FAILED: {e}")
