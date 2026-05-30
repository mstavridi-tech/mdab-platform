const REVIEWS = [
  {
    quote: "The lead generation module alone was worth ten times the investment. I went from cold calling all day to having a system that brings me warm leads consistently.",
    name: "James T.",
    role: "Residential Agent, Dubai",
  },
  {
    quote: "Tyron doesn't hold anything back. The negotiation module changed how I approach every single deal. Closed a 1.2M property last month using exactly what he teaches.",
    name: "Sophie R.",
    role: "Luxury Agent, London",
  },
  {
    quote: "As someone who moved from the UK to Dubai, this course gave me the dual-market knowledge I needed. The community alone is invaluable for networking.",
    name: "Marcus K.",
    role: "International Agent, Dubai and UK",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-[100px]" style={{ background: "var(--black)" }}>
      <div className="section-container">
        <div className="section-label">Student Results</div>
        <h2 className="section-title">What Our Agents Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px", marginTop: "20px" }}>
          {REVIEWS.map((r) => (
            <div key={r.name} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">{r.quote}</p>
              <div className="review-author">{r.name}</div>
              <div className="review-role">{r.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
