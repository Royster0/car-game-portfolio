import React from "react";
import { Text } from "@react-three/drei";

const signs = [
  { title: "Experience", position: [5, 0.5, -5] },
  { title: "Projects", position: [-5, 0.5, -5] },
  { title: "Contact", position: [0, 0.5, 5] },
];

const Signs = () => {
  return (
    <>
      {signs.map((sign, idx) => (
        <mesh key={idx} position={sign.position} castShadow>
          <boxGeometry args={[1, 1, 0.2]} />
          <meshStandardMaterial color="white" />
          <Text
            position={[0, 0.7, 0.15]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {sign.title}
          </Text>
        </mesh>
      ))}
    </>
  );
};

export default Signs;
