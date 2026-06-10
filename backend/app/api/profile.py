from fastapi import APIRouter
from fastapi import Header

from app.services.security import (
    verify_token
)

from app.database.connection import (
    SessionLocal
)

from app.models.user import User

router = APIRouter()


@router.get("/me")
def get_profile(
    authorization: str = Header(None)
):

    if not authorization:

        return {
            "message":
            "Token Missing"
        }

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(
        token
    )

    print("================================")
    print("TOKEN RECEIVED =", token)
    print("PAYLOAD =", payload)
    print("================================")

    if not payload:

        return {
            "message":
            "Invalid Token"
        }

    user_id = payload.get(
        "user_id"
    )

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