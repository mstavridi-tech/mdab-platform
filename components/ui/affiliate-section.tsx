'use client';
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { ShinyButton } from '@/components/ui/shiny-button';

export default function AffiliateSection() {
  return (
    <section style={{
      background: '#060608',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      padding: 'clamp(60px, 10vw, 100px) clamp(12px, 3vw, 32px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <GlowCard>
          <style suppressHydrationWarning>{`
            .affiliate-inner {
              padding: clamp(40px, 5vw, 64px) clamp(32px, 5vw, 64px);
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              gap: 24px;
              flex-wrap: wrap;
            }
            @media (max-width: 768px) {
              .affiliate-inner {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 20px !important;
              }
            }
          `}</style>
          <div className="affiliate-inner">
            {/* Left */}
            <div style={{ flex: '1 1 280px', minWidth: 0 }}>
              <p style={{
                fontSize: 10,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)',
                fontWeight: 600,
                margin: '0 0 16px',
              }}>
                Affiliate Programme
              </p>
              <h2 style={{
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                fontWeight: 900,
                color: '#fafafa',
                margin: '0 0 16px',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
              }}>
                Earn while you learn
              </h2>
              <p style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                Our affiliate programme is powered by Skool. Refer an agent, earn a commission on every enrolment. No cap on earnings.
              </p>
            </div>

            {/* Right — CTA */}
            <div style={{ flexShrink: 0 }}>
              <ShinyButton>Join the Affiliate Programme</ShinyButton>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
