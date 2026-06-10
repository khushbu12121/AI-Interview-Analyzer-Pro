from fastapi import APIRouter
from fastapi import Header

from app.services.history_service import (
    get_interview_history
)

from app.services.security import (
    get_current_user_id
)

router = APIRouter()


@router.get("/history")
def interview_history(
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

    history = get_interview_history(
        user_id
    )

    data = []

    for item in history:

        data.append(
            {
                "id": item.id,
                "session_id": item.session_id,
                "question": item.question,
                "answer": item.answer,
                "score": item.score,
                "feedback": item.feedback
            }
        )

    return data