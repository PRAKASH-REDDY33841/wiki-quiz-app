from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware   # ✅ ADD THIS
from database import engine, SessionLocal
from models import Base, Quiz
from scraper import scrape_wikipedia
from quiz_generator import generate_quiz
import json

app = FastAPI()

# ✅ ENABLE CORS HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Wiki Quiz API running"}


@app.post("/generate")
def generate(data: dict = Body(...)):
    url = data["url"]

    scraped = scrape_wikipedia(url)
    quiz_text = generate_quiz(scraped["content"])

    db = SessionLocal()

    record = Quiz(
        url=url,
        title=scraped["title"],
        quiz_json=json.dumps({
            "quiz": quiz_text,
            "sections": scraped["sections"]
        })
    )

    db.add(record)
    db.commit()
    db.close()

    return {
        "title": scraped["title"],
        "sections": scraped["sections"],
        "quiz": quiz_text
    }


@app.get("/quizzes")
def get_quizzes():
    db = SessionLocal()
    rows = db.query(Quiz).all()
    db.close()
    return rows
