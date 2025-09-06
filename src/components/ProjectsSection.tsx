import { motion } from "framer-motion";
import { Github, Eye } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Edumate Ai",
    description:
      "EduMate AI is a personalized learning and career growth platform that helps students and professionals build roadmaps, track daily tasks, and analyze resumes with AI. 🚀 It combines smart guidance with interactive tools to make skill development simple and effective.",
    image: "/edumate.png",
    tech: ["React", "OpenRouter", "TypeScript", "Framer Motion"],
    color: "from-electric-blue to-electric-glow",
    featured: true,
    links: {
      demo: "https://edumateai.netlify.app/",
      github: "https://github.com/adityarajgoud/edumate-ai-frontend",
    },
  },
  {
    id: 2,
    title: "CoinIQ",
    description:
      "Coin IQ is a real-time cryptocurrency tracking platform that provides live prices, charts, and market insights. It helps users make informed trading and investment decisions with intuitive data visualization.",
    image: "/coiniq.png",
    tech: ["Next.js", "Firebase", "Framer Motion", "MongoDB"],
    color: "from-neon-purple to-neon-pink",
    featured: false,
    links: {
      demo: "https://coiniq.netlify.app/",
      github: "https://github.com/adityarajgoud/Coiniq-frontend",
    },
  },
];

export const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Recent Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative digital experiences that push creative
            boundaries
          </p>
          <div className="w-24 h-1 bg-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative bg-glass rounded-2xl overflow-hidden border border-border hover:border-electric-blue/50 transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Hover Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    hoveredProject === project.id
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center space-x-4"
                >
                  {/* Demo Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLinkClick(project.links.demo)}
                    className="bg-glass backdrop-blur-xl border border-electric-blue/50 text-electric-blue p-3 rounded-full hover:bg-electric-blue hover:text-background transition-all duration-300"
                  >
                    <Eye size={20} />
                  </motion.button>
                  {/* GitHub Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLinkClick(project.links.github)}
                    className="bg-glass backdrop-blur-xl border border-electric-blue/50 text-electric-blue p-3 rounded-full hover:bg-electric-blue hover:text-background transition-all duration-300"
                  >
                    <Github size={20} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-electric-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + techIndex * 0.05,
                      }}
                      className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-lg text-sm font-medium border border-border"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Progress Indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className={`h-1 bg-gradient-to-r ${project.color}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
