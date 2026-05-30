'use client';
import React from 'react';
import { ShinyButton } from '@/components/ui/shiny-button';

export default function AboutSection() {
  return (
    <section style={{
      background: '#060608',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      overflow: 'hidden',
    }}>

      <style suppressHydrationWarning>{`
        .about-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 680px;
        }
        .about-image-col {
          position: relative;
          overflow: hidden;
          min-height: 560px;
        }
        .about-content-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(48px, 7vw, 96px) clamp(32px, 5vw, 80px);
          background: #060608;
        }
        @media (max-width: 768px) {
          .about-inner {
            grid-template-columns: 1fr !important;
          }
          .about-image-col {
            min-height: 420px;
          }
          .about-content-col {
            padding: 40px 24px 56px !important;
          }
        }
      `}</style>

      <div className="about-inner">

        {/* LEFT — full-bleed photo */}
        <div className="about-image-col fade-in">
          <img
            src="/TA home.png"
            alt="Tyron Ash"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />

          {/* Dark gradient overlay so name text is readable */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(6,6,8,0.85) 0%, rgba(6,6,8,0.2) 50%, transparent 100%)',
          }} />

          {/* Name badge bottom-left */}
          <div style={{
            position: 'absolute',
            bottom: 32,
            left: 32,
          }}>
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.8)',
              margin: '0 0 6px',
            }}>
              Tyron Ash
            </p>
            <p style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fafafa',
              margin: 0,
            }}>
              Founder, Tyron Ash International
            </p>
          </div>
        </div>

        {/* RIGHT — copy */}
        <div className="about-content-col fade-in">

          {/* Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}>
            <div style={{
              width: 32,
              height: 1,
              background: 'rgba(201,168,76,0.6)',
            }} />
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.8)',
              margin: 0,
            }}>
              About Your Mentor
            </p>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(24px, 3.2vw, 42px)',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#fafafa',
            margin: '0 0 32px',
          }}>
            The agents who{' '}
            <span style={{
              background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              win
            </span>
            {' '}are the ones who stop waiting and start doing.
          </h2>

          {/* Body copy */}
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.8,
            margin: '0 0 20px',
          }}>
            Tyron Ash built one of the most recognised real estate brands operating across Dubai and the UK. With a track record of high-value transactions and a team of top-performing agents, Tyron created the Million Dollar Agent Blueprint to pass on every system, script, and strategy that actually works in today's market.
          </p>

          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.8,
            margin: '0 0 40px',
          }}>
            This isn't motivational content. This is a blueprint used daily by agents closing real deals in two of the world's most competitive markets.
          </p>

          {/* CTA */}
          <div>
            <ShinyButton>Learn from Tyron</ShinyButton>
          </div>

        </div>
      </div>
    </section>
  );
}
