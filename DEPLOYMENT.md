# Deployment Guide — HerGuardian AI

This document explains how to deploy the frontend (Vercel) and backend (Render).
It lists required environment variables and precise settings to make the repository production-ready.

--

## Summary
- Frontend: Vercel (static site) — built with Vite, `dist/` output.
- Backend: Render (Web Service) — Node/Express app in `backend/`.

## Required environment variables

Backend (Render) — set these in the Render service Environment settings:
- `MONGODB_URI` — MongoDB connection string for production. This value is required; the app will not start without it.
- `JWT_SECRET` — strong secret for signing JWT tokens.
- `FRONTEND_URL` — frontend base URL (e.g. https://your-site.vercel.app). Used for password reset links and CORS.
- `PORT` — optional; Render provides `PORT` automatically.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` — for transactional emails (password reset). `SMTP_SECURE` should be "true" or "false".
- `FROM_NAME`, `FROM_EMAIL` — email sender display name and address.
- (Optional) `GOOGLE_APPLICATION_CREDENTIALS` or credentials needed for `@google/generative-ai` if you use the Google Generative AI integration — follow the official client instructions (use secrets / service account key).

Frontend (Vercel) — set these in the Vercel Project Environment variables (Production):
- `VITE_API_BASE_URL` — e.g. `https://<your-render-service>.onrender.com/api` (must include `/api` suffix if backend routes are mounted at `/api`).

Notes:
- Do NOT commit `.env` files. Use the repository `.env.example` only as a template.

## Validate repository files (what we checked)
- `frontend/vercel.json`: present and routes all requests to `index.html` to support SPA routing.
- `frontend/package.json`: contains `build` script: `vite build` and `preview` script.
- `backend/package.json`: contains `start` script: `node src/server.js` and `dev` (nodemon).
- `render.yaml`: configured to deploy the backend from `backend/` with `npm install` and `npm start`.
- `.gitignore`: ignores `dist/`, `node_modules/`, and `.env` files.

If you change these files, commit them before creating the Render or Vercel services.

## Deploy Backend to Render (step-by-step)

1. Push your repository to GitHub (branch `main` or your chosen branch).
2. Sign in to Render and create a new **Web Service**.
   - Connect your GitHub repo and select the branch (e.g. `main`).
   - Set the **Root** to `backend` (render.yaml already references this, but confirm during setup).
   - **Environment**: Node.
   - **Plan**: choose appropriate plan (free / hobby / standard).
3. Build & Start commands (Render UI):
   - Build Command: `npm install`  (render.yaml currently uses this)
   - Start Command: `npm start`
   - Health Check Path: `/api/health` (the app exposes this route in `backend`).
4. Add environment variables listed above (`MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, SMTP credentials, etc.).
5. Deploy. Monitor build logs and runtime logs on Render.

Common Render tips:
- Ensure `MONGODB_URI` uses a production DB (Mongo Atlas). The repo falls back to an in-memory Mongo instance only when `MONGODB_URI` is unset — this is NOT suitable for production.
- If using Google AI client, set service account credentials as a secret and configure the client per `@google/generative-ai` docs.

## Deploy Frontend to Vercel (step-by-step)

1. Ensure `frontend/vercel.json` exists (it does) — it points to `dist` and rewrites all routes to `index.html` for SPA routing.
2. In Vercel, import the repository and choose the frontend folder:
   - When prompted for the root, select the `frontend` folder (or configure Vercel to build from that directory).
3. Set Build & Output:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist` (vercel.json already configures this but double-check in Vercel UI)
4. Add Environment Variable (Production):
   - `VITE_API_BASE_URL` = `https://<your-render-service>.onrender.com/api`
5. Deploy and review the Vercel logs.

Vercel tips:
- `VITE_` prefixed variables are embedded at build time. Set them in the Vercel project settings BEFORE deploying to ensure the built bundle uses the correct API base URL.
- SPA routing: `vercel.json` routes all paths to `index.html` — this supports client-side routing.

## Post-deploy verification checklist
- Visit the frontend URL; ensure the app loads and console has no `http://localhost` API calls.
- Register a test user; verify backend receives requests and returns 200/201 where expected.
- Test password reset email flow (requires SMTP configured).
- Open Render service logs and confirm the backend started and connected to the production MongoDB.
- Test a protected route (login then access `/dashboard`) to validate `VITE_API_BASE_URL` and JWT flow.

## Troubleshooting
- If frontend shows network errors to `http://localhost`, re-deploy with correct `VITE_API_BASE_URL` set in Vercel project settings (Production). Rebuild required.
- If backend cannot connect to MongoDB, confirm `MONGODB_URI` and network access (IP allowlist in Atlas).
- If email sending fails, test SMTP host/port/credentials locally first.

## Security & Notes
- Keep `JWT_SECRET` and all credentials secret.
- Do not use `mongodb-memory-server` in production.
- Rotate credentials periodically.

## Commands (local)

Install dependencies (root has separate frontend/backend):

```bash
cd frontend
npm install
npm run build

cd ../backend
npm install
npm start
```

--

If you want, I can:
- run the backend locally and perform an end-to-end smoke test, or
- push these final changes and open a PR for review.
# 🚀 Deployment Guide - HerGuardian AI

This document provides step-by-step instructions for deploying both the Frontend (React + Vite) and the Backend (Node.js + Express) of the **HerGuardian AI** Capstone Project.

---

## 💻 Frontend Deployment (Vercel)

The frontend is ready for out-of-the-box deployment on **Vercel**.

### 📋 Vercel Deployment Steps

1. **Sign Up/Log In to Vercel:**
   - Go to [Vercel](https://vercel.com) and sign in using your GitHub account.
2. **Import the Project:**
   - Click on **Add New...** -> **Project**.
   - Select your GitHub repository `HerGuardian-AI`.
3. **Configure Project Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Configure Environment Variables:**
   - Open the **Environment Variables** section.
   - Add the following key-value pair:
     - **Key:** `VITE_API_BASE_URL`
     - **Value:** *Your backend API URL* (e.g., `https://herguardian-backend.onrender.com/api`)
5. **Deploy:**
   - Click **Deploy**. Vercel will build and host your frontend.
   - Once completed, you will receive a production URL (e.g., `https://her-guardian-ai.vercel.app`).

### 🔑 Required Frontend Environment Variables

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the backend API service | `https://herguardian-backend.onrender.com/api` |

---

## ⚙️ Backend Deployment (Render)

The backend is configured for deployment on **Render** using the [`render.yaml`](./render.yaml) blueprint.

### 📋 Render Deployment Steps

1. **Sign Up/Log In to Render:**
   - Go to [Render](https://render.com) and log in.
2. **Deploy via Blueprint (Recommended):**
   - Click on **New** -> **Blueprint**.
   - Connect your GitHub repository.
   - Render will read the [`render.yaml`](./render.yaml) file and configure the service automatically.
3. **Alternative Manual Setup:**
   - Click **New** -> **Web Service**.
   - Set **Root Directory** to `backend`.
   - Set **Runtime** to `Node`.
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Configure Environment Variables:**
   - Add the following environment variables in the Render Dashboard:

### 🔑 Required Backend Environment Variables

| Variable Name | Purpose | Example Value |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas Database Connection String | `mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/db` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | *Generate a strong secret key* |
| `GEMINI_API_KEY` | Google Gemini AI Model API Key | *Your Google Studio API Key* |
| `FRONTEND_URL` | Frontend client origin URL (for CORS mapping) | `https://her-guardian-ai.vercel.app` |
| `SMTP_HOST` | Host address of SMTP server for emails | `smtp.gmail.com` |
| `SMTP_PORT` | Port for SMTP mail transfer | `587` |
| `SMTP_USER` | SMTP account username | *Your email address* |
| `SMTP_PASS` | SMTP account password | *Your email app password* |
| `FROM_NAME` | Name displayed on email notifications | `HerGuardian AI` |
| `FROM_EMAIL` | Email sender address | `no-reply@herguardian.ai` |
