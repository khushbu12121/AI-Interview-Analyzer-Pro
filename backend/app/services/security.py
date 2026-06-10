from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError

SECRET_KEY = "my_super_secret_key"

ALGORITHM = "HS256"

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
        hours=24
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

        return payload

    except JWTError:

        return None


def get_current_user_id(token):

    payload = verify_token(token)

    if not payload:
        return None

    return payload.get("user_id")