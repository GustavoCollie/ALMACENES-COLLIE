
import requests
import json

URL = "https://gusmi-store.vercel.app/api/v1/auth/login"
HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": "26012025"
}
DATA = {
    "email": "hello@gusmi-store.com",
    "password": "Gustavito2601"
}

print(f"Testing login to: {URL}")
try:
    response = requests.post(URL, json=DATA, headers=HEADERS)
    print(f"Status Code: {response.status_code}")
    try:
        data = response.json()
        print(f"ERR_TYPE: {data.get('type')}")
        print(f"ERR_MSG: {data.get('message')}")
        print(f"ERR_DETAIL: {data.get('detail')}")
    except:
        print("RAW_RESP:", response.text[:200])
        
    if response.status_code == 200:
        print("\n✅ LOGIN SUCCESS! Backend and DB are 100% working.")
    else:
        print("\n❌ LOGIN FAILED.")
except Exception as e:
    print(f"\n❌ REQUEST FAILED: {e}")
