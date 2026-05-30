'use client';
import React from 'react';
import { ShinyButton } from '@/components/ui/shiny-button';

const STEPS = [
  {
    number: '01',
    title: 'Join the Community',
    body: 'Start with the Community Plan at $67 a month and get immediate access to your first lessons, the member community, and your personal affiliate link. No contracts. Cancel any time. Your first step into the Blueprint world costs less than a dinner out.',
  },
  {
    number: '02',
    title: 'Choose Your Path',
    body: 'Stay in the Community and build your foundation, or go all in with the full Blueprint — 8 modules, 69 lessons, every system Tyron has used to build a seven-figure real estate business across the UK and Dubai. One path gets you started. The other gets you there faster.',
  },
  {
    number: '03',
    title: 'Trust the Process and Do Not Stop',
    body: 'The system works. The agents who fail are the ones who quit before it does. Commit to the Blueprint, follow it exactly, and show up every single day. Most people will not. That is precisely why you will.',
  },
];

export default function HowItWorks() {
  return (
    <section style={{
      background: '#060608',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(60px, 10vw, 120px) clamp(12px, 3vw, 32px) clamp(60px, 10vw, 120px)',
    }}>
      <style suppressHydrationWarning>{`
        .hiw-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }
        .hiw-left {
          position: sticky;
          top: 80px;
        }
        .hiw-right {
          display: flex;
          flex-direction: column;
          padding-bottom: 120px;
        }
        .hiw-card {
          position: sticky;
          top: 80px;
          background: #0d0d10;
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 20px;
          padding: 40px 40px 44px;
          margin-bottom: 16px;
          transition: border-color 300ms ease, box-shadow 300ms ease, background 300ms ease;
          overflow: hidden;
        }
        .hiw-card:nth-child(1) { z-index: 1; }
        .hiw-card:nth-child(2) { z-index: 2; }
        .hiw-card:nth-child(3) { z-index: 3; }
        .hiw-card:hover {
          border-color: rgba(201,168,76,0.55);
          background: #100f0a;
          box-shadow: 0 0 0 1px rgba(201,168,76,0.15),
                      0 8px 40px rgba(201,168,76,0.12),
                      0 2px 12px rgba(201,168,76,0.08),
                      inset 0 0 60px rgba(201,168,76,0.05);
        }
        @media (max-width: 768px) {
          .hiw-inner {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 0 !important;
          }
          .hiw-left {
            position: relative !important;
            top: 0 !important;
          }
          .hiw-right {
            padding-bottom: 60px !important;
          }
          .hiw-card {
            position: sticky !important;
            top: 72px !important;
            padding: 28px 24px !important;
            margin-bottom: 16px !important;
          }
          .hiw-card:nth-child(1) { top: 72px !important; z-index: 1; }
          .hiw-card:nth-child(2) { top: 72px !important; z-index: 2; }
          .hiw-card:nth-child(3) { top: 72px !important; z-index: 3; }
        }
      `}</style>

      <div className="hiw-inner">

        {/* LEFT — sticky heading */}
        <div className="hiw-left fade-in">
          <div style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: 999,
            border: '1px solid rgba(201,168,76,0.3)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.85)',
            marginBottom: 24,
          }}>
            How It Works
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 800,
            color: '#fafafa',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>
            The Blueprint. Three Steps. No Excuses.
          </h2>

          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.75,
            margin: '0 0 36px',
          }}>
            No complicated onboarding. No hidden barriers. Just a clear path from where you are now to where you want to be — and a system that gets you there.
          </p>

          <ShinyButton>Enrol Now — Join the Elite</ShinyButton>
        </div>

        {/* RIGHT — stacking cards */}
        <div className="hiw-right">
          {STEPS.map((step, i) => (
            <div key={i} className="hiw-card fade-in" data-delay={String(i * 100)}>
              {/* Step number */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 800,
                  color: 'rgba(201,168,76,0.8)',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}>
                  {step.number}
                </div>
                <div style={{
                  height: 1,
                  flex: 1,
                  background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)',
                }} />
              </div>

              <h3 style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 700,
                color: '#fafafa',
                margin: '0 0 12px',
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.8,
                margin: 0,
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
