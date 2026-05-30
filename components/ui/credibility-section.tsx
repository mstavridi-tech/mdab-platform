'use client';
import React from 'react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const PRESS = [
  { name: 'Channel 4' },
  { name: 'Estate Agent Today' },
  { name: 'Property Industry Eye' },
  { name: 'The Negotiator' },
  { name: 'Radio Times' },
  { name: 'National World' },
];

const STATS = [
  { value: '£500M+', label: 'Transactions Led' },
  { value: '500+', label: 'Agents Trained' },
  { value: '10', label: 'Power Modules' },
  { value: 'UAE & UK', label: 'Markets Covered' },
];

const MARQUEE_ITEMS = [...PRESS, ...PRESS, ...PRESS];

export default function CredibilitySection() {
  return (
    <section style={{
      background: '#060608',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      padding: '48px 0 72px',
      overflow: 'hidden',
    }}>

      {/* AS SEEN IN */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.35)' }} />
          <p style={{
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)',
            margin: 0,
            fontWeight: 600,
          }}>
            As Seen In
          </p>
          <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.35)' }} />
        </div>
      </div>

      {/* Scrolling marquee */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>

        <ProgressiveBlur
          direction="left"
          blurLayers={6}
          blurIntensity={0.5}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 180, zIndex: 2, pointerEvents: 'none' }}
        />
        <ProgressiveBlur
          direction="right"
          blurLayers={6}
          blurIntensity={0.5}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 180, zIndex: 2, pointerEvents: 'none' }}
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'marquee 36s linear infinite',
          width: 'max-content',
        }}>
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                padding: '0 52px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}>
                {item.name}
              </span>
              {/* Thin vertical separator */}
              <div style={{
                width: 1,
                height: 14,
                background: 'rgba(201,168,76,0.2)',
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>

        <style suppressHydrationWarning>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>

      {/* Divider */}
      <div style={{
        width: 1,
        height: 52,
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)',
        margin: '64px auto',
      }} />

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        maxWidth: 880,
        margin: '0 auto',
        padding: '0 32px',
      }}>
        {STATS.map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center',
            padding: '0 12px',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(24px, 2.8vw, 38px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 10px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}>
              {stat.value}
            </p>
            <p style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
