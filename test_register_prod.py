
import requests
import json

URL = "https://gusmi-store.vercel.app/api/v1/auth/register"
DATA = {
    "email": "test_register_v1@example.com",
    "password": "Password123!"
}
HEADERS = {
    "X-API-Key": "26012025",
    "Content-Type": "application/json"
}

print(f"Testing registration to {URL}...")
r = requests.post(URL, json=DATA, headers=HEADERS)
print(f"Status: {r.status_code}")
try:
    print("Response JSON:")
    print(json.dumps(r.json(), indent=2))
except:
    print("Response Text:")
    print(r.text)
