"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px", // mobile safe padding
        backgroundImage: "url('/bg-sky.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* 🐿️ SQUIRREL */}
      <img
        src="/squirrel.png"
        alt="squirrel"
        style={{
          width: "110px",
          marginBottom: "15px",
          animation: "floaty 3s ease-in-out infinite",
        }}
      />

      {/* SIGN-UP CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px", // RESPONSIVE + CENTER
        }}
      >
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card: {
                width: "100%", // FIX CARD ALIGNMENT
                borderRadius: "20px",
                border: "4px solid #be8b5f",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                padding: "20px",
                background: "#fff7e6",
              },
              formFieldInput: {
                borderRadius: "12px",
                border: "2px dashed #f3b27a",
                padding: "12px",
                fontSize: "16px",
              },
              formFieldLabel: {
                color: "#3f2b15",
                fontWeight: "bold",
              },
              formButtonPrimary: {
                backgroundColor: "#a0d74c",
                color: "#3f2b15",
                borderRadius: "12px",
                border: "2px solid #3f2b15",
                padding: "12px",
                fontWeight: "bold",
              },
              footerActionText: {
                color: "#3f2b15",
              },
            },
          }}
        />
      </div>

      <style>
        {`
          @keyframes floaty {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
