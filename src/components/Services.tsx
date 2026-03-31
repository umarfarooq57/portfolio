"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Smartphone,
  Brain,
  Cloud,
  Zap,
  Database,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Application Development",
    desc: "We craft high-performance web apps with modern frameworks — scalable, secure, and built for growth.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.2)",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile solutions that deliver seamless experiences on iOS and Android.",
    color: "from-purple-500 to-pink-500",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    desc: "From predictive models to voice AI — we integrate intelligent systems that automate and optimize.",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.2)",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Infrastructure",
    desc: "End-to-end CI/CD pipelines, containerization, and cloud architecture for maximum uptime and speed.",
    color: "from-indigo-500 to-blue-600",
    glow: "rgba(99,102,241,0.2)",
  },
  {
    icon: Zap,
    title: "Business Automation Systems",
    desc: "We eliminate manual workflows with intelligent automation, saving time and reducing operational costs.",
    color: "from-yellow-500 to-orange-500",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    icon: Database,
    title: "Database Design & Optimization",
    desc: "Architecting efficient, reliable databases with performance tuning for high-traffic applications.",
    color: "from-green-500 to-emerald-600",
    glow: "rgba(16,185,129,0.2)",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] orb-blue rounded-full opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">What We Build</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            End-to-End{" "}
            <span className="text-gradient">Technology Services</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base">
            From concept to deployment — we bring deep expertise across the entire technology spectrum.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                className="service-card glass-card p-7 flex flex-col gap-5 cursor-default transition-all duration-300 group"
                style={{ transitionProperty: "transform, box-shadow, border-color" }}
              >
                {/* Icon */}
                <div className="relative w-fit">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-linear-to-br ${svc.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <div
                    className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: svc.glow }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed">{svc.desc}</p>
                </div>

                {/* Bottom accent */}
                <div
                  className={`h-px bg-linear-to-r ${svc.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 mt-auto rounded-full`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
