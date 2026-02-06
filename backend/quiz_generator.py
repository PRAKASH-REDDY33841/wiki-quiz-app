import requests
import os
import json
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).parent / ".env"
print("ENV PATH =", env_path)
print("ENV EXISTS =", env_path.exists())

load_dotenv(env_path)

API_KEY = os.getenv("OPENROUTER_API_KEY")
print("API KEY =", API_KEY)


def generate_quiz(text: str):

    prompt = f"""
Generate 5 multiple choice quiz questions from this Wikipedia text.

Return STRICT JSON array format:

[
  {{
    "question": "...",
    "options": ["A","B","C","D"],
    "answer": "...",
    "difficulty": "easy|medium|hard",
    "explanation": "..."
  }}
]

TEXT:
{text[:4000]}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": "Wiki Quiz Generator"
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        },
        timeout=60
    )

    data = response.json()
    print("OPENROUTER RESPONSE =", data)

    if "choices" not in data:
        return {"error": data}

    # ✅ THIS IS THE CORRECT PLACE
    content = data["choices"][0]["message"]["content"]

    try:
        return json.loads(content)   # return real JSON
    except:
        return content               # fallback if model formatting slightly wrong
