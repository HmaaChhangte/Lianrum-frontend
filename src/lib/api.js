// FRONTEND → BACKEND URL SELECTOR
function getAPIBase() {
  // If frontend is running on localhost → always use Render backend
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost") {
      return "https://lianrum-backend.onrender.com";
    }
  }

  // If frontend is deployed later on Vercel → also use Render backend
  return "https://lianrum-backend.onrender.com";
}

export const API_BASE = getAPIBase();
console.log("🔥 Using API Base:", API_BASE);


// NORMAL GET
export async function apiGet(path) {
  const res = await fetch(API_BASE + path);
  return res.json();
}

// NORMAL POST
export async function apiPost(path, data) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// FILE UPLOAD
export async function apiUpload(path, formData) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
