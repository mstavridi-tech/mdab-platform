'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ShieldCheck } from 'lucide-react';
import CreditCardForm from './credit-card-form';

export type Plan = 'community' | 'blueprint';

interface CheckoutModalProps {
  isOpen: boolean;
  plan: Plan | null;
  onClose: () => void;
  onBack: () => void;
}

const PLAN_META: Record<Plan, { label: string; price: string; billing: string; description: string }> = {
  community: {
    label: 'Community Plan',
    price: '$67',
    billing: '/month — cancel any time',
    description: 'Full learning library, community access, AI chatbot & affiliate programme.',
  },
  blueprint: {
    label: 'Blueprint Plan',
    price: '$1,800',
    billing: 'one-time · lifetime access',
    description: '8 modules, 38 lessons, worksheets, quizzes, certificate & live Q&A access.',
  },
};

export default function CheckoutModal({ isOpen, plan, onClose, onBack }: CheckoutModalProps) {
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

  const meta = plan ? PLAN_META[plan] : null;

  return (
    <AnimatePresence>
      {isOpen && meta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: `
              linear-gradient(rgba(6,6,8,0.94), rgba(6,6,8,0.94)),
              linear-gradient(to right, rgba(201,168,76,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(201,168,76,0.07) 1px, transparent 1px)
            `,
            backgroundSize: 'auto, 52px 52px, 52px 52px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '20px 16px 40px',
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
              background: 'rgba(10,8,0,0.98)',
              border: '1px solid rgba(201,168,76,0.18)',
              borderRadius: 18,
              width: '100%',
              maxWidth: 460,
              padding: 'clamp(20px, 4vw, 28px)',
              boxShadow: '0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.06)',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            {/* Corner + marks */}
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

            {/* Back button */}
            <button
              onClick={onBack}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', padding: '0 0 20px',
                color: 'rgba(201,168,76,0.6)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'color 150ms',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E2C472'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.6)'}
            >
              <ArrowLeft size={12} />
              Change plan
            </button>

            {/* Plan summary */}
            <div style={{
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 12,
              padding: '16px 18px',
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 12,
            }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', fontWeight: 700, margin: '0 0 4px' }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
                  {meta.description}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#E2C472', letterSpacing: '-0.02em', lineHeight: 1 }}>{meta.price}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3, whiteSpace: 'nowrap' }}>{meta.billing}</div>
              </div>
            </div>

            {/* Card form */}
            <CreditCardForm
              showSubmit={true}
              onSubmit={(data) => {
                // TODO: connect to payment processor
                console.log('Payment submitted', data);
              }}
            />

            {/* Trust line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
              <ShieldCheck size={12} style={{ color: 'rgba(201,168,76,0.4)', flexShrink: 0 }} />
              Secure checkout · 256-bit SSL encryption
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
