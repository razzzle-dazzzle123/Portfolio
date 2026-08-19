from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from portfolio_base import ask_llm


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://portfolio-rudradeep.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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