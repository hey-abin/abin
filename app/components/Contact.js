"use client"

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";

// Custom SVGs for missing brand icons
const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  return (
    <footer id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto glass p-8 md:p-16 rounded-[3rem] border border-zinc-100 shadow-2xl relative overflow-hidden bg-white/40 backdrop-blur-3xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/30 via-transparent to-indigo-100/30 pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-[0.9]">
                Let's <span className="text-gradient">Work</span> Together.
              </h2>
              <p className="text-lg text-zinc-500 font-medium max-w-md mx-auto lg:mx-0">
                Got a project in mind? Let's connect and build something 
                extraordinary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center lg:items-start gap-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 text-lg font-bold text-zinc-900 group">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform duration-500">
                  <Mail size={24} className="text-purple-600" />
                </div>
                <a href="mailto:abinkich132@gmail.com" className="text-zinc-600 hover:text-purple-600 transition-colors tracking-tight">
                  abinkich132@gmail.com
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <a 
                  href="https://github.com/hey-abin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-4 bg-white rounded-xl shadow-sm border border-zinc-100 hover:bg-zinc-50 hover:scale-105 transition-all font-black text-zinc-900 flex items-center gap-2.5 uppercase tracking-widest text-[9px]"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/abinkj2005" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-4 bg-white rounded-xl shadow-sm border border-zinc-100 hover:bg-zinc-50 hover:scale-105 transition-all font-black text-zinc-900 flex items-center gap-2.5 uppercase tracking-widest text-[9px]"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-dark p-6 md:p-10 rounded-[2.5rem] border border-white/10 space-y-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-zinc-900"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">Send a Message</h3>
              <p className="text-zinc-400 text-xs font-medium">I'll get back to you as soon as possible.</p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                {[
                  { placeholder: "Your Name", type: "text" },
                  { placeholder: "Email Address", type: "email" },
                ].map((input, i) => (
                  <motion.div
                    key={input.placeholder}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <input 
                      type={input.type} 
                      placeholder={input.placeholder} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-6 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                    />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <textarea 
                    placeholder="Tell me about your project" 
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-6 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none font-medium"
                  />
                </motion.div>
              </div>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="submit"
                className="w-full py-4 px-8 bg-purple-600 text-white rounded-xl font-black text-sm hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-purple-900/20 uppercase tracking-[0.2em]"
              >
                Send Message <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="mt-32 pt-12 border-t border-zinc-100/50 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-400 font-black text-[10px] tracking-[0.2em] uppercase">
          <p>© 2026 ABIN KJ. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-purple-600 transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-purple-600 transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
