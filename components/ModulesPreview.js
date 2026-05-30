"use client";

const MODULES = [
  { num: "01", name: "The Million Dollar Mindset",           lessons: "6 Lessons" },
  { num: "02", name: "Understanding Your Market (UAE & UK)", lessons: "8 Lessons" },
  { num: "03", name: "Building a Killer Personal Brand",     lessons: "7 Lessons" },
  { num: "04", name: "Lead Generation That Actually Works",  lessons: "9 Lessons" },
  { num: "05", name: "The Art of the Listing Appointment",   lessons: "6 Lessons" },
  { num: "06", name: "Negotiation Mastery",                  lessons: "7 Lessons" },
  { num: "07", name: "Closing Deals at a High Level",        lessons: "5 Lessons" },
  { num: "08", name: "Social Media and Digital Marketing",   lessons: "8 Lessons" },
  { num: "09", name: "Building and Leading a Team",          lessons: "6 Lessons" },
  { num: "10", name: "Scaling to 7 Figures",                 lessons: "7 Lessons" },
];

export default function ModulesPreview() {
  return (
    <section id="modules-preview" className="py-[100px]" style={{ background: "var(--black-2)" }}>
      <div className="section-container">
        <div className="section-label">The Curriculum</div>
        <h2 className="section-title">
          10 Modules.<br />Zero Filler.
        </h2>
        <p className="section-sub">
          Every module is built around one outcome: making you more money as a real estate agent.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {MODULES.map((mod) => (
            <div key={mod.num} className="module-row">
              <div className="module-num">{mod.num}</div>
              <div className="module-name">{mod.name}</div>
              <div className="module-lessons">{mod.lessons}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button
            className="btn-primary"
            onClick={() => window.dispatchEvent(new CustomEvent("open-pricing-modal"))}
          >
            Get Instant Access
          </button>
        </div>
      </div>
    </section>
  );
}
