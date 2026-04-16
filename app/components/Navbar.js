"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4 px-6 sm:px-12" : "py-8 px-6 sm:px-12"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 border border-transparent ${
          isScrolled ? "glass border-white/20 shadow-2xl scale-[1.02]" : "bg-transparent"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter"
        >
          ABIN<span className="text-purple-600">KJ.</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-black text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all uppercase tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Final CTA Area */}
        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="hidden sm:flex items-center gap-6">
            <ThemeToggle />
            <div className="flex gap-4">
              <a href="https://github.com/hey-abin" target="_blank" rel="noopener noreferrer" className="p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full transition-all">
                <GithubIcon size={20} />
              </a>
              <a href="https://www.linkedin.com/in/abinkj2005" target="_blank" rel="noopener noreferrer" className="p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full transition-all">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </motion.div>

          {/* Hire Me CTA */}
          <a
            href="/AbinkjResume.pdf"
            target="_blank"
            className="hidden md:flex px-12 py-5 glass text-zinc-900 dark:text-white rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-50/50 dark:hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 border border-zinc-200 dark:border-white/10"
          >
            Resume
          </a>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="p-2 text-zinc-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-4 glass rounded-[2rem] p-6 shadow-2xl border border-white/20 relative z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xl font-bold text-zinc-900 dark:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-4 pt-4 border-t border-zinc-100 dark:border-white/10">
                <a
                  href="/AbinkjResume.pdf"
                  target="_blank"
                  className="w-full py-4 glass text-zinc-900 dark:text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-200 dark:border-white/10 shadow-sm active:scale-95 transition-all"
                >
                  Download Resume
                </a>
                <div className="flex justify-center gap-10 pt-4">
                  <a href="https://github.com/hey-abin" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><GithubIcon size={28} /></a>
                  <a href="https://www.linkedin.com/in/abinkj2005" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><LinkedinIcon size={28} /></a>
                  <a href="mailto:abinkich132@gmail.com" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Mail size={28} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
