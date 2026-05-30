"use client";

import Image from "next/image";

const LINKS = ["About", "FAQ", "Contact", "Terms", "Privacy"];

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "var(--black-2)",
        borderTop: "1px solid var(--border)",
        padding: "48px 80px",
        textAlign: "center",
      }}
      className="px-6 lg:px-20"
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
        <Image
          src="/ta-logo.png"
          alt="Tyron Ash International"
          width={32}
          height={32}
          style={{ objectFit: "contain", display: "block", flexShrink: 0 }}
        />
        <div style={{ textAlign: "left" }}>
          <div className="footer-logo-top">Tyron Ash International</div>
          <div className="footer-logo-sub">Million Dollar Agent Blueprint</div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
        {LINKS.map((link) => (
          <a key={link} href="#" className="footer-link">{link}</a>
        ))}
        <button
          className="footer-link"
          onClick={() => window.dispatchEvent(new CustomEvent("open-login-modal"))}
        >
          Member Login
        </button>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
        &copy; 2025 Tyron Ash International. All rights reserved.
      </p>
    </footer>
  );
}
