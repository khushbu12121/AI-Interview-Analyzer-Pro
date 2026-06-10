import os
import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

genai.configure(
    api_key=API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def analyze_resume(resume_text):

    prompt = f"""
    Analyze this resume and provide:

    1. Strengths
    2. Weaknesses
    3. Skills
    4. Suggestions

    Resume:
    {resume_text}
    """

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception:

        return """
Resume Analysis Temporarily Unavailable

Possible reason:
- Gemini quota exceeded

Resume uploaded successfully.
You can still continue with interview questions.
"""

    prompt = f"""
    Analyze the following resume.

    Return:

    1. Professional Summary
    2. Skills
    3. Projects
    4. Education
    5. Missing Skills

    Resume:

    {resume_text}
    """

    response = model.generate_content(
        prompt
    )

    return response.text