import { useState, useEffect, useRef } from "react";

// ── QR Code generator using qrcode.js CDN (no npm package) ──────────────────
// We use a script tag injection approach — zero npm deps

function QRModal({ title, url, onClose }) {
  const canvasRef = useRef(null);
  const [qrLoaded, setQrLoaded] = useState(false);

  useEffect(() => {
    // Inject qrcode lib if not already loaded
    if (window.QRCode) {
      setQrLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.onload = () => setQrLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!qrLoaded || !canvasRef.current) return;
    canvasRef.current.innerHTML = "";
    new window.QRCode(canvasRef.current, {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: window.QRCode.CorrectLevel.H,
    });
  }, [qrLoaded, url]);

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div style={{
        background: "#fff", borderRadius: 8, overflow: "hidden",
        width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
      }}>
        {/* Header */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
        }}>
          {/* MSD Logo */}
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="8"  cy="8"  r="5" fill="#0f6e56" opacity="0.9"/>
            <circle cx="20" cy="8"  r="5" fill="#1d9e75" opacity="0.8"/>
            <circle cx="14" cy="18" r="5" fill="#5dcaa5" opacity="0.8"/>
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>MSD MANUAL</div>
            <div style={{ fontWeight: 600, fontSize: 12, color: "#0f6e56" }}>Professional Version</div>
          </div>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto", border: "none", background: "none",
              fontSize: 20, cursor: "pointer", color: "#6b7280", lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{
          background: "#f9fafb", padding: "40px 20px 32px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        }}>
          {/* QR Code */}
          <div
            ref={canvasRef}
            style={{ background: "#fff", padding: 12, borderRadius: 4 }}
          />
          {!qrLoaded && (
            <div style={{ fontSize: 13, color: "#6b7280" }}>Loading QR code...</div>
          )}

          {/* Title */}
          <div style={{ fontSize: 22, fontWeight: 400, color: "#1f2937", textAlign: "center" }}>
            {title}
          </div>

          {/* URL */}
          <div style={{ fontSize: 12, color: "#6b7280", textAlign: "center", wordBreak: "break-all" }}>
            {url}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: "#fff", borderTop: "1px solid #e5e7eb",
          padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 32 32">
              <circle cx="8"  cy="8"  r="5" fill="#0f6e56" opacity="0.9"/>
              <circle cx="20" cy="8"  r="5" fill="#1d9e75" opacity="0.8"/>
              <circle cx="14" cy="18" r="5" fill="#5dcaa5" opacity="0.8"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#1f2937" }}>MSD</span>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "right" }}>
            Copyright © 2026 Merck &amp; Co., Inc., Rahway, NJ, USA and its affiliates. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── QR Button ────────────────────────────────────────────────────────────────
export default function QRButton({ title, url }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Show QR Code"
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, border: "none", borderRadius: 4,
          background: "#0f6e56", cursor: "pointer",
        }}
      >
        {/* QR icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9-1h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h-2v-2h2v2zm0 4h-2v-2h2v2z"/>
        </svg>
      </button>

      {open && (
        <QRModal
          title={title}
          url={url}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}