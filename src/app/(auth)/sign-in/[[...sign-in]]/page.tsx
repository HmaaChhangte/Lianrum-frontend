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
        padding: "20px", // mobile padding
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

      {/* 🎴 CENTERED SIGN-IN CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px", // FIX FOR MOBILE CENTER
        }}
      >
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card: {
                width: "100%", // responsive + center
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
