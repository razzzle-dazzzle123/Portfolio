import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq
from pypdf import PdfReader


# =========================
# CONFIGURATION
# =========================

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("No API key")

client = Groq(api_key=my_api_key)

model = "openai/gpt-oss-120b"


# =========================
# FILE READERS
# =========================

def read_pdf(file_path):
    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def read_text(file_path):
    return Path(file_path).read_text(
        encoding="utf-8"
    )


# =========================
# LOAD PERSONAL INFORMATION
# =========================

BASE_DIR = Path(__file__).resolve().parent

resume_text = read_pdf(BASE_DIR / "Resume.pdf")
about_me = read_text(BASE_DIR / "about_me.txt")

# =========================
# SYSTEM PROMPT
# =========================

system_prompt = f"""
You are the personal AI assistant representing the portfolio owner.

Your job is to answer questions about the portfolio owner using ONLY
the information provided below.

================ RESUME ================

{resume_text}

================ OTHER INFORMATION ================

{about_me}

==========================================

RULES:

1. Never hallucinate.

2. Never invent education, experience, projects, skills, achievements,
   companies, or other personal information.

3. If the information is not available, clearly say that you don't
   have that information.

4. When appropriate, direct the user to the owner's LinkedIn or GitHub.

5. Answer naturally and professionally.

6. You can use the previous conversation to understand references
   such as "that project", "which one", or "he".
"""


# =========================
# LLM FUNCTION
# =========================

def ask_llm(question, conversation_history):

    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    # Add previous conversation
    for message in conversation_history:
        messages.append({
            "role": message.role,
            "content": message.content
        })

    # Add current question
    messages.append({
        "role": "user",
        "content": question
    })

    response = client.chat.completions.create(
        model=model,
        messages=messages
    )

    return response.choices[0].message.content