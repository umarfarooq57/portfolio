"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiLinux,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
} from "react-icons/si";
import { FaBrain, FaAws } from "react-icons/fa";

const techCategories = [
  {
    label: "Frontend Development",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    label: "Backend Platform",
    color: "from-purple-500 to-indigo-400",
    shadow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    ],
  },
  {
    label: "Database & Cache",
    color: "from-orange-500 to-yellow-400",
    shadow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "from-green-500 to-emerald-400",
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    items: [
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "CI/CD", Icon: SiGithubactions, color: "#2088FF" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
    ],
  },
  {
    label: "AI & Machine Learning",
    color: "from-pink-500 to-rose-400",
    shadow: "shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    items: [
      { name: "OpenAI", Icon: SiOpenai, color: "#ffffff" },
      { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
      { name: "LangChain", Icon: FaBrain, color: "#32CD32" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-20 lg:py-32 overflow-hidden bg-[#040712]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] orb-cyan rounded-full opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Our Toolkit</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            Built With <span className="text-gradient">Industry-Leading</span> Tech
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            We use the best-in-class tools across every layer of the stack to ensure scalability, security, and performance.
          </p>
        </motion.div>

        {/* Tech grid - Modern Masonry / Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className={`glass-card p-8 flex flex-col gap-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 ${cat.shadow} ${
                // Make the last row span 2 columns nicely if there are 5 elements (3 top, 2 bottom)
                ci === 3 ? "lg:col-span-1 lg:col-start-1" : ""
              } ${
                ci === 4 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className={`w-3 h-3 rounded-full bg-linear-to-br ${cat.color} opacity-80`} />
                <h3 className="text-xl font-bold text-white font-poppins tracking-wide">
                  {cat.label}
                </h3>
              </div>

              {/* Items Grid Layout inside Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                {cat.items.map(({ name, Icon, color }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    className="tech-badge flex items-center justify-start gap-2.5 px-3 py-2.5 rounded-xl cursor-default group border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Icon
                      size={16}
                      style={{ color }}
                      className="shrink-0 group-hover:scale-110 transition-transform duration-200 opacity-90 group-hover:opacity-100"
                    />
                    <span className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors duration-200 leading-tight">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
