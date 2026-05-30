"use client";

import Image from "next/image";

const CloseBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Close"
    style={{
      position: "absolute", top: "20px", right: "20px",
      width: "36px", height: "36px", borderRadius: "50%",
      background: "transparent",
      border: "1px solid rgba(200,163,111,0.4)",
      color: "rgba(255,255,255,0.6)",
      fontSize: "18px", lineHeight: 1,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", transition: "all 0.2s",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C8A36F"; e.currentTarget.style.color = "#fff"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,163,111,0.4)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
  >
    ×
  </button>
);

export default function LoginModal({ onClose }) {
  const openPricing = () => {
    onClose();
    setTimeout(() => window.dispatchEvent(new CustomEvent("open-pricing-modal")), 150);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#000",
          border: "1px solid #C8A36F",
          borderRadius: "12px",
          width: "100%", maxWidth: "420px",
          padding: "48px 40px 40px",
        }}
      >
        <CloseBtn onClick={onClose} />

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <Image
            src="/ta-logo.png"
            alt="Tyron Ash International"
            width={56}
            height={56}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px", fontWeight: 900,
          textTransform: "uppercase", letterSpacing: "0.08em",
          color: "#fff", textAlign: "center",
          marginBottom: "32px",
        }}>
          Member Login
        </h2>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <button
            style={{
              width: "100%",
              fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase",
              background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.5)",
              padding: "15px 12px", borderRadius: "4px",
              cursor: "pointer", transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
          >
            Log in as Community Member
          </button>

          <button
            style={{
              width: "100%",
              fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase",
              background: "#C8A36F", color: "#000",
              border: "none",
              padding: "15px 12px", borderRadius: "4px",
              cursor: "pointer", transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#D4B88A"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#C8A36F"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Log in as Blueprint Member
          </button>
        </div>

        {/* Enrol link */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
          Don't have an account?{" "}
          <button
            onClick={openPricing}
            style={{
              background: "none", border: "none", padding: 0,
              color: "#C8A36F", fontSize: "13px", cursor: "pointer",
              textDecoration: "underline", textUnderlineOffset: "3px",
              fontFamily: "inherit",
            }}
          >
            Enrol here
          </button>
        </p>
      </div>
    </div>
  );
}
