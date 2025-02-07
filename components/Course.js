import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Course = ({ carRef, onStart, onUpdate, onFinish }) => {
  // Place the course in a distinct area (e.g., top-right quadrant).
  const startZonePosition = new THREE.Vector3(8, 0.01, 8);
  const finishZonePosition = new THREE.Vector3(8, 0.01, 12);
  const zoneSize = { width: 4, depth: 4 };

  // Local flags to ensure each event fires only once.
  const [courseStarted, setCourseStarted] = useState(false);
  const [courseFinished, setCourseFinished] = useState(false);
  const [localStartTime, setLocalStartTime] = useState(null);

  useFrame(() => {
    if (!carRef.current) return;
    const carPos = carRef.current.position;

    // Check for entry into the start zone.
    if (!courseStarted) {
      if (
        Math.abs(carPos.x - startZonePosition.x) < zoneSize.width / 2 &&
        Math.abs(carPos.z - startZonePosition.z) < zoneSize.depth / 2
      ) {
        setCourseStarted(true);
        const startTime = performance.now();
        setLocalStartTime(startTime);
        onStart(startTime); // Notify parent that the course has started.
      }
    }

    // Once started (and not finished), update the timer.
    if (courseStarted && !courseFinished && localStartTime) {
      const currentTime = performance.now();
      onUpdate((currentTime - localStartTime) / 1000); // Timer in seconds.

      // Check for entry into the finish zone.
      if (
        Math.abs(carPos.x - finishZonePosition.x) < zoneSize.width / 2 &&
        Math.abs(carPos.z - finishZonePosition.z) < zoneSize.depth / 2
      ) {
        setCourseFinished(true);
        onFinish(); // Notify parent that the course is finished.
      }
    }
  });

  return (
    <>
      {/* Start Zone (displayed as a semi-transparent green plane) */}
      <mesh
        position={[startZonePosition.x, 0.05, startZonePosition.z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[zoneSize.width, zoneSize.depth]} />
        <meshBasicMaterial color="green" opacity={0.5} transparent />
      </mesh>
      {/* Finish Zone (displayed as a semi-transparent red plane) */}
      <mesh
        position={[finishZonePosition.x, 0.05, finishZonePosition.z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[zoneSize.width, zoneSize.depth]} />
        <meshBasicMaterial color="red" opacity={0.5} transparent />
      </mesh>
    </>
  );
};

export default Course;
