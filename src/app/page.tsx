"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/bg-sky.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* FLOATING SQUIRREL */}
      <img
        src="/squirrel.png"
        alt="squirrel"
        style={{
          width: "180px",
          marginBottom: "10px",
          animation: "floaty 3s ease-in-out infinite",
        }}
      />

      {/* TITLE */}
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 900,
          color: "#3f2b15",
          marginBottom: "5px",
          textShadow: "2px 2px #ffffffaa",
        }}
      >
        Welcome to Lianrum!
      </h1>

      {/* SUBTEXT */}
      <p
        style={{
          fontSize: "22px",
          color: "#3f2b15",
          opacity: 0.9,
          marginBottom: "40px",
        }}
      >
        Join our family & start your journey 🧸✨
      </p>

      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
          href="/sign-in"
          className="cute-btn"
        >
          Sign In
        </Link>

        <Link
          href="/sign-up"
          className="cute-btn orange-btn"
        >
          Sign Up
        </Link>
      </div>

      {/* CSS ANIMATIONS & BUTTON STYLE */}
      <style>
        {`
        .cute-btn {
          background: #a0d74c;
          padding: 16px 32px;
          border-radius: 16px;
          font-weight: bold;
          border: 3px solid #3f2b15;
          color: #3f2b15;
          font-size: 20px;
          transition: 0.15s;
          text-decoration: none;
          box-shadow: 3px 3px 0px #3f2b15;
        }

        .cute-btn:hover {
          transform: translateY(-4px);
          box-shadow: 5px 5px 0px #3f2b15;
        }

        .cute-btn:active {
          transform: scale(0.95);
        }

        .orange-btn {
          background: #ffc977;
        }

        @keyframes floaty {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}
