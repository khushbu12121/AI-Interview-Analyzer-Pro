from fastapi import APIRouter, Depends

from app.services.report_service import (
    generate_report
)

from app.services.security import (
    get_current_user
)

router = APIRouter()


@router.get("/report/{session_id}")
def interview_report(
    session_id: int,
    user_id: int = Depends(get_current_user)
):

    return generate_report(
        session_id,
        user_id
    )