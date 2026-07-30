from fastapi import APIRouter
from fastapi import Header

from app.services.history_service import (
    get_interview_history,
    delete_interview
)

from app.services.security import (
    get_current_user_id
)

router = APIRouter()


# ===========================
# GET INTERVIEW HISTORY
# ===========================

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

        average_score = (
            round(item.average_score, 1)
            if item.average_score is not None
            else 0
        )

        if average_score >= 8:
            performance = "Excellent"

        elif average_score >= 6:
            performance = "Good"

        elif average_score >= 4:
            performance = "Average"

        else:
            performance = "Needs Improvement"

        data.append(
            {
                "session_id": item.session_id,
                "interview_type": item.interview_type,
                "questions_answered": item.questions_answered,
                "average_score": average_score,
                "performance": performance
            }
        )

    return data


# ===========================
# DELETE INTERVIEW
# ===========================

@router.delete("/history/{session_id}")
def delete_history(session_id: int):

    success = delete_interview(session_id)

    if success:

        return {
            "message": "Interview deleted successfully"
        }

    return {
        "message": "Interview not found"
    }