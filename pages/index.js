// pages/index.js
import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Car from "../components/Car";
import Environment from "../components/Environment";
import Signs from "../components/Signs";
import FollowCamera from "../components/FollowCamera";
import ControlsOverlay from "../components/ControlsOverlay";
import Course from "../components/Course";

export default function Home() {
  const carRef = useRef();

  // State to track course status and timer.
  const [courseStarted, setCourseStarted] = useState(false);
  const [courseFinished, setCourseFinished] = useState(false);
  const [courseElapsedTime, setCourseElapsedTime] = useState(0);

  // Callbacks for the course events.
  const handleCourseStart = (startTime) => {
    setCourseStarted(true);
    setCourseFinished(false);
    setCourseElapsedTime(0);
  };

  const handleCourseUpdate = (time) => {
    setCourseElapsedTime(time);
  };

  const handleCourseFinish = () => {
    setCourseFinished(true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment />
          <Car ref={carRef} />
          <Signs /> {/* Sign collisions (redirects) still work as before */}
          <Course
            carRef={carRef}
            onStart={handleCourseStart}
            onUpdate={handleCourseUpdate}
            onFinish={handleCourseFinish}
          />
          <FollowCamera target={carRef} />
        </Suspense>
      </Canvas>

      {/* Overlay: Controls */}
      <ControlsOverlay />

      {/* Overlay: Course Timer */}
      {courseStarted && (
        <div className="absolute top-0 right-0 m-4 bg-white bg-opacity-80 p-2 rounded shadow">
          <p className="text-lg font-semibold">
            Timer: {courseElapsedTime.toFixed(2)} s{" "}
            {courseFinished ? "(Finished)" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
