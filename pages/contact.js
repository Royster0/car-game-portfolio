// pages/contact.js
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

export default function Contact() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-r from-pink-300 to-purple-200 flex flex-col items-center p-8"
    >
      <header className="w-full max-w-3xl mb-8">
        <motion.h1
          variants={sectionVariants}
          className="text-center text-4xl font-bold text-gray-800"
        >
          Contact
        </motion.h1>
      </header>

      <motion.div
        variants={containerVariants}
        className="w-full max-w-3xl bg-white bg-opacity-90 rounded-xl p-8 shadow-lg"
      >
        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
          <p className="mt-2 text-gray-600">youremail@example.com</p>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">LinkedIn</h2>
          <p className="mt-2 text-gray-600">
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit my LinkedIn
            </a>
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
