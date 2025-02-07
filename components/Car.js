import React, { useRef, useEffect, useState, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRouter } from "next/router";
import * as THREE from "three";

const Car = forwardRef((props, ref) => {
  // Use the forwarded ref if provided; otherwise, create our own.
  const internalRef = useRef();
  const carRef = ref || internalRef;
  const router = useRouter();
  const [keys, setKeys] = useState({});
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const collisionTriggered = useRef(false);

  // --- Physics constants ---
  const ACCELERATION = 0.005; // Acceleration per frame
  const MAX_SPEED = 0.5; // Maximum forward speed
  const MAX_REVERSE_SPEED = 0.3; // Maximum reverse speed
  const COAST_DECELERATION = 0.98; // Friction when not accelerating
  const BRAKE_DECELERATION = 0.8; // Extra deceleration when braking
  const TURN_RATE = 0.03; // Rotation speed (radians per frame)
  const DRIFT_LERP_TURNING = 0.02; // Lerp factor when turning (for drift)
  const DRIFT_LERP_STRAIGHT = 0.1; // Lerp factor when going straight

  // --- Sign definitions ---
  // Make sure these positions match those in your Signs component.
  const signPositions = [
    {
      title: "Experience",
      position: new THREE.Vector3(5, 0.5, -5),
      redirect: "/experience",
    },
    {
      title: "Projects",
      position: new THREE.Vector3(-5, 0.5, -5),
      redirect: "/projects",
    },
    {
      title: "Contact",
      position: new THREE.Vector3(0, 0.5, 5),
      redirect: "/contact",
    },
  ];

  // Set up keyboard event listeners.
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

  // GSAP entrance animation on mount.
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

  // Update car movement, physics, and collision detection every frame.
  useFrame(() => {
    if (!carRef.current) return;
    const car = carRef.current;

    // Determine the car's forward direction (initially facing -Z).
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotation.y);

    // --- Handle turning ---
    let isTurning = false;
    if (keys["a"]) {
      car.rotation.y += TURN_RATE;
      isTurning = true;
    }
    if (keys["d"]) {
      car.rotation.y -= TURN_RATE;
      isTurning = true;
    }

    // --- Handle acceleration and reverse ---
    if (keys["w"]) {
      // Accelerate forward.
      velocityRef.current.add(forward.clone().multiplyScalar(ACCELERATION));
      if (velocityRef.current.length() > MAX_SPEED) {
        velocityRef.current.setLength(MAX_SPEED);
      }
    } else if (keys["s"]) {
      // Accelerate in reverse.
      velocityRef.current.add(forward.clone().multiplyScalar(-ACCELERATION));
      if (velocityRef.current.length() > MAX_REVERSE_SPEED) {
        velocityRef.current.setLength(MAX_REVERSE_SPEED);
      }
    } else {
      // Apply natural friction when not accelerating.
      velocityRef.current.multiplyScalar(COAST_DECELERATION);
    }

    // --- Handle braking ---
    if (keys[" "]) {
      velocityRef.current.multiplyScalar(BRAKE_DECELERATION);
    }

    // --- Drift effect ---
    // Desired velocity is the current speed in the direction the car is facing.
    const desiredVelocity = forward
      .clone()
      .setLength(velocityRef.current.length());
    const driftLerpFactor = isTurning
      ? DRIFT_LERP_TURNING
      : DRIFT_LERP_STRAIGHT;
    velocityRef.current.lerp(desiredVelocity, driftLerpFactor);

    // Update the car's position based on its velocity.
    car.position.add(velocityRef.current);

    // --- Sign collision detection ---
    // Only trigger one redirect per collision.
    if (!collisionTriggered.current) {
      const collisionThreshold = 1; // Adjust as needed
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
