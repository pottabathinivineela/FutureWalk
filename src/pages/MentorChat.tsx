import { useState, useRef, useEffect } from "react";
import { askNova } from "../services/gemini";

import ChatHeader from "../components/ChatHeader";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";
import SuggestionChips from "../components/SuggestionChips";

type Message = {
  sender: "user" | "nova";
  text: string;
};

export default function MentorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "nova",
      text:
        "👋 Hello!\n\nI'm Nova, your personal AI mentor.\nAsk me anything about careers, AI, coding, resumes, internships, startups or hackathons.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto Scroll Reference
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(customMessage?: string) {
    const message = customMessage ?? question;

    if (!message.trim()) return;

    setQuestion("");

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    setLoading(true);

    try {
      const reply = await askNova("Vineela", message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "nova",
          text: reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "nova",
          text:
            "Sorry, I couldn't generate a response right now.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0f172a",
      }}
    >
      <ChatHeader />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "30px",
        }}
      >
        <SuggestionChips
          onSelect={(text) => sendMessage(text)}
        />

        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}

        {loading && <TypingIndicator />}

        {/* Auto Scroll Target */}
        <div ref={bottomRef}></div>
      </div>

      <ChatInput
        value={question}
        onChange={setQuestion}
        onSend={() => sendMessage()}
      />
    </div>
  );
}