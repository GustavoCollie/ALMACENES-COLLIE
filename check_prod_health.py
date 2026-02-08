
import requests
import time

URL = "https://gusmi-store.vercel.app/api/health"

print(f"Checking health: {URL}")
try:
    response = requests.get(URL, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        print("\n✅ API IS ALIVE! Crash is specific to Auth endpoint.")
    else:
        print("\n❌ API IS DEAD. Global startup crash.")
except Exception as e:
    print(f"\n❌ REQUEST FAILED: {e}")
