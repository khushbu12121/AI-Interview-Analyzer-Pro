from fastapi import APIRouter, Header

from app.schemas.interview import AnswerCreate

from app.services.interview_service import (
    create_interview_session,
    save_answer,
    get_interview_session
)

from app.services.evaluation_service import (
    evaluate_answer
)

from app.services.security import (
    get_current_user_id
)

questions = [
    "Tell me about yourself.",
    "Explain the difference between OOP and Procedural Programming.",
    "What is Polymorphism?",
    "What is Inheritance?",
    "Difference between Process and Thread?",
    "Explain TCP and UDP.",
    "What is DBMS? Explain Primary Key and Foreign Key.",
    "What are REST APIs?",
    "Tell me about one project you have worked on.",
    "Why should we hire you?"
]

router = APIRouter()


# ===========================
# START INTERVIEW
# ===========================

@router.post("/start-interview")
def start_interview(
    authorization: str = Header(None)
):

    if not authorization:
        return {
            "message": "Token Missing"
        }

    token = authorization.replace("Bearer ", "")

    user_id = get_current_user_id(token)

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
        "session_id": session.id,
        "question_number": 1,
        "total_questions": len(questions),
        "question": questions[0]
    }


# ===========================
# SAVE ANSWER
# ===========================

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


# ===========================
# EVALUATE ANSWER
# ===========================

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


# ===========================
# SUBMIT ANSWER
# ===========================

@router.post("/submit-answer")
def submit_answer(
    answer_data: AnswerCreate
):

    # Evaluate
    evaluation = evaluate_answer(
        question=answer_data.question,
        answer=answer_data.answer
    )

    # Save
    saved_answer = save_answer(
        session_id=answer_data.session_id,
        question=answer_data.question,
        answer=answer_data.answer,
        score=evaluation["score"],
        feedback=evaluation["feedback"]
    )

    # Session
    session = get_interview_session(
        answer_data.session_id
    )

    if session and session.questions:

        question_list = [
            q.strip()
            for q in session.questions.split("\n")
            if q.strip()
        ]

    else:

        question_list = questions

    try:

        current_index = question_list.index(
            answer_data.question
        )

    except ValueError:

        current_index = 0

    next_index = current_index + 1

    if next_index < len(question_list):

        return {
            "message": "Answer Saved And Evaluated",
            "completed": False,
            "answer_id": saved_answer.id,
            "score": evaluation["score"],
            "feedback": evaluation["feedback"],
            "question_number": next_index + 1,
            "total_questions": len(question_list),
            "next_question": question_list[next_index]
        }

    return {
        "message": "Interview Completed",
        "completed": True,
        "answer_id": saved_answer.id,
        "score": evaluation["score"],
        "feedback": evaluation["feedback"],
        "question_number": len(question_list),
        "total_questions": len(question_list)
    }