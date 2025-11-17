"use client";
import { useState } from "react";

export default function Home() {
  const [foxImg, setFoxImg] = useState("/fox.png");

  // 🦊 FOX HEAD TURNING ANIMATION
  const animateFox = () => {
    setFoxImg("/foxL.png");
    setTimeout(() => setFoxImg("/foxR.png"), 150);
    setTimeout(() => setFoxImg("/fox.png"), 300);
  };

  // ✨ MAIN CLICK HANDLER FOR FOX
  const handleFoxClick = () => {
    animateFox();

    const foxEl = document.getElementById("fox");
    foxEl.classList.add("fox-bounce");
    setTimeout(() => foxEl.classList.remove("fox-bounce"), 300);

    // ✨ Sparkle burst
    const spark = document.createElement("div");
    spark.className = "sparkle-burst";
    const container = document.getElementById("sparkle-container");
    container.appendChild(spark);
    setTimeout(() => spark.remove(), 500);

    // 💬 Speech bubble
    const speech = document.getElementById("speech");
    speech.innerHTML = `
      <div class="speech-bubble">
        Lianruma thlahte chibai ule
      </div>
    `;
    setTimeout(() => (speech.innerHTML = ""), 1500);
  };

  return (
    <div className="cartoon-bg">
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="phone-frame">

          {/* 🦊 FOX LOGO + SPARKLES + SPEECH */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div id="speech"></div>

              <img
                id="fox"
                src={foxImg}
                onClick={handleFoxClick}
                width="90"
                alt="Logo"
                style={{ cursor: "pointer", userSelect: "none" }}
              />

              <div id="sparkle-container"></div>
            </div>

            <h1 style={{ marginTop: 10, fontSize: 32 }}>Lianruma Thlahte</h1>
            <p style={{ marginTop: -5, opacity: 0.7 }}>
              Explore your family story
            </p>
          </div>

          {/* 🌳 FIXED: FAMILY TREE BUTTON → /family-tree */}
          <a href="/family-tree" className="image-btn">
            <img
              src="/familytreebutton.png"
              alt="Family Tree"
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "25px",
                marginBottom: "12px",
                display: "block",
              }}
            />
          </a>

          {/* 📘 CHHUNGKAW DIARY BUTTON */}
          <a href="/diary" className="image-btn">
            <img
              src="/cdiary.png"
              alt="Chhungkaw Diary"
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "25px",
                marginBottom: "12px",
                display: "block",
              }}
            />
          </a>

          {/* ➕ ADD MEMBER (coming soon?) */}

        </div>
      </div>
    </div>
  );
}
