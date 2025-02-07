// pages/projects.js
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-200 flex flex-col items-center p-8"
    >
      <header className="w-full max-w-3xl mb-8">
        <motion.h1
          variants={sectionVariants}
          className="text-center text-4xl font-bold text-gray-800"
        >
          Projects
        </motion.h1>
      </header>

      <motion.div
        variants={containerVariants}
        className="w-full max-w-3xl bg-white bg-opacity-90 rounded-xl p-8 shadow-lg"
      >
        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Project One</h2>
          <p className="mt-2 text-gray-600">
            A modern web application built with React and Node.js, featuring a
            responsive design and dynamic content loading.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Project Two</h2>
          <p className="mt-2 text-gray-600">
            An interactive 3D experience created with Three.js and React Three
            Fiber, showcasing real-time animations and visual effects.
          </p>
        </motion.section>
      </motion.div>

      <motion.div variants={sectionVariants} className="mt-8">
        <Link href="/" legacyBehavior>
          <a className="text-lg text-gray-800 underline">Go Back</a>
        </Link>
      </motion.div>
    </motion.div>
  );
}
