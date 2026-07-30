from fastapi import APIRouter, Depends

from app.services.dashboard_service import (
    get_dashboard_stats,
    get_dashboard_summary
)

from app.services.security import (
    get_current_user
)

router = APIRouter()


@router.get("/dashboard-stats")
def dashboard_stats(
    user_id: int = Depends(get_current_user)
):

    return get_dashboard_stats(
        user_id
    )


@router.get("/dashboard-summary")
def dashboard_summary(
    user_id: int = Depends(get_current_user)
):

    return get_dashboard_summary(
        user_id
    )