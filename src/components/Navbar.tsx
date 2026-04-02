"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass py-3 shadow-2xl" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:glow-blue hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-[0_0_15px_rgba(124,58,237,0.3)] border border-white/10"
            style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 font-black text-lg tracking-tighter drop-shadow-md z-10 font-poppins">UC</span>
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
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="md:hidden nav-glass border-t border-white/5 px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            <span>Get Started</span>
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
