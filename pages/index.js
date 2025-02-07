// pages/index.js
import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Car from "../components/Car";
import Environment from "../components/Environment";
import Signs from "../components/Signs";
import FollowCamera from "../components/FollowCamera";
import ControlsOverlay from "../components/ControlsOverlay";

export default function Home() {
  const carRef = useRef();

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* Suspense for async asset loading */}
        <Suspense fallback={null}>
          <Environment />
          <Car ref={carRef} />
          <Signs />
          <FollowCamera target={carRef} />
        </Suspense>
      </Canvas>
      <ControlsOverlay />
    </div>
  );
}
