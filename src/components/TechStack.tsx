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
    label: "Frontend",
    color: "from-blue-500 to-cyan-400",
    borderColor: "rgba(59,130,246,0.3)",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    label: "Backend",
    color: "from-purple-500 to-indigo-400",
    borderColor: "rgba(139,92,246,0.3)",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    ],
  },
  {
    label: "Database",
    color: "from-orange-500 to-yellow-400",
    borderColor: "rgba(245,158,11,0.3)",
    items: [
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    label: "DevOps",
    color: "from-green-500 to-emerald-400",
    borderColor: "rgba(16,185,129,0.3)",
    items: [
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "CI/CD", Icon: SiGithubactions, color: "#2088FF" },
      { name: "AWS Cloud", Icon: FaAws, color: "#FF9900" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
    ],
  },
  {
    label: "AI / ML",
    color: "from-pink-500 to-rose-400",
    borderColor: "rgba(236,72,153,0.3)",
    items: [
      { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
      { name: "OpenAI", Icon: SiOpenai, color: "#ffffff" },
      { name: "LangChain", Icon: FaBrain, color: "#32CD32" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] orb-cyan rounded-full opacity-10" />

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
            We use the best-in-class tools across every layer of the stack.
          </p>
        </motion.div>

        {/* Tech grid */}
        <div className="flex flex-col gap-5">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-6 flex-col sm:flex-row">
                {/* Category label */}
                <div className="shrink-0 w-28">
                  <span
                    className={`text-sm font-bold bg-linear-to-r ${cat.color} bg-clip-text`}
                    style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {cat.label}
                  </span>
                  <div className={`mt-1.5 h-[2px] w-8 bg-linear-to-r ${cat.color} rounded-full`} />
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-3">
                  {cat.items.map(({ name, Icon, color }) => (
                    <motion.div
                      key={name}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="tech-badge flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default group"
                    >
                      <Icon
                        size={20}
                        style={{ color }}
                        className="shrink-0 group-hover:scale-110 transition-transform duration-200"
                      />
                      <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
