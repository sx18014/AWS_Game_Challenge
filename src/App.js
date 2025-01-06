import React, { useState }from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DeskScene from "./components/scene/DeskScene";
import InputOverlay from "./components/Interface/InputOverlay";
import Paper from "./components/models/Paper";

function App() {
  const [isFloating, setIsFloating] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [text, setText] = useState("");

  const handlePaperClick = () => setIsFloating(true);
  const handleSubmit = () => {
    console.log("Submitted Text:", text);
    setIsFloating(false); // Hide overlay and reset
    setText(""); // Clear input
  };

  return (
    <div style={{ height: "100vh" }}>
      <Canvas shadows>
        <DeskScene />
        <OrbitControls />
        <Paper onPointerDown={handlePaperClick} />
        <InputOverlay
        isFloating={isFloating}
        text={text}
        setText={setText}
        handleSubmit={handleSubmit}
      />
      </Canvas>
    </div>
  );
}

export default App;
