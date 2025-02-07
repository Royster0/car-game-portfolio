import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Course = ({ carRef, onStart, onUpdate, onFinish }) => {
  // Define the start and finish zones.
  const startZonePosition = new THREE.Vector3(5, 0.01, 5);
  const finishZonePosition = new THREE.Vector3(-5, 0.01, -5);
  const zoneSize = { width: 4, depth: 4 };

  // Local flags so we only trigger start/finish once.
  const [courseStarted, setCourseStarted] = useState(false);
  const [courseFinished, setCourseFinished] = useState(false);
  const [localStartTime, setLocalStartTime] = useState(null);

  useFrame(() => {
    if (!carRef.current) return;
    const carPos = carRef.current.position;

    // Check if the car has entered the start zone.
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

    // Once started (and not finished), update the elapsed time.
    if (courseStarted && !courseFinished && localStartTime) {
      const currentTime = performance.now();
      onUpdate((currentTime - localStartTime) / 1000); // Elapsed time in seconds.

      // Check if the car has reached the finish zone.
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
      {/* Start Zone (green translucent plane) */}
      <mesh
        position={[startZonePosition.x, 0.05, startZonePosition.z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[zoneSize.width, zoneSize.depth]} />
        <meshBasicMaterial color="green" opacity={0.5} transparent />
      </mesh>
      {/* Finish Zone (red translucent plane) */}
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
