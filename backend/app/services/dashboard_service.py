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
                best_score
        }

    finally:

        db.close()