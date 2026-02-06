from sqlalchemy import Column, Integer, String, Text
from database import Base


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    quiz_json = Column(Text)
