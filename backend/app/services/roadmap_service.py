from app.database.connection import SessionLocal

from app.models.resume import Resume
from app.models.interview_answer import InterviewAnswer
from app.models.interview_session import InterviewSession

from app.services.gemini_service import model


def generate_learning_roadmap(session_id):

    db = SessionLocal()

    try:

        session = db.query(
            InterviewSession
        ).filter(
            InterviewSession.id == session_id
        ).first()

        if not session:

            return "Interview session not found."

        resume = db.query(
            Resume
        ).filter(
            Resume.user_id == session.user_id
        ).order_by(
            Resume.id.desc()
        ).first()

        if not resume:

            return "Resume not found."

        answers = db.query(
            InterviewAnswer
        ).filter(
            InterviewAnswer.session_id == session_id
        ).all()

        interview_text = ""

        for item in answers:

            interview_text += f"""

Question:
{item.question}

Answer:
{item.answer}

"""

        prompt = f"""
You are an expert Software Engineering mentor.

Based on:

1. Resume
2. Interview Answers

Create a personalized 30-day learning roadmap.

Resume:

{resume.resume_text}

Interview:

{interview_text}

Return the roadmap exactly in this format:

Week 1
- Topic
- Topic
- Practice

Week 2
- Topic
- Topic
- Project

Week 3
- Topic
- Topic
- Interview Preparation

Week 4
- Mock Interviews
- Resume Improvements
- Final Revision

Keep it practical and professional.
"""

        try:

            response = model.generate_content(
                prompt
            )

            return response.text

        except Exception:

            return """
30-Day Personalized Learning Roadmap            

Week 1
• Practice SQL Joins
• Revise DBMS
• Solve 20 SQL Problems

Week 2
• Build CRUD APIs using FastAPI
• Practice JWT Authentication
• Learn REST API Best Practices

Week 3
• Improve React Hooks
• Build Mini Projects
• Practice DSA Basics

Week 4
• Give Mock Interviews
• Explain Your Projects
• Prepare HR Questions
"""

    finally:

        db.close()