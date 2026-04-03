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

  // Initialize and load history
  useEffect(() => {
    const saved = localStorage.getItem("umardev_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      resetChat();
    }
  }, []);

  // Save history on changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("umardev_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  const resetChat = () => {
    setMessages([
        {
          id: "1",
          type: "bot",
          text: "Hey there! 👋 Welcome to UmarDev. I'm here to help you explore what we build, book a call, or send us a message. [SHOW_SERVICES]",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
    ]);
  };

  const clearChat = () => {
    localStorage.removeItem("umardev_chat_history");
    resetChat();
  };

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
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
    <div className={`w-full h-full flex flex-col overflow-hidden relative z-[99999] backdrop-blur-[60px] bg-[#0D0F16]/95`}>
      {/* Premium Header */}
      <div className="p-6 md:p-8 bg-linear-to-b from-white/10 to-transparent border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-white/20">
              <Sparkles size={28} className="text-white brightness-125" />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0D0F16]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-poppins tracking-tight flex items-center gap-2">
              UmarDev AI 
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-500/30 font-black uppercase tracking-[2px]">Pro Agent</span>
            </h3>
            <p className="text-xs text-white/40 font-bold tracking-[2px] uppercase mt-0.5">Ready to help</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Action: Clear History */}
          <button 
            onClick={clearChat} 
            className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/30 hover:text-white border border-transparent hover:border-white/10"
            title="Clear History"
          >
            <Trash2 size={20} />
          </button>
          
          {/* Action: Maximize/Minimize */}
          <button 
            onClick={toggleMaximize} 
            className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/30 hover:text-white border border-transparent hover:border-white/10"
            title={isMaximized ? "Minimize" : "Full Screen"}
          >
            {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          
          {/* Action: Close */}
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/30 hover:text-red-400 border border-transparent hover:border-white/10"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col gap-10 scroll-smooth bg-linear-to-b from-transparent via-transparent to-blue-500/5"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.type === "bot" && (
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-blue-500/5">
                    <Bot size={20} className="text-blue-500" />
                  </div>
                )}
                <div className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div className={`p-5 rounded-[26px] text-[15px] leading-relaxed border shadow-2xl ${
                    msg.type === "user" 
                      ? "bg-linear-to-tr from-blue-600 to-indigo-700 text-white rounded-tr-none border-white/10" 
                      : "bg-[#1A1D26] border-white/10 text-white/90 rounded-tl-none font-medium"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.timestamp && (
                    <span className="text-[10px] text-white/20 mt-2 font-black uppercase tracking-[3px]">{msg.timestamp}</span>
                  )}
                </div>
              </motion.div>

              {/* Professional Quick Buttons (Farooxium Style) */}
              {msg.trigger && !isTyping && (
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`grid gap-3 ${isMaximized ? "grid-cols-2 ml-14" : "ml-14"}`}
                >
                    {msg.trigger === "[SHOW_SERVICES]" && (
                        <>
                            {[
                                { text: "What services does UmarDev offer?", icon: <Globe size={16} /> },
                                { text: "📅 Book a free consultation", icon: <CheckCircle2 size={16} /> },
                                { text: "📩 Send a message", icon: <Mail size={16} /> },
                                { text: "Can I see some past projects?", icon: <Sparkle size={16} /> }
                            ].map((opt) => (
                                <motion.button
                                    key={opt.text}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(59, 130, 246, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSendMessage(opt.text, true)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/10 text-blue-400 group transition-all text-left text-[14px] font-bold"
                                >
                                    <span className="group-hover:text-white transition-colors">{opt.text}</span>
                                    <div className="text-white/20 group-hover:text-blue-500 transition-colors">
                                        {opt.icon}
                                    </div>
                                </motion.button>
                            ))}
                        </>
                    )}

                    {msg.trigger === "[SHOW_BUDGETS]" && (
                        <div className="flex flex-wrap gap-3">
                            {["Under $500", "$500 - $1.5k", "$1.5k - $5k", "$5k+", "Let's Discuss"].map(opt => (
                                <motion.button
                                    key={opt}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                    onClick={() => handleSendMessage(opt, true)}
                                    className="px-6 py-3 rounded-full bg-white/3 border border-white/8 text-[11px] font-black text-blue-400 hover:text-white uppercase tracking-widest transition-all"
                                >
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
          <div className="flex items-center gap-4 text-white/20">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/5 flex items-center justify-center animate-pulse">
              <Bot size={20} />
            </div>
            <div className="flex gap-2 p-5 bg-white/5 rounded-2xl rounded-tl-none border border-white/5 backdrop-blur-3xl shadow-xl">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area (Executive Style) */}
      <div className={`p-8 md:p-10 pt-0 flex flex-col items-center gap-6 ${isMaximized ? "max-w-[800px] w-full mx-auto" : ""}`}>
        <div className="w-full relative group flex items-center bg-[#1A1D26] border border-white/10 rounded-3xl p-1.5 focus-within:border-blue-500/50 transition-all shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
            <input
                type="text"
                placeholder="Ask me anything about UmarDev..."
                className="flex-1 bg-transparent px-7 py-5 text-[16px] text-white placeholder-white/10 focus:outline-none font-semibold leading-relaxed"
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
                className="w-14 h-14 rounded-2xl bg-blue-600/10 text-white/20 group-focus-within:text-blue-500 group-focus-within:bg-blue-600/10 hover:bg-blue-600/20 flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale"
            >
                <Send size={24} />
            </motion.button>
        </div>

        {/* Pro Footer Branding */}
        <div className="flex items-center justify-center gap-3 opacity-20 hover:opacity-100 transition-opacity cursor-default select-none pb-2">
            <div className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center">
                <Sparkle size={12} className="text-white animate-spin-slow" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[5px] text-white">UmarDev AI Assistant</span>
        </div>
      </div>
    </div>
  );
}
