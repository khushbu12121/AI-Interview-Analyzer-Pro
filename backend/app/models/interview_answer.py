from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.models.user import Base


class InterviewAnswer(Base):

    __tablename__ = "interview_answers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    session_id = Column(
        Integer,
        nullable=False
    )

    question = Column(
        String,
        nullable=False
    )

    answer = Column(
        String,
        nullable=False
    )

    score = Column(
        String,
        nullable=True
    )

    feedback = Column(
        String,
        nullable=True
    )