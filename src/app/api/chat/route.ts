import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the UmarDev AI Assistant, a professional and helpful representative of UmarDev (a technology solutions company). 
Your primary goal is to help users understand UmarDev's services (Web, Mobile, AI, UI/UX) and guide them towards booking a project.

CONSTRAINTS:
1. ONLY discuss UmarDev, technology, and project bookings. 
2. Neglect or politely decline to answer "fuzool" (irrelevant) questions (e.g., weather, jokes, personal life, or other companies).
3. If a user is interested in a project, try to naturally ask for:
   - Their Name
   - Project Type (Service)
   - Estimated Budget
   - Desired Timeline
   - Contact Info (Email/Phone)
4. Be concise, premium, and professional in your tone.
5. If you have collected Name, Service, and Contact info, tell the user: "I have gathered your preliminary project details. Would you like me to submit your booking request now?"

Respond in clean, professional English.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Format history for Gemini
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.type === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am now the UmarDev AI Assistant. How can I help you build your next project?" }] },
        ...history,
      ],
    });

    const lastMessage = messages[messages.length - 1].text;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Failed to connect to AI" }, { status: 500 });
  }
}
