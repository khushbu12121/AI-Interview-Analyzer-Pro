from app.services.gemini_service import model


def generate_questions(
    resume_text,
    interview_type
):

    prompt = f"""
You are an expert interviewer.

Generate EXACTLY 10 interview questions.

Interview Type:
{interview_type.upper()}

Rules:

If Technical:
- Ask technical questions based on skills, projects and technologies in resume.

If HR:
- Ask HR and behavioral questions only.

If Mixed:
- Generate 5 technical questions and 5 HR questions.

Return ONLY questions.

Resume:
{resume_text}
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception:

        interview_type = (
            interview_type.lower()
        )

        if interview_type == "technical":

            return """
What is FastAPI?
Explain JWT Authentication.
What is PostgreSQL?
Explain REST APIs.
What is React?
What is state management?
Explain database normalization.
What is Git?
What is OOP?
Explain your main project.
"""

        elif interview_type == "hr":

            return """
Tell me about yourself.
Why should we hire you?
What are your strengths?
What are your weaknesses?
Where do you see yourself in 5 years?
Why do you want this job?
Describe a challenge you faced.
How do you handle pressure?
Tell me about teamwork experience.
Why are you interested in our company?
"""

        else:

            return """
Tell me about yourself.
What are your strengths?
Why should we hire you?
Describe a challenge you faced.
Where do you see yourself in 5 years?
What is FastAPI?
Explain JWT Authentication.
What is PostgreSQL?
Explain your main project.
What is React?
"""
