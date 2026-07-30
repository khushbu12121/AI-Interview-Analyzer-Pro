import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", 24))

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password):
    return pwd_context.hash(password)


def verify_password(
    plain_password,
    hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def create_access_token(data):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
    hours=ACCESS_TOKEN_EXPIRE_HOURS
)

    to_encode.update(
        {"exp": expire}
    )

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


def verify_token(token):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("====================================")
        print("TOKEN RECEIVED =", token)
        print("TOKEN PAYLOAD =", payload)
        print("====================================")

        return payload

    except JWTError as e:

        print("====================================")
        print("TOKEN RECEIVED =", token)
        print("JWT ERROR =", str(e))
        print("====================================")

        return None


def get_current_user_id(token):

    payload = verify_token(token)

    if not payload:
        return None

    return payload.get("user_id")