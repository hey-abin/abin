"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ExternalLink, Code2, Globe, Rocket, Github as GithubIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const Github = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    title: "Petlink Adoption",
    subtitle: "EcoSphere SAAS Integration",
    description: "A comprehensive pet adoption and listing platform designed to connect pets with loving homes seamlessly.",
    tech: ["Next.js", "Firebase", "Tailwind CSS"],
    image: "/petlink_actual.png",
    color: "from-blue-600/80 to-cyan-600/80",
    size: "md:col-span-2 md:row-span-2",
    demo: "https://petlinkk.vercel.app/",
  },
  {
    title: "Mycoco Pet Game",
    description: "A high-end 3D pet care game built with Three.js for an immersive browser-based experience.",
    tech: ["Three.js", "React Three Fiber"],
    image: "/mycoco_actual.png",
    color: "from-purple-600/80 to-indigo-600/80",
    size: "md:col-span-1 md:row-span-1",
    demo: "https://mycocopet.vercel.app/",
  },
  {
    title: "Momos Delivery",
    description: "A complete food delivery solution with real-time tracking and a modern interactive UI.",
    tech: ["React", "MongoDB", "Node.js"],
    image: "/momos_actual.png",
    color: "from-rose-600/80 to-pink-600/80",
    size: "md:col-span-1 md:row-span-1",
    demo: "https://momos-theta.vercel.app/",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(cardScroll, [0, 1], ["-15%", "15%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${project.size} perspective-1000 cursor-pointer`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="h-full rounded-[40px] border border-white/20 shadow-2xl overflow-hidden glass relative flex flex-col justify-end"
      >
        {/* Project Preview Image (Parallax Window) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ y: imgY }}
            className="absolute inset-x-0 inset-y-[-20%] w-full h-[140%]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </motion.div>
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        </div>

        {/* Content Drawer (Glass Overlay) */}
        <div 
          style={{ transform: "translateZ(75px)" }}
          className="relative z-10 p-8 glass-dark m-4 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                {project.title}
              </h3>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${project.color} text-white`}>
                <Rocket size={18} />
              </div>
            </div>
            
            <p className="text-zinc-300 text-sm font-medium leading-relaxed line-clamp-2">
              {project.description}
            </p>
 
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-zinc-300 uppercase tracking-widest">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-6 pt-4 border-t border-white/10">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-black text-white hover:text-purple-400 transition-colors uppercase tracking-[0.2em]">
                Live View <ExternalLink size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em]">
                Source <Github size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black text-purple-600 uppercase tracking-[0.4em]"
            >
              Elite Case Studies
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-[0.9] tracking-tighter"
            >
              Proven <br className="hidden md:block" /><span className="text-gradient">Portfolio</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 dark:text-zinc-400 font-medium max-w-sm text-base text-center md:text-left"
          >
            Engineering scalable systems and delightful interfaces for world-class digital applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
