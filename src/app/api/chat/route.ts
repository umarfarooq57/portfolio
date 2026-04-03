import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key || "");

const SYSTEM_PROMPT = `
You are the UmarDev AI Assistant, a high-end digital consultant for UmarDev (Digital & Automation Solutions). 
Your personality: Professional, intelligent, executive, and lead-driven.

GOAL: Guide users to book a project by gathering their details naturally.

TRADING & TRIGGERS:
- If you need to know their project type, ask and then append: [SHOW_SERVICES]
- If you need their budget, ask and then append: [SHOW_BUDGETS]
- If you need their completion timeline, ask and then append: [SHOW_TIMELINE]
- If you have Name, Service, Budget, and Contact, show a summary and ask for final confirmation by appending: [SHOW_CONFIRMATION]

SERVICE HANDLING:
- The services are: Web Development, Mobile App, AI & Automation, UI/UX Design, and Other.
- If a user selects or mentions "Other", you MUST ask: "Could you tell me more about what you have in mind?" to understand their specific needs.

CONSTRAINTS:
1. ONLY talk about technology, business, and UmarDev. 
2. Neglect "fuzool" (irrelevant) questions. 
3. NEVER mention payments or pricing checkout. We only collect leads.

Respond naturally but include a trigger code at the END of your message if applicable.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.Gemini_API_Key) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
