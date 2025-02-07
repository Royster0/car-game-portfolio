import "../styles/globals.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "../components/CustomCursor";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Opening duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-white text-4xl font-bold"
              initial={{ x: 0 }}
              animate={{ x: -50 }}
              transition={{ duration: 1 }}
            >
              Welcome to My Site
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
