import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Car from "./Car";
import Environment from "./Environment";
import Signs from "./Signs";
import FollowCamera from "./FollowCamera";
import ControlsOverlay from "./ControlsOverlay";
import Course from "./Course";
import Props from "./Props";

export default function GameScene() {
  const carRef = useRef();
  const [courseStarted, setCourseStarted] = useState(false);
  const [courseFinished, setCourseFinished] = useState(false);
  const [courseElapsedTime, setCourseElapsedTime] = useState(0);

  const handleCourseStart = () => {
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
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment />
          <Props />
          <Car ref={carRef} />
          <Signs />
          <Course
            carRef={carRef}
            onStart={handleCourseStart}
            onUpdate={handleCourseUpdate}
            onFinish={handleCourseFinish}
          />
          <FollowCamera target={carRef} />
        </Suspense>
      </Canvas>
      <ControlsOverlay />
      {courseStarted && (
        <div className="absolute top-3 right-3 bg-stone-600 text-white bg-opacity-80 p-3 rounded-md shadow">
          <p>
            Timer:{" "}
            <span className="font-semibold">
              {courseElapsedTime.toFixed(2)} s{" "}
            </span>
            {courseFinished ? "(Finished)" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
