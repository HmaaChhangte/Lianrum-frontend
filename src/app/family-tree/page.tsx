"use client";

import { useState, useRef, useEffect } from "react";
import { SignOutButton } from "@clerk/nextjs";

export default function FamilyTreePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Zoom + Pan
  const treeRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Drag movement
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Scroll zoom
  const handleWheel = (e) => {
    e.preventDefault();
    let newScale = scale - e.deltaY * 0.001;
    newScale = Math.min(Math.max(newScale, 0.6), 2.0);
    setScale(newScale);
  };

  useEffect(() => {
    const tree = treeRef.current;
    tree.addEventListener("wheel", handleWheel, { passive: false });
    return () => tree.removeEventListener("wheel", handleWheel);
  }, [scale]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/bg-sky.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ===========================
         TOP BAR
      ============================ */}
      <div
        style={{
          width: "100%",
          height: "70px",
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          position: "fixed",
          top: 0,
          zIndex: 50,
        }}
      >
        <h2 style={{ fontWeight: "bold", color: "#3f2b15" }}>🌸 Family Tree</h2>

        <div
          style={{
            fontSize: "30px",
            cursor: "pointer",
            padding: "5px",
          }}
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </div>
      </div>

      <div style={{ height: "80px" }} />

      {/* ===========================
         ZOOM + PAN TREE AREA
      ============================ */}
      <div
        ref={treeRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          width: "100%",
          height: "calc(100vh - 100px)",
          overflow: "hidden",
          position: "relative",
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging.current ? "none" : "transform 0.1s ease-out",
            width: "2000px",
            height: "2000px",
            position: "relative",
          }}
        >
          {/* ===== SAMPLE NODES (replace later) ===== */}
          <FamilyNode x={900} y={100} name="Grandpa" emoji="🧓" />
          <FamilyNode x={1100} y={100} name="Grandma" emoji="👵" />

          <Connector x1={960} y1={200} x2={780} y2={350} />
          <Connector x1={1140} y1={200} x2={1300} y2={350} />

          <FamilyNode x={750} y={360} name="Dad" emoji="👨" />
          <FamilyNode x={1280} y={360} name="Mom" emoji="👩" />

          <Connector x1={920} y1={460} x2={920} y2={620} />

          <FamilyNode x={850} y={630} name="You" emoji="🧒" />
        </div>
      </div>

      {/* ===========================
         FLOATING MENU
      ============================ */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.4)",
              zIndex: 99,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "140px",
              right: "20px",
              background: "#fff7e6",
              border: "4px solid #be8b5f",
              borderRadius: "20px",
              padding: "20px",
              width: "220px",
              zIndex: 1000,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <MenuItem label="🏠 Dashboard" href="/dashboard" />
            <MenuItem label="📔 Diary" href="/diary" />
            <MenuItem label="🌸 Family Tree" href="/family-tree" />

            <SignOutButton>
              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "#ff6b6b",
                  color: "white",
                  fontWeight: "bold",
                  border: "2px solid #3f2b15",
                  cursor: "pointer",
                }}
              >
                🚪 Logout
              </button>
            </SignOutButton>
          </div>
        </>
      )}
    </div>
  );
}

/* ===========================
   KAWAII NODE COMPONENT
=========================== */
function FamilyNode({ x, y, name, emoji }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        background: "#fff7e6",
        border: "4px solid #be8b5f",
        padding: "15px 20px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        animation: "floaty 3s ease-in-out infinite",
      }}
    >
      <div style={{ fontSize: "40px" }}>{emoji}</div>
      <div style={{ fontWeight: "bold", fontSize: "18px", color: "#3f2b15" }}>
        {name}
      </div>

      <style>
        {`
        @keyframes floaty {
          0% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
          100% { transform: translate(-50%, -50%) translateY(0); }
        }
        `}
      </style>
    </div>
  );
}

/* ===========================
   CONNECTOR LINES
=========================== */
function Connector({ x1, y1, x2, y2 }) {
  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0 }}
      width="2000"
      height="2000"
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#be8b5f"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ===========================
   MENU ITEM
=========================== */
function MenuItem({ label, href }) {
  return (
    <div
      onClick={() => (window.location.href = href)}
      style={{
        marginBottom: "12px",
        padding: "12px",
        border: "2px solid #3f2b15",
        borderRadius: "12px",
        background: "#d8f7a5",
        textAlign: "center",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}
