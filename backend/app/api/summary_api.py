from fastapi import APIRouter, Depends

from app.services.summary_service import (
    generate_summary
)

from app.services.security import (
    get_current_user
)

router = APIRouter()


@router.get("/summary/{session_id}")
def get_summary(
    session_id: int,
    user_id: int = Depends(get_current_user)
):

    return generate_summary(
        session_id,
        user_id
    )