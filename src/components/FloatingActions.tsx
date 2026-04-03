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
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto mb-4 origin-bottom-right"
          >
            <ChatWidget onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* AI Chat Button */}
        <div className="relative group">
          <AnimatePresence>
            {showTooltip === "ai" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap hidden md:block"
              >
                Book a Project
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1, translateY: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("ai")}
            onMouseLeave={() => setShowTooltip(null)}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isOpen 
                ? "bg-red-500/20 border border-red-500/40 text-red-400 rotate-90" 
                : "btn-primary text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Sparkles size={24} className="animate-pulse" />}
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
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#25D366]/20 backdrop-blur-md border border-[#25D366]/30 text-[#25D366] text-xs px-3 py-1.5 rounded-lg whitespace-nowrap hidden md:block"
              >
                Chat on WhatsApp
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href="https://wa.me/923470132224"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, translateY: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("wa")}
            onMouseLeave={() => setShowTooltip(null)}
            className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={24} />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
