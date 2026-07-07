# HerGuardian AI

# Deployment Guide

Version: 1.0

---

# Purpose

This document provides step-by-step instructions to set up, run, test, and deploy HerGuardian AI.

The deployment should be secure, reproducible, and easy for other developers to follow.

---

# Technology Stack

Frontend
- React
- Vite
- Tailwind CSS

Backend
- Python
- FastAPI

Database
- SQLite

AI
- OpenAI Agents SDK

Hosting
- Frontend: Vercel
- Backend: Render

Version Control
- GitHub

---

# Project Structure

HerGuardian-AI/

frontend/

backend/

docs/

README.md

.gitignore

LICENSE

---

# Local Development Setup

## Step 1

Clone the repository.

```
git clone <repository-url>
```

---

## Step 2

Open the project folder.

```
cd HerGuardian-AI
```

---

## Step 3

Install frontend dependencies.

```
cd frontend
npm install
```

---

## Step 4

Install backend dependencies.

```
cd backend
pip install -r requirements.txt
```

---

# Environment Variables

Create a file named:

.env

inside the backend folder.

Example:

OPENAI_API_KEY=your_api_key_here

Never commit the .env file to GitHub.

Include a .env.example file with placeholder values.

---

# Running the Application

Frontend

```
npm run dev
```

Backend

```
uvicorn main:app --reload
```

Default URLs

Frontend

http://localhost:5173

Backend
See the top-level `DEPLOYMENT.md` for the updated, accurate deployment instructions.

This repository now uses a Node.js + Express backend and MongoDB for data storage. The frontend is a Vite-built React SPA deployed to Vercel. The backend should be deployed to Render as a Node web service. Local development uses `mongodb-memory-server` for convenience — for production use a managed MongoDB (Mongo Atlas) and set `MONGODB_URI` in the service environment.
---
