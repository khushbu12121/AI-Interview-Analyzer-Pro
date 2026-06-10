from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Header,
    Form
)

import os

from app.services.question_service import (
    generate_questions
)

from app.services.resume_service import (
    save_resume
)

from app.services.pdf_service import (
    extract_text_from_pdf
)

from app.services.security import (
    get_current_user_id
)

from app.services.gemini_service import (
    analyze_resume
)

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    interview_type: str = Form(...),
    authorization: str = Header(None)
):

    if not authorization:

        return {
            "message":
            "Token missing"
        }

    token = authorization.replace(
        "Bearer ",
        ""
    )

    user_id = get_current_user_id(
        token
    )

    if not user_id:

        return {
            "message":
            "Invalid token"
        }

    os.makedirs(
        "uploads/resumes",
        exist_ok=True
    )

    file_path = (
        f"uploads/resumes/{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        content = await file.read()

        buffer.write(content)

    resume = save_resume(
        user_id=user_id,
        file_name=file.filename,
        file_path=file_path
    )

    resume_text = extract_text_from_pdf(
        file_path
    )

    ai_analysis = analyze_resume(
        resume_text
    )

    questions = generate_questions(
        resume_text,
        interview_type
    )

    return {
        "message":
            "Resume uploaded successfully",

        "resume_id":
            resume.id,

        "analysis":
            ai_analysis,

        "questions":
            questions,

        "interview_type":
            interview_type
    }