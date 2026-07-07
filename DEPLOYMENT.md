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
