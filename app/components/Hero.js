"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, useEffect } from "react";

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Scroll Parallax Values
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const bgTextY2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = clientX / innerWidth - 0.5;
      const yPct = clientY / innerHeight - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
    >
      <motion.div
        style={{ 
          y: translateY, 
          scale, 
          opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 space-y-6"
      >
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block"
        >
          <span className="px-5 py-2.5 rounded-full glass border border-purple-100 text-purple-600 text-xs font-black uppercase tracking-[0.3em] shadow-sm">
            Engineering Digital Excellence
          </span>
        </motion.div>

        <motion.h1
          style={{ transform: "translateZ(100px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-7xl md:text-[10rem] font-black text-zinc-900 tracking-tighter drop-shadow-2xl leading-[0.8]"
        >
          ABIN <span className="text-gradient">KJ</span>
        </motion.h1>

        <motion.p
          style={{ transform: "translateZ(75px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed"
        >
          Senior Full Stack Engineer specializing in architecting **high-performance** 
          ecosystems with React, Next.js, and robust cloud infrastructures.
        </motion.p>

        <motion.div
          style={{ transform: "translateZ(50px)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-10"
        >
          <a
            href="#projects"
            className="px-12 py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="/abinkj.pdf"
            target="_blank"
            className="px-12 py-5 glass text-zinc-900 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-50/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-zinc-200"
          >
            Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]), rotate: 45 }}
        className="absolute top-1/4 left-10 w-24 h-24 glass rounded-3xl opacity-10"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]), rotate: -12 }}
        className="absolute bottom-1/4 right-10 w-32 h-32 glass rounded-full opacity-10"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-3 rounded-full glass border border-zinc-100 text-zinc-400 shadow-lg"
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>

      {/* Background Text Parallax Layer 1 */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[30vw] font-black text-zinc-900 rotate-12 whitespace-nowrap">
          DEVELOPER • DESIGNER • AGENT
        </span>
      </motion.div>

      {/* Background Text Parallax Layer 2 */}
      <motion.div
        style={{ y: bgTextY2 }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[20vw] font-black text-zinc-900 -rotate-12 whitespace-nowrap translate-x-1/4">
          REACTJS • NEXTJS • THREEJS
        </span>
      </motion.div>
    </section>
  );
}
