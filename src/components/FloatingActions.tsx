"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, MessageCircle, Sparkles, X } from "lucide-react";
import ChatWidget from "./ChatWidget";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Close or minimize when clicking outside (Esc)
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            if (isMaximized) setIsMaximized(false);
            else setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, isMaximized]);

  return (
    <div className={`fixed z-9999 flex flex-col items-end gap-5 pointer-events-none transition-all duration-500 ${
        isMaximized 
            ? "inset-0 p-4 md:p-10 justify-center items-center backdrop-blur-xl bg-black/40" 
            : "bottom-6 right-6 md:bottom-10 md:right-10"
    }`}>
      {/* Pro Chat Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMaximized ? { opacity: 0, scale: 0.9 } : { opacity: 0, scale: 0.8, y: 100, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={isMaximized ? { opacity: 0, scale: 0.9 } : { opacity: 0, scale: 0.8, y: 100 }}
            transition={{ 
              type: "spring", 
              damping: 22, 
              stiffness: 150,
              mass: 0.8
            }}
            className={`pointer-events-auto shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden rounded-[32px] ${
              isMaximized 
                ? "w-full max-w-[1000px] h-[90vh] md:h-[80vh]" 
                : "mb-4 w-[92vw] sm:w-[440px] h-[85vh] max-h-[750px]"
            }`}
          >
            <ChatWidget 
                onClose={() => {
                    setIsOpen(false);
                    setIsMaximized(false);
                }} 
                isMaximized={isMaximized}
                toggleMaximize={() => setIsMaximized(!isMaximized)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isMaximized && (
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
                        UmarDev AI
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
                        ? "bg-indigo-600/20 border border-indigo-500/40 text-blue-400" 
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
      )}
    </div>
  );
}
