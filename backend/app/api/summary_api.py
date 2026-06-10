from fastapi import APIRouter

from app.services.summary_service import (
    generate_summary
)

router = APIRouter()


@router.get("/summary/{session_id}")
def get_summary(
    session_id: int
):

    return generate_summary(
        session_id
    )