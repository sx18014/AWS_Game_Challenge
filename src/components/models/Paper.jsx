import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Paper({ onFloatingComplete, ...props }) {
  const { scene } = useGLTF("/models/paper.glb");
  const paperRef = useRef();
  const [isFloating, setIsFloating] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]); // Target rotation
  const [targetPosition] = useState([0, -0, 4.6]); // Target position
  const [targetRotation] = useState([0, 0, 0]); // Target rotation
  useFrame(() => {
    if (paperRef.current && isFloating) {
      const { position, rotation } = paperRef.current;

      // Smoothly approach target position
      position.y += (targetPosition[1] - position.y) * 0.1;
      position.z += (targetPosition[2] - position.z) * 0.1;

      // Smoothly approach target rotation
      rotation.x += (targetRotation[0] - rotation.x) * 0.1;
      rotation.y += (targetRotation[1] - rotation.y) * 0.1;
      rotation.z += (targetRotation[2] - rotation.z) * 0.1;

      // Check if the paper is close enough to the target position and rotation
      const positionReached =
        Math.abs(position.y - targetPosition[1]) < 0.01 &&
        Math.abs(position.z - targetPosition[2]) < 0.01;
      const rotationReached =
        Math.abs(rotation.x - targetRotation[0]) < 0.01 &&
        Math.abs(rotation.y - targetRotation[1]) < 0.01 &&
        Math.abs(rotation.z - targetRotation[2]) < 0.01;

      if (positionReached && rotationReached) {
        //onFloatingComplete(); // Notify parent component
        setIsFloating(false); // Stop further updates
      }
    }
  });

  const handleClick = () => {
    console.log("Paper clicked!");
    setIsFloating(true); // Trigger floating animation
    // setRotation([-0.5, 0, 0]); // Rotate 45° backward on X-axis
  };

  return (
    <primitive
      ref={paperRef}
      object={scene}
      {...props}
      rotation={[-1.4, 0, 0]} // Initial rotation
      onClick = {handleClick}
    />
  );
}
