# AI Interview Analyzer V2

An AI-powered interview preparation platform that helps candidates practice interviews, analyze performance, and improve job readiness through intelligent feedback and analytics.

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Resume Analysis

* Resume Upload (PDF)
* Resume Storage
* Resume Processing
* Interview Type Selection

### AI Interview System

* AI-generated Interview Questions
* Mock Interview Environment
* Answer Submission
* Speech Input Support
* Timer-based Interview Flow

### Performance Evaluation

* AI Answer Analysis
* Technical Score
* Communication Score
* Confidence Assessment
* Improvement Suggestions

### Dashboard

* Total Interviews
* Total Answers
* Average Score
* Best Score
* User Activity Overview

### Interview History

* Previous Interview Records
* Questions and Answers
* AI Feedback Storage
* Performance Tracking

### Reports & Analytics

* Performance Report
* Interview Statistics
* Hiring Recommendation
* Emotion Analysis Section
* Performance Trends

### User Profile

* User Information
* Account Management
* Interview Progress Overview

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Vite
* CSS

### Backend

* FastAPI
* Python
* SQLAlchemy
* JWT Authentication
* SQLite

### AI Integration

* Google Gemini API

### Additional Features

* Face Detection Models
* Resume Parsing
* Performance Analytics

---

## Project Structure

```text
AI-Interview-Analyzer-V2
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── services
│   │   ├── models
│   │   ├── schemas
│   │   └── database
│   └── main.py
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   └── services
│   └── public
│
└── docs
```

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

---

## Future Improvements

* Real-time Emotion Detection
* Advanced AI Evaluation
* PDF Report Export
* Live Video Interviews
* Interview Performance Graphs
* Deployment on Render/Vercel
* Multi-role Interview Support

---

## Author

Khushbu Bansal

B.Tech Student | Full Stack & AI Enthusiast

---

## Project Status

Version: V2

Status: Active Development
