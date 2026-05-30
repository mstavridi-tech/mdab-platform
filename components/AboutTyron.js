"use client";

import Image from "next/image";

export default function AboutTyron() {
  return (
    <div
      id="about-tyron"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}
      className="flex flex-col lg:grid"
    >
      {/* Image side */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "500px" }}>
        <Image
          src="/ta-home-screen.png"
          alt="Tyron Ash"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        {/* Name overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
          zIndex: 1,
        }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "#C8A36F", marginBottom: "4px",
          }}>Tyron Ash</div>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800,
            textTransform: "uppercase",
          }}>Founder, Tyron Ash International</div>
        </div>
      </div>

      {/* Content side */}
      <div style={{
        background: "var(--black-3)",
        padding: "80px 64px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div className="gold-line" />
        <div className="section-label">About Your Mentor</div>

        <div className="tyron-quote">
          The agents who <span>win</span> are the ones who stop waiting and start doing.
        </div>

        <p className="tyron-bio">
          Tyron Ash built one of the most recognised real estate brands operating across Dubai and the UK. With a track record of high-value transactions and a team of top-performing agents, Tyron created the Million Dollar Agent Blueprint to pass on every system, script, and strategy that actually works in today's market.
        </p>
        <p className="tyron-bio" style={{ marginBottom: "32px" }}>
          This isn't motivational content. This is a blueprint used daily by agents closing real deals in two of the world's most competitive markets.
        </p>

        <div>
          <button
            className="btn-primary"
            onClick={() => window.dispatchEvent(new CustomEvent("open-pricing-modal"))}
          >
            Learn From Tyron
          </button>
        </div>
      </div>
    </div>
  );
}
