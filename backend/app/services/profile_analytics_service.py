from app.database.connection import SessionLocal

from app.models.interview_answer import (
    InterviewAnswer
)


def generate_profile_analytics():

    db = SessionLocal()

    try:

        answers = db.query(
            InterviewAnswer
        ).all()

        if not answers:

            return {

                "total_interviews": 0,

                "average_score": 0,

                "best_score": 0,

                "improvement": "0%",

                "strongest_skill": "Unavailable",

                "weakest_skill": "Unavailable"

            }

        scores = []

        for answer in answers:

            try:

                scores.append(
                    int(answer.score)
                )

            except:
                pass

        total_interviews = len(
            set(
                answer.session_id
                for answer in answers
            )
        )

        average_score = round(
            sum(scores) / len(scores),
            2
        )

        best_score = max(scores)

        if len(scores) >= 2:

            improvement = round(
                (
                    scores[-1] -
                    scores[0]
                ) * 10,
                1
            )

            improvement = (
                f"{improvement}%"
            )

        else:

            improvement = "0%"

        return {

            "total_interviews":
                total_interviews,

            "average_score":
                average_score,

            "best_score":
                best_score,

            "improvement":
                improvement,

            "strongest_skill":
                "Technical Knowledge",

            "weakest_skill":
                "Communication"

        }

    finally:

        db.close()