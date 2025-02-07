import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if the element under the mouse has the class "game-canvas"
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element.closest(".game-canvas")) {
        setHideCursor(true);
      } else {
        setHideCursor(false);
      }
    };
    const onMouseEnterLink = () => setIsHoveringLink(true);
    const onMouseLeaveLink = () => setIsHoveringLink(false);

    document.addEventListener("mousemove", onMouseMove);
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  if (hideCursor) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: isHoveringLink ? 40 : 20,
        height: isHoveringLink ? 40 : 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s, height 0.2s, background-color 0.2s",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
