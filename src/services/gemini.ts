import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

let history = "";

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

- Never mention Gemini or Google.
- Never write huge paragraphs.
- Maximum 4-5 lines per paragraph.
- Use headings.
- Use bullet points.
- Use numbered steps whenever possible.
- Use emojis occasionally.
- Be motivating and friendly.
- Give concise answers.
- End every answer with one practical next step.
`;

export async function askNova(
  userName: string,
  message: string
): Promise<string> {
  try {
    const prompt = `
${SYSTEM_PROMPT}

Conversation History:

${history}

Student Name:
${userName}

Question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const reply =
      response.text ?? "Sorry, I couldn't generate a response.";

    history += `
User:
${message}

Nova:
${reply}
`;

    return reply;
  } catch (error) {
    console.error(error);

    return "⚠️ Nova is currently unavailable. Please try again in a moment.";
  }
}