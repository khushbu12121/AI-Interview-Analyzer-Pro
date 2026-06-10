from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

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

    status = Column(
        String,
        default="active"
    )