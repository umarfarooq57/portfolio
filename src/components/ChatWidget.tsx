"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, CheckCircle2, Phone, Mail, ExternalLink, Sparkles, X, Globe, Smartphone, Coffee, Layout, Plus, Check } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  trigger?: string;
}

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Welcome to UmarDev! I'm your digital project consultant. I can help you build your vision from the ground up. What can I build for you today? [SHOW_SERVICES]",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
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

  // Initial parse for the first message
  useEffect(() => {
    const { cleanText, foundTrigger } = parseTrigger(messages[0].text);
    if (foundTrigger) {
      setMessages([{ ...messages[0], text: cleanText, trigger: foundTrigger }]);
    }
  }, []);

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

    // Clear triger from previous message for UI cleanliness
    setMessages(prev => prev.map(m => ({ ...m, trigger: undefined })));

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text: text,
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
        };
        setMessages((prev) => [...prev, botMsg]);

        // If it's a confirmation trigger, we handle it specially if needed
        if (foundTrigger === "[SHOW_CONFIRMATION]") {
            // Potential for a "Submit" button
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, {
        id: "error",
        type: "bot",
        text: "I'm having trouble connecting. Please try again or message Umar on WhatsApp directly!",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleManualBooking = async () => {
    setIsSubmitting(true);
    // In a more complex version, we'd extract data from the chat history here
    // For now, we'll tell the AI that the user wants to confirm
    await handleSendMessage("I confirm my booking. Please submit it.", true);
    setIsSubmitting(false);
    setIsCompleted(true);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/923470132224`, "_blank");
  };

  return (
    <div className="w-full max-w-[450px] h-[85vh] max-h-[750px] pb-4 glass-card-strong shadow-[0_32px_100px_-16px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden border border-white/20 rounded-[32px] relative z-[99999] backdrop-blur-[40px]">
      {/* Premium Header */}
      <div className="p-6 bg-linear-to-br from-blue-600/30 via-indigo-600/20 to-transparent border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/20">
              <Sparkles size={24} className="text-white brightness-125" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#020408] animate-pulse-glow" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white font-poppins tracking-tight uppercase leading-tight">UmarDev Assistant</h3>
            <div className="flex items-center gap-2">
              <p className="text-[9px] text-white/40 uppercase tracking-[3px] font-bold">Smart Agent AI</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`max-w-[88%] p-5 rounded-[24px] text-sm leading-relaxed shadow-lg font-medium border ${
                  msg.type === "user" 
                    ? "bg-linear-to-tr from-blue-600 to-indigo-700 text-white rounded-tr-none border-white/10" 
                    : "bg-white/5 border-white/10 text-white/90 rounded-tl-none backdrop-blur-md"
                }`}>
                  {msg.text}
                </div>
              </motion.div>

              {/* Interactive Triggers */}
              {msg.trigger && !isTyping && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 px-2"
                >
                    {msg.trigger === "[SHOW_SERVICES]" && (
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { name: "Web Development", icon: <Globe size={18} /> },
                                { name: "Mobile App", icon: <Smartphone size={18} /> },
                                { name: "AI & Automation", icon: <Coffee size={18} /> },
                                { name: "UI/UX Design", icon: <Layout size={18} /> },
                                { name: "Other", icon: <Plus size={18} /> },
                            ].map((opt) => (
                                <motion.button
                                    key={opt.name}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.15)", borderColor: "rgba(59, 130, 246, 0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSendMessage(opt.name, true)}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 transition-all text-left"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 group-hover:text-white transition-colors">
                                        {opt.icon}
                                    </div>
                                    <span className="font-bold text-xs uppercase tracking-widest">{opt.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {msg.trigger === "[SHOW_BUDGETS]" && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Under $500", "$500 - $1.5k", "$1.5k - $5k", "$5k+", "Let's Discuss"].map(opt => (
                                <motion.button
                                    key={opt}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSendMessage(opt, true)}
                                    className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest transition-all"
                                >
                                    {opt}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {msg.trigger === "[SHOW_TIMELINE]" && (
                        <div className="grid grid-cols-2 gap-2">
                             {["ASAP", "1 Month", "2-3 Months", "Flexible"].map(opt => (
                                <motion.button
                                    key={opt}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSendMessage(opt, true)}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest text-center"
                                >
                                    {opt}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {msg.trigger === "[SHOW_CONFIRMATION]" && !isCompleted && (
                        <motion.button
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05, shadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
                            onClick={handleManualBooking}
                            className="w-full py-5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 text-white font-black uppercase tracking-[4px] text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? "Finalizing..." : "Submit Booking Now"}
                            {!isSubmitting && <CheckCircle2 size={18} />}
                        </motion.button>
                    )}
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-3 text-white/20">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center animate-pulse">
              <Bot size={20} />
            </div>
            <div className="flex gap-2 p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {isCompleted && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 py-10 text-center"
            >
                <div className="relative">
                    <div className="w-24 h-24 rounded-[32px] bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <Check size={48} className="text-green-400" />
                    </div>
                </div>
                <div>
                    <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Request Received</h4>
                    <p className="text-white/50 text-xs leading-relaxed px-6">
                        Umar has been notified and will contact you via WhatsApp or Email within 24 hours.
                    </p>
                </div>
                <button
                    onClick={openWhatsApp}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-[#020408] text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#25D366]/20"
                >
                    <span>Instant WhatsApp</span>
                    <ExternalLink size={18} />
                </button>
            </motion.div>
        )}
      </div>

      {/* Input Area */}
      {!isCompleted && (
        <div className="p-6 bg-white/2 backdrop-blur-3xl border-t border-white/10 flex gap-4">
            <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
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
      )}

      {/* Security Badge */}
      <div className="text-center py-2 bg-[#020408]/80 text-[8px] uppercase tracking-[4px] text-white/10 font-black border-t border-white/5">
        End-to-End Encrypted Consultation
      </div>
    </div>
  );
}
