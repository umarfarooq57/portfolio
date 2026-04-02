"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const easeOut: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 2.4, duration: 0.7, ease: easeOut },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Glow orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] orb-blue rounded-full animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] orb-purple rounded-full animate-pulse-glow pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] orb-cyan rounded-full animate-pulse-glow pointer-events-none" />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-32 right-[15%] w-64 h-64 rounded-3xl border border-blue-500/10"
        animate={{ rotate: [0, 8, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "rgba(59, 130, 246, 0.03)" }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-40 h-40 rounded-2xl border border-purple-500/10"
        animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "rgba(139, 92, 246, 0.04)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 glass-card text-xs font-semibold text-blue-400 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Full-Service Technology Solutions
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight font-poppins mb-6"
        >
          <span className="text-white">UmarCraft</span>
          <br />
          <span className="text-gradient">Complete Digital</span>
          <br />
          <span className="text-white/90">&amp; Automation</span>{" "}
          <span className="text-gradient">Solutions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          We build scalable web, mobile, AI, and DevOps systems for modern businesses —
          from idea to deployment and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="btn-primary px-8 py-4 rounded-2xl text-base font-semibold text-white inline-flex items-center gap-2.5 min-w-[170px] justify-center"
          >
            <span>Get Started</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            href="#work"
            className="btn-secondary px-8 py-4 rounded-2xl text-base font-semibold text-white/80 inline-flex items-center gap-2.5 min-w-[170px] justify-center"
          >
            <Play size={16} />
            <span>View Work</span>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "6+", label: "Service Areas" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support & Maintenance" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-black text-gradient-blue font-poppins">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#020408] to-transparent" />
    </section>
  );
}
