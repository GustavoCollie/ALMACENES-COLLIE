# Deployment Guide: Vercel + Supabase

Follow these steps to deploy your inventory system to production.

## 1. Supabase Setup
You have already provided the project details. Ensure the following environment variables are ready for Vercel.

**Supabase PostgreSQL Connection String:**
`postgresql://postgres:[YOUR_PASSWORD]@db.wbjikwsuakjrcokgklxl.supabase.co:5432/postgres`
*(Replace `[YOUR_PASSWORD]` with your Supabase database password)*

## 2. Vercel Backend Deployment
1. Connect your GitHub repository to Vercel.
2. Select the `backend` folder as the root for the backend project (if deploying separately) or use monorepo settings.
3. Configure the following **Environment Variables** in Vercel:
   - `REPOSITORY_TYPE`: `postgres`
   - `DATABASE_URL`: Your Supabase connection string.
   - `SECRET_KEY`: Generate a secure one using `python scripts/generate_secrets.py`.
   - `API_KEY`: Generate a secure one (e.g., `dev-secret-key` for now, but change it!).
   - `ALLOWED_ORIGINS`: The URL of your deployed frontend.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`: For email notifications.

## 3. Vercel Frontend Deployment
1. Select the `frontend` folder.
2. Configure **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Vercel backend (e.g., `https://your-backend.vercel.app/api/v1`).
   - `VITE_API_KEY`: Must match the `API_KEY` set in the backend.

## 4. Vercel Collie Store Deployment
1. Select the `collie-store` folder.
2. Configure **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Vercel backend targeting the public API (e.g., `https://your-backend.vercel.app/api/v1/public`).
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key if used on the frontend.

## 5. Database Initialization
Once the backend is deployed, you need to create the tables. You can do this by hitting the `/health` endpoint once (if the lifespan manager handles it) or running the initialization script locally pointing to the remote DB.

```bash
# Locally, update your .env with the Supabase URL, then run:
python -c "from src.infrastructure.database.config import init_db; init_db()"
```

## ⚠️ Important Security Note
The **Anon Key** and **Publishable Key** you provided are typically used for frontend Supabase client integration. If you plan to use Supabase Auth directly in the frontend, add them to your frontend environment variables as:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
