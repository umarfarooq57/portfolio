"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }} // Reduced delay for faster initial feel
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass py-3 shadow-2xl" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3 group z-50">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:glow-blue hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-[0_0_15px_rgba(124,58,237,0.3)] border border-white/10"
            style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-black text-lg tracking-tighter drop-shadow-md z-10 font-poppins text-white">UC</span>
          </div>
          <span className="text-white font-black text-xl tracking-wide font-poppins">
            Umar<span className="text-gradient-blue">Craft</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#contact"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
          >
            <span>Get Started</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white z-50 p-2 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={26} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={26} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[300px] bg-[#020408]/98 border-l border-white/10 z-50 md:hidden flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.6)]"
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-white/10"
                  >
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-black text-xs tracking-tighter">UC</span>
                  </div>
                  <span className="text-white font-bold text-lg font-poppins">
                    Umar<span className="text-blue-400">Craft</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-lg font-semibold text-white/70 group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Sidebar Footer (CTA) */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <Link
                  href="#contact"
                  className="btn-primary w-full py-4 rounded-xl text-base font-bold text-white text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Get Started</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
