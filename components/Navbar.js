"use client";

import Image from "next/image";

const NAV_LINKS = [
  { href: "#modules-preview", label: "The Course" },
  { href: "#about-tyron",     label: "About" },
  { href: "#faq",             label: "FAQ" },
  { href: "#contact",         label: "Contact" },
];

export default function Navbar() {

  return (
    <>
      {/* ── MAIN NAV ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 48px", height: "72px",
          background: "rgba(0,0,0,0.92)",
          borderBottom: "1px solid rgba(200,163,111,0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", cursor: "pointer" }}
        >
          {/* Logo image */}
          <div style={{ width: 36, height: 36, flexShrink: 0, position: "relative" }}>
            <Image
              src="/ta-logo.png"
              alt="Tyron Ash International"
              width={36}
              height={36}
              style={{ objectFit: "contain", display: "block" }}
              priority
            />
          </div>
          {/* Text stack */}
          <div style={{ lineHeight: 1.1 }}>
            <div className="nav-logo-top" style={{
              fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 900,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A36F",
            }}>Tyron Ash</div>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: "8px", fontWeight: 500,
              letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
            }}>International Real Estate</div>
          </div>
        </a>

        {/* Centre links */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "36px" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)", textDecoration: "none",
                transition: "color 0.2s", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A36F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "10px" }}>
          <button
            className="nav-cta-outline"
            onClick={() => window.dispatchEvent(new CustomEvent("open-login-modal"))}
          >Log In</button>
          <button
            className="nav-cta-solid"
            onClick={() => window.dispatchEvent(new CustomEvent("open-pricing-modal"))}
          >Enrol Now</button>
        </div>

      </nav>
    </>
  );
}
