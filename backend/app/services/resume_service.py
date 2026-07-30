from app.database.connection import SessionLocal

from app.models.resume import Resume


def save_resume(
    user_id,
    file_name,
    file_path,
    resume_text
):

    db = SessionLocal()

    try:

        resume = Resume(
            user_id=user_id,
            file_name=file_name,
            file_path=file_path,
            resume_text=resume_text
        )

        db.add(resume)

        db.commit()

        db.refresh(resume)

        return resume

    finally:

        db.close()