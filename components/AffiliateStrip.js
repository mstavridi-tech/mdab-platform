"use client";

export default function AffiliateStrip() {
  return (
    <section id="affiliate" className="pb-[100px]" style={{ background: "var(--black)" }}>
      <div className="section-container">
        <div className="affiliate-strip">
          <div style={{ flex: 1 }}>
            <div className="affiliate-title">Earn While You Learn</div>
            <p className="affiliate-sub">
              Our affiliate programme is powered by Skool. Refer an agent, earn a commission on every enrolment. No cap on earnings.
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ flexShrink: 0 }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-pricing-modal"))}
          >
            Join the Affiliate Programme
          </button>
        </div>
      </div>
    </section>
  );
}
