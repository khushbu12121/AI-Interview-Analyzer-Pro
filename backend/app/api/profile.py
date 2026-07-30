from fastapi import APIRouter, Depends

from app.services.security import (
    get_current_user
)

from app.database.connection import (
    SessionLocal
)

from app.models.user import User

router = APIRouter()


@router.get("/me")
def get_profile(
    user_id: int = Depends(get_current_user)
):

    db = SessionLocal()

    try:

        user = db.query(
            User
        ).filter(
            User.id == user_id
        ).first()

        if not user:

            return {
                "message":
                "User Not Found"
            }

        return {

            "id":
                user.id,

            "name":
                user.name,

            "email":
                user.email
        }

    finally:

        db.close()