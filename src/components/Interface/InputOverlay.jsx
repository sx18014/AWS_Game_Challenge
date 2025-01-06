import { createPortal } from "react-dom";
import { Html } from "@react-three/drei";

export default function InputOverlay({ isFloating, text, setText, handleSubmit }) {
  if (!isFloating) return null;

  return (
    <Html>
    <div
      style={{
        position: "absolute",
        top: "30%", // Adjust to match paper position
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        height: "400px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: "1px solid #ccc",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "20px",
        zIndex: 1000,
        fontFamily: "Courier New, Courier, monospace", // Paper-like font
      }}
    >
      <textarea
        style={{
          width: "100%",
          height: "300px",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          resize: "none",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
    document.body
    </Html>
  );
}
