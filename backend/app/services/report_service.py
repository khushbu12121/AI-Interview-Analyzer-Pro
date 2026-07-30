from app.database.connection import SessionLocal

from app.models.interview_answer import (
    InterviewAnswer
)

from app.services.summary_service import (
    generate_summary
)

from app.services.skill_gap_service import (
    generate_skill_gap
)

from app.services.roadmap_service import (
    generate_learning_roadmap
)

from app.services.career_readiness_service import (
    generate_career_readiness
)


def generate_report(session_id):

    db = SessionLocal()

    try:

        answers = db.query(
            InterviewAnswer
        ).filter(
            InterviewAnswer.session_id == session_id
        ).all()

        if not answers:

            return {
                "message": "No answers found"
            }

        scores = []

        for item in answers:

            try:

                scores.append(
                    int(item.score)
                )

            except:
                pass

        total_score = sum(scores)

        average_score = (
            round(
                total_score / len(scores),
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

        technical_score = round(
            average_score,
            2
        )

        communication_score = round(
            average_score * 0.9,
            2
        )

        consistency_score = round(
            (
                average_score +
                best_score
            ) / 2,
            2
        )

        if average_score >= 8:

            performance = "Excellent"

        elif average_score >= 6:

            performance = "Good"

        elif average_score >= 4:

            performance = "Average"

        else:

            performance = (
                "Needs Improvement"
            )

        if average_score >= 8:

            verdict = (
                "Strong Candidate"
            )

        elif average_score >= 6:

            verdict = (
                "Good Candidate"
            )

        elif average_score >= 4:

            verdict = (
                "Average Candidate"
            )

        else:

            verdict = (
                "Needs More Practice"
            )

        # -----------------------------
        # AI Interview Summary
        # -----------------------------

        try:

            summary_data = generate_summary(
                session_id
            )

            summary = summary_data.get(
                "summary",
                "No summary available"
            )

        except:

            summary = (
                "Summary unavailable"
            )

        # -----------------------------
        # Resume vs Interview Skill Gap
        # -----------------------------

        try:

            skill_gap = generate_skill_gap(
                session_id
            )

        except:

            skill_gap = (
                "Skill gap unavailable."
            )

        # -----------------------------
        # AI Learning Roadmap
        # -----------------------------

        try:

            roadmap = generate_learning_roadmap(
                session_id
            )

        except:

            roadmap = (
                "Learning roadmap unavailable."
            )

        # -----------------------------
        # Smart Career Readiness
        # -----------------------------

        try:

            career_readiness = (
                generate_career_readiness(
                    session_id
                )
            )

        except:

            career_readiness = {

                "readiness_score": 0,

                "career_level": "Unavailable",

                "selection_probability": "0%",

                "strengths": [],

                "weaknesses": [],

                "next_focus": "Unavailable"

            }

        return {

            "session_id":
                session_id,

            "questions_answered":
                len(answers),

            "average_score":
                average_score,

            "best_score":
                best_score,

            "performance":
                performance,

            "technical_score":
                technical_score,

            "communication_score":
                communication_score,

            "consistency_score":
                consistency_score,

            "verdict":
                verdict,

            "summary":
                summary,

            "skill_gap":
                skill_gap,

            "roadmap":
                roadmap,

            "career_readiness":
                career_readiness

        }

    finally:

        db.close()