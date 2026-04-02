"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020408]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Glow orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orb-blue rounded-full animate-pulse-glow" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.4)] border border-white/10 backdrop-blur-xl"
                style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 opacity-60 animate-pulse" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-black text-4xl tracking-tighter drop-shadow-lg z-10 font-poppins">UC</span>
              </div>
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-[-6px] rounded-3xl border-2 border-transparent"
                style={{
                  borderTopColor: "#3b82f6",
                  borderRightColor: "#8b5cf6",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-2xl font-black tracking-[0.15em] text-gradient font-poppins uppercase">
                UmarCraft
              </h1>
              <p className="text-xs text-white/40 tracking-widest mt-1 uppercase">
                Loading Experience
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
