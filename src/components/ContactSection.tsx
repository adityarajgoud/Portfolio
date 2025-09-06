import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";

const socialLinks = [
  {
    icon: <Github size={24} />,
    href: "https://github.com/adityarajgoud",
    label: "GitHub",
  },
  {
    icon: <Linkedin size={24} />,
    href: "https://www.linkedin.com/in/adityaraj-singh-goud-063656245/",
    label: "LinkedIn",
  },
  {
    icon: <Mail size={24} />,
    href: "mailto:adityagoud930@gmail.com",
    label: "Email",
  },
];

const contactDetails = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "adityagoud930@gmail.com",
    href: "mailto:adityagoud930@gmail.com",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+91 9301674546",
    href: "tel:+919301674546",
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Indore, India",
    href: "#",
  },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const FORMSPREE_URL = "https://formspree.io/f/mdkldwry"; // Your Formspree URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 3000); // Message stays for 3 seconds
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Let's Create Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss how we can create
            something extraordinary.
          </p>
          <div className="w-24 h-1 bg-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-6 text-foreground">
                Get In Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always excited to collaborate on innovative projects and
                explore new creative possibilities. Whether you have a specific
                vision or just want to discuss ideas, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactDetails.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("#") ? "_self" : "_blank"}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-glass rounded-lg border border-border hover:border-electric-blue/50 transition-all duration-300"
                >
                  <div className="text-electric-blue">{item.icon}</div>
                  <div>
                    <div className="font-medium text-foreground">
                      {item.label}
                    </div>
                    <div className="text-muted-foreground">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <h4 className="font-heading font-semibold mb-4 text-foreground">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-glass rounded-lg border border-border hover:border-electric-blue/50 text-muted-foreground hover:text-electric-blue transition-all duration-300 hover:shadow-glow"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-glass rounded-2xl p-8 border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["name", "email"].map((field, i) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-300 text-foreground"
                      placeholder={
                        field === "email" ? "your@email.com" : "Your name"
                      }
                      required
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-300 text-foreground resize-none"
                  placeholder="Got a message ? Write  here..."
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <span>Sending...</span>
                ) : isSent ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
