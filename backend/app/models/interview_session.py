from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import relationship

from app.models.user import Base


class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    interview_type = Column(
        String,
        nullable=False
    )

    # NEW COLUMN
    questions = Column(
        Text,
        nullable=True
    )

    status = Column(
        String,
        default="active"
    )
    