from app.database.connection import SessionLocal

from app.models.interview_session import (
    InterviewSession
)

from app.models.interview_answer import (
    InterviewAnswer
)


def create_interview_session(
    user_id,
    interview_type,
    questions=None
):

    db = SessionLocal()

    try:

        if isinstance(questions, list):
            questions = "\n".join(questions)

        session = InterviewSession(
            user_id=user_id,
            interview_type=interview_type,
            questions=questions
        )

        db.add(session)
        db.commit()
        db.refresh(session)

        return session

    finally:
        db.close()


def get_interview_session(
    session_id
):

    db = SessionLocal()

    try:

        return db.query(
            InterviewSession
        ).filter(
            InterviewSession.id == session_id
        ).first()

    finally:

        db.close()


def save_answer(
    session_id,
    question,
    answer,
    score=None,
    feedback=None
):

    db = SessionLocal()

    try:

        interview_answer = InterviewAnswer(
            session_id=session_id,
            question=question,
            answer=answer,
            score=score,
            feedback=feedback
        )

        db.add(interview_answer)

        db.commit()

        db.refresh(interview_answer)

        return interview_answer

    finally:

        db.close()