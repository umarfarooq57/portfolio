"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, Globe } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Tech Stack", href: "/#techstack" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020408]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="#hero" className="flex items-center gap-3 w-fit group">
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
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Complete digital & automation solutions. We build the systems that power modern businesses.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:umarfarooq5743@gmail.com"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail size={14} />
                umarfarooq5743@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/umar-farooq57"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <FaLinkedin size={14} />
                linkedin.com/in/umar-farooq57
              </a>
              <a
                href="https://github.com/umarfarooq57"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <FaGithub size={14} />
                github.com/umarfarooq57
              </a>
              <a
                href="https://farooxium.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2"
              >
                <Globe size={14} />
                farooxium.dev
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} UmarCraft. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Engineered with precision. Built for scale.
          </p>
        </div>
      </div>
    </footer>
  );
}
