"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

const skills = [
  { name: "Frontend Architecture", icon: Layout, color: "from-blue-600 to-cyan-500", items: ["React 18", "Next.js 14/15", "Tailwind CSS v4", "Three.js"] },
  { name: "Backend Systems", icon: Database, color: "from-purple-600 to-indigo-500", items: ["Node.js", "Python", "GoLang", "MERN Stack"] },
  { name: "Database Engineering", icon: Server, color: "from-pink-600 to-rose-500", items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"] },
  { name: "DevOps & Cloud", icon: Zap, color: "from-orange-600 to-amber-500", items: ["Vercel", "Git/Action", "Docker", "AWS Essentials"] },
  { name: "Programming Core", icon: Code2, color: "from-emerald-600 to-teal-500", items: ["Modern JS/TS", "Python 3", "Java", "C/C++"] },
  { name: "Software Design", icon: Layers, color: "from-indigo-600 to-blue-500", items: ["RESTful APIs", "System Design", "UI/UX", "Agile"] },
];

function SkillCard({ skill, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="p-8 glass rounded-3xl border border-zinc-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-purple-200 h-full flex flex-col gap-6"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} p-3 text-white shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
          <skill.icon size={28} />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-zinc-900 group-hover:text-purple-600 transition-colors">{skill.name}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span 
                key={item} 
                className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-sm text-zinc-600 font-medium hover:bg-purple-50 hover:text-purple-600 hover:border-purple-100 transition-colors cursor-default"
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
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-zinc-900"
          >
            Technical <span className="text-purple-600">Arsenal</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 font-medium max-w-2xl mx-auto"
          >
            A curated list of technologies I use to build scalable, high-performance, and beautiful web applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
