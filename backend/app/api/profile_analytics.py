from fastapi import APIRouter

from app.services.profile_analytics_service import (
    generate_profile_analytics
)

router = APIRouter()


@router.get("/profile-analytics")
def profile_analytics():

    return generate_profile_analytics()