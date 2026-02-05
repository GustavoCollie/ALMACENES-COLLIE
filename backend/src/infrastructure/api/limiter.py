import os
from slowapi import Limiter
from slowapi.util import get_remote_address

def get_key_func(request):
    if os.getenv("VERCEL"):
        return "vercel"
    return get_remote_address(request)

# Disable on Vercel to prevent crashes
is_vercel = bool(os.getenv("VERCEL"))
limiter = Limiter(key_func=get_key_func, default_limits=["200 per day", "50 per hour"], enabled=not is_vercel)
