"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, Code2, Cpu, Globe, Zap } from "lucide-react";
import { useRef, useEffect, Suspense } from "react";

function FloatingIcon({ icon: Icon, delay, className, color = "text-purple-600" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.2, 0.1],
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        delay, 
        ease: "easeInOut" 
      }}
      className={`absolute pointer-events-none ${className}`}
    >
      <Icon size={40} className="text-zinc-900/10 dark:text-white/10" />
    </motion.div>
  );
}

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-transparent transition-colors duration-500"
    >
      {/* Content */}
      <motion.div
        style={{ 
          y: translateY, 
          scale, 
          opacity,
          transformStyle: "preserve-3d"
        }}
        className="relative z-20 w-full max-w-4xl flex flex-col items-center gap-8 md:gap-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-100/50 dark:border-white/10 text-purple-600 dark:text-purple-400 text-[10px] md:text-sm font-black uppercase tracking-[0.3em] shadow-sm bg-white/50 dark:bg-white/5"
        >
          <Zap size={14} className="animate-pulse" />
          Engineering Digital Excellence
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-[12rem] font-black text-zinc-900 dark:text-white tracking-tighter leading-[1.1] md:leading-[0.8] whitespace-nowrap"
          >
            ABIN <span className="text-gradient">KJ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl mx-auto text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed px-4"
          >
            Senior Full Stack Engineer specializing in architecting <span className="text-zinc-900 dark:text-white font-bold">high-performance</span> ecosystems with React, Next.js, and robust cloud infrastructures.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-zinc-900/20 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Projects
          </a>
          <a
            href="/AbinkjResume.pdf"
            target="_blank"
            className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            View Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Tech Icons (Restored to subtle background decor) */}
      <FloatingIcon icon={Code2} delay={0} className="top-[15%] left-[5%]" />
      <FloatingIcon icon={Cpu} delay={1} className="top-[25%] right-[10%]" />
      <FloatingIcon icon={Globe} delay={2} className="bottom-[20%] left-[12%]" />
      <FloatingIcon icon={Zap} delay={3} className="bottom-[30%] right-[8%]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Scroll</span>
          <ArrowDown size={16} className="text-zinc-400 dark:text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
