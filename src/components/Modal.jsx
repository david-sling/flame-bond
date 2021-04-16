import React from "react";

export default function Modal({ open, setOpen, children }) {
  if (!open) return <div />;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        onClick={() => setOpen(false)}
        style={{
          background: "#000000bb",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
      <div
        style={{
          width: "100vw",
          maxWidth: 700,
          height: "100vw",
          maxHeight: 500,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "#fff",
          overflow: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
}
