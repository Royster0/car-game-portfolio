import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Linkedin,
  Mail,
  ChevronDown,
  ExternalLink,
  FileText,
} from "lucide-react";

const Gradient = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <motion.div className="fixed inset-0 -z-10" style={{ y: backgroundY }}>
      {/* Main gradients container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First gradient blob */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(56, 189, 248, 0.7) 0%, rgba(49, 46, 129, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at center, rgba(236, 72, 153, 0.7) 0%, rgba(49, 46, 129, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at center, rgba(56, 189, 248, 0.7) 0%, rgba(49, 46, 129, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
            ],
            transform: [
              "translate(0%, 0%) scale(2)",
              "translate(50%, 50%) scale(2.5)",
              "translate(0%, 0%) scale(2)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: "blur(40px)",
          }}
        />

        {/* Second gradient blob */}
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(236, 72, 153, 0.7) 0%, rgba(49, 46, 129, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at center, rgba(56, 189, 248, 0.7) 0%, rgba(49, 46, 129, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at center, rgba(236, 72, 153, 0.7) 0%, rgba(49, 46, 129, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
            ],
            transform: [
              "translate(0%, 0%) scale(2)",
              "translate(-50%, -50%) scale(2.5)",
              "translate(0%, 0%) scale(2)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7.5,
          }}
          style={{
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Background color and additional overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900" />
    </motion.div>
  );
};

const ScrollDots = () => {
  const sections = ["hero", "about", "experience", "projects", "contact"];
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.a
          key={section}
          href={`#${section}`}
          className="block w-3 h-3 rounded-full bg-white/50 relative"
          animate={{
            scale: activeSection === section ? 1.5 : 1,
            backgroundColor:
              activeSection === section
                ? "rgba(255, 255, 255, 1)"
                : "rgba(255, 255, 255, 0.5)",
          }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <span className="absolute right-full mr-4 text-sm text-white/80 whitespace-nowrap opacity-0 transition-opacity hover:opacity-100">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

// Section wrapper
const Section = ({ children, id, className = "" }) => {
  return (
    <motion.section
      id={id}
      className={`min-h-screen flex items-center justify-center snap-start ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
};

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const projects = [
    {
      title: "Project 1",
      description: "A full-stack web application built with React and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "Mobile-first e-commerce platform",
      tech: ["Next.js", "Tailwind", "Stripe"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "Real-time data visualization dashboard",
      tech: ["D3.js", "Firebase", "Material-UI"],
      link: "#",
    },
  ];

  const experience = [
    {
      company: "Tech Corp",
      role: "Senior Frontend Developer",
      period: "2022 - Present",
      description: "Led development of customer-facing applications",
    },
    {
      company: "Startup Inc",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications",
    },
  ];

  return (
    <div className="bg-gray-900 text-white cursor-none">
      <Gradient />
      <ScrollDots />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Welcome
            </motion.h1>
          </motion.div>
        ) : (
          <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
            <Section id="hero" className="relative">
              <div className="text-center">
                <motion.h1
                  className="text-6xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  John Doe
                </motion.h1>
                <motion.p
                  className="text-2xl text-gray-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Full Stack Developer
                </motion.p>
              </div>
              <motion.div
                className="absolute bottom-8"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown size={32} />
              </motion.div>
            </Section>

            {/* About Section */}
            <Section id="about">
              <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-8">About Me</h2>
                <p className="text-gray-400 leading-relaxed">
                  I'm a passionate developer with 5+ years of experience
                  building modern web applications. I specialize in React,
                  Node.js, and cloud technologies, focusing on creating
                  performant and scalable solutions.
                </p>
              </div>
            </Section>

            {/* Experience Section */}
            <Section id="experience">
              <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-8">Experience</h2>
                <div className="space-y-8">
                  {experience.map((job, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-800 rounded-lg p-6 backdrop-blur-sm bg-gray-900/50"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold">{job.company}</h3>
                      <p className="text-gray-400">{job.role}</p>
                      <p className="text-gray-500 text-sm">{job.period}</p>
                      <p className="mt-2 text-gray-400">{job.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Projects Section */}
            <Section id="projects">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-8">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-800 rounded-lg p-6 backdrop-blur-sm bg-gray-900/50"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        View Project <ExternalLink className="ml-1" size={16} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact">
              <div className="max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
                <div className="flex justify-center space-x-6">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full"
                  >
                    <Linkedin />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full"
                  >
                    <Mail />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full"
                  >
                    <FileText />
                  </motion.a>
                </div>
              </div>
            </Section>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
