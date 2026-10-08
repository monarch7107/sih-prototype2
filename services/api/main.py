"""LearnVerse API boundary. Replace in-memory handlers with Postgres repositories in production."""
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="LearnVerse AI API", version="0.1.0", root_path="/api")

class MentorRequest(BaseModel):
    prompt: str
    locale: str = "en"

@app.get("/health")
def health():
    return {"status": "ok", "service": "learnverse-api"}

@app.get("/v1/recommendations")
def recommendations():
    return {"items": [{"type": "lesson", "title": "RAG architecture patterns", "reason": "Build on your current path"}]}

@app.post("/v1/agents/mentor")
def mentor(request: MentorRequest):
    return {"agent": "mentor", "locale": request.locale, "message": "Nova received your question.", "next": "stream agent output over WebSocket in production"}
