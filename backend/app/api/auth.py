from fastapi import APIRouter
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import (
    create_user,
    authenticate_user
)
from app.services.security import create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):

    new_user = create_user(user)

    return {
        "message": "User registered successfully",
        "id": new_user.id
    }


@router.post("/login")
def login(user: UserLogin):

    db_user = authenticate_user(
        user.email,
        user.password
    )

    if not db_user:
        return {
            "message": "Invalid email or password"
        }

    token = create_access_token(
        {
            "user_id": db_user.id,
            "email": db_user.email
        }
    )

    return {
        "message": "Login successful",
        "access_token": token
    }