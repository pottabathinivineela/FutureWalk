import { useState } from "react";
import { askNova } from "../services/gemini";

export default function MentorChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function testAI() {
    const reply = await askNova(
      "Vineela",
      "I am a third year CSE student. Suggest a roadmap to become an AI Engineer."
    );

    console.log(reply);

    setAnswer(reply);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Nova AI Test</h1>

      <button onClick={testAI}>
        Test Gemini
      </button>

      <br />
      <br />

      <pre>{answer}</pre>
    </div>
  );
}