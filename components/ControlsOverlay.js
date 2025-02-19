const ControlsOverlay = () => {
  return (
    <details className="absolute top-3 left-3 text-white bg-indigo-500 p-3 rounded-md z-10">
      <summary>Controls</summary>
      <p>W: Forward</p>
      <p>S: Backward</p>
      <p>A: Left</p>
      <p>D: Right</p>
      <p>Space: Brake</p>
    </details>
  );
};

export default ControlsOverlay;
