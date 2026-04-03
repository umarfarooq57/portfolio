"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Bot, CheckCircle2, Phone, Mail, ExternalLink, 
  Sparkles, X, Globe, Smartphone, Coffee, Layout, 
  Plus, Check, Trash2, Maximize2, Sparkle, Minimize2
} from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  trigger?: string;
  timestamp?: string;
}

interface ChatWidgetProps {
  onClose: () => void;
  isMaximized: boolean;
  toggleMaximize: () => void;
}

export default function ChatWidget({ onClose, isMaximized, toggleMaximize }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Parse triggers from text
  const parseTrigger = (text: string) => {
    const triggers = ["[SHOW_SERVICES]", "[SHOW_BUDGETS]", "[SHOW_TIMELINE]", "[SHOW_CONFIRMATION]"];
    let foundTrigger = "";
    let cleanText = text;

    triggers.forEach(t => {
      if (cleanText.includes(t)) {
        foundTrigger = t;
        cleanText = cleanText.replace(t, "").trim();
      }
    });

    return { cleanText, foundTrigger };
  };

  // Initialize and load history
  useEffect(() => {
    const saved = localStorage.getItem("umardev_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initialText = "Hey there! 👋 Welcome to UmarDev. I'm here to help you explore what we build, book a call, or send us a message. [SHOW_SERVICES]";
      const { cleanText, foundTrigger } = parseTrigger(initialText);
      setMessages([
        {
          id: "1",
          type: "bot",
          text: cleanText,
          trigger: foundTrigger || undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    }
  }, []);

  // Save history on changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("umardev_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string, isFromButton = false) => {
    if (!text.trim() || (isTyping && !isFromButton)) return;

    // Clear active trigger
    setMessages(prev => prev.map(m => ({ ...m, trigger: undefined })));

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMsg]);
    if (!isFromButton) setInputValue("");
    setIsTyping(true);

    try {
      // Clean history of internal trigger tags before sending to API
      const sanitizedHistory = messages.map(m => ({
        ...m,
        text: m.text.replace(/\[SHOW_SERVICES\]|\[SHOW_BUDGETS\]|\[SHOW_TIMELINE\]|\[SHOW_CONFIRMATION\]/g, "").trim()
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...sanitizedHistory, userMsg] }),
      });

      const data = await response.json();
      
      if (data.text) {
        const { cleanText, foundTrigger } = parseTrigger(data.text);
        const botMsg: Message = {
          id: Math.random().toString(36).substr(2, 9),
          type: "bot",
          text: cleanText,
          trigger: foundTrigger || undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "No response text");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, {
        id: "error",
        type: "bot",
        text: "I'm having trouble connecting to my brain right now. Please try again or email umarfarooq5743@gmail.com directly!",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("umardev_chat_history");
    const initialText = "Hey there! 👋 Welcome to UmarDev. I'm here to help you explore what we build, book a call, or send us a message. [SHOW_SERVICES]";
    const { cleanText, foundTrigger } = parseTrigger(initialText);
    setMessages([
      {
        id: "1",
        type: "bot",
        text: cleanText,
        trigger: foundTrigger || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    ]);
  };

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden relative z-[99999] backdrop-blur-[60px] bg-[#0D0F16]/95`}>
      {/* Header Overlay (UmarDev AI) */}
      <div className="p-5 bg-linear-to-b from-white/10 to-transparent border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/20">
              <Sparkles size={24} className="text-white brightness-125" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0D0F16]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white font-poppins tracking-tight flex items-center gap-2">
              UmarDev AI 
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest leading-none">PRO Agent</span>
            </h3>
            <p className="text-[11px] text-white/40 font-semibold tracking-wide">Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearChat} className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-white/30 hover:text-white group">
            <Trash2 size={18} />
          </button>
          <button onClick={toggleMaximize} className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-white/30 hover:text-white hidden sm:flex">
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={onClose} className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-white/30 hover:text-white">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-8 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.type === "bot" && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={16} className="text-blue-400" />
                  </div>
                )}
                <div className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"} max-w-[82%]`}>
                  <div className={`p-4 rounded-[22px] text-sm leading-relaxed border ${msg.type === "user" ? "bg-linear-to-tr from-blue-600 to-indigo-700 text-white rounded-tr-none border-white/10" : "bg-[#1A1D26] border-white/10 text-white/90 rounded-tl-none"}`}>
                    {msg.text}
                  </div>
                  {msg.timestamp && <span className="text-[10px] text-white/20 mt-1.5 font-bold uppercase tracking-wider">{msg.timestamp}</span>}
                </div>
              </motion.div>

              {msg.trigger && !isTyping && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-2.5 px-11">
                    {msg.trigger === "[SHOW_SERVICES]" && (
                        <>
                            {["What services does UmarDev offer?", "📅 Book a free consultation", "📩 Send a message", "Can I see some past projects?"].map((opt) => (
                                <motion.button key={opt} whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }} whileTap={{ scale: 0.98 }} onClick={() => handleSendMessage(opt, true)} className="w-full p-3.5 rounded-2xl bg-white/3 border border-white/8 text-blue-400 hover:text-white transition-all text-left text-[13px] font-medium">
                                    {opt}
                                </motion.button>
                            ))}
                        </>
                    )}
                    {msg.trigger === "[SHOW_BUDGETS]" && (
                        <div className="flex flex-wrap gap-2">
                            {["Under $500", "$500 - $1.5k", "$1.5k - $5k", "$5k+", "Let's Discuss"].map(opt => (
                                <motion.button key={opt} whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }} onClick={() => handleSendMessage(opt, true)} className="px-4 py-2.5 rounded-full bg-white/3 border border-white/8 text-xs font-bold text-blue-400 hover:text-white transition-all">
                                    {opt}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-3 text-white/20">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center animate-pulse">
              <Bot size={16} />
            </div>
            <div className="flex gap-1.5 p-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/10">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 pt-0">
        <div className="relative group flex items-center bg-[#1A1D26] border border-white/10 rounded-2xl p-1 focus-within:border-blue-500/50 transition-all shadow-inner">
            <input type="text" placeholder="Ask me anything about UmarDev..." className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder-white/20 focus:outline-none font-medium" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)} disabled={isTyping} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} className="w-12 h-12 rounded-xl bg-blue-600/10 text-white/40 group-focus-within:text-blue-400 hover:bg-blue-600/20 flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale">
                <Send size={20} />
            </motion.button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 opacity-30 group">
            <Sparkle size={14} className="text-white group-hover:animate-spin-slow transition-all" />
            <span className="text-[10px] font-black uppercase tracking-[3px] text-white">UmarDev AI Assistant</span>
        </div>
      </div>
    </div>
  );
}
