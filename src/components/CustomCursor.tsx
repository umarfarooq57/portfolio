"use client";

import type { Transition } from "framer-motion";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "link" | "text";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Aura — slow, dreamy follow
  const auraX = useSpring(mouseX, { damping: 18, stiffness: 100, mass: 0.8 });
  const auraY = useSpring(mouseY, { damping: 18, stiffness: 100, mass: 0.8 });

  // Dot — near-instant
  const dotX = useSpring(mouseX, { damping: 38, stiffness: 480, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 38, stiffness: 480, mass: 0.2 });

  useEffect(() => {
    setMounted(true);

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], [data-cursor='link']")) {
        setVariant("link");
      } else if (
        t.closest("p, h1, h2, h3, h4, h5, h6, span, label, [data-cursor='text']")
      ) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  const snap: Transition = { type: "spring", damping: 22, stiffness: 300, mass: 0.4 };

  // Aura sizes
  const auraSize =
    variant === "link" ? 80 : variant === "text" ? 30 : 56;
  const auraColor =
    variant === "link"
      ? "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)"
      : "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)";

  // Dot config
  const dotW = variant === "link" ? 10 : variant === "text" ? 2.5 : 5;
  const dotH = variant === "link" ? 10 : variant === "text" ? 22 : 5;
  const dotRadius = variant === "text" ? "2px" : "50%";
  const dotBg =
    variant === "link"
      ? "rgba(167,139,250,1)"
      : "rgba(147,197,253,1)";
  const dotGlow =
    variant === "link"
      ? "0 0 12px rgba(139,92,246,0.9), 0 0 28px rgba(139,92,246,0.4)"
      : variant === "text"
      ? "0 0 6px rgba(96,165,250,0.9)"
      : "0 0 8px rgba(147,197,253,0.9), 0 0 22px rgba(59,130,246,0.35)";

  return (
    <>
      {/* Soft blurred aura — no border, no circle */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99997,
          borderRadius: "50%",
          filter: "blur(14px)",
          background: auraColor,
        }}
        animate={{ width: auraSize, height: auraSize }}
        transition={snap}
      />

      {/* Core glowing dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99999,
          borderRadius: dotRadius,
          background: dotBg,
          boxShadow: dotGlow,
        }}
        animate={{
          width: dotW,
          height: dotH,
          borderRadius: dotRadius,
          opacity: 1,
        }}
        transition={snap}
      >
        {/* Blinking only in text mode */}
        {variant === "text" && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "inherit",
            }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </>
  );
}
