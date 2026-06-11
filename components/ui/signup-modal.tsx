'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Plan } from './checkout-modal';

interface SignupModalProps {
  isOpen: boolean;
  plan: Plan | null;
  onClose: () => void;
  onBack: () => void;
  onSuccess: () => void;
}

const PLAN_META: Record<Plan, { label: string; price: string; billing: string }> = {
  community: { label: 'Community Plan', price: '$67', billing: '/month' },
  blueprint: { label: 'Blueprint Plan', price: '$1,800', billing: 'one-time' },
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: 8,
  padding: '11px 14px',
  color: '#fafafa',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 200ms',
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(201,168,76,0.7)',
  display: 'block',
  marginBottom: 6,
};

export default function SignupModal({ isOpen, plan, onClose, onBack, onSuccess }: SignupModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) return;
    setLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, plan },
      },
    });

    if (signUpError) {
      // If user already exists, try signing them in instead
      if (signUpError.message.includes('already registered')) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setError('Account exists — check your password.');
          setLoading(false);
          return;
        }
      } else {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
    }

    // Update their profile with the selected plan
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        plan,
        payment_status: 'pending',
      });
    }

    setLoading(false);
    onSuccess();
  }

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
              boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            {/* Corner + marks */}
            {[
              { top: -9, left: -9 }, { top: -9, right: -9 },
              { bottom: -9, left: -9 }, { bottom: -9, right: -9 },
            ].map((pos, i) => (
              <div key={i} style={{ position: 'absolute', ...pos, color: 'rgba(201,168,76,0.5)', fontSize: 18, lineHeight: 1, userSelect: 'none', zIndex: 2 }}>+</div>
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
                transition: 'color 150ms, border-color 150ms', zIndex: 10,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <X size={14} />
            </button>

            {/* Back */}
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

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontWeight: 600, margin: '0 0 8px' }}>
                Step 1 of 2
              </p>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fafafa', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                Create your account
              </h2>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                Selected: <span style={{ color: 'rgba(201,168,76,0.8)' }}>{meta.label} — {meta.price}{meta.billing}</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  style={inputStyle}
                  placeholder="Your full name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = '#E2C472'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = '#E2C472'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{ ...inputStyle, paddingRight: 44 }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = '#E2C472'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.3)', padding: 0,
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ fontSize: 12, color: '#f87171', margin: 0 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4,
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: 10,
                  border: 'none',
                  background: loading ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                  color: '#0a0800',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                  transition: 'box-shadow 200ms, transform 200ms',
                }}
                onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(201,168,76,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                {loading ? 'Creating account...' : 'Continue to Payment →'}
              </button>

              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', margin: 0 }}>
                By continuing you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
