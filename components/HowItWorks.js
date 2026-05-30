const STEPS = [
  {
    num: "01",
    title: "Join the Community",
    desc: "Start with the Community Plan at $67 a month and get immediate access to your first lessons, the member community, and your personal affiliate link. No contracts. Cancel any time. Your first step into the Blueprint world costs less than a dinner out.",
  },
  {
    num: "02",
    title: "Choose Your Path",
    desc: "Stay in the Community and build your foundation, or go all in with the full Blueprint: 10 modules, 69 lessons, every system Tyron has used to build a seven-figure real estate business across the UK and Dubai. One path gets you started. The other gets you there faster.",
  },
  {
    num: "03",
    title: "Trust the Process and Do Not Stop",
    desc: "The system works. The agents who fail are the ones who quit before it does. Commit to the Blueprint, follow it exactly, and show up every single day. Most people will not. That is precisely why you will.",
  },
];

const ArrowIcon = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-[100px]" style={{ background: "var(--black)" }}>
      <div className="section-container">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">
          Three Steps to Becoming<br />a Million Dollar Agent.
        </h2>
        <p className="section-sub">
          No complicated onboarding. No hidden barriers. Just a clear path from where you are now to where you want to be.
        </p>

        {/* Desktop: 1fr auto 1fr auto 1fr grid */}
        <div
          className="hidden lg:grid"
          style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, alignItems: "start", marginTop: "56px" }}
        >
          {STEPS.flatMap((step, i) => {
            const items = [
              <div key={step.num} className="hiw-card">
                <div className="hiw-num">{step.num}</div>
                <div className="hiw-title">{step.title}</div>
                <div className="hiw-desc">{step.desc}</div>
              </div>
            ];
            if (i < STEPS.length - 1) {
              items.push(
                <div key={`arrow-${i}`} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 20px", marginTop: "80px",
                  color: "#C8A36F", opacity: 0.5,
                }}>
                  <ArrowIcon />
                </div>
              );
            }
            return items;
          })}
        </div>

        {/* Mobile: stacked */}
        <div className="flex flex-col lg:hidden" style={{ gap: "24px", marginTop: "56px" }}>
          {STEPS.map((step) => (
            <div key={step.num} className="hiw-card">
              <div className="hiw-num">{step.num}</div>
              <div className="hiw-title">{step.title}</div>
              <div className="hiw-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
