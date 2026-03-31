"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Unique Job Services",
    category: "Web Platform",
    desc: "A comprehensive employment and recruitment agency platform to connect professionals with top employers. Features job boards and attendance tracking.",
    link: "https://apply.uniquejob.ca/",
    imageAlt: "Unique Job Services",
    image: "/ujs.png", // Requires user to put ujs.png in public folder
    colorClass: "from-blue-500 to-cyan-500",
  },
  {
    title: "Smart Attendance System",
    category: "Hardware & SaaS",
    desc: "Real-time biometric attendance tracker with fingerprint scanning, synced to a custom HR cloud dashboard for workforce visibility.",
    link: "https://uniquejob.ca/ui/",
    imageAlt: "Smart Attendance",
    image: "/biometric.png", // Requires user to put biometric.png in public folder
    colorClass: "from-purple-500 to-indigo-500",
  },
  {
    title: "AI Voice Cloning Engine",
    category: "AI / Voice",
    desc: "Integrated state-of-the-art TTS models for on-demand audio generation with 95% voice accuracy for content creators.",
    link: "#",
    imageAlt: "AI Voice",
    image: "https://images.unsplash.com/photo-1614064641913-6b71fe0cb5c7?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-pink-500 to-red-500",
  },
  {
    title: "eCommerce Platform",
    category: "eCommerce",
    desc: "Scalable online store handling thousands of daily orders with real-time inventory and Stripe payment integration.",
    link: "#",
    imageAlt: "eCommerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-green-500 to-emerald-500",
  },
  {
    title: "Warehouse Inventory System",
    category: "Operations",
    desc: "Centralized inventory dashboard with barcode scanning, reducing stock discrepancies by 90% and speeding up fulfillment.",
    link: "#",
    imageAlt: "Inventory",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-yellow-500 to-orange-500",
  },
  {
    title: "Bus Ticket Booking Engine",
    category: "Transport",
    desc: "Real-time seat booking system with QR code ticketing, route management, and a comprehensive admin analytics dashboard.",
    link: "#",
    imageAlt: "Bus Ticketing",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-indigo-500 to-blue-500",
  }
];

export default function Work() {
  return (
    <section id="work" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] orb-purple rounded-full opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Our Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            Explore Our <span className="text-gradient">Best Work</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            From dynamic web platforms to integrated hardware solutions, see how we deliver results that matter.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card flex flex-col group overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Area */}
              <div className="relative w-full h-52 bg-[#0a0f1c] border-b border-white/5 overflow-hidden flex items-center justify-center">
                
                {/* Dynamically load the image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.imageAlt} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                />

                {/* Hover Overlay for Live Links */}
                {project.link !== "#" && (
                  <div className="absolute inset-0 bg-[#020408]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-20">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary px-6 py-2.5 rounded-full text-sm font-bold text-white flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      View Live <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                    {project.category}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full bg-linear-to-br ${project.colorClass}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white font-poppins mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="glass-card px-8 py-4 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors border border-white/10 hover:border-white/20 hover:scale-105 active:scale-95 duration-200">
            View All Projects
          </button>
        </motion.div>

      </div>
    </section>
  );
}
