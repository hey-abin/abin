"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Subtle Scroll Parallax for "Another Effect"
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={targetRef} className="py-32 px-6 overflow-hidden relative">
      {/* Background Decorative Layer */}
      <motion.div
        style={{ x: bgX, opacity: 0.05 }}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[40vw] font-black text-zinc-900 leading-none">ABOUT</span>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full md:w-1/2 aspect-square max-w-md mx-auto group"
        >
          {/* Professional Ambient Glow (Clean Style) */}
          <div className="absolute inset-10 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Subtle Decorative Ring (Static) */}
          <div className="absolute -inset-4 border border-zinc-100 rounded-full opacity-50" />
          
          {/* The "Curved UI" Image Presentation with Blob & Overflow */}
          <motion.div 
            style={{ y, x }}
            className="relative w-full h-full flex items-center justify-center p-8"
          >
            {/* Animated Mesh Gradient Blob (Background) */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-400 rounded-full blur-[100px] opacity-20 animate-pulse" />
            
            <div className="relative w-full h-full rounded-[60px] border border-white/20 shadow-2xl backdrop-blur-3xl bg-white/5 overflow-visible">
                {/* Internal accent shape */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-purple-600/20 to-transparent rounded-b-[60px]" />
                
                {/* Photo with Overflow and scale */}
                <div className="absolute inset-x-0 bottom-0 top-[-25%] flex items-end justify-center pointer-events-none">
                  <Image
                    src="/abin_user_final.png"
                    alt="Abin KJ"
                    width={500}
                    height={700}
                    className="w-full h-auto object-contain scale-[1.3] origin-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)] mix-blend-multiply brightness-[1.05] contrast-[1.05]"
                    priority
                  />
                </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight">
              I Build <span className="text-gradient">Premium Digital Products</span>
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed font-medium">
              Hello! I'm Abin KJ, a passionate Full Stack Developer with a deep eye for detail and design.
              I specialize in creating interactive, 3D, and high-performance web applications that provide a seamless user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 glass rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow duration-500">
              <span className="text-4xl font-black text-purple-600">32+</span>
              <p className="text-zinc-500 font-bold mt-1 uppercase tracking-wider text-xs">Projects Completed</p>
            </div>
            <div className="p-8 glass rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow duration-500">
              <span className="text-4xl font-black text-indigo-600">4+</span>
              <p className="text-zinc-500 font-bold mt-1 uppercase tracking-wider text-xs">Years Experience</p>
            </div>
          </div>

          <p className="text-zinc-600 leading-relaxed text-lg">
            My expertise spans across the entire stack, from building responsive frontends with React and Next.js, 
            to architecting backend systems with MongoDB, SQL, and various cloud platforms.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="pt-4"
          >
            <a
              href="/abinkj.pdf"
              target="_blank"
              className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center sm:inline-flex gap-3"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
