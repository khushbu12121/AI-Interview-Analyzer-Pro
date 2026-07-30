from app.database.connection import SessionLocal

from app.models.interview_answer import (
    InterviewAnswer
)


def generate_career_readiness(session_id):

    db = SessionLocal()

    try:

        answers = db.query(
            InterviewAnswer
        ).filter(
            InterviewAnswer.session_id == session_id
        ).all()

        if not answers:

            return {

                "readiness_score": 0,

                "career_level": "Beginner",

                "selection_probability": "0%",

                "strengths": [],

                "weaknesses": [],

                "next_focus": "Complete more interviews"

            }

        scores = []

        for answer in answers:

            try:

                scores.append(
                    int(answer.score)
                )

            except:
                pass

        average = (
            sum(scores) / len(scores)
            if scores
            else 0
        )

        readiness_score = round(
            average * 10
        )

        selection_probability = f"{round(average * 10)}%"

        if average >= 8:

            career_level = "🏆 Industry Ready"

        elif average >= 6:

            career_level = "🥇 Advanced"

        elif average >= 4:

            career_level = "🥈 Intermediate"

        else:

            career_level = "🥉 Beginner"

        strengths = [

            "Technical Knowledge",

            "Consistency",

            "Problem Solving"

        ]

        weaknesses = [

            "Communication",

            "Project Explanation",

            "Advanced Concepts"

        ]

        next_focus = (
            "Complete 2 Mock Interviews"
        )

        return {

            "readiness_score":
                readiness_score,

            "career_level":
                career_level,

            "selection_probability":
                selection_probability,

            "strengths":
                strengths,

            "weaknesses":
                weaknesses,

            "next_focus":
                next_focus

        }

    finally:

        db.close()