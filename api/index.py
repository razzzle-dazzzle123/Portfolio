import sys
from pathlib import Path

# Add project root to Python's import path
ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI
from pydantic import BaseModel, Field

from portfolio_base import ask_llm


app = FastAPI()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str
    conversation_history: list[Message] = Field(default_factory=list)


@app.get("/")
def home():
    return {
        "message": "Portfolio AI backend is running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    answer = ask_llm(
        request.question,
        request.conversation_history
    )

    return {
        "answer": answer
    }