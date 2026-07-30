from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.profile_analytics import (
    router as profile_analytics_router
)

from app.api.auth import router as auth_router
from app.api.resume_api import router as resume_router
from app.api.report import router as report_router

from app.database.connection import engine

from app.models.user import Base
from app.models.resume import Resume
from app.models.interview_session import InterviewSession
from app.models.interview_answer import InterviewAnswer
from app.api.interview_api import router as interview_router
from app.api.history import router as history_router
from app.api.dashboard import (
    router as dashboard_router
)
from app.api.summary_api import (
    router as summary_router
)
from app.api.profile import (
    router as profile_router
)
# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-interview-analyzer-pro.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(history_router)
app.include_router(
    profile_analytics_router
)



@app.get("/")
def home():
    return {
        "message": "AI Interview Analyzer Backend Running"
    }
app.include_router(
    report_router
)
app.include_router(
    dashboard_router
)

app.include_router(
    summary_router
)
app.include_router(
    profile_router
)