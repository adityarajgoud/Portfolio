import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Code2, Palette, Zap, Globe, Database, Smartphone } from "lucide-react";
import { useRef, useEffect } from "react";
import { Section3D } from "./Section3D";

const skills = [
  {
    category: "Frontend",
    icon: <Code2 size={32} />,
    color: "from-electric-blue to-electric-glow",
    items: ["React", "TypeScript", "Next.js", "Three.js", "Tailwind CSS"],
  },
  {
    category: "Design",
    icon: <Palette size={32} />,
    color: "from-neon-purple to-neon-pink",
    items: ["UI/UX Design", "Figma", "3D Modeling", "Motion Graphics"],
  },
  {
    category: "Backend",
    icon: <Database size={32} />,
    color: "from-green-400 to-emerald-600",
    items: ["Node.js", "SQL", "MongoDB", "Docker"],
  },
  {
    category: "Performance",
    icon: <Zap size={32} />,
    color: "from-yellow-400 to-orange-500",
    items: [
      "Web Vitals",
      "Bundle Optimization",
      "Caching",
      "PWA",
      "Server-Side Rendering",
    ],
  },
  {
    category: "Web Technologies",
    icon: <Globe size={32} />,
    color: "from-blue-400 to-cyan-500",
    items: ["WebGL", "WebAssembly", "Service Workers", "Web APIs"],
  },
  {
    category: "Mobile",
    icon: <Smartphone size={32} />,
    color: "from-pink-400 to-rose-500",
    items: [
      "React Native",
      "Progressive Web Apps",
      "Mobile-First Design",
      "Touch Interactions",
    ],
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);
  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 relative overflow-hidden"
      style={{ y }}
    >
      {/* 3D Background Elements */}
      <Section3D className="opacity-50" />

      {/* Interactive Background Effect */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-full blur-3xl pointer-events-none"
        style={{
          x: useTransform(mouseX, [0, 1000], [-50, 50]),
          y: useTransform(mouseY, [0, 1000], [-50, 50]),
        }}
      />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for creating exceptional digital experiences
          </p>
          <div className="w-24 h-1 bg-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -15,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="bg-glass rounded-2xl p-6 border border-border hover:border-electric-blue/50 transition-all duration-500 group relative overflow-hidden backdrop-blur-xl"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Animated Background Glow */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Header with Enhanced Animation */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white shadow-lg relative`}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0, 212, 255, 0.5)",
                        "0 0 40px rgba(139, 92, 246, 0.7)",
                        "0 0 20px rgba(255, 0, 110, 0.5)",
                        "0 0 20px rgba(0, 212, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl"
                  />
                  {skill.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-heading font-semibold text-foreground"
                  whileHover={{
                    scale: 1.05,
                    color: "hsl(var(--electric-blue))",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.category}
                </motion.h3>
              </div>

              {/* Enhanced Skills List */}
              <div className="space-y-3">
                {skill.items.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -30, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + itemIndex * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      x: 10,
                      scale: 1.05,
                    }}
                    className="flex items-center space-x-3 group/item cursor-pointer"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.5,
                        rotate: 180,
                      }}
                      className="w-2 h-2 rounded-full bg-electric-blue flex-shrink-0 relative"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-2 h-2 rounded-full bg-electric-blue"
                      />
                    </motion.div>
                    <motion.span
                      className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300"
                      whileHover={{
                        textShadow: "0 0 8px hsl(var(--electric-blue))",
                      }}
                    >
                      {item}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Progress Indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.1 + 0.5,
                  ease: "easeOut",
                }}
                className="relative mt-6 h-2 bg-glass rounded-full overflow-hidden"
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(0, 212, 255, 0.5)",
                      "0 0 20px rgba(139, 92, 246, 0.7)",
                      "0 0 10px rgba(255, 0, 110, 0.5)",
                      "0 0 10px rgba(0, 212, 255, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-4 h-full bg-white/30 skew-x-12"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Tech Stack Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-heading font-semibold mb-8 text-foreground">
            Technologies I Love Working With
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "TypeScript",
              "Three.js",
              "React Native",
              "Node.js",
              "WebGL",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.15,
                  rotateY: 10,
                  boxShadow: "0 10px 30px hsl(var(--electric-blue) / 0.5)",
                  y: -5,
                }}
                className="relative px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">{tech}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
