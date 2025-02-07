// components/Props.js
import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Props = () => {
  return (
    <>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[50, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Trees: Render several trees along one side */}
      {[-20, -10, 0, 10, 20].map((x, index) => (
        <group key={`tree-${index}`}>
          {/* Tree trunk */}
          <mesh position={[x, 1, -15]}>
            <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
            <meshStandardMaterial color="saddlebrown" />
          </mesh>
          {/* Tree foliage */}
          <mesh position={[x, 2.5, -15]}>
            <coneGeometry args={[1, 2, 8]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </group>
      ))}

      {/* Boxes: Place a few boxes at different positions */}
      <mesh position={[8, 0.5, 5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="tomato" />
      </mesh>
      <mesh position={[-8, 0.5, 5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <mesh position={[0, 0.5, -8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="purple" />
      </mesh>
      <mesh position={[0, 0.5, 15]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

export default Props;
