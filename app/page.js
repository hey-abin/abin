import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { getProfile, getProjects } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <main className="relative min-h-screen bg-transparent">
      <Navbar profile={profile} />
      
      <div className="relative z-10">
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Skills />
        <Contact profile={profile} />
      </div>

      {/* Grid Overlay for subtle texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99]" 
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    </main>
  );
}
