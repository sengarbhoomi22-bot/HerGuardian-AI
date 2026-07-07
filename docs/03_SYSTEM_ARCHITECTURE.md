# HerGuardian AI

# System Architecture

Version: 1.0

---

# Table of Contents

1. System Overview
2. Architecture Philosophy
3. High-Level Architecture
4. Frontend Architecture
5. Backend Architecture
6. AI Agent Architecture
7. Tool Architecture
8. Database Design
9. API Flow
10. User Journey
11. Folder Structure
12. Security Architecture
13. Deployment Architecture
14. Future Scalability

---

# 1. System Overview

HerGuardian AI follows a modern modular architecture.

The application consists of:

• Frontend

• Backend

• Master AI Agent

• Specialized Tools

• Database

• External Trusted APIs

The architecture emphasizes:

- Clean separation of responsibilities
- Scalability
- Maintainability
- Security
- Accessibility

---

# 2. Architecture Philosophy

Instead of creating multiple independent AI agents,

HerGuardian AI uses:

One Master AI Agent

+

Multiple Specialized Tools

This provides:

- Better maintainability
- Easier debugging
- Lower cost
- Cleaner architecture
- Better user experience

The user always interacts with only one AI assistant.

---

# 3. High-Level Architecture

```
                    USER
                      │
                      ▼
         React Frontend (Vite)
                      │
                      ▼
          Node.js + Express Backend Server
                      │
                      ▼
             Master AI Agent
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
 Health Tool   Nutrition Tool   Safety Tool
       │              │              │
       ▼              ▼              ▼
Fitness Tool  Career Tool   Inspiration Tool
       │
       ▼
 MongoDB Database (Mongo Atlas for production; mongodb-memory-server for dev)
       │
       ▼
 Trusted APIs / External Resources
```

---

# 4. Frontend Architecture

Technology Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios

Frontend Responsibilities

- Display UI
- Collect user input
- Display AI responses
- Display images
- Display videos
- Save bookmarks
- Manage navigation
- Profile management

The frontend never communicates directly with OpenAI.

All communication passes through the backend.

---

# 5. Backend Architecture

Technology

Python

FastAPI

Responsibilities

- Authentication
- API Endpoints
- AI Requests
- Tool Calling
- Database Access
- Validation
- Search
- Translation
- Error Handling

---

# 6. Master AI Agent

HerGuardian AI contains ONE central AI Agent.

Responsibilities

✓ Understand user intent

✓ Decide which tool to call

✓ Merge responses

✓ Personalize replies

✓ Maintain conversation context

The Master Agent never exposes internal implementation details.

Users only see one intelligent assistant.

---

# 7. Tool Architecture

Each tool has one responsibility.

Health Tool

↓

Women's health

Nutrition Tool

↓

Vegetarian recipes

Fitness Tool

↓

Women's exercises

Mental Wellness Tool

↓

Mindfulness

Meditation

Stress

Menstrual Tool

↓

Period wellness

Safety Tool

↓

Emergency resources

Police stations

Career Tool

↓

Scholarships

Jobs

Competitions

Mentorship

Inspiration Tool

↓

Books

Women Leaders

Organizations

Speakers

Feedback Tool

↓

Ratings

Testimonials

Search Tool

↓

Keyword search

Voice search

Translation Tool

↓

Language support

---

# 8. AI Flow

Example

User

↓

"I need scholarships for AI."

↓

Master Agent

↓

Career Tool

↓

Official Scholarship Sources

↓

AI summarizes

↓

Response returned

---

Another Example

User

↓

"I have PCOS.

Suggest food and exercise."

↓

Master Agent

↓

Menstrual Tool

↓

Nutrition Tool

↓

Fitness Tool

↓

AI combines responses

↓

User receives one natural answer

---

# 9. Database Design

SQLite

Tables

Users

Fields

- id
- name
- preferred_name
- age
- country
- preferred_language

Saved_Content

- id
- title
- category
- url
- image
- timestamp

Feedback

- id
- rating
- comment
- timestamp

Bookmarks

Session_History

Application_Statistics

---

# 10. User Journey

First Visit

↓

Registration

↓

Dashboard

↓

Explore Modules

↓

Ask AI

↓

Save Resources

↓

Provide Feedback

↓

Logout

---

Returning User

↓

Dashboard

↓

Welcome Back

↓

Continue Learning

---

# 11. Navigation Flow

Home

↓

Choose Module

↓

Read Content

↓

Watch Video

↓

Ask AI

↓

Save

↓

Share

↓

Return Home

---

# 12. Search Flow

User

↓

Search

↓

Voice/Text

↓

Backend

↓

AI Tool

↓

Trusted Resources

↓

Results

---

# 13. Translation Flow

User

↓

Language Switch

↓

Backend

↓

Translation Tool

↓

Translated Content

↓

Display

---

# 14. Video Flow

Article

↓

Search trusted YouTube video

↓

Found?

Yes

↓

Display

No

↓

Display friendly message

---

# 15. Save Flow

User clicks Save

↓

Backend

↓

SQLite

↓

Saved

↓

Displayed in My Library

---

# 16. Share Flow

User

↓

Share Button

↓

Native Share API

↓

WhatsApp

Facebook

Instagram

LinkedIn

Telegram

X

Email

Copy Link

---

# 17. Feedback Flow

User

↓

Rating

↓

Comment

↓

Database

↓

Featured Testimonials

↓

Community Statistics

---

# 18. Security Architecture

API Keys

↓

.env

↓

Backend

↓

Never exposed

Never committed

Always ignored using .gitignore

---

# 19. Deployment Architecture

```
                 USER
                   │
                   ▼
             Vercel Frontend
                   │
                   ▼
             Render Backend
                   │
                   ▼
             OpenAI API
                   │
                   ▼
             SQLite Database
```

---

# 20. Folder Structure

```
HerGuardian-AI/

frontend/

backend/

docs/

assets/

public/

README.md

LICENSE

.gitignore
```

---

# 21. Error Handling

Gracefully handle

- Missing videos

- Missing images

- Network failure

- API timeout

- Invalid search

- Voice search unavailable

- Translation unavailable

Never display technical errors to users.

---

# 22. Accessibility

Support

✓ Zoom

✓ Translation

✓ Responsive Design

✓ Keyboard Navigation

✓ Captions

✓ Readable Typography

---

# 23. Future Scalability

Future versions may include

- Voice conversations

- AI reminders

- Wearable integration

- Community Forum

- Emergency SOS

- Health Tracker

- AI Wellness Reports

These are outside Version 1.

---

# Architecture Principles

Always prefer

- Clean Code

- Modular Design

- Reusable Components

- Secure APIs

- Maintainable Architecture

- Professional Documentation

This architecture should support future growth without requiring major redesign.
