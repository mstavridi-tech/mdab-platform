"use client";

const COMMUNITY_FEATURES = [
  "Access to all 10 modules",
  "Community forum access",
  "Monthly group calls",
  "Email support",
];

const BLUEPRINT_FEATURES = [
  "Everything in Community",
  "1-on-1 strategy session with Tyron",
  "Private WhatsApp group",
  "Lifetime access to updates",
  "Certification upon completion",
];

const GoldCheck = () => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ flexShrink: 0, marginTop: "2px" }}
  >
    <circle cx="8" cy="8" r="7.5" stroke="#C8A36F" strokeWidth="1"/>
    <polyline points="4.5,8 7,10.5 11.5,5.5" stroke="#C8A36F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

export default function PricingModal({ onClose }) {
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
        overflowY: "auto",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#000",
          border: "1px solid #C8A36F",
          borderRadius: "12px",
          width: "100%", maxWidth: "900px",
          padding: "48px 40px 40px",
          margin: "auto",
        }}
        className="pricing-modal-inner"
      >
        <CloseBtn onClick={onClose} />

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px, 3vw, 30px)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#fff",
          textAlign: "center",
          marginBottom: "36px",
        }}>
          Choose Your Plan
        </h2>

        {/* Cards */}
        <div className="pricing-cards-row" style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "stretch",
        }}>

          {/* Community Card */}
          <div style={{
            flex: 1,
            background: "#000",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "16px",
            }}>Community Plan</div>

            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 900, color: "#fff", lineHeight: 1,
              marginBottom: "4px",
            }}>$67<span style={{ fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>/month</span></div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "28px" }}>
              Community access + accountability
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              {COMMUNITY_FEATURES.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                  <GoldCheck />{f}
                </li>
              ))}
            </ul>

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
              Select Community Plan
            </button>
          </div>

          {/* Blueprint Card */}
          <div style={{
            flex: 1,
            background: "#000",
            border: "1px solid #C8A36F",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Most Popular badge */}
            <div style={{
              background: "#C8A36F",
              padding: "8px 16px",
              textAlign: "center",
              fontFamily: "var(--font-display)", fontSize: "9px", fontWeight: 800,
              letterSpacing: "0.32em", textTransform: "uppercase", color: "#000",
            }}>
              Most Popular
            </div>

            <div style={{ padding: "32px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "16px",
              }}>Blueprint Plan</div>

              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 48px)",
                fontWeight: 900, color: "#fff", lineHeight: 1,
                marginBottom: "4px",
              }}>$1,800<span style={{ fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}> one-time</span></div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "28px" }}>
                Full blueprint + lifetime access
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                {BLUEPRINT_FEATURES.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                    <GoldCheck />{f}
                  </li>
                ))}
              </ul>

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
                Select Blueprint Plan
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
