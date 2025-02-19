import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Update mouse
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  // TODO: Mouse hover
  useEffect(() => {
    const handleHover = () => {
      const links = document.querySelectorAll("a", "button");
      links.forEach((link) => {
        link.addEventListener("mouseEnter", () => setIsHovering(true));
        link.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  });

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none mix-blend-difference z-50"
      animate={{
        scale: isHovering ? 1.5 : 1,
        x: position.x - 16,
        y: position.y - 16,
      }}
    >
      <div className="w-full h-full bg-white rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;
