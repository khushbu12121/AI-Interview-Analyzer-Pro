from sqlalchemy import func

from app.database.connection import SessionLocal
from app.models.interview_answer import InterviewAnswer
from app.models.interview_session import InterviewSession
from sqlalchemy import func, cast, Float


def get_interview_history(user_id):

    db = SessionLocal()

    try:

        history = (
            db.query(
                InterviewSession.id.label("session_id"),
                InterviewSession.interview_type,
                func.count(InterviewAnswer.id).label("questions_answered"),
                func.avg(
    cast(InterviewAnswer.score, Float)
).label("average_score")
            )
            .join(
                InterviewAnswer,
                InterviewAnswer.session_id == InterviewSession.id
            )
            .filter(
                InterviewSession.user_id == user_id
            )
            .group_by(
                InterviewSession.id,
                InterviewSession.interview_type
            )
            .order_by(
                InterviewSession.id.desc()
            )
            .all()
        )

        return history

    finally:

        db.close()


def delete_interview(session_id):

    db = SessionLocal()

    try:

        # Delete all answers of this interview
        db.query(InterviewAnswer).filter(
            InterviewAnswer.session_id == session_id
        ).delete()

        # Delete interview session
        session = (
            db.query(InterviewSession)
            .filter(
                InterviewSession.id == session_id
            )
            .first()
        )

        if session:

            db.delete(session)

            db.commit()

            return True

        db.commit()

        return False

    finally:

        db.close()