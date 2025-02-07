import React from "react";

const ControlsOverlay = () => {
  const overlayStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "sans-serif",
    zIndex: 10,
  };

  return (
    <div style={overlayStyle}>
      <p>
        <strong>Controls:</strong>
      </p>
      <p>W: Forward</p>
      <p>S: Backward</p>
      <p>A: Left</p>
      <p>D: Right</p>
    </div>
  );
};

export default ControlsOverlay;
