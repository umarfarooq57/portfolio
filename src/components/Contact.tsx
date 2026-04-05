"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Globe } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] orb-blue rounded-full opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Let&apos;s Work Together</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins mb-4">
            Start Your <span className="text-gradient">Next Project</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Ready to build something exceptional? Reach out and let&apos;s talk about your vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card p-8 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white font-poppins">Get In Touch</h3>

              <a
                href="mailto:umarfarooq5743@gmail.com"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Email</p>
                  <p className="text-sm font-medium">umarfarooq5743@gmail.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/umar-farooq57"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-600/10 border border-blue-600/20 group-hover:bg-blue-600/20 transition-colors">
                  <FaLinkedin size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">LinkedIn</p>
                  <p className="text-sm font-medium">linkedin.com/in/umar-farooq57</p>
                </div>
              </a>

              <a
                href="https://github.com/umarfarooq57"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <FaGithub size={18} className="text-white/70" />
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">GitHub</p>
                  <p className="text-sm font-medium">github.com/umarfarooq57</p>
                </div>
              </a>

              <a
                href="https://farooxium.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-blue-500/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Official Site</p>
                  <p className="text-sm font-medium">farooxium.dev</p>
                </div>
              </a>
            </div>

            {/* Availability badge */}
            <div className="glass-card p-5 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-sm text-white/60">
                <span className="text-white font-semibold">Available for projects.</span> We typically
                respond within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[400px]"
              >
                <CheckCircle2 size={52} className="text-green-400" />
                <h3 className="text-2xl font-bold text-white font-poppins">Message Sent!</h3>
                <p className="text-white/50 max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-200 resize-none"
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    ⚠️ {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
