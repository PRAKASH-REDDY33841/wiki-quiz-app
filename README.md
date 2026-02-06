📘 Wiki Quiz App

A full-stack application that generates quizzes automatically from any Wikipedia article URL.
Users can paste a Wikipedia page link and instantly receive AI-generated quiz questions with answers and explanations.

Built with FastAPI + React + PostgreSQL and deployed on Render.

🚀 Live Demo

Frontend: (your render frontend URL here)
Backend API: https://wiki-quiz-backend-h2q8.onrender.com

🧠 Features

✅ Generate quiz from any Wikipedia article

✅ Automatic content scraping

✅ AI quiz generation

✅ Multiple choice questions

✅ Answers + explanations

✅ Difficulty tagging

✅ Quiz history storage

✅ View past quizzes

✅ Full-stack architecture

✅ Deployed backend + frontend

🏗 Tech Stack
Backend

FastAPI

SQLAlchemy

PostgreSQL

Uvicorn

Wikipedia scraping (BeautifulSoup)

AI quiz generator

Frontend

React

Fetch API

Simple responsive UI

Deployment

Render Web Service (FastAPI)

Render Static Site (React)

Render PostgreSQL database

📂 Project Structure
wiki-quiz-app/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── scraper.py
│   ├── quiz_generator.py
│   └── requirements.txt
│
├── frontend-ui/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md

⚙️ Backend Setup (Local)
1️⃣ Go to backend folder
cd backend

2️⃣ Create virtual environment
python -m venv venv
venv\Scripts\activate

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Create .env
DATABASE_URL=postgresql://user:password@localhost:5432/wiki_quiz_db
OPENAI_API_KEY=your_key_here

5️⃣ Run server
uvicorn main:app --reload


Open:

http://127.0.0.1:8000/docs

🎨 Frontend Setup (Local)
cd frontend-ui
npm install
npm start


Runs at:

http://localhost:3000

📌 API Endpoints
Generate Quiz
POST /generate


Body:

{
  "url": "https://en.wikipedia.org/wiki/Alan_Turing"
}

Get Quiz History
GET /quizzes


Returns all stored quizzes.

🧪 Test URLs

Use valid Wikipedia article pages:

https://en.wikipedia.org/wiki/Alan_Turing
https://en.wikipedia.org/wiki/Artificial_intelligence
https://en.wikipedia.org/wiki/Machine_learning

🔐 Environment Variables

Never commit these:

.env
venv/
node_modules/
build/

☁️ Deployment
Backend

Render → Web Service

Start command:

uvicorn main:app --host 0.0.0.0 --port 10000

Frontend

Render → Static Site

Build:

npm install && npm run build


Publish directory:

build

🎯 Assignment Requirements Covered

✅ Wikipedia scraping
✅ Quiz generation
✅ Database storage
✅ History view
✅ Frontend UI
✅ Backend API
✅ Deployment
✅ Full stack integration

👨‍💻 Author

Prakash Reddy
Full-Stack Developer Project
