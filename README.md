# 🤖 AI Interview Analyzer Pro

An AI-powered mock interview platform that helps candidates prepare for technical interviews through intelligent resume analysis, personalized interview generation, AI-based answer evaluation, emotion detection, and detailed performance reports.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Secure API Access

### 📄 Resume Analysis
- Upload Resume (PDF)
- AI Resume Analysis using Google Gemini
- Skill Extraction
- Personalized Interview Question Generation

### 🎤 AI Mock Interview
- AI-generated Interview Questions
- Speech-to-Text (Voice Input)
- 60-second Timer for Each Question
- Live Camera Feed
- Real-time Emotion Detection using Face API

### 📊 AI Evaluation
- AI-based Answer Evaluation
- Technical Score
- Communication Score
- Confidence Assessment
- Personalized Feedback
- Hiring Recommendation

### 📑 Reports & Analytics
- Interview Summary
- PDF Report Generation
- Learning Roadmap
- Emotion Analysis
- Performance Statistics
- Best Score & Average Score

### 📈 Dashboard
- Total Interviews
- Total Answers
- Average Score
- Best Score
- Interview History
- Progress Tracking

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router
- Axios
- CSS

## Backend
- FastAPI
- Python
- SQLAlchemy
- JWT Authentication

## Database
- PostgreSQL (Neon)

## AI & ML
- Google Gemini API
- Face-api.js
- Web Speech API

---

# 📂 Project Structure

```text
AI-Interview-Analyzer-Pro
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   ├── database
│   │   └── utils
│   ├── requirements.txt
│   └── main.py
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── api.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/khushbu12121/AI-Interview-Analyzer-Pro.git
cd AI-Interview-Analyzer-Pro
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=YOUR_NEON_DATABASE_URL

SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 📸 Screenshots

> Add screenshots after deployment.

- Login Page
- Dashboard
- Resume Upload
- AI Interview
- Interview Report
- Interview History

---

# 🎯 Future Improvements

- AI Follow-up Questions
- ATS Resume Score
- Docker Support
- CI/CD Pipeline
- Interview Replay
- Performance Graphs
- Multi-role Interview Support

---

# 👩‍💻 Author

**Khushbu Bansal**

B.Tech CSE Student

Full Stack Developer | AI Enthusiast

GitHub: https://github.com/khushbu12121

---

# ⭐ Project Status

✅ Active Development

---

# 💡 Why AI Interview Analyzer Pro?

This platform simulates real interview experiences using AI-powered resume analysis, personalized interview generation, emotion detection, and intelligent answer evaluation. It helps candidates identify their strengths, improve weak areas, and prepare effectively for technical interviews.