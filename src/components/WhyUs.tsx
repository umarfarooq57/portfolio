"use client";

import { motion } from "framer-motion";
import { Shield, Code2, Target, Bolt } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Scalable Architecture",
    desc: "We design systems that grow with your business — from 100 to 100,000 users without breaking a sweat.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.2)",
  },
  {
    icon: Code2,
    title: "Clean Code & Modern UI",
    desc: "Maintainable, documented code paired with interfaces that users love and competitors envy.",
    color: "from-purple-500 to-indigo-500",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    icon: Target,
    title: "Business-Oriented Solutions",
    desc: "Every line of code serves a purpose — we focus on outcomes, ROI, and solving real pain points.",
    color: "from-green-500 to-emerald-500",
    glow: "rgba(16,185,129,0.2)",
  },
  {
    icon: Bolt,
    title: "Automation & Efficiency Focus",
    desc: "We eliminate bottlenecks and manual processes, freeing your team to focus on what matters most.",
    color: "from-yellow-500 to-orange-500",
    glow: "rgba(245,158,11,0.2)",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] orb-purple rounded-full opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4">Why Partner With Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-6 leading-tight">
              We Don&apos;t Just Build,{" "}
              <span className="text-gradient">We Engineer Solutions</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8">
              UmarDev combines technical depth with a business-first mindset. We&apos;re not just
              developers — we&apos;re strategic partners invested in your success.
            </p>

            {/* Small proof points */}
            <div className="flex flex-wrap gap-3">
              {["On-Time Delivery", "Transparent Process", "Post-Launch Support", "Agile Workflow"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full glass-card"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right: cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-6 flex flex-col gap-4 service-card cursor-default transition-all duration-300"
                >
                  <div className="relative w-fit">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${r.color}`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 font-poppins">{r.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
