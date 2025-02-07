import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Course = ({ carRef, onStart, onUpdate, onFinish }) => {
  const checkpoints = [
    { position: new THREE.Vector3(20, 0.01, 20), type: "start" },
    { position: new THREE.Vector3(25, 0.01, 18), type: "checkpoint" },
    { position: new THREE.Vector3(28, 0.01, 12), type: "checkpoint" },
    { position: new THREE.Vector3(22, 0.01, 8), type: "checkpoint" },
    { position: new THREE.Vector3(18, 0.01, 10), type: "checkpoint" },
    { position: new THREE.Vector3(15, 0.01, 16), type: "checkpoint" },
    { position: new THREE.Vector3(20, 0.01, 25), type: "finish" },
  ];

  // Track the current active checkpoint index.
  const [currentIndex, setCurrentIndex] = useState(0);
  // Local start time (set when the start checkpoint is hit).
  const [localStartTime, setLocalStartTime] = useState(null);

  const collisionThreshold = 1.5;

  useFrame(() => {
    if (!carRef.current) return;
    const carPos = carRef.current.position;
    // Only process if we haven't completed the course.
    if (currentIndex < checkpoints.length) {
      const checkpoint = checkpoints[currentIndex];
      // Check collision using a simple AABB approach.
      if (
        Math.abs(carPos.x - checkpoint.position.x) < collisionThreshold &&
        Math.abs(carPos.z - checkpoint.position.z) < collisionThreshold
      ) {
        // If it's the start checkpoint and the timer hasn't been started, start it.
        if (checkpoint.type === "start" && localStartTime === null) {
          const startTime = performance.now();
          setLocalStartTime(startTime);
          onStart(startTime);
        }
        // If we're not at the final checkpoint, advance to the next one.
        if (checkpoint.type !== "finish") {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Final checkpoint reached; finish the course.
          onFinish();
          // Mark the course as finished by setting currentIndex to length.
          setCurrentIndex(checkpoints.length);
        }
      }
    }

    // Update timer only if the course has started and is not finished.
    if (localStartTime && currentIndex < checkpoints.length) {
      const currentTime = performance.now();
      onUpdate((currentTime - localStartTime) / 1000);
    }
  });

  // Render each checkpoint as a colored plane.
  return (
    <>
      {checkpoints.map((checkpoint, idx) => {
        // Choose a color based on the checkpoint type.
        let color = "blue";
        if (checkpoint.type === "start") color = "green";
        if (checkpoint.type === "finish") color = "red";
        // Highlight the current checkpoint with a higher opacity.
        const opacity = idx === currentIndex ? 0.7 : 0.3;
        return (
          <mesh
            key={`checkpoint-${idx}`}
            position={[checkpoint.position.x, 0.05, checkpoint.position.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial color={color} opacity={opacity} transparent />
          </mesh>
        );
      })}
    </>
  );
};

export default Course;
