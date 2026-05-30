'use client';
import React from 'react';
import { ShinyButton } from '@/components/ui/shiny-button';

const MODULES = [
  { number: '01', title: 'The Million Dollar Agent Mindset',             lessons: 2 },
  { number: '02', title: 'Effective Prospecting & Follow-Up Systems',    lessons: 8 },
  { number: '03', title: 'Closing Meetings & Overcoming Objections',     lessons: 4 },
  { number: '04', title: 'Winning Listings',                              lessons: 4 },
  { number: '05', title: 'Buyer Qualification & Negotiation Skills',     lessons: 5 },
  { number: '06', title: 'Off-Plan Investment Strategies',               lessons: 4 },
  { number: '07', title: 'Securing Repeat Business & Referrals',        lessons: 4 },
  { number: '08', title: 'Working Smart & Reaching Your Full Potential', lessons: 7 },
];

// Each row is ~90px tall; stack offset so rows peek beneath the one above
const STICKY_TOP = 80; // navbar clearance
const STACK_OFFSET = 10; // each card peeks this many px below the previous

export default function CurriculumSection({ onEnrol }: { onEnrol?: () => void }) {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #060608 0%, #1a1200 40%, #0e0900 100%)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(60px, 10vw, 100px) 0 clamp(80px, 10vw, 120px)',
    }}>

      <style suppressHydrationWarning>{`
        .mod-stack-wrap {
          position: relative;
        }
        .mod-row {
          position: sticky;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 26px clamp(20px, 5vw, 80px);
          background: #0e0900;
          border-bottom: 1px solid rgba(201,168,76,0.08);
          cursor: default;
          transition: background 300ms ease;
          overflow: hidden;
        }
        .mod-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .mod-row:hover::before { opacity: 1; }
        .mod-row:hover .mod-row-num { color: rgba(201,168,76,1) !important; }
        .mod-row:hover .mod-row-title {
          background: linear-gradient(135deg, #E2C472 0%, #C9A84C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mod-row-left {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 48px);
          flex: 1;
          min-width: 0;
        }
        .mod-row-num {
          font-size: 13px;
          font-weight: 800;
          color: rgba(201,168,76,0.45);
          letter-spacing: 0.08em;
          flex-shrink: 0;
          width: 28px;
          transition: color 300ms ease;
        }
        .mod-row-title {
          font-size: clamp(20px, 3.2vw, 48px);
          font-weight: 800;
          color: #fafafa;
          letter-spacing: -0.02em;
          line-height: 1.1;
          transition: color 300ms ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mod-row-lessons {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          flex-shrink: 0;
          padding-left: 24px;
        }
        @media (max-width: 640px) {
          .mod-row { padding: 18px 16px; }
          .mod-row-lessons { display: none; }
          .mod-row-title { white-space: normal; font-size: 15px; }
          .mod-row-num { font-size: 11px; }
        }
      `}</style>

      {/* Heading */}
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: 64, padding: '0 clamp(20px, 5vw, 80px)' }}>
        <p style={{
          fontSize: 10,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.7)',
          fontWeight: 600,
          margin: '0 0 14px',
        }}>
          The Curriculum
        </p>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          color: '#fafafa',
          margin: '0 0 14px',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          8 Modules. Zero Filler.
        </h2>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: 460,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Every module is built around one outcome: making you more money as a real estate agent.
        </p>
      </div>

      {/* Stacking rows */}
      <div className="mod-stack-wrap">
        {MODULES.map((mod, i) => (
          <div
            key={i}
            className="mod-row fade-in"
            data-delay={String(i * 50)}
            style={{
              top: STICKY_TOP + i * STACK_OFFSET,
              zIndex: i + 1,
              // slightly darker background for each successive card so edges show
              background: `hsl(38, 100%, ${2 + i * 0.6}%)`,
              borderTop: i === 0 ? '1px solid rgba(201,168,76,0.08)' : 'none',
            }}
          >
            <div className="mod-row-left">
              <span className="mod-row-num">{mod.number}</span>
              <span className="mod-row-title">{mod.title}</span>
            </div>
            <span className="mod-row-lessons">{mod.lessons} {mod.lessons === 1 ? 'Lesson' : 'Lessons'}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 64, padding: '0 clamp(20px, 5vw, 80px)' }}>
        <ShinyButton onClick={onEnrol}>Get Instant Access</ShinyButton>
      </div>

    </section>
  );
}
