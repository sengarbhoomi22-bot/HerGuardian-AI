# HerGuardian AI

# Folder Structure

Version: 1.0

---

# Purpose

This document defines the official folder structure for HerGuardian AI.

The objective is to keep the project modular, scalable, maintainable, and easy to understand.

Every file should have one clear responsibility.

---

# Complete Project Structure

HerGuardian-AI/

│

├── frontend/

├── backend/

├── docs/

├── assets/

├── public/

├── README.md

├── LICENSE

├── .gitignore

---

# FRONTEND STRUCTURE

frontend/

│

├── public/

│

├── src/

│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── layouts/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   ├── context/
│   │
│   ├── utils/
│   │
│   ├── constants/
│   │
│   ├── styles/
│   │
│   ├── routes/
│   │
│   ├── App.jsx
│   │
│   └── main.jsx

---

# COMPONENTS

Reusable UI components.

Examples

Navbar

Footer

Search Bar

Voice Search Button

Quote Card

Video Card

Recipe Card

Health Card

Fitness Card

Scholarship Card

Feedback Card

Statistics Card

Language Switcher

Zoom Controls

Floating Chat Button

Save Button

Share Button

Loading Skeleton

Error Card

Profile Card

Module Card

---

# PAGES

Landing Page

Registration

Home

Women's Health

Nutrition

Women's Fitness

Mental Wellness

Menstrual Wellness

Women's Safety

Career

Inspiration Hub

Saved Library

AI Assistant

Feedback

About

Profile

404 Page

---

# LAYOUTS

Main Layout

Dashboard Layout

Authentication Layout

---

# HOOKS

Reusable React Hooks.

Examples

useVoiceSearch

useTranslation

useSearch

useProfile

useTheme

---

# SERVICES

Responsible for API calls.

Examples

chatService

healthService

nutritionService

fitnessService

careerService

profileService

feedbackService

translationService

statisticsService

---

# CONTEXT

Global state.

Examples

User Context

Language Context

Chat Context

Theme Context

---

# UTILS

Helper functions.

Examples

Format Date

Validation

Text Helpers

Image Helpers

Share Helpers

---

# CONSTANTS

Store:

Colors

Routes

Module Names

API URLs

Default Messages

---

# STYLES

Global CSS

Tailwind Configuration

Fonts

Animations

Spacing

---

# ROUTES

React Router configuration.

---

# BACKEND STRUCTURE

backend/

│

├── agents/

├── tools/

├── routes/

├── services/

├── database/

├── models/

├── middleware/

├── utils/

├── config/

├── static/

├── tests/

├── src/

├── src/server.js

├── package.json

├── .env

├── .env.example

---

# ROUTES

Express routes (examples):
users.js
chat.js
health.js
nutrition.js
fitness.js
mental.js
menstrual.js
career.js
safety.js
inspiration.js
feedback.js
statistics.js
translation.js
search.js

health_tool.py

nutrition_tool.py

fitness_tool.py

mental_tool.py

menstrual_tool.py

safety_tool.py

career_tool.py

inspiration_tool.py

feedback_tool.py

translation_tool.py

search_tool.py

---

# ROUTES

FastAPI endpoints.

users.py

chat.py

health.py

nutrition.py

fitness.py

mental.py

menstrual.py

career.py

safety.py

inspiration.py

feedback.py

statistics.py

translation.py

search.py

---

# SERVICES

Business logic.

AI communication

External APIs

Database logic

Search

Translation

Video lookup

Image lookup

---

# DATABASE

Database connection.

MongoDB (Mongoose) configuration.

Migration scripts (future).

---

# MODELS

Database models.

User

Saved Content

Feedback

Ratings

Statistics

---

# SCHEMAS

Pydantic request/response models.

Input validation.

---

# MIDDLEWARE

CORS

Logging

Authentication (future)

Rate limiting (future)

---

# CONFIG

Application configuration.

Environment variables.

API settings.

---

# STATIC

Static backend resources.

Images

Icons

Default assets

---

# TESTS

Unit tests.

API tests.

Integration tests.

---

# DOCS

Contains all documentation.

01_PROJECT_REQUIREMENTS.md

02_AI_AGENT_PROMPT.md

03_SYSTEM_ARCHITECTURE.md

04_UI_UX_GUIDELINES.md

05_DATABASE_SCHEMA.md

06_API_DOCUMENTATION.md

07_DEPLOYMENT_GUIDE.md

08_JUDGING_PACKAGE.md

09_README_TEMPLATE.md

10_PROJECT_TIMELINE.md

11_FOLDER_STRUCTURE.md

---

# ASSETS

Organize by type.

images/

icons/

illustrations/

logos/

animations/

fonts/

---

# PUBLIC

favicon

manifest

robots.txt

---

# FILE NAMING CONVENTION

React Components

PascalCase

Example

NavigationBar.jsx

Backend

snake_case

Example

nutrition_service.py

Database

snake_case

Example

saved_content.py

---

# CODING STANDARDS

One file

↓

One responsibility

Avoid massive files.

Keep components reusable.

Prefer composition over duplication.

---

# IMPORT ORDER

1. Standard libraries

2. Third-party libraries

3. Internal modules

4. Local imports

---

# ENVIRONMENT FILES

Never commit

.env

Always provide

.env.example

---

# GITHUB

Repository should include

README

LICENSE

.gitignore

docs

frontend

backend

assets

public

---

# FUTURE EXPANSION

The folder structure should allow future additions such as:

Emergency SOS

Wearable Integration

AI Voice Calls

Community Forum

Events

Mentorship

Health Reports

Notifications

Without requiring major restructuring.

---

# Architecture Principle

The folder structure should reflect a production-grade application.

Every directory should have a clear purpose.

Every developer joining the project should immediately understand where each feature belongs.

Maintain consistency throughout development.