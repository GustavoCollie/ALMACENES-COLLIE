
import requests
import json

URL = "https://almacenes-collie.vercel.app/api/v1/auth/login"
DATA = {
    "email": "hello@collievalley.com",
    "password": "Gustavito2601"
}
HEADERS = {
    "X-API-Key": "26012025",
    "Content-Type": "application/json"
}

print(f"Testing login to {URL}...")
r = requests.post(URL, json=DATA, headers=HEADERS)
print(f"Status: {r.status_code}")
try:
    print("Response JSON:")
    print(json.dumps(r.json(), indent=2))
except:
    print("Response Text:")
    print(r.text)
