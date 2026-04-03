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
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-9999 flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="pointer-events-auto mb-2 origin-bottom-right w-[90vw] md:w-auto"
          >
            <ChatWidget onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 pointer-events-auto items-center">
        {/* AI Chat Button */}
        <div className="relative group">
          <AnimatePresence>
            {showTooltip === "ai" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full whitespace-nowrap hidden md:block shadow-2xl"
              >
                Book a Project
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("ai")}
            onMouseLeave={() => setShowTooltip(null)}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative overflow-hidden ${
              isOpen 
                ? "bg-red-500/10 border border-red-500/40 text-red-400 rotate-90" 
                : "btn-primary text-white animate-glow-pulse"
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {isOpen ? <X size={28} /> : <Sparkles size={28} className="animate-pulse" />}
          </motion.button>
        </div>

        {/* WhatsApp Button */}
        <div className="relative group">
          <AnimatePresence>
            {showTooltip === "wa" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#25D366]/10 backdrop-blur-xl border border-[#25D366]/30 text-[#25D366] text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full whitespace-nowrap hidden md:block shadow-2xl"
              >
                Direct Contact
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href="https://wa.me/923470132224"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("wa")}
            onMouseLeave={() => setShowTooltip(null)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl shadow-[#25D366]/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full animate-ping [animation-duration:3s]" />
            <MessageCircle size={24} className="relative z-10" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
