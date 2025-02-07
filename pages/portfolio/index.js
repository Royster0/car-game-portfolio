import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Portfolio() {
  const router = useRouter();
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const { section } = router.query;
    if (section) {
      if (section === "about" && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "projects" && projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "contact" && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router.query]);

  return (
    <div className="relative h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white bg-opacity-90 shadow">
        <div className="text-xl font-bold">My Portfolio</div>
        <div className="space-x-4">
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#projects" className="hover:underline">
            Projects
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
          <Link href="/" legacyBehavior>
            <a className="hover:underline">Home</a>
          </Link>
        </div>
      </nav>

      {/* Sections */}
      <section
        id="about"
        ref={aboutRef}
        className="snap-start h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500"
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl font-bold"
        >
          About Me
        </motion.div>
      </section>

      <section
        id="projects"
        ref={projectsRef}
        className="snap-start h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl font-bold"
        >
          My Projects
        </motion.div>
      </section>

      <section
        id="contact"
        ref={contactRef}
        className="snap-start h-screen flex items-center justify-center bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl font-bold"
        >
          Contact Me
        </motion.div>
      </section>
    </div>
  );
}
