import React, { useRef, useEffect, useState, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRouter } from "next/router";
import * as THREE from "three";

const Car = forwardRef((props, ref) => {
  const internalRef = useRef();
  const carRef = ref || internalRef;
  const router = useRouter();
  const [keys, setKeys] = useState({});
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const collisionTriggered = useRef(false);

  // Physics constants (acceleration, speed, etc.)
  const ACCELERATION = 0.005;
  const MAX_SPEED = 0.5;
  const MAX_REVERSE_SPEED = 0.3;
  const COAST_DECELERATION = 0.98;
  const BRAKE_DECELERATION = 0.8;
  const TURN_RATE = 0.03;
  const DRIFT_LERP_TURNING = 0.02;
  const DRIFT_LERP_STRAIGHT = 0.1;

  const signPositions = [
    {
      title: "About",
      position: new THREE.Vector3(5, 0.5, -5),
      redirect: "/portfolio?section=about",
    },
    {
      title: "Projects",
      position: new THREE.Vector3(-5, 0.5, -5),
      redirect: "/portfolio?section=projects",
    },
    {
      title: "Contact",
      position: new THREE.Vector3(0, 0.5, 5),
      redirect: "/portfolio?section=contact",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) =>
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
    const handleKeyUp = (e) =>
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (carRef.current) {
      gsap.from(carRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }
  }, [carRef]);

  useFrame(() => {
    if (!carRef.current) return;
    const car = carRef.current;
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotation.y);

    let isTurning = false;
    if (keys["a"]) {
      car.rotation.y += TURN_RATE;
      isTurning = true;
    }
    if (keys["d"]) {
      car.rotation.y -= TURN_RATE;
      isTurning = true;
    }

    if (keys["w"]) {
      velocityRef.current.add(forward.clone().multiplyScalar(ACCELERATION));
      if (velocityRef.current.length() > MAX_SPEED) {
        velocityRef.current.setLength(MAX_SPEED);
      }
    } else if (keys["s"]) {
      velocityRef.current.add(forward.clone().multiplyScalar(-ACCELERATION));
      if (velocityRef.current.length() > MAX_REVERSE_SPEED) {
        velocityRef.current.setLength(MAX_REVERSE_SPEED);
      }
    } else {
      velocityRef.current.multiplyScalar(COAST_DECELERATION);
    }

    if (keys[" "]) {
      velocityRef.current.multiplyScalar(BRAKE_DECELERATION);
    }

    const desiredVelocity = forward
      .clone()
      .setLength(velocityRef.current.length());
    const driftLerpFactor = isTurning
      ? DRIFT_LERP_TURNING
      : DRIFT_LERP_STRAIGHT;
    velocityRef.current.lerp(desiredVelocity, driftLerpFactor);
    car.position.add(velocityRef.current);

    // Collision detection for signs.
    if (!collisionTriggered.current) {
      const collisionThreshold = 1;
      for (let sign of signPositions) {
        const distance = car.position.distanceTo(sign.position);
        if (distance < collisionThreshold) {
          collisionTriggered.current = true;
          router.push(sign.redirect);
          break;
        }
      }
    }
  });

  return (
    <mesh ref={carRef} position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
});

export default Car;
