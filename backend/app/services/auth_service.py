from app.models.user import User
from app.database.connection import SessionLocal
from app.services.security import (
    hash_password,
    verify_password
)


def create_user(user_data):
    db = SessionLocal()

    hashed_password = hash_password(
        user_data.password
    )

    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(email):
    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    return user


def authenticate_user(
    email,
    password
):
    user = get_user_by_email(email)

    if not user:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    return user