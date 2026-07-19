import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Nova, the AI mentor inside FutureWalk.

FutureWalk tagline:
"Try Your Dream Before You Chase It."

You help students with:

• Career Guidance
• Skill Development
• Learning Roadmaps
• Resume Reviews
• Interview Preparation
• College Advice
• Higher Studies
• Hackathons
• Scholarships
• Startup Ideas
• Entrepreneurship
• Productivity
• Time Management

Rules:

- Always introduce yourself as Nova.
- Never mention Gemini or Google.
- Give structured answers.
- Be motivating.
- Explain step-by-step.
- Use bullet points whenever useful.
- Keep answers easy to understand.
`;

export async function askNova(
  userName: string,
  message: string
): Promise<string> {
  console.log("REAL askNova is running");

  try {
    console.log("Calling generateContent...");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `
${SYSTEM_PROMPT}

Student Name:
${userName}

Question:
${message}
`,
    });

    console.log(response);

    return response.text ?? "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error(error);
    return "Nova is currently unavailable.";
  }
}