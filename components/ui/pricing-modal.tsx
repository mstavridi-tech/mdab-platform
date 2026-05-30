'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Check } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMUNITY = [
  'Access to the full learning library',
  'New video content added regularly',
  'Community feed & peer network',
  'AI chatbot support',
  'Affiliate programme access',
  'Content bank & resources',
];

const BLUEPRINT = [
  'Everything in Community',
  'Full Blueprint course — 8 modules, 38 lessons',
  'Worksheets, quizzes & certificate',
  'Priority community access',
  'Live Q&A session access',
  'Lifetime access, including future updates',
];

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#0a0800',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 860,
              padding: 'clamp(32px,5vw,56px)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.08)',
            }}
          >
            {/* Corner plus marks */}
            {[
              { top: -10, left: -10 }, { top: -10, right: -10 },
              { bottom: -10, left: -10 }, { bottom: -10, right: -10 },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', ...pos, color: 'rgba(201,168,76,0.4)', fontSize: 20, lineHeight: 1, fontWeight: 300, userSelect: 'none' }}>+</div>
            ))}

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                transition: 'color 200ms, border-color 200ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,4vw,44px)' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 12px' }}>
                Choose Your Plan
              </p>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fafafa', margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Select the membership that fits<br />where you are right now.
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                You can upgrade at any time.
              </p>
            </div>

            {/* Cards grid */}
            <style suppressHydrationWarning>{`
              .pricing-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
              }
              @media (max-width: 620px) {
                .pricing-grid { grid-template-columns: 1fr !important; }
              }
              @keyframes border-trail {
                0%   { offset-distance: 0%; }
                100% { offset-distance: 100%; }
              }
              .blueprint-trail {
                position: absolute;
                inset: 0;
                border-radius: inherit;
                border: 1px solid transparent;
                mask-clip: padding-box, border-box;
                mask-composite: intersect;
                mask-image: linear-gradient(transparent, transparent), linear-gradient(#000, #000);
                pointer-events: none;
                overflow: hidden;
              }
              .blueprint-trail::after {
                content: '';
                position: absolute;
                width: 80px;
                aspect-ratio: 1;
                background: radial-gradient(circle, rgba(201,168,76,0.9) 0%, rgba(201,168,76,0.2) 50%, transparent 70%);
                border-radius: 50%;
                offset-path: rect(0 auto auto 0 round 16px);
                animation: border-trail 3s linear infinite;
              }
            `}</style>

            <div className="pricing-grid">

              {/* ── COMMUNITY ── */}
              <div style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 'clamp(24px,3vw,32px)',
                display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <p style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600, margin: '0 0 8px' }}>
                  Community Plan
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, margin: '0 0 4px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(201,168,76,0.7)', fontWeight: 700, marginBottom: 6 }}>£</span>
                  <span style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 900, color: '#E2C472', letterSpacing: '-0.03em', lineHeight: 1 }}>67</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>/month</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '0 0 24px', letterSpacing: '0.02em' }}>
                  cancel any time
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {COMMUNITY.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                      <Check size={14} style={{ color: 'rgba(201,168,76,0.8)', flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://www.skool.com/tyronash"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '14px 24px',
                    border: '1px solid rgba(201,168,76,0.4)',
                    borderRadius: 10,
                    color: '#E2C472',
                    fontSize: 12, fontWeight: 800,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'background 200ms, border-color 200ms',
                    background: 'rgba(201,168,76,0.04)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.7)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; }}
                >
                  Join Community
                </a>
              </div>

              {/* ── BLUEPRINT ── */}
              <div style={{
                position: 'relative',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 16,
                padding: 'clamp(24px,3vw,32px)',
                display: 'flex', flexDirection: 'column',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 100%)',
                boxShadow: '0 0 40px rgba(201,168,76,0.08)',
              }}>
                {/* Animated border trail */}
                <div className="blueprint-trail" />

                {/* Most popular badge */}
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                  color: '#0a0800',
                  fontSize: 9, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '5px 16px', borderRadius: 999,
                  whiteSpace: 'nowrap',
                }}>
                  Most Popular
                </div>

                <p style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 8px' }}>
                  Blueprint Plan
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, margin: '0 0 4px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(201,168,76,0.7)', fontWeight: 700, marginBottom: 6 }}>£</span>
                  <span style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 900, color: '#E2C472', letterSpacing: '-0.03em', lineHeight: 1 }}>1,800</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '0 0 24px' }}>
                  one-time payment · lifetime access
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {BLUEPRINT.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                      <Check size={14} style={{ color: '#E2C472', flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://www.skool.com/tyronash-blueprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '14px 24px',
                    borderRadius: 10,
                    color: '#0a0800',
                    fontSize: 12, fontWeight: 800,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                    boxShadow: '0 4px 24px rgba(201,168,76,0.35)',
                    transition: 'box-shadow 200ms, transform 200ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(201,168,76,0.55)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  Get the Blueprint
                </a>
              </div>
            </div>

            {/* Trust line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
              <ShieldCheck size={14} style={{ color: 'rgba(201,168,76,0.5)' }} />
              Secure checkout · No hidden fees · Cancel community plan any time
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
