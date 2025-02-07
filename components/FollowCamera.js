import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";

const FollowCamera = ({ target }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (target.current) {
      // Define the base offset relative to the car.
      const offset = new THREE.Vector3(0, 5, 10);
      // Rotate the offset by the car's current Y rotation so the camera follows its direction.
      offset.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        target.current.rotation.y
      );
      // Calculate the desired camera position.
      const desiredPosition = target.current.position.clone().add(offset);
      // Smoothly interpolate the camera position for a smooth follow effect.
      camera.position.lerp(desiredPosition, 0.1);
      // Ensure the camera is always looking at the car.
      camera.lookAt(target.current.position);
    }
  });

  return null;
};

export default FollowCamera;
