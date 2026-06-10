from pydantic import BaseModel


class AnswerCreate(BaseModel):

    session_id: int

    question: str

    answer: str