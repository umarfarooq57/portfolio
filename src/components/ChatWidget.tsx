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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    }, 1000);
  };

  const handleUserInput = (value: string) => {
    if (!value.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text: value,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Process step
    processNextStep(value);
  };

  const processNextStep = (value: string) => {
    switch (step) {
      case 1: // Name entered -> Ask Service
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
      
      case 5: // Email/Phone input logic (handled by custom UI mostly)
        // If they type manually in the last step
        break;
    }
  };

  const handleOptionSelect = (option: string, field: string) => {
    // Add user selection as message
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      text: option,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Update form data
    const newData = { ...formData, [field]: option };
    setFormData(newData);

    // Trigger next bot message based on current step
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
    <div className="w-[350px] md:w-[400px] h-[500px] md:h-[600px] glass-card-strong shadow-2xl flex flex-col overflow-hidden border border-white/20">
      {/* Header */}
      <div className="p-4 bg-linear-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Sparkles size={20} className="text-blue-400 group-hover:animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-poppins">Book a Project</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">UmarDev Assistant</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.type === "user" 
                ? "bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-none" 
                : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
            }`}>
              {msg.text}
            </div>
            
            {/* Options */}
            {msg.options && step === (msg.field === "service" ? 2 : msg.field === "budget" ? 3 : 4) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {msg.options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionSelect(opt, msg.field!)}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/40 text-white/70 hover:text-white transition-all"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Bot size={14} />
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {/* Contact Form Step */}
        {step === 5 && !isCompleted && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 glass-card p-4 flex flex-col gap-3 border-blue-500/20 bg-blue-500/5"
          >
            <div className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                <input
                  type="text"
                  placeholder="Phone / WhatsApp"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <button
              onClick={handleSubmitBooking}
              disabled={!formData.email || !formData.phone || !validateEmail(formData.email) || isSubmitting}
              className="w-full py-2.5 rounded-lg bg-blue-600/40 hover:bg-blue-600/60 border border-blue-500/30 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? "Processing..." : (
                <>
                  <span>Submit Booking</span>
                  <Send size={12} />
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
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Booking Submitted!</h4>
              <p className="text-white/50 text-xs leading-relaxed px-4">
                UmarDev will contact you within 24 hours. Thank you, {formData.name}!
              </p>
            </div>
            <button
              onClick={openWhatsApp}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-all group"
            >
              <span>Instant Support on WhatsApp</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Input Area (Only for Step 1) */}
      {!isCompleted && step === 1 && (
        <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
          <input
            type="text"
            placeholder="Type your name..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserInput(inputValue)}
          />
          <button
            onClick={() => handleUserInput(inputValue)}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-white flex items-center justify-center transition-all disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
