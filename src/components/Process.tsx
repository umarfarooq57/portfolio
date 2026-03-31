"use client";

import { motion } from "framer-motion";
import { Lightbulb, PenTool, Code, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    label: "Idea",
    desc: "Discovery & requirement gathering",
    color: "from-yellow-500 to-orange-400",
    num: "01",
  },
  {
    icon: PenTool,
    label: "Design",
    desc: "UI/UX prototypes & architecture",
    color: "from-pink-500 to-purple-500",
    num: "02",
  },
  {
    icon: Code,
    label: "Development",
    desc: "Agile sprints, clean code",
    color: "from-blue-500 to-cyan-500",
    num: "03",
  },
  {
    icon: Rocket,
    label: "Deployment",
    desc: "CI/CD, cloud infrastructure",
    color: "from-green-500 to-emerald-500",
    num: "04",
  },
  {
    icon: TrendingUp,
    label: "Optimization",
    desc: "Monitoring, scaling, iteration",
    color: "from-indigo-500 to-blue-400",
    num: "05",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] orb-blue rounded-full opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">How We Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            Our <span className="text-gradient">Proven Process</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            A structured, transparent workflow that turns your vision into production-ready systems.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-13 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-0.5">
            <div className="h-full process-line opacity-30 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center gap-4 group"
                >
                  {/* Step number above */}
                  <span className="text-xs font-bold text-white/20 tracking-widest">{step.num}</span>

                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-linear-to-br ${step.color} z-10 glow-blue cursor-default`}
                  >
                    <Icon size={26} className="text-white" />
                  </motion.div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base font-bold text-white font-poppins mb-1">{step.label}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
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
