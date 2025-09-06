import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Section3D } from "./Section3D";

export const AboutSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* 3D Background Elements */}
      <Section3D />

      {/* Animated Background Gradients */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-neon-pink/10 to-electric-blue/10 rounded-full blur-2xl"
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
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated Background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl"
              />

              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-full overflow-hidden bg-glass border-2 border-electric-blue/30 shadow-glow"
              >
                <img
                  src="/pic.jpg"
                  alt="Profile"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    imageLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 via-transparent to-neon-purple/20" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-electric-blue rounded-full blur-sm opacity-60"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-purple rounded-full blur-sm opacity-60"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-heading font-semibold text-foreground">
              Passionate about creating
              <span className="text-electric-blue"> extraordinary</span>{" "}
              experiences
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am a Full-Stack Developer with strong proficiency in the MERN
                stack (MongoDB, Express, React, Node.js) and core programming
                languages like C, C++, and JavaScript. I am also well-versed in
                data structures and algorithms, enabling efficient
                problem-solving and optimized solutions.
              </p>

              <p>
                My journey began with a fascination for how technology can tell
                stories and evoke emotions. Today, I specialize in creating
                immersive web experiences that push the boundaries of what's
                possible in a browser.
              </p>

              <p>
                I have hands-on experience building scalable web applications,
                developing responsive user interfaces, and creating robust
                backend APIs. My approach focuses on writing clean, maintainable
                code while delivering functional and user-friendly digital
                experiences.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: "7+", label: "Projects" },
                { number: "2+", label: "Years" },
                { number: "100%", label: "Passion" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-heading font-bold text-electric-blue">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
