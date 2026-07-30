from fastapi import APIRouter
from fastapi import Header

from app.services.dashboard_service import (
    get_dashboard_stats,
    get_dashboard_summary
)

from app.services.security import (
    get_current_user_id
)

router = APIRouter()


@router.get("/dashboard-stats")
def dashboard_stats(
    authorization: str = Header(None)
):

    if not authorization:
        return {}

    token = authorization.replace(
        "Bearer ",
        ""
    )

    user_id = get_current_user_id(
        token
    )

    if not user_id:
        return {}

    return get_dashboard_stats(
        user_id
    )
@router.get("/dashboard-summary")
def dashboard_summary(
    authorization: str = Header(None)
):

    if not authorization:
        return []

    token = authorization.replace(
        "Bearer ",
        ""
    )

    user_id = get_current_user_id(
        token
    )

    if not user_id:
        return []

    return get_dashboard_summary(
        user_id
    )