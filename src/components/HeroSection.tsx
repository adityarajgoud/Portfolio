import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3D } from "./Hero3D";
import { HeroDiamond } from "./Hero/HeroDiamond";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export const HeroSection = () => {
  useGSAPAnimations();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pb-12 md:pb-20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-darker-surface/80 via-background/90 to-dark-surface/80 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          {/* Diamond */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center mb-2 md:mb-4"
          >
            <HeroDiamond />
          </motion.div>

          {/* Hero Title */}
          <motion.h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-bold">
            <motion.span
              className="block text-foreground"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Fullstack
            </motion.span>
            <motion.span
              className="block gradient-text text-glow"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Developer
            </motion.span>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1.5 md:h-2 bg-gradient-primary rounded-full transform origin-left mt-2 md:mt-4"
            />
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hero-subtitle"
          >
            <motion.p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hey, it's Adityaraj Singh Goud here — a Full Stack Developer with
              a strong foundation in both front-end and back-end technologies.
              Passionate about building scalable, user-centric web applications
              that solve real-world problems. Proficient in modern frameworks,
              cloud platforms, and agile development practices. Driven by
              continuous learning, clean code, and impactful digital
              experiences.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap w-full max-w-md mx-auto"
          >
            <Button
              size="lg"
              className="pulse-element group w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500 hover:scale-105 hover:shadow-glow transform"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="float-element w-full sm:w-auto border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-electric-blue"
        >
          <ArrowRight size={24} className="rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
};
