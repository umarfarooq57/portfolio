"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, CheckCircle2, Phone, Mail, ExternalLink, Sparkles, X } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: string[];
  field?: string;
}

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi! I'm Umar Farooq project assistant. I'll help you get started. What's your name?",
      field: "name",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    budget: "",
    timeline: "",
    email: "",
    phone: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
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

  const addBotMessage = (text: string, options?: string[], field?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: "bot",
        text,
        options,
        field,
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleUserInput = (value: string) => {
    if (!value.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text: value,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    processNextStep(value);
  };

  const processNextStep = (value: string) => {
    switch (step) {
      case 1:
        setFormData((prev) => ({ ...prev, name: value }));
        setStep(2);
        addBotMessage(`Nice to meet you, ${value}! What type of project are you looking for?`, [
          "Web Development",
          "Mobile App",
          "AI / Automation",
          "UI/UX Design",
          "Other",
        ], "service");
        break;
    }
  };

  const handleOptionSelect = (option: string, field: string) => {
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text: option,
    };
    setMessages((prev) => [...prev, userMsg]);

    const newData = { ...formData, [field]: option };
    setFormData(newData);

    if (field === "service") {
      setStep(3);
      addBotMessage("Great choice! What's your estimated budget?", [
        "Under $500",
        "$500 – $1,500",
        "$1,500 – $5,000",
        "$5,000+",
        "Let's discuss",
      ], "budget");
    } else if (field === "budget") {
      setStep(4);
      addBotMessage("When do you need this completed?", [
        "ASAP (1–2 weeks)",
        "1 Month",
        "2–3 Months",
        "Flexible",
      ], "timeline");
    } else if (field === "timeline") {
      setStep(5);
      addBotMessage("Almost done! Please share your contact details so UmarDev can reach you.");
    }
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmitBooking = async () => {
    if (!formData.email || !formData.phone || !validateEmail(formData.email)) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsCompleted(true);
        setStep(6);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hi, I just submitted a project booking on UmarDev. My name is ${formData.name} and I'm interested in ${formData.service}.`);
    window.open(`https://wa.me/923470132224?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-[420px] h-[75vh] md:h-[650px] glass-card-strong shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-white/20 rounded-3xl">
      {/* Header */}
      <div className="p-5 bg-linear-to-br from-blue-600/30 via-purple-600/20 to-transparent border-b border-white/10 flex items-center justify-between backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-blue-500/20 blur-[80px]" />
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20">
              <Sparkles size={24} className="text-white animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#020408] animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-white font-poppins tracking-tight uppercase">UmarDev AI</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[2px] font-bold">Always Active</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/30 hover:text-white border border-transparent hover:border-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-6 scroll-smooth bg-linear-to-b from-transparent to-[#020408]/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`max-w-[88%] p-4 rounded-2xl text-sm leading-relaxed shadow-xl ${
                msg.type === "user" 
                  ? "bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-tr-none border border-white/10" 
                  : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none backdrop-blur-md"
              }`}>
                {msg.text}
              </div>
              
              {/* Options */}
              {msg.options && step === (msg.field === "service" ? 2 : msg.field === "budget" ? 3 : 4) && (
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {msg.options.map((opt, oIdx) => (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * oIdx }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)", borderColor: "rgba(59, 130, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOptionSelect(opt, msg.field!)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all shadow-sm"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-3 text-white/20">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center animate-pulse">
              <Bot size={14} />
            </div>
            <div className="flex gap-1.5 p-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/5">
              <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {/* Contact Form Step */}
        {step === 5 && !isCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 glass-card p-6 flex flex-col gap-4 border-blue-500/30 bg-blue-500/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type="email"
                  placeholder="Professional Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/10 transition-all shadow-inner"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="group relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Phone / WhatsApp"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/10 transition-all shadow-inner"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <button
              onClick={handleSubmitBooking}
              disabled={!formData.email || !formData.phone || !validateEmail(formData.email) || isSubmitting}
              className="w-full py-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-white text-sm font-black uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2 group relative overflow-hidden"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Booking</span>
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Success State */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-10 text-center relative"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/30 flex items-center justify-center group">
                <CheckCircle2 size={44} className="text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-green-500/20 blur-2xl animate-pulse-glow" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white mb-2 font-poppins tracking-tight">Success!</h4>
              <p className="text-white/50 text-sm leading-relaxed px-6 max-w-[320px]">
                Your request has been prioritized. UmarDev will reach out to you within <span className="text-white font-bold">24 hours</span>.
              </p>
            </div>
            <button
              onClick={openWhatsApp}
              className="mt-2 flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-[#020408] text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#25D366]/20"
            >
              <span>Instant WhatsApp</span>
              <ExternalLink size={18} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Input Area (Only for Step 1) */}
      {!isCompleted && step === 1 && (
        <div className="p-5 bg-white/2 backdrop-blur-xl border-t border-white/10 flex gap-3">
          <input
            type="text"
            placeholder="Introduce yourself..."
            className="flex-1 bg-white/5 border border-white/8 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/40 focus:bg-white/8 transition-all shadow-inner"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserInput(inputValue)}
          />
          <button
            onClick={() => handleUserInput(inputValue)}
            disabled={!inputValue.trim()}
            className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-500/20"
          >
            <Send size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
