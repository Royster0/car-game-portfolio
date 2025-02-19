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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
