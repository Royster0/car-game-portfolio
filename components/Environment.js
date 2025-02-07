// components/Environment.js
import React from "react";

const Environment = () => {
  return (
    <>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
      {/* Add more low-poly elements here */}
    </>
  );
};

export default Environment;
