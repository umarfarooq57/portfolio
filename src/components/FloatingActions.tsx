"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, MessageCircle, Sparkles, X } from "lucide-react";
import ChatWidget from "./ChatWidget";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Close chatbot when clicking outside (on the body)
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-9999 flex flex-col items-end gap-5 pointer-events-none">
      {/* Pro Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, transformOrigin: "bottom right", filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: 100, filter: "blur(20px)" }}
            transition={{ 
              type: "spring", 
              damping: 18, 
              stiffness: 120,
              mass: 0.8
            }}
            className="pointer-events-auto mb-4 w-[92vw] sm:w-[440px]"
          >
            <ChatWidget onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 pointer-events-auto items-center">
        {/* Toggle Button */}
        <div className="relative">
          <AnimatePresence>
            {showTooltip === "ai" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-[#020408]/40 backdrop-blur-3xl border border-white/10 text-white text-[10px] uppercase tracking-[4px] font-black px-6 py-3 rounded-full whitespace-nowrap hidden md:block shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                AI Assistant
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 5 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("ai")}
            onMouseLeave={() => setShowTooltip(null)}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 relative overflow-hidden group ${
              isOpen 
                ? "bg-red-500/10 border border-red-500/30 text-red-500" 
                : "bg-linear-to-tr from-blue-600 via-indigo-600 to-indigo-700 text-white border border-white/20 animate-glow-pulse"
            }`}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {isOpen ? <X size={32} /> : <Sparkles size={32} className="relative z-10" />}
          </motion.button>
        </div>

        {/* Action WhatsApp */}
        <div className="relative group">
          <motion.a
            href="https://wa.me/923470132224"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("wa")}
            onMouseLeave={() => setShowTooltip(null)}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-2xl relative overflow-hidden group transition-all"
          >
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl animate-ping [animation-duration:4s]" />
            <MessageCircle size={28} className="relative z-10" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
