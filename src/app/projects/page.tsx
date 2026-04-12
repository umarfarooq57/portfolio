import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import AnimatedProjectImage from "@/components/AnimatedProjectImage";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// We can extract just the ProjectsGrid part, but since this is a Server Component mapping over clients,
// we will just recreate the UI structure securely or mark as client to use framer motion.

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#020408] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] orb-blue rounded-full opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
              All <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-white/40 max-w-xl">
              A complete archive of our systems, platforms, and automated solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="glass-card flex flex-col group overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative w-full aspect-video sm:h-52 bg-[#0a0f1c] border-b border-white/5 overflow-hidden flex items-center justify-center">
                  
                  <AnimatedProjectImage 
                    image={project.image} 
                    images={project.images} 
                    alt={project.imageAlt} 
                  />
                  
                  <div className="absolute inset-0 bg-[#020408]/40" />
                  <div className="absolute inset-0 opacity-20 blur-2xl" 
                       style={{ backgroundImage: `url(${project.images?.[0] || project.image})`, backgroundSize: 'cover' }} />

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
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
