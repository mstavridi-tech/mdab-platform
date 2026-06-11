'use client';
import React from 'react';

const FEATURES = [
  {
    title: 'Video Masterclasses',
    description: 'High-production lessons covering every stage of your real estate career. Watch at your pace, revisit any time.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="3"/>
        <polygon points="10 8 16 11 10 14 10 8"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Private Community',
    description: 'Connect with an elite network of agents across Dubai and the UK. Share wins, ask questions, grow together.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Progress Tracking',
    description: 'Know exactly where you are. Module completion, quiz scores, and a certificate when you finish.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Worksheets & Quizzes',
    description: 'Action-based learning. Downloadable worksheets and module quizzes ensure you implement what you learn.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="15" y2="17"/>
      </svg>
    ),
  },
  {
    title: 'AI-Powered Support',
    description: 'Got a question at 2am? Blueprint AI has you covered 24/7 with intelligent answers based on course content.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="8" cy="10" r="1" fill="currentColor"/>
        <circle cx="16" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Affiliate Programme',
    description: 'Refer agents to the Blueprint and earn commission on every enrolment. Powered through Skool for seamless payouts.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

function GridPattern({ id }: { id: string }) {
  const squares = React.useMemo(() =>
    Array.from({ length: 5 }, () => [
      Math.floor(Math.random() * 4) + 7,
      Math.floor(Math.random() * 6) + 1,
    ]), []);

  return (
    <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      className="fill-white/5 stroke-white/10 mix-blend-overlay">
      <defs>
        <pattern id={id} width={20} height={20} patternUnits="userSpaceOnUse" x="-12" y="4">
          <path d={`M.5 20V.5H20`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x="-12" y="4" style={{ overflow: 'visible' }}>
        {squares.map(([x, y], i) => (
          <rect key={i} strokeWidth="0" width={21} height={21} x={x * 20} y={y * 20} />
        ))}
      </svg>
    </svg>
  );
}

function FeatureCard({ title, description, icon: Icon, index }: {
  title: string;
  description: string;
  icon: () => React.JSX.Element;
  index: number;
}) {
  const patternId = `grid-${index}`;
  return (
    <div className="fade-in" data-delay={String(index * 80)} style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '28px 28px 32px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(201,168,76,0.12)',
      borderRadius: 20,
      transition: 'border-color 300ms ease, background 300ms ease, box-shadow 300ms ease',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(201,168,76,0.55)';
        el.style.background = '#100f0a';
        el.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.15), 0 8px 40px rgba(201,168,76,0.12), 0 2px 12px rgba(201,168,76,0.08), inset 0 0 60px rgba(201,168,76,0.05)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(201,168,76,0.12)';
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Grid pattern overlay */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0, left: '50%',
        marginTop: -8, marginLeft: -80,
        height: '100%', width: '100%',
        maskImage: 'linear-gradient(white, transparent)',
        WebkitMaskImage: 'linear-gradient(white, transparent)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          maskImage: 'radial-gradient(farthest-side at top, white, transparent)',
          WebkitMaskImage: 'radial-gradient(farthest-side at top, white, transparent)',
        }}>
          <GridPattern id={patternId} />
        </div>
      </div>

      {/* Icon */}
      <div style={{ color: 'rgba(201,168,76,0.8)', marginBottom: 32 }}>
        <Icon />
      </div>

      {/* Text */}
      <h3 style={{
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#fafafa',
        margin: '0 0 10px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.72)',
        lineHeight: 1.7,
        margin: 0,
        fontWeight: 400,
        position: 'relative',
        zIndex: 2,
      }}>
        {description}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section style={{
      background: '#060608',
      padding: 'clamp(60px, 10vw, 80px) clamp(12px, 3vw, 32px) clamp(60px, 10vw, 96px)',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      {/* Heading */}
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{
          fontSize: 10,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.7)',
          fontWeight: 600,
          margin: '0 0 16px',
        }}>
          Everything You Need
        </p>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 800,
          color: '#fafafa',
          margin: '0 0 14px',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}>
          Built by an agent<br />who actually does it
        </h2>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.72)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Not theory. Not recycled content. Real strategy from someone generating 7 figures in the field — in both Dubai and the UK.
        </p>
      </div>

      {/* Grid */}
      <style suppressHydrationWarning>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} index={i} title={f.title} description={f.description} icon={f.icon} />
        ))}
      </div>
    </section>
  );
}
