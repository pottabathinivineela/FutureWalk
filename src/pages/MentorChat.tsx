import { useState } from "react";
import { askNova } from "../services/gemini";

export default function MentorChat() {
  const [messages, setMessages] = useState([
    {
      sender: "nova",
      text:
        "👋 Hello Vineela!\n\nI'm Nova.\nAsk me anything about careers, AI, coding, internships, resumes, startups or hackathons.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!question.trim()) return;

    const userQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setLoading(true);

    const reply = await askNova("Vineela", userQuestion);

    setLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        sender: "nova",
        text: reply,
      },
    ]);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background:
                  msg.sender === "user"
                    ? "#7c3aed"
                    : "#1e293b",
                padding: "15px",
                borderRadius: "12px",
                maxWidth: "70%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              background: "#1e293b",
              padding: "15px",
              borderRadius: "12px",
              width: "fit-content",
            }}
          >
            🤖 Nova is typing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #374151",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask Nova anything..."
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#7c3aed",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}