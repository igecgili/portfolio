import Hero from "@/components/Hero";
import FloatingUI from "@/components/FloatingUI";
import Hakkimda, { SkillsSection } from "@/components/Hakkimda";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Sertifikalar from "@/components/Sertifikalar";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <FloatingUI />
      <Hero />
      <Hakkimda />
      <SkillsSection />
      <Projects />
      <About />
      <Experience />
      <Sertifikalar />
      <Contact />
    </main>
  );
}
