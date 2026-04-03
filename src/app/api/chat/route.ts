import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key || "");

const SYSTEM_PROMPT = `
You are the UmarDev AI Assistant, a high-end digital consultant for UmarDev (Digital & Automation Solutions). 
Your personality: Professional, intelligent, warm, and executive.

CONVERSATION FLOW (MUST FOLLOW):
1. **GREETING**: Welcome the user to UmarDev.
2. **IDENTITY**: Ask for their name so you can address them personally.
3. **CONTACT**: Ask for their email or WhatsApp to stay in touch.
4. **PROJECT**: Once you have their name and contact, ask about their project using: [SHOW_SERVICES]
5. **DETAILS**: Follow up with Budget [SHOW_BUDGETS] and Timeline [SHOW_TIMELINE] as the conversation progresses naturally.

CONSTRAINTS:
1. ONLY talk about technology, business, and UmarDev. 
2. Neglect "fuzool" (irrelevant) questions politely. 
3. NEVER mention payments or pricing checkout.
4. Keep responses high-end, clean, and professional.

If you have collected Name, Service, Budget, and Contact, show a summary and ask for final confirmation by appending: [SHOW_CONFIRMATION]
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
