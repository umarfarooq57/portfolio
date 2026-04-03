"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, CheckCircle2, Phone, Mail, ExternalLink, Sparkles, X } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
}

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Welcome to UmarDev! I'm your AI project assistant. How can I help you build your next big idea today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text,
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();
      
      if (data.text) {
        const botMsg: Message = {
          id: Math.random().toString(36).substr(2, 9),
          type: "bot",
          text: data.text,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "Failed to get AI response");
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, {
        id: "error",
        type: "bot",
        text: "I'm having trouble connecting to my brain right now. Please try again or email umarfarooq5743@gmail.com directly!",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] h-[80vh] max-h-[700px] glass-card-strong shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden border border-white/20 rounded-[28px] relative z-50">
      {/* Premium Header */}
      <div className="p-6 bg-linear-to-br from-blue-600/30 via-indigo-600/20 to-transparent border-b border-white/10 flex items-center justify-between backdrop-blur-[60px]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/20">
              <Sparkles size={24} className="text-white brightness-125" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#020408] shadow-sm animate-pulse-glow" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white font-poppins tracking-tight uppercase leading-tight">UmarDev Assistant</h3>
            <div className="flex items-center gap-1.5 opacity-60">
              <span className="text-[10px] font-bold uppercase tracking-[2px]">Gemini 2.0 Pro</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white border border-transparent hover:border-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth bg-linear-to-b from-transparent to-[#020408]/50"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`max-w-[90%] p-4 rounded-[22px] text-sm leading-relaxed shadow-xl border ${
                msg.type === "user" 
                  ? "bg-linear-to-tr from-blue-600 to-indigo-700 text-white rounded-tr-none border-white/20" 
                  : "bg-white/5 border-white/10 text-white/90 rounded-tl-none backdrop-blur-md"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/20 animate-pulse border border-white/5">
              <Bot size={16} />
            </div>
            <div className="flex gap-1.5 p-4 bg-white/5 rounded-[22px] rounded-tl-none border border-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Premium Input Area */}
      <div className="p-6 bg-white/2 backdrop-blur-xl border-t border-white/10 flex gap-4">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium appearance-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
          disabled={isTyping}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim() || isTyping}
          className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-500/30 group"
        >
          <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      </div>

      {/* Security Badge */}
      <div className="text-center py-2 bg-[#020408]/80 text-[9px] uppercase tracking-[3px] text-white/20 font-black border-t border-white/5">
        Powered by UmarDev AI Engine
      </div>
    </div>
  );
}
