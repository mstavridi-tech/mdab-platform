const FEATURES = [
  {
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    title: "Video Masterclasses",
    text: "High-production lessons covering every stage of your real estate career. Watch at your pace, revisit any time.",
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Private Community",
    text: "Connect with an elite network of agents across Dubai and the UK. Share wins, ask questions, grow together.",
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: "Progress Tracking",
    text: "Know exactly where you are. Module completion, quiz scores, and a certificate when you finish.",
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: "Worksheets and Quizzes",
    text: "Action-based learning. Downloadable worksheets and module quizzes ensure you implement what you learn.",
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "AI Powered Support",
    text: "Got a question at 2am? Blueprint AI has you covered 24/7 with intelligent answers based on course content.",
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Affiliate Programme",
    text: "Refer agents to the Blueprint and earn commission on every enrolment. Powered through Skool for seamless payouts.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-[100px]" style={{ background: "var(--black)" }}>
      <div className="section-container">
        <div className="section-label">Why This Is Different</div>
        <h2 className="section-title">
          Built by an Agent<br />Who Actually Does It
        </h2>
        <p className="section-sub">
          Not theory. Not recycled content. Real strategy from someone generating 7 figures in the field, in both Dubai and the UK.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "2px" }}>
          {FEATURES.map((feat) => (
            <div key={feat.title} className="feature-card">
              <div className="feature-icon">{feat.icon}</div>
              <div className="feature-title">{feat.title}</div>
              <div className="feature-text">{feat.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
