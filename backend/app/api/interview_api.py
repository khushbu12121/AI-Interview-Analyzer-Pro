from fastapi import Header
from app.services.security import get_current_user_id
from fastapi import APIRouter
from fastapi import Header

from app.schemas.interview import AnswerCreate

from app.services.interview_service import (
    create_interview_session,
    save_answer
)

from app.services.evaluation_service import (
    evaluate_answer
)

from app.services.security import (
    get_current_user_id
)

router = APIRouter()


@router.post("/start-interview")
def start_interview(
    authorization: str = Header(None)
):

    if not authorization:

        return {
            "message": "Token Missing"
        }

    token = authorization.replace(
        "Bearer ",
        ""
    )

    user_id = get_current_user_id(
        token
    )

    if not user_id:

        return {
            "message": "Invalid Token"
        }

    session = create_interview_session(
        user_id=user_id,
        interview_type="Technical"
    )

    return {
        "message": "Interview Started",
        "session_id": session.id
    }


@router.post("/save-answer")
def save_interview_answer(
    answer_data: AnswerCreate
):

    answer = save_answer(
        session_id=answer_data.session_id,
        question=answer_data.question,
        answer=answer_data.answer
    )

    return {
        "message": "Answer Saved",
        "answer_id": answer.id
    }


@router.post("/evaluate-answer")
def evaluate_interview_answer(
    answer_data: AnswerCreate
):

    evaluation = evaluate_answer(
        question=answer_data.question,
        answer=answer_data.answer
    )

    return {
        "evaluation": evaluation
    }


@router.post("/submit-answer")
def submit_answer(
    answer_data: AnswerCreate
):

    evaluation = evaluate_answer(
        question=answer_data.question,
        answer=answer_data.answer
    )

    saved_answer = save_answer(
        session_id=answer_data.session_id,
        question=answer_data.question,
        answer=answer_data.answer,
        score=evaluation["score"],
        feedback=evaluation["feedback"]
    )

    return {
        "message":
            "Answer Saved And Evaluated",

        "answer_id":
            saved_answer.id,

        "score":
            evaluation["score"],

        "feedback":
            evaluation["feedback"]
    }