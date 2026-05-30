'use client';
import React, { useEffect, useRef, useState } from 'react';

const AGENTS = [
  {
    name: 'Ries Ash',
    role: 'Luxury Sales Agent — Dubai',
    image: '/Agents/Reis Awards.png',
    stats: ['£2M+ in first year', 'Top 5% in Dubai', '3 listings in 90 days'],
    quote: 'The Blueprint gave me the exact system I needed. Within a year I was consistently closing deals I never thought possible.',
  },
  {
    name: 'Ryan Booth',
    role: 'Investment Property Specialist — UK',
    image: '/Agents/Ryan.jpg',
    stats: ['Doubled GCI in 6 months', '40+ investor clients', 'Off-plan specialist'],
    quote: "Before the Blueprint I was guessing. Now every call, every pitch, every follow-up has a proven system behind it.",
  },
  {
    name: 'Stel Savva',
    role: 'Senior Agent — London & Dubai',
    image: '/Agents/Stel.jpg',
    stats: ['£5M portfolio managed', 'Cross-market operator', 'Mentor to 12 agents'],
    quote: 'I went from struggling to build a pipeline to running a full client book across two markets. This is the real deal.',
  },
  {
    name: 'Paul Hutchinson',
    role: 'High-Value Lettings — Dubai',
    image: '/Agents/Paul.jpg',
    stats: ['100+ units let', 'Record AED 500K lease', 'Referral-only business'],
    quote: "The referral and repeat business module alone changed everything. My phone hasn't stopped ringing since I implemented it.",
  },
  {
    name: 'Alex Bygraves',
    role: 'New Homes Agent — UAE',
    image: '/Agents/Alex.jpg',
    stats: ['AED 8M in Q1 alone', 'Zero cold calling', 'Blueprint affiliate'],
    quote: 'I used to dread prospecting. Now I have a system that brings the right clients to me. My income has never been more consistent.',
  },
];

export default function AgentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const idx = Math.min(AGENTS.length - 1, Math.floor(progress * AGENTS.length));
      setActiveIndex(prev => {
        if (prev !== idx) setAnimKey(k => k + 1);
        return idx;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const agent = AGENTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#060608',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <style suppressHydrationWarning>{`
        @keyframes agent-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes agent-in-right {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes agent-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── SECTION HEADING ── */
        .agents-heading {
          text-align: center;
          padding: clamp(60px,10vw,100px) clamp(16px,3vw,32px) 40px;
        }

        /* ── DESKTOP: scroll-driven sticky panel ── */
        .agents-desktop-wrap {
          display: block;
          height: calc(${AGENTS.length} * 100vh);
          position: relative;
        }
        .agents-sticky-panel {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .agent-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          max-width: 1100px;
          width: 100%;
          padding: 0 clamp(16px, 3vw, 32px);
          align-items: center;
          box-sizing: border-box;
        }
        .agent-photo-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 3/4;
          max-height: 70vh;
          animation: agent-in-left 500ms cubic-bezier(0.22,1,0.36,1) both;
          border: 1px solid rgba(201,168,76,0.15);
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
        }
        .agent-copy {
          min-width: 0;
          animation: agent-in-right 500ms 80ms cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── MOBILE: simple vertical cards ── */
        .agents-mobile-wrap {
          display: none;
          flex-direction: column;
          gap: 40px;
          padding: 0 16px 60px;
        }
        .agent-mobile-card {
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }
        .agent-mobile-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .agent-mobile-body {
          padding: 20px 18px 24px;
        }

        @media (max-width: 768px) {
          .agents-desktop-wrap { display: none !important; }
          .agents-mobile-wrap  { display: flex !important; }
        }
      `}</style>

      {/* Section heading */}
      <div className="agents-heading">
        <p style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 14px' }}>
          Success Stories
        </p>
        <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fafafa', margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Agents who did the work.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>
          Blueprint-trained. Elite-level results.
        </p>
      </div>

      {/* ── DESKTOP scroll-driven ── */}
      <div className="agents-desktop-wrap">
        <div className="agents-sticky-panel">

          {/* Progress dots */}
          <div style={{ position: 'absolute', right: 'clamp(16px,3vw,40px)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10 }}>
            {AGENTS.map((_, i) => (
              <div key={i} style={{
                width: i === activeIndex ? 8 : 4,
                height: i === activeIndex ? 8 : 4,
                borderRadius: '50%',
                background: i === activeIndex ? 'rgba(201,168,76,0.9)' : 'rgba(255,255,255,0.2)',
                transition: 'all 400ms ease',
              }} />
            ))}
          </div>

          <div className="agent-panel">
            {/* Photo */}
            <div key={`img-${animKey}`} className="agent-photo-wrap">
              <img src={agent.image} alt={agent.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,8,0.7) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(201,168,76,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(AGENTS.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Copy */}
            <div key={`copy-${animKey}`} className="agent-copy">
              <p style={{ fontSize: 11, color: 'rgba(201,168,76,0.7)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 16px' }}>
                {agent.role}
              </p>
              <h3 style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 900, color: '#fafafa', margin: '0 0 28px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                {agent.name}
              </h3>
              <blockquote style={{ fontSize: 'clamp(14px,1.6vw,17px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, margin: '0 0 36px', paddingLeft: 20, borderLeft: '2px solid rgba(201,168,76,0.45)', fontStyle: 'italic' }}>
                "{agent.quote}"
              </blockquote>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {agent.stats.map((stat, i) => (
                  <div key={i} style={{ padding: '8px 18px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.06)', fontSize: 12, color: 'rgba(201,168,76,0.9)', fontWeight: 700, letterSpacing: '0.06em', animation: `agent-in-up 400ms ${200 + i * 70}ms cubic-bezier(0.22,1,0.36,1) both` }}>
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE simple cards ── */}
      <div className="agents-mobile-wrap">
        {AGENTS.map((a, i) => (
          <div key={i} className="agent-mobile-card">
            <div style={{ position: 'relative' }}>
              <img src={a.image} alt={a.name} className="agent-mobile-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,8,0.8) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(201,168,76,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {String(i + 1).padStart(2, '0')} / {String(AGENTS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
            <div className="agent-mobile-body">
              <p style={{ fontSize: 10, color: 'rgba(201,168,76,0.7)', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                {a.role}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fafafa', margin: '0 0 12px', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                {a.name}
              </h3>
              <blockquote style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '0 0 16px', paddingLeft: 14, borderLeft: '2px solid rgba(201,168,76,0.4)', fontStyle: 'italic' }}>
                "{a.quote}"
              </blockquote>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {a.stats.map((stat, j) => (
                  <div key={j} style={{ padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.06)', fontSize: 11, color: 'rgba(201,168,76,0.9)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
