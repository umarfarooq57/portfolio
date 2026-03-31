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
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center glow-blue"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #7c3aed)" }}>
                <span className="text-white font-black text-3xl font-poppins">K</span>
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
                Kalivox
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
