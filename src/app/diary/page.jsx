"use client";
import { useState, useEffect } from "react";
import { apiGet, apiPost, apiUpload, API_BASE } from "@/lib/api";
import { SignOutButton } from "@clerk/nextjs";

export default function DiaryPage() {
  const [openEditor, setOpenEditor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    apiGet("/entries").then((data) => setEntries(data));
  }, []);

  const animateButton = (e) => {
    const btn = e.target;
    btn.classList.remove("released");
    setTimeout(() => btn.classList.add("released"), 10);
  };

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const saveMemory = async () => {
    if (!note.trim()) return alert("Write something bro 😭");

    let imageUrl = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadData = await apiUpload("/upload", formData);
      imageUrl = uploadData.imageUrl;
    }

    const newEntry = {
      note,
      image: imageUrl,
      time: new Date().toLocaleString(),
    };

    await apiPost("/entries", newEntry);

    setEntries([newEntry, ...entries]);
    setNote("");
    setImageFile(null);
    setPreview(null);
    setOpenEditor(false);
  };

  return (
    <div className="diary2-container">

      {/* 🔥 Transparent Top Bar */}
      <div className="diary-topbar">
        
        <div className="diary-topbar-title">My Family Diary</div>

        {/* 🔥 Hamburger Button */}
        <div
          className="hamburger-btn"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </div>
      </div>

      {/* Push content down */}
      <div style={{ height: "70px" }}></div>

      <div className="diary2-title">
        Chhungkaw tan thu hanhnutchhiah teh le
      </div>

      {/* Open Editor Button */}
      <button
        className="diary-image-btn kawaii-btn"
        onClick={(e) => {
          animateButton(e);
          setOpenEditor(true);
        }}
      >
        <img src="/diarybutton.png" alt="Ziak Rawh" />
      </button>

      {/* Diary Entries */}
      <div className="diary-list">
        {entries.map((item, index) => (
          <div key={index} className="diary-card">
            {item.image && <img src={item.image} className="card-img" />}

            <div className="card-note">{item.note}</div>
            <div className="card-time">{item.time}</div>

            <button
              className="delete-btn kawaii-btn"
              onClick={async (e) => {
                animateButton(e);
                const btn = e.target;
                btn.classList.add("shake");
                btn.classList.add("glow");

                setTimeout(async () => {
                  await fetch(`${API_BASE}/entries/${index}`, { method: "DELETE" });
                  setEntries(entries.filter((_, i) => i !== index));
                  btn.classList.remove("shake");
                  btn.classList.remove("glow");
                }, 350);
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 SIDE MENU */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-item kawaii-btn" onClick={() => (window.location.href = "/dashboard")}>
          🏠 Dashboard
        </div>

        <div className="menu-item kawaii-btn" onClick={() => (window.location.href = "/diary")}>
          📔 Diary
        </div>

        <div className="menu-item kawaii-btn">
          <SignOutButton>🚪 Logout</SignOutButton>
        </div>
      </div>


      {/* Editor Modal */}
      {openEditor && (
        <div className="editor-modal">
          <div className="editor-box">
            <div className="editor-title"> ✍️ Ziak Rawh </div>

            <label className="diary-label">Your Note</label>
            <textarea
              className="diary-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <label className="diary-label">Image Upload</label>
            <div className="upload-box">
              {preview ? (
                <img src={preview} className="preview-image" />
              ) : (
                <span>No image selected.</span>
              )}

              <label className="upload-btn kawaii-btn" onClick={animateButton}>
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImagePick}
                />
              </label>
            </div>

            <button
              className="save-btn kawaii-btn"
              onClick={(e) => {
                animateButton(e);
                saveMemory();
              }}
            >
              🍃 Save Memory
            </button>

            <button
              className="close-btn kawaii-btn"
              onClick={(e) => {
                animateButton(e);
                setOpenEditor(false);
              }}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
