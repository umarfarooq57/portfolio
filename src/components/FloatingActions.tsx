"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-9999 flex flex-col items-end gap-5 pointer-events-none">
      <div className="flex flex-col gap-4 pointer-events-auto items-center">
        {/* Action WhatsApp */}
        <div className="relative group">
          <AnimatePresence>
            {showTooltip === "wa" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-[#020408]/40 backdrop-blur-3xl border border-white/10 text-white text-[10px] uppercase tracking-[4px] font-black px-6 py-3 rounded-full whitespace-nowrap hidden md:block shadow-[0_0_40px_rgba(37,211,102,0.3)]"
              >
                WhatsApp Us
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href="https://wa.me/923470132224"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setShowTooltip("wa")}
            onMouseLeave={() => setShowTooltip(null)}
            className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#25D366] flex items-center justify-center text-white shadow-2xl relative overflow-hidden group transition-all border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl animate-ping [animation-duration:4s]" />
            <MessageCircle size={32} className="relative z-10" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
