import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const askQuestion = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
          conversation_history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: currentQuestion,
        },
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: currentQuestion,
        },
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold">
            Rudra<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden gap-8 text-sm text-zinc-400 md:flex">
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#skills" className="hover:text-white">
              Skills
            </a>
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Computer Science • Developer
          </p>

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
            Hi, I'm Rudra.
            <br />
            <span className="text-zinc-500">I build things with code.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            I'm a computer science student interested in software development,
            AI, and building useful applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-white/10 bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-3 text-sm uppercase tracking-widest text-cyan-400">
            About
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">A little about me</h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            I'm passionate about understanding how things work and turning ideas
            into working software. I enjoy working across different areas of
            computer science, from algorithms and web development to AI-powered
            applications.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-sm uppercase tracking-widest text-cyan-400">
          Skills
        </p>

        <h2 className="text-3xl font-bold sm:text-4xl">
          Technologies I work with
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Languages",
              skills: "C++ • Python • Java • JavaScript",
            },
            {
              title: "Frontend",
              skills: "React • HTML • CSS • Tailwind",
            },
            {
              title: "Backend",
              skills: "FastAPI • Flask • SQL",
            },
            {
              title: "AI",
              skills: "LLMs • RAG • Embeddings • APIs",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.skills}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="border-t border-white/10 bg-zinc-900/40"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="mb-3 text-sm uppercase tracking-widest text-cyan-400">
            Projects
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">Things I've built</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "AI Portfolio Assistant",
                description:
                  "An AI-powered assistant that answers questions about my background, skills, projects, and experience.",
                tech: "React • FastAPI • Groq • Python",
              },
              {
                title: "RAG System",
                description:
                  "An experimental retrieval-augmented generation system built to understand how embeddings and retrieval work.",
                tech: "Python • Sentence Transformers • Groq",
              },
              {
                title: "Virtual Fitness Trainer",
                description:
                  "A computer-vision project that uses pose estimation to provide feedback during exercises.",
                tech: "Python • OpenCV • MediaPipe",
              },
              {
                title: "More Coming Soon",
                description:
                  "More projects and experiments will be added here as I continue building.",
                tech: "Always learning",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group rounded-2xl border border-white/10 bg-zinc-950 p-7 transition hover:border-cyan-400/40"
              >
                <h3 className="text-xl font-semibold group-hover:text-cyan-400">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {project.description}
                </p>

                <p className="mt-6 text-sm text-zinc-500">{project.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-sm uppercase tracking-widest text-cyan-400">
          Contact
        </p>

        <h2 className="text-3xl font-bold sm:text-4xl">Let's connect.</h2>

        <p className="mt-5 text-zinc-400">
          Interested in working together or just want to say hello?
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="https://github.com/razzzle-dazzzle123"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm hover:bg-white/5"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/rudradeep-c-995203228/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm hover:bg-white/5"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* CHAT BUTTON */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 flex items-center gap-3 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-zinc-950 shadow-lg shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-300"
        >
          <span>🤖</span>
          Ask My AI
        </button>
      )}

      {/* CHAT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[calc(100%-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
          {/* CHAT HEADER */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h3 className="font-semibold">Ask My AI 🤖</h3>

              <p className="text-xs text-zinc-500">
                Ask me anything about Rudra
              </p>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="rounded-xl bg-white/5 p-4 text-sm text-zinc-400">
                👋 Hi! I'm Rudra's AI assistant.
                <br />
                Ask me about his projects, skills, education, or experience.
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-cyan-400 text-zinc-950"
                      : "bg-white/5 text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="w-fit rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-400">
                Thinking...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask something..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-cyan-400/50"
              />

              <button
                onClick={askQuestion}
                disabled={loading}
                className="rounded-xl bg-cyan-400 px-4 font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
