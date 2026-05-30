'use client';
import React from 'react';

const TESTIMONIALS_ROW1 = [
  {
    name: 'James Whitfield',
    title: 'Luxury Property Agent, Dubai',
    quote: 'Within 90 days of joining the Blueprint I closed my first AED 4M listing. The prospecting frameworks alone are worth ten times the price.',
    initials: 'JW',
  },
  {
    name: 'Sophia Al-Mansoori',
    title: 'Senior Agent, Knight Frank UAE',
    quote: "I had been in real estate for two years going nowhere. Tyron's mindset module completely rewired how I approach every single client interaction.",
    initials: 'SA',
  },
  {
    name: 'Marcus Reid',
    title: 'Independent Agent, London',
    quote: 'The objection handling scripts are ruthlessly effective. I used to lose listings at the pitch — now I win them nine times out of ten.',
    initials: 'MR',
  },
  {
    name: 'Priya Nair',
    title: 'Property Consultant, DAMAC',
    quote: 'Doubled my pipeline in 60 days. The follow-up system is something no one else is teaching and it makes all the difference.',
    initials: 'PN',
  },
  {
    name: 'Oliver Thornton',
    title: 'Real Estate Advisor, Savills UK',
    quote: 'I have done other courses. None come close. This is built by someone who is actually in the field doing it at the highest level right now.',
    initials: 'OT',
  },
];

const TESTIMONIALS_ROW2 = [
  {
    name: 'Layla Hassan',
    title: 'Off-Plan Specialist, Emaar',
    quote: 'The off-plan investment module gave me a completely new revenue stream. I closed three investment deals in my first month using it.',
    initials: 'LH',
  },
  {
    name: 'Daniel Kowalski',
    title: 'Estate Agent, Foxtons London',
    quote: 'The community alone is worth the price. Being around other agents at this level raises your standards whether you want it to or not.',
    initials: 'DK',
  },
  {
    name: 'Aisha Binte Yusof',
    title: 'Luxury Lettings Agent, Dubai Hills',
    quote: 'I was hesitant to invest. Thirty days later I had already earned it back three times over. Genuinely the best career decision I have made.',
    initials: 'AY',
  },
  {
    name: 'Tom Fairfax',
    title: 'Sales Director, Hamptons International',
    quote: 'Tyron practises everything he teaches. Watching someone operate at that level and then breaking it down for you is something no other course offers.',
    initials: 'TF',
  },
  {
    name: 'Nadia Petrov',
    title: 'New Homes Agent, Belgravia Dubai',
    quote: 'From cold calling to warm referrals in under six months. The repeat business and referrals module is a game changer for anyone serious about longevity.',
    initials: 'NP',
  },
];

// Duplicate for seamless infinite scroll
const ROW1 = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2 = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

function Avatar({ initials }: { initials: string }) {
  return (
    <div style={{
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.08) 100%)',
      border: '1px solid rgba(201,168,76,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 700,
      color: 'rgba(201,168,76,0.9)',
      letterSpacing: '0.04em',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function TestimonialCard({ name, title, quote, initials }: typeof TESTIMONIALS_ROW1[0]) {
  return (
    <div style={{
      flexShrink: 0,
      width: 340,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(201,168,76,0.1)',
      borderRadius: 20,
      padding: '28px 28px 32px',
      margin: '0 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      transition: 'border-color 300ms ease, background 300ms ease, box-shadow 300ms ease',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(201,168,76,0.45)';
        el.style.background = '#100f0a';
        el.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.1), 0 8px 40px rgba(201,168,76,0.1), inset 0 0 40px rgba(201,168,76,0.04)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(201,168,76,0.1)';
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="rgba(201,168,76,0.9)">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: 14,
        color: 'rgba(255,255,255,0.78)',
        lineHeight: 1.75,
        margin: 0,
        fontWeight: 400,
        flex: 1,
      }}>
        "{quote}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar initials={initials} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#fafafa', margin: '0 0 2px', letterSpacing: '-0.01em' }}>
            {name}
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, letterSpacing: '0.04em' }}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section style={{
      background: '#060608',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(60px, 10vw, 100px) 0',
      overflow: 'hidden',
    }}>

      <style suppressHydrationWarning>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .trow-left {
          display: flex;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }
        .trow-right {
          display: flex;
          width: max-content;
          animation: scroll-right 44s linear infinite;
        }
        .trow-left:hover,
        .trow-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: 60, padding: '0 clamp(20px, 5vw, 80px)' }}>
        <p style={{
          fontSize: 10,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.7)',
          fontWeight: 600,
          margin: '0 0 14px',
        }}>
          Testimonials
        </p>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          color: '#fafafa',
          margin: '0 0 14px',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          Agents who did the work.<br />These are their results.
        </h2>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: 440,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Real agents. Real numbers. No hype.
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div style={{ marginBottom: 20 }}>
        <div className="trow-left">
          {ROW1.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <div className="trow-right">
          {ROW2.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>

    </section>
  );
}
