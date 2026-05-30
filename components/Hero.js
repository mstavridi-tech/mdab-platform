"use client";

import Image from "next/image";

const STATS = [
  { value: "£10M+", label: "Transactions Led" },
  { value: "500+", label: "Agents Trained" },
  { value: "10", label: "Power Modules" },
  { value: "UAE & UK", label: "Markets Covered" },
];

export default function Hero() {
  return (
    <section id="hero" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Background gradients */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,163,111,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 80% 50%, rgba(200,163,111,0.04) 0%, transparent 60%), #000",
      }} />
      {/* Grid overlay with mask */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 70%)",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 0%, transparent 70%)",
      }} />

      {/* Centered content */}
      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center",
        maxWidth: "900px",
        padding: "0 24px",
      }}>
        <div className="hero-eyebrow">
          <Image src="/ta-logo.png" alt="TA" width={20} height={20} style={{ objectFit: "contain", display: "block", flexShrink: 0 }} />
          Tyron Ash International
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 7vw, 88px)",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          marginBottom: "28px",
          color: "#fff",
        }}>
          Million<br />
          <span style={{ color: "#C8A36F" }}>Dollar</span><br />
          Agent
        </h1>

        <p style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.7)",
          maxWidth: "560px",
          margin: "0 auto 48px",
          lineHeight: 1.7,
        }}>
          The definitive blueprint for real estate agents ready to break into the top 1% — built by Tyron Ash across Dubai and the UK.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("open-pricing-modal"))}>
            Enrol Now — Join the Elite
          </button>
          <a href="#modules-preview" className="btn-secondary">See the Course</a>
        </div>
      </div>

      {/* Stats — absolute at bottom on desktop, inline on mobile */}
      <div className="hero-stats-abs">
        {STATS.map((stat) => (
          <div key={stat.label} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 900,
              color: "#C8A36F", lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
              marginTop: "4px", whiteSpace: "nowrap",
            }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
