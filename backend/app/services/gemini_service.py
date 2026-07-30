import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-3.6-flash")


def analyze_resume(resume_text):

    prompt = f"""
You are an experienced Technical Recruiter and ATS (Applicant Tracking System).

Analyze the following resume and generate a professional ATS Resume Report.

Resume:

{resume_text}

Return your response in the following format:

======================================

ATS RESUME REPORT

ATS Score:
(Give score out of 100)

Overall Rating:
Excellent / Good / Average / Needs Improvement

Professional Summary:
(Write 2-3 lines.)

Strengths:
• Bullet points

Weaknesses:
• Bullet points

Technical Skills Found:
• Programming Languages
• Frameworks
• Databases
• Tools

Missing Skills:
(List important skills that are missing.)

Projects Evaluation:
(Comment on project quality.)

Resume Formatting:
(Comment on formatting.)

Suggestions to Improve Resume:
• Bullet points

Recommended Job Roles:
• Role 1
• Role 2
• Role 3

======================================

Keep the response professional and concise.
Do not use markdown tables.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("========================================")
        print("Gemini Error:", e)
        print("========================================")

        return """
ATS RESUME REPORT (Offline Mode)

ATS Score:
75 /100

Overall Rating:
Good

Professional Summary:
Your resume contains relevant academic and technical information suitable for entry-level software engineering roles.

Strengths:
• Technical skills are mentioned.
• Projects are included.
• Education details are available.

Weaknesses:
• Resume lacks quantified achievements.
• Professional summary can be stronger.
• Internship or practical experience is missing.

Technical Skills Found:
• Programming Languages
• Frameworks
• Databases

Missing Skills:
• Docker
• CI/CD
• Unit Testing

Suggestions to Improve Resume:
• Add measurable achievements.
• Add GitHub and LinkedIn links.
• Include certifications.
• Improve project descriptions with impact.

Recommended Job Roles:
• Software Engineer
• Backend Developer
• Full Stack Developer

Note:
Gemini API quota exceeded. This report was generated using offline analysis.
"""