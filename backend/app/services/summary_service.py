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
You are a Senior Technical Interviewer and HR Evaluator.

Analyze the following interview based on the candidate's answers, scores, and feedback.

Interview Data:
{interview_text}

Generate a professional interview report in the following format:

==================================================

AI INTERVIEW SUMMARY

Overall Performance:
(Write 3-4 lines summarizing the candidate's overall interview performance.)

Overall Score:
(Give an overall score out of 10 based on all answers.)

Strengths:
- Point 1
- Point 2
- Point 3

Weaknesses:
- Point 1
- Point 2
- Point 3

Communication Skills:
(Rate as Excellent / Good / Average / Needs Improvement with one-line explanation.)

Technical Skills:
(Rate as Excellent / Good / Average / Needs Improvement with one-line explanation.)

Confidence Level:
(High / Medium / Low)

Hiring Recommendation:
(Recommended / Recommended for Next Round / Needs Improvement)

Recommended Job Roles:
- Role 1
- Role 2
- Role 3

Final Advice:
(Write 2-3 lines suggesting how the candidate can improve before the next interview.)

==================================================

Keep the response professional, easy to read, and use bullet points where appropriate.
Do not use markdown tables.
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