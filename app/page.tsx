import Hero from "@/components/Hero";
import Hakkimda, { SkillsSection } from "@/components/Hakkimda";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <Hero />
      <Hakkimda />
      <SkillsSection />
      <Projects />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
