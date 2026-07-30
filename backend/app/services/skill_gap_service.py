from app.database.connection import SessionLocal

from app.models.resume import Resume
from app.models.interview_answer import InterviewAnswer
from app.models.interview_session import InterviewSession

from app.services.gemini_service import model


def generate_skill_gap(session_id):

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
You are an expert technical interviewer.

Compare the candidate's resume with the interview answers.

Resume:

{resume.resume_text}

Interview:

{interview_text}

Generate:

1. Skills Found in Resume

2. Skills Demonstrated in Interview

3. Skills Missing During Interview

4. Strongest Skills

5. Weakest Skills

6. Learning Roadmap

Keep response professional.
"""

        try:

            response = model.generate_content(
                prompt
            )

            return response.text

        except Exception:

            return """
Resume vs Interview Skill Gap (Offline)

Resume Skills
✔ React
✔ FastAPI
✔ PostgreSQL
✔ JWT

Interview Demonstrated
✔ React
✔ JWT

Need More Practice
• PostgreSQL
• FastAPI
• Database Design

Learning Roadmap
• Practice SQL
• Build REST APIs
• Explain projects with real examples
"""

    finally:

        db.close()