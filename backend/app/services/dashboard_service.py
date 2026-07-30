from app.database.connection import SessionLocal
from app.models.interview_answer import InterviewAnswer
from app.models.interview_session import InterviewSession


def get_dashboard_stats(user_id):

    db = SessionLocal()

    try:

        answers = (
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

        total_answers = len(
            answers
        )

        total_interviews = len(
            set(
                [
                    a.session_id
                    for a in answers
                ]
            )
        )

        scores = []

        for item in answers:
            

            try:
                scores.append(
                    int(item.score)
                )
            except:
                pass

        average_score = (
            round(
                sum(scores) /
                len(scores),
                2
            )
            if scores
            else 0
        )

        best_score = (
            max(scores)
            if scores
            else 0
        )

        return {

    "total_interviews":
        total_interviews,

    "total_answers":
        total_answers,

    "average_score":
        average_score,

    "best_score":
        best_score,

    "career_readiness":
        round(
            average_score * 10,
            0
        ),

    "level":
        (
            "Expert"
            if average_score >= 8

            else "Advanced"
            if average_score >= 6

            else "Intermediate"
            if average_score >= 4

            else "Beginner"
        )
}

    finally:

        db.close()

def get_dashboard_summary(user_id):

    db = SessionLocal()

    try:

        answers = (
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

        return answers

    finally:

        db.close()