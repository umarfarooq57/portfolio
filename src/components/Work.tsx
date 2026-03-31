"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mic, ShoppingCart, Activity } from "lucide-react";
import Link from "next/link";

const otherProjects = [
  {
    icon: Mic,
    category: "AI / Voice",
    title: "AI Voice Cloning",
    colorClass: "from-pink-500 to-red-500",
    desc: "Integrated state-of-the-art TTS models for on-demand audio generation with 95% voice accuracy.",
  },
  {
    icon: ShoppingCart,
    category: "eCommerce",
    title: "eCommerce Engine",
    colorClass: "from-emerald-500 to-green-500",
    desc: "Scalable online store handling thousands of daily orders with real-time inventory and payments.",
  },
  {
    icon: Activity,
    category: "Operations",
    title: "Inventory System",
    colorClass: "from-yellow-500 to-orange-500",
    desc: "Centralized inventory platform with barcode scanning, reducing stock errors by 90%.",
  },
];

export default function Work() {
  return (
    <section id="work" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] orb-blue rounded-full opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">Featured Case Studies</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            Live <span className="text-gradient">Production</span> Systems
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Real problems, engineered solutions, and measurable business impact delivered to production.
          </p>
        </motion.div>

        {/* --- FEATURED PROJECTS --- */}
        <div className="flex flex-col gap-32 mb-32">
          
          {/* Featured Project 1: Unique Job Services */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
               className="w-full lg:w-1/2 flex flex-col gap-6"
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <div className="flex items-center gap-3">
                 <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">Web Platform</span>
               </div>
               <h3 className="text-4xl md:text-5xl font-black text-white font-poppins">Unique Job Services</h3>
               <p className="text-white/50 text-lg leading-relaxed">
                 A comprehensive employment and recruitment agency platform based in Ontario. Designed to seamlessly connect professionals with top employers, featuring robust job boards and attendance tracking.
               </p>
               <a href="https://apply.uniquejob.ca/" target="_blank" rel="noopener noreferrer" className="btn-primary w-fit px-7 py-3.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 mt-2">
                 View Live Project <ArrowUpRight size={18} />
               </a>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 relative"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-10 bg-blue-500/20 blur-3xl -z-10 rounded-full opacity-50 block" />
              {/* 3D Container effect */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden glass-card-strong border border-white/10 shadow-2xl"
                whileHover={{ rotateY: -4, rotateX: 4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-[16/10] bg-[#0f172a] relative flex items-center justify-center overflow-hidden">
                   
                   {/* ---> USER: ADD YOUR UJS IMAGE HERE <--- */}
                   {/* Replace this div below with an <img src="/your-image-path.jpg" alt="UJS" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" /> */}
                   
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                   
                   <div className="z-20 text-center border border-white/10 px-6 py-4 rounded-xl glass-card backdrop-blur-md">
                     <p className="text-white font-semibold mb-1">Upload UJS Image</p>
                     <p className="text-white/40 text-xs">src/components/Work.tsx (Line 72)</p>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Project 2: Smart Attendance (Overlapping 3D Layout) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <motion.div 
               className="w-full lg:w-1/2 flex flex-col gap-6"
               initial={{ opacity: 0, x: 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <div className="flex items-center gap-3">
                 <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">Hardware & SaaS</span>
               </div>
               <h3 className="text-4xl md:text-5xl font-black text-white font-poppins">Smart Attendance</h3>
               <p className="text-white/50 text-lg leading-relaxed">
                 Bridging the physical and digital world. A secure biometric attendance tracker synced in real-time to a robust HR portal for instantaneous workforce visibility and management.
               </p>
               <a href="https://uniquejob.ca/ui/" target="_blank" rel="noopener noreferrer" className="w-fit px-7 py-3.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 mt-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]" style={{ background: "linear-gradient(135deg, #7e22ce, #c026d3)"}}>
                 View Device UI <ArrowUpRight size={18} />
               </a>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 relative h-[350px] md:h-[450px]"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               {/* Dashboard Image (Background) */}
               <motion.div 
                 className="absolute top-0 right-0 w-[85%] aspect-[16/10] rounded-2xl overflow-hidden glass-card shadow-2xl z-10 border border-white/5"
                 whileHover={{ y: -8, x: 8 }}
                 transition={{ type: "spring" }}
               >
                 <div className="w-full h-full bg-[#0a0f1c] flex items-center justify-center relative">
                    {/* ---> USER: ADD YOUR DASHBOARD IMAGE HERE <--- */}
                    <div className="z-20 text-center border border-white/10 px-4 py-3 rounded-xl glass-card">
                      <p className="text-white/80 text-sm font-semibold">DigiAttend Dashboard Image</p>
                    </div>
                 </div>
               </motion.div>

               {/* Biometric Device Image (Foreground Overlapping) */}
               <motion.div 
                 className="absolute bottom-0 left-0 w-[55%] aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden glass-card-strong border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 backdrop-blur-2xl"
                 whileHover={{ scale: 1.06, rotate: -3 }}
                 transition={{ type: "spring" }}
                 style={{ background: "rgba(10, 15, 30, 0.85)" }}
               >
                 <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative">
                    {/* ---> USER: ADD YOUR DEVICE FINGERPRINT IMAGE HERE <--- */}
                    <div className="z-20 border border-purple-500/30 px-4 py-3 rounded-xl bg-purple-500/10">
                      <p className="text-white text-sm font-bold mb-1">Fingerprint UI</p>
                      <p className="text-white/50 text-xs">Ya image yahan lagani ha</p>
                    </div>
                 </div>
               </motion.div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-purple-600/20 blur-[100px] -z-10 rounded-full" />
            </motion.div>
          </div>

        </div>

        {/* --- SMALLER PROJECTS GRID --- */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white font-poppins mb-10 flex items-center gap-6">
            Other Projects <div className="h-px bg-white/10 flex-1" />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card-strong p-6 flex flex-col gap-5 group hover:border-white/20 transition-all duration-300"
                >
                  {/* Small Image Placeholder */}
                  <div className="w-full h-40 rounded-xl bg-white/5 mb-2 overflow-hidden relative flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                     <span className="text-white/20 text-xs font-semibold uppercase tracking-wider">Image / Icon</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br ${project.colorClass} opacity-80`}>
                      <Icon size={14} className="text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white font-poppins">{project.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{project.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
            <button className="glass-card px-8 py-4 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors border border-white/10 hover:border-white/20">
              View All Projects
            </button>
        </motion.div>

      </div>
    </section>
  );
}
