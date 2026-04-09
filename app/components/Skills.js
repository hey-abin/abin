"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { 
  Code2, 
  Globe, 
  Database, 
  Layers, 
  Terminal, 
  Cpu, 
  Layout, 
  Braces, 
  Coffee, 
  Zap, 
  Server, 
  Flame,
  Smartphone,
  Cloud
} from "lucide-react";
import { useRef } from "react";

const skills = [
  { name: "Frontend Architecture", icon: Layout, color: "from-blue-600 to-cyan-500", items: ["React 18", "Next.js 14/15", "Tailwind CSS v4", "Three.js"] },
  { name: "Backend Systems", icon: Database, color: "from-purple-600 to-indigo-500", items: ["Node.js", "Python", "GoLang", "MERN Stack"] },
  { name: "Database Engineering", icon: Server, color: "from-pink-600 to-rose-500", items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"] },
  { name: "DevOps & Cloud", icon: Zap, color: "from-orange-600 to-amber-500", items: ["Vercel", "Git/Action", "Docker", "AWS Essentials"] },
  { name: "Programming Core", icon: Code2, color: "from-emerald-600 to-teal-500", items: ["Modern JS/TS", "Python 3", "Java", "C/C++"] },
  { name: "Software Design", icon: Layers, color: "from-indigo-600 to-blue-500", items: ["RESTful APIs", "System Design", "UI/UX", "Agile"] },
];

function SkillCard({ skill, index, scrollYProgress }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Removed translateY to keep alignment perfect

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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="p-6 md:p-10 glass rounded-[32px] border border-white/40 dark:border-white/10 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] group-hover:border-purple-200/50 dark:group-hover:border-purple-500/30 h-full flex flex-col gap-6"
      >
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] bg-gradient-to-br ${skill.color} p-3 md:p-4 text-white shadow-md flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]`}>
          <skill.icon className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors uppercase tracking-tighter">
            {skill.name}
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {skill.items.map((item) => (
              <span 
                key={item} 
                className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-white group-hover:text-zinc-900 dark:group-hover:text-white group-hover:border-purple-200 dark:group-hover:border-purple-500/50 group-hover:bg-purple-50/50 dark:group-hover:bg-purple-900/20 transition-all duration-300 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section id="skills" ref={containerRef} className="py-24 md:py-40 px-6 relative overflow-hidden">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ x: bgX, opacity: 0.02 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none whitespace-nowrap"
      >
        <span className="text-[60vw] font-black text-zinc-900 leading-none">ARSENAL</span>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-32 relative z-10">
        <div className="text-center space-y-4 md:space-y-8">
          <div className="inline-block">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="px-5 py-1.5 rounded-full glass border border-purple-100 text-purple-600 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] shadow-sm"
            >
              Industry Grade Stack
            </motion.span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter leading-[0.9]"
          >
            Technical <br className="md:hidden" /><span className="text-gradient">Arsenal</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto text-base md:text-xl leading-relaxed"
          >
            Engineering scalable systems across the digital ecosystem, from pixel-perfect frontends to robust cloud architectures.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-32 transition-all">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
