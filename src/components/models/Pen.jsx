import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { createPortal } from "react-dom";

export default function Pen(props) {
  const { scene } = useGLTF("/models/pen_1.glb"); // Load the pen model
  const penRef = useRef();
  const spotlightRef = useRef();
  const [hovered, setHovered] = useState(false);

  const [showInput, setShowInput] = useState(false); // 控制输入框显示
  const [text, setText] = useState(""); // 存储用户输入的文字

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleInputSubmit = () => {
    setShowInput(false); // 隐藏输入框
    console.log("User Input:", text); // 打印玩家输入
  };

  return (
    <>
    <primitive
      ref={penRef}
      object={scene}
      {...props}
      scale={[0.002, 0.002, 0.002]}
      rotation={[0, 0.8, 0]}
      onPointerOver={() => {
        if (penRef.current) {
          penRef.current.rotation.x += 0.1; // Rotate slightly on the X-axis
          penRef.current.position.y += 0.01;
        }
        setHovered(true)
      }}
      onPointerOut={() => {
        if (penRef.current) {
          penRef.current.rotation.x -= 0.1; // Reset rotation
          penRef.current.position.y -= 0.01;
        }
        setHovered(false)
      }}
      onPointerDown={() => setShowInput(true)} // 点击笔时显示输入框
    />

    {/* Spotlight */}
    {hovered && (
      <spotLight
        ref={spotlightRef}
        position={[0, 0.5,4.2]} // Position the spotlight above and in front
        angle={0.2} // Narrow the beam angle for focus
        penumbra={0.5} // Soft edge for the light
        intensity={0.3} // Light intensity
        color="#FFD700" // Warm yellow color for the spotlight
        castShadow
        target={penRef.current} // Focus the spotlight on the pen
      />
    )}
    {/* 输入框 */}
    {showInput && (
        <Html>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <textarea
            style={{
              width: "300px",
              height: "100px",
              resize: "none",
            }}
            value={text}
            onChange={handleInputChange}
          />
          <button
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={handleInputSubmit}
          >
            Submit
          </button>
        </div>
        </Html>
      )}
    </>
  );
}
