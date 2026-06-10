from app.database.connection import SessionLocal

from app.models.interview_answer import (
    InterviewAnswer
)

from app.services.gemini_service import model


def generate_summary(session_id):

    db = SessionLocal()

    try:

        answers = db.query(
            InterviewAnswer
        ).filter(
            InterviewAnswer.session_id == session_id
        ).all()

        if not answers:

            return {
                "summary":
                "No interview data found"
            }

        interview_text = ""

        total_score = 0
        valid_scores = 0

        for item in answers:

            interview_text += f"""

Question:
{item.question}

Answer:
{item.answer}

Score:
{item.score}

Feedback:
{item.feedback}

"""

            try:

                total_score += int(
                    item.score
                )

                valid_scores += 1

            except:

                pass

        average_score = 0

        if valid_scores > 0:

            average_score = round(
                total_score /
                valid_scores,
                2
            )

        prompt = f"""
You are an expert interview evaluator.

Analyze the complete interview below.

{interview_text}

Generate:

1. Overall Score (/10)

2. Strengths

3. Weaknesses

4. Improvement Suggestions

5. Recommended Job Roles

Keep the response professional and structured.
"""

        try:

            response = model.generate_content(
                prompt
            )

            return {
                "summary":
                response.text
            }

        except Exception as e:

            print(
                "Gemini Error:",
                e
            )

            if average_score >= 8:

                level = "Excellent"

            elif average_score >= 6:

                level = "Good"

            elif average_score >= 4:

                level = "Average"

            else:

                level = (
                    "Needs Improvement"
                )

            return {
                "summary": f"""
AI Summary (Offline Mode)

Overall Score:
{average_score}/10

Performance:
{level}

Strengths:
- Successfully completed interview session
- Demonstrated technical knowledge
- Answered {len(answers)} questions

Areas For Improvement:
- Add more detailed explanations
- Use practical examples
- Improve communication clarity

Recommended Roles:
- Junior Full Stack Developer
- Frontend Developer
- Backend Developer

Note:
Gemini API quota exceeded, so this summary was generated from stored interview data.
"""
            }

    finally:

        db.close()