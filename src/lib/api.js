"use client";

// Detect local development vs production
const isBrowser = typeof window !== "undefined";
const isLocalhost = isBrowser && (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
);

// Local backend for dev, Render backend for Vercel
export const API_BASE = isLocalhost
  ? "http://localhost:3001"
  : process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("🚀 Using API:", API_BASE);

// GET
export async function apiGet(path) {
  const res = await fetch(API_BASE + path);
  return res.json();
}

// POST
export async function apiPost(path, data) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// UPLOAD
export async function apiUpload(path, formData) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
