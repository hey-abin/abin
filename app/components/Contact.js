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
    <footer id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto glass p-12 md:p-24 rounded-[3.5rem] border border-zinc-100 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 to-indigo-50 opacity-30 pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight">
                Let's <span className="text-purple-600 italic">Work</span> Together.
              </h2>
              <p className="text-lg text-zinc-500 font-medium">
                Got a project in mind? Let's connect and build something 
                extraordinary. I'm always open to new opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4 text-xl font-bold text-zinc-900 hover:text-purple-600 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-zinc-100">
                  <Mail size={24} className="text-purple-500" />
                </div>
                <a href="mailto:abinkich132@gmail.com" className="text-zinc-600 hover:text-purple-600 transition-colors">
                  abinkich132@gmail.com
                </a>
              </div>
              <div className="flex gap-4 pt-6">
                <a 
                  href="https://github.com/hey-abin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 hover:bg-zinc-50 hover:scale-110 transition-all font-bold text-zinc-900 flex items-center gap-2"
                >
                  <GithubIcon size={20} /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/abinkj2005" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 hover:bg-zinc-50 hover:scale-110 transition-all font-bold text-zinc-900 flex items-center gap-2"
                >
                  <LinkedinIcon size={20} /> LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8 shadow-3xl"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              <p className="text-zinc-400 text-sm">I'll get back to you as soon as possible.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-500 outline-none focus:border-purple-500 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-500 outline-none focus:border-purple-500 transition-all"
                />
                <textarea 
                  placeholder="Tell me about your project" 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-500 outline-none focus:border-purple-500 transition-all resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 px-8 bg-purple-600 text-white rounded-2xl font-black text-lg hover:bg-purple-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400 font-medium text-sm">
          <p>© 2026 ABIN KJ. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-purple-600 transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-purple-600 transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
