const COMMUNITY = [
  "Foundational 23-lesson course",
  "Community feed and peer network",
  "AI chatbot support",
  "Affiliate programme access",
  "Content bank",
];

const BLUEPRINT = [
  "Everything in Community",
  "Full 69-lesson Blueprint course",
  "10 complete modules",
  "Worksheets, quizzes and certificate",
  "25% affiliate commission on Blueprint referrals",
  "Lifetime access with no subscription",
];

const CheckSVG = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="var(--gold)" strokeWidth="2" style={{ width: 8, height: 8 }}>
    <polyline points="1.5,5 4,7.5 8.5,2.5"/>
  </svg>
);

export default function Pricing() {
  return (
    <section id="enrol" className="py-16 px-6 lg:py-[100px] lg:px-20" style={{ background: "var(--black-2)" }}>
      <div style={{ maxWidth: "840px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Pricing</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Two Ways to Join</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Select the membership that fits where you are right now. You can upgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px" }}>

          {/* Community */}
          <div className="plan-card">
            <div style={{ height: "8px", background: "transparent" }} />
            <div className="plan-body">
              <div className="plan-name">Community Plan</div>
              <div className="plan-price">$67</div>
              <div className="plan-price-sub">per month, cancel any time</div>
              <ul className="plan-list">
                {COMMUNITY.map((item) => (
                  <li key={item}>
                    <span className="plan-check"><CheckSVG /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="plan-btn-outline">Join the Community</button>
            </div>
          </div>

          {/* Blueprint (featured) */}
          <div className="plan-card featured">
            <div className="plan-popular">Most Popular</div>
            <div className="plan-body">
              <div className="plan-name">Blueprint Plan</div>
              <div className="plan-price">$1,800</div>
              <div className="plan-price-sub">one-time payment, lifetime access</div>
              <ul className="plan-list">
                {BLUEPRINT.map((item) => (
                  <li key={item}>
                    <span className="plan-check"><CheckSVG /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="plan-btn-fill">Enrol in the Blueprint</button>
            </div>
          </div>

        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-muted)", marginTop: "24px" }}>
          Secure checkout. All plans include immediate access.
        </p>
      </div>
    </section>
  );
}
