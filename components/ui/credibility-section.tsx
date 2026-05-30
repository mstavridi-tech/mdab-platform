'use client';
import React from 'react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const PRESS = [
  { name: 'Channel 4',             src: '/logos/channel4.svg.png' },
  { name: 'Publication 1',         src: '/logos/1.png' },
  { name: 'Publication 2',         src: '/logos/2.png' },
  { name: 'Publication 3',         src: '/logos/3.png' },
  { name: 'Publication 4',         src: '/logos/4.png' },
  { name: 'Publication 5',         src: '/logos/5.png' },
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
      padding: '72px 0 80px',
      overflow: 'hidden',
    }}>

      {/* Stats — full width, above everything */}
      <style suppressHydrationWarning>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
          padding: 0 clamp(12px, 3vw, 32px);
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px 0 !important;
          }
          .stats-grid > div {
            border-right: none !important;
          }
        }
      `}</style>

      <div className="stats-grid fade-in" style={{ marginBottom: 72 }}>
        {STATS.map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center',
            padding: '0 16px',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(28px, 3.5vw, 52px)',
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

      {/* Divider */}
      <div style={{
        width: 1,
        height: 48,
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)',
        margin: '0 auto 64px',
      }} />

      {/* AS SEEN IN */}
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: 40 }}>
        <p style={{
          fontSize: 13,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          margin: 0,
          fontWeight: 600,
        }}>
          As Seen In
        </p>
      </div>

      {/* Scrolling marquee */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>

        <ProgressiveBlur
          direction="left"
          blurLayers={6}
          blurIntensity={0.5}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 300, zIndex: 2, pointerEvents: 'none' }}
        />
        <ProgressiveBlur
          direction="right"
          blurLayers={6}
          blurIntensity={0.5}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 300, zIndex: 2, pointerEvents: 'none' }}
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'marquee 40s linear infinite',
          width: 'max-content',
        }}>
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 72px',
              flexShrink: 0,
            }}>
              <img
                src={item.src}
                alt={item.name}
                style={{
                  height: 52,
                  width: 'auto',
                  maxWidth: 200,
                  objectFit: 'contain',
                  filter: 'grayscale(100%) brightness(0) invert(1)',
                  opacity: 0.45,
                }}
              />
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

    </section>
  );
}
