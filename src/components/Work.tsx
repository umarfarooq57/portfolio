"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Bus, Package, Mic, Bot } from "lucide-react";

const caseStudies = [
  {
    icon: ShoppingCart,
    category: "eCommerce",
    title: "eCommerce System",
    colorClass: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.15)",
    problem: "Client needed a scalable online store handling thousands of daily orders with real-time inventory.",
    solution: "Built a full-stack eCommerce platform with React, Node.js, and MySQL — featuring cart, payments, and admin dashboard.",
    result: "3× increase in sales velocity; 99.9% uptime during peak traffic events.",
  },
  {
    icon: Bus,
    category: "Transport",
    title: "Bus Ticket System",
    colorClass: "from-purple-500 to-indigo-500",
    glow: "rgba(139,92,246,0.15)",
    problem: "Manual ticket booking caused overbooking, revenue loss, and poor passenger experience.",
    solution: "Developed a real-time seat booking engine with QR code ticketing, route management, and payment gateway.",
    result: "Zero overbooking incidents; 40% faster booking flow; 10,000+ tickets processed.",
  },
  {
    icon: Package,
    category: "Operations",
    title: "Inventory System",
    colorClass: "from-green-500 to-emerald-500",
    glow: "rgba(16,185,129,0.15)",
    problem: "Warehouse team relied on spreadsheets causing stock discrepancies and delayed fulfillment.",
    solution: "Engineered a centralized inventory platform with barcode scanning, real-time stock alerts, and reporting dashboards.",
    result: "90% reduction in stock errors; 2× faster order fulfillment turnover.",
  },
  {
    icon: Mic,
    category: "AI / Voice",
    title: "AI Voice Cloning",
    colorClass: "from-pink-500 to-red-500",
    glow: "rgba(236,72,153,0.15)",
    problem: "Content creators needed scalable voiceover production without costly studio sessions.",
    solution: "Integrated state-of-the-art TTS/voice cloning models into a web platform for on-demand audio generation.",
    result: "95% voice accuracy; 10× content production speed; deployed to 500+ users.",
  },
  {
    icon: Bot,
    category: "Automation",
    title: "Automation Workflows",
    colorClass: "from-yellow-500 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
    problem: "Business had repetitive manual data processing consuming 40+ hours per week of team time.",
    solution: "Designed end-to-end automation pipelines using Python scripts, scheduling systems, and API integrations.",
    result: "Saved 40 hrs/week; $8K/month in operational savings; zero manual intervention required.",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] orb-purple rounded-full opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Case Studies</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            Work That <span className="text-gradient">Drives Results</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Real problems, engineered solutions, measurable business impact.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => {
            const Icon = cs.icon;
            return (
              <motion.div
                key={cs.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-strong p-7 flex flex-col gap-5 group hover:scale-[1.02] transition-all duration-300"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04)` }}
                whileHover={{ boxShadow: `0 20px 60px ${cs.glow}` }}
              >
                {/* Category + icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {cs.category}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br ${cs.colorClass}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-poppins">{cs.title}</h3>

                {/* Problem / Solution / Result */}
                <div className="flex flex-col gap-3 text-sm">
                  <div>
                    <span className="text-red-400 font-semibold text-xs uppercase tracking-wider">Problem</span>
                    <p className="text-white/50 mt-1 leading-relaxed">{cs.problem}</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold text-xs uppercase tracking-wider">Solution</span>
                    <p className="text-white/50 mt-1 leading-relaxed">{cs.solution}</p>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold text-xs uppercase tracking-wider">Result</span>
                    <p className="text-white/70 mt-1 leading-relaxed font-medium">{cs.result}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
