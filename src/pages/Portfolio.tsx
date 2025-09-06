import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Portfolio = () => {
  // Temporarily disable smooth scroll to fix crash
  // useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-glass">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Creative Developer. Powered by caffeine, code, and chaos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
