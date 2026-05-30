'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Check } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (plan: 'community' | 'blueprint') => void;
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

export function PricingModal({ isOpen, onClose, onSelectPlan }: PricingModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
            /* Blueprint grid backdrop */
            background: `
              linear-gradient(rgba(6,6,8,0.92), rgba(6,6,8,0.92)),
              linear-gradient(to right, rgba(201,168,76,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(201,168,76,0.07) 1px, transparent 1px)
            `,
            backgroundSize: 'auto, 52px 52px, 52px 52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: 'rgba(10,8,0,0.97)',
              border: '1px solid rgba(201,168,76,0.18)',
              borderRadius: 18,
              width: '100%',
              maxWidth: 800,
              padding: '28px 28px 24px',
              boxShadow: '0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.06)',
            }}
          >
            <style suppressHydrationWarning>{`
              .pricing-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 14px;
              }
              @media (max-width: 580px) {
                .pricing-grid { grid-template-columns: 1fr !important; }
              }
              @keyframes border-trail {
                0%   { offset-distance: 0%; }
                100% { offset-distance: 100%; }
              }
              .blueprint-trail::after {
                content: '';
                position: absolute;
                width: 72px;
                aspect-ratio: 1;
                background: radial-gradient(circle, rgba(201,168,76,0.85) 0%, rgba(201,168,76,0.15) 50%, transparent 70%);
                border-radius: 50%;
                offset-path: rect(0 auto auto 0 round 14px);
                animation: border-trail 3s linear infinite;
                pointer-events: none;
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
            `}</style>

            {/* Corner plus marks */}
            {[
              { top: -9, left: -9 }, { top: -9, right: -9 },
              { bottom: -9, left: -9 }, { bottom: -9, right: -9 },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', ...pos, color: 'rgba(201,168,76,0.5)', fontSize: 18, lineHeight: 1, fontWeight: 300, userSelect: 'none', zIndex: 2 }}>+</div>
            ))}

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 14, right: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
                transition: 'color 150ms, border-color 150ms',
                zIndex: 10,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <X size={14} />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 22 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 8px' }}>
                Choose Your Plan
              </p>
              <h2 style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: 900, color: '#fafafa', margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Select the membership that fits where you are right now.
              </h2>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                You can upgrade at any time.
              </p>
            </div>

            {/* Cards */}
            <div className="pricing-grid">

              {/* COMMUNITY */}
              <div style={{
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '22px 20px',
                display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.015)',
              }}>
                <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', fontWeight: 700, margin: '0 0 10px' }}>
                  Community Plan
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: 'rgba(201,168,76,0.7)', fontWeight: 700, marginBottom: 5 }}>$</span>
                  <span style={{ fontSize: 'clamp(36px,5vw,48px)', fontWeight: 900, color: '#E2C472', letterSpacing: '-0.03em', lineHeight: 1 }}>67</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>/month</span>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '0 0 16px' }}>cancel any time</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {COMMUNITY.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
                      <Check size={12} style={{ color: 'rgba(201,168,76,0.8)', flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPlan?.('community')}
                  style={{
                    display: 'block', width: '100%', textAlign: 'center',
                    padding: '12px 20px',
                    border: '1px solid rgba(201,168,76,0.35)',
                    borderRadius: 9,
                    color: '#E2C472',
                    fontSize: 11, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer',
                    background: 'rgba(201,168,76,0.04)',
                    transition: 'background 180ms, border-color 180ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.6)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'; }}
                >
                  Join Community
                </button>
              </div>

              {/* BLUEPRINT */}
              <div style={{
                position: 'relative',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 14,
                padding: '22px 20px',
                display: 'flex', flexDirection: 'column',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 100%)',
                boxShadow: '0 0 32px rgba(201,168,76,0.07)',
              }}>
                <div className="blueprint-trail" />

                {/* Badge */}
                <div style={{
                  position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                  color: '#0a0800',
                  fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '4px 14px', borderRadius: 999,
                  whiteSpace: 'nowrap',
                }}>
                  Most Popular
                </div>

                <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 700, margin: '0 0 10px' }}>
                  Blueprint Plan
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: 'rgba(201,168,76,0.7)', fontWeight: 700, marginBottom: 5 }}>$</span>
                  <span style={{ fontSize: 'clamp(36px,5vw,48px)', fontWeight: 900, color: '#E2C472', letterSpacing: '-0.03em', lineHeight: 1 }}>1,800</span>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '0 0 16px' }}>one-time payment · lifetime access</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {BLUEPRINT.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.78)', lineHeight: 1.45 }}>
                      <Check size={12} style={{ color: '#E2C472', flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPlan?.('blueprint')}
                  style={{
                    display: 'block', width: '100%', textAlign: 'center',
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: 9,
                    color: '#0a0800',
                    fontSize: 11, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                    transition: 'box-shadow 180ms, transform 180ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(201,168,76,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  Get the Blueprint
                </button>
              </div>
            </div>

            {/* Trust line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16, color: 'rgba(255,255,255,0.28)', fontSize: 11 }}>
              <ShieldCheck size={12} style={{ color: 'rgba(201,168,76,0.45)', flexShrink: 0 }} />
              Secure checkout · No hidden fees · Cancel community plan any time
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
