"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
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
      }}
    >
      {/* 🐿️ SQUIRREL ABOVE CARD */}
      <img
        src="/squirrel.png"
        alt="squirrel"
        style={{
          width: "110px",
          marginBottom: "15px",
          marginLeft: "-40px", // <-- move slightly left
          animation: "floaty 3s ease-in-out infinite",
        }}
      />

      {/* 🎴 SIGN IN CARD */}
      <div style={{ width: "420px" }}>
        <SignIn
          appearance={{
            elements: {
              card: {
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
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </div>

      {/* FLOAT ANIMATION */}
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
