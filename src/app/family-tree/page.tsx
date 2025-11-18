"use client";

import { useState, useRef, useEffect } from "react";
import { SignOutButton } from "@clerk/nextjs";
import MemberCard from "@/components/member-card";

export default function FamilyTreePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Zoom + Pan
  const treeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Drag movement
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
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
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    let newScale = scale - e.deltaY * 0.001;
    newScale = Math.min(Math.max(newScale, 0.6), 2.0);
    setScale(newScale);
  };

  useEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;
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
      {/* TOP BAR */}
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
          style={{ fontSize: "30px", cursor: "pointer", padding: "5px" }}
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </div>
      </div>

      <div style={{ height: "80px" }} />

      {/* ZOOM + PAN AREA */}
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
          {/* ============ L I A N R U M A   G R A N D F A T H E R  ============ */}
          <MemberCard
            name="Lianruma Grandfather"
            photoUrl={null}
            isCouple={false}
            onAddSpouse={() =>
              alert("Add spouse for Lianruma Grandfather clicked")
            }
            onAddChild={() => {}}
            styleOverride={{ x: 900, y: 100 }}
          />
        </div>
      </div>

      {/* MENU */}
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

function MenuItem({ label, href }: { label: string; href: string }) {
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
