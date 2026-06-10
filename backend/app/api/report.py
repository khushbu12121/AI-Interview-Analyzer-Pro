from fastapi import APIRouter

from app.services.report_service import (
    generate_report
)

router = APIRouter()


@router.get("/report/{session_id}")
def interview_report(
    session_id: int
):

    return generate_report(
        session_id
    )