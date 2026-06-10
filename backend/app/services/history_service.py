from app.database.connection import SessionLocal
from app.models.interview_answer import InterviewAnswer
from app.models.interview_session import InterviewSession


def get_interview_history(user_id):

    db = SessionLocal()

    try:

        history = (
            db.query(InterviewAnswer)
            .join(
                InterviewSession,
                InterviewAnswer.session_id ==
                InterviewSession.id
            )
            .filter(
                InterviewSession.user_id ==
                user_id
            )
            .all()
        )

        return history

    finally:

        db.close()