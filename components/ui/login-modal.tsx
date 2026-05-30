"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, X } from 'lucide-react';

type LoginTier = null | 'community' | 'blueprint';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [tier, setTier] = useState<LoginTier>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setIsLoading(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const sb = createClient('https://fwvirmydpvescaahauee.supabase.co', 'sb_publishable_lWCePWFplzqqs9Mtql9WnA_i2TMVwJq');
      const { error: authError } = await sb.auth.signInWithPassword({ email, password });
      if (authError) { setError("Incorrect email or password. Try again."); setIsLoading(false); return; }
      onClose();
    } catch { setError("Something went wrong. Please try again."); }
    setIsLoading(false);
  };

  const resetAndClose = () => { setTier(null); setEmail(""); setPassword(""); setError(""); setResetSent(false); onClose(); };

  const handleForgotPassword = async () => {
    if (!email) { setError("Enter your email above first, then click Forgot password."); return; }
    setResetLoading(true);
    setError("");
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const sb = createClient('https://fwvirmydpvescaahauee.supabase.co', 'sb_publishable_lWCePWFplzqqs9Mtql9WnA_i2TMVwJq');
      await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
      setResetSent(true);
      setError("");
    } catch { setError("Something went wrong. Please try again."); }
    setResetLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '56px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) resetAndClose(); }}
        >
          {/* Dark backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }} />

          {/* Blueprint grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(rgba(201,168,76,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.07) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            filter: 'blur(0.5px)',
          }} />

          {/* Moving gold orb */}
          <motion.div
            style={{
              position: 'absolute', pointerEvents: 'none',
              width: 600, height: 600, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 65%)',
            }}
            animate={{ x: [-300, 500, 500, -300, -300], y: [-300, -300, 500, 500, -300] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          />

          {/* Close button */}
          <button
            onClick={resetAndClose}
            style={{
              position: 'absolute', top: 24, right: 24, zIndex: 51,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.3)', padding: 4,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            <X size={20} />
          </button>

          {/* Card wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 520, padding: '0 16px', perspective: 1500 }}
          >
            <motion.div style={{ rotateX, rotateY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: '20px',
                border: '1px solid rgba(201,168,76,0.18)',
                background: 'rgba(6,6,8,0.98)',
              }}>
                {/* Card inner padding */}
                <div style={{ padding: '52px 52px 48px' }}>
                  <AnimatePresence mode="wait">

                    {/* Step 1 — tier selection */}
                    {tier === null && (
                      <motion.div
                        key="select"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Header */}
                        <div style={{ marginBottom: 40 }}>
                          <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', opacity: 0.75, marginBottom: 12 }}>
                            Member Login
                          </p>
                          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>
                            Welcome Back
                          </h1>
                          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                            Access your course, community, and progress.
                          </p>
                        </div>

                        {/* Tier buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <button
                            onClick={() => setTier('community')}
                            style={{
                              width: '100%', height: 68, borderRadius: 999,
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(255,255,255,0.03)',
                              cursor: 'pointer', textAlign: 'left',
                              padding: '0 24px',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              transition: 'background 0.2s, border-color 0.2s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                          >
                            <div>
                              <p style={{ fontSize: 15, fontWeight: 500, color: '#fff', margin: 0 }}>Community Member</p>
                            </div>
                            <ArrowRight size={18} color="rgba(255,255,255,0.3)" />
                          </button>

                          <button
                            onClick={() => setTier('blueprint')}
                            style={{
                              width: '100%', height: 68, borderRadius: 999,
                              border: '1px solid rgba(201,168,76,0.3)',
                              background: 'rgba(201,168,76,0.05)',
                              cursor: 'pointer', textAlign: 'left',
                              padding: '0 24px',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              transition: 'background 0.2s, border-color 0.2s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.5)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.05)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.3)'; }}
                          >
                            <div>
                              <p style={{ fontSize: 15, fontWeight: 600, color: '#E2C472', margin: 0 }}>Blueprint Member</p>
                            </div>
                            <ArrowRight size={18} color="rgba(201,168,76,0.5)" />
                          </button>
                        </div>

                        <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 36 }}>
                          Don&apos;t have an account?{" "}
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C9A84C', fontWeight: 600, fontSize: 13, padding: 0 }}>
                            Enroll now
                          </button>
                        </p>
                      </motion.div>
                    )}

                    {/* Step 2 — login form */}
                    {tier !== null && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Back */}
                        <button
                          onClick={() => { setTier(null); setError(""); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 36, padding: 0 }}
                        >
                          ← Back
                        </button>

                        {/* Header */}
                        <div style={{ marginBottom: 32 }}>
                          <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: tier === 'blueprint' ? '#C9A84C' : 'rgba(250,250,250,0.4)', opacity: 0.85, marginBottom: 12 }}>
                            {tier === 'blueprint' ? 'Blueprint Member' : 'Community Member'}
                          </p>
                          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>
                            Welcome Back
                          </h1>
                          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                            Access your course, community, and progress.
                          </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                          {/* Email */}
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Mail size={18} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', left: 18, pointerEvents: 'none' }} />
                            <input
                              type="email"
                              placeholder="Email address"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              style={{ ...inputStyle, paddingLeft: 50, paddingRight: 16 }}
                              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                            />
                          </div>

                          {/* Password */}
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Lock size={18} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', left: 18, pointerEvents: 'none' }} />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              style={{ ...inputStyle, paddingLeft: 50, paddingRight: 50 }}
                              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ position: 'absolute', right: 18, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0 }}
                            >
                              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                          </div>

                          {error && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{error}</p>}
                          {resetSent && (
                            <p style={{ color: '#86efac', fontSize: 13, margin: 0 }}>
                              Check your inbox — we sent a reset link to <strong>{email}</strong>.
                            </p>
                          )}

                          {/* Remember / Forgot */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                              <input type="checkbox" style={{ width: 14, height: 14, accentColor: '#C9A84C' }} />
                              Remember me
                            </label>
                            <button
                              type="button"
                              onClick={handleForgotPassword}
                              disabled={resetLoading}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: resetSent ? '#86efac' : 'rgba(255,255,255,0.4)', padding: 0, transition: 'color 0.2s' }}
                              onMouseEnter={e => { if (!resetSent) (e.currentTarget as HTMLButtonElement).style.color = '#C9A84C'; }}
                              onMouseLeave={e => { if (!resetSent) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}
                            >
                              {resetLoading ? 'Sending...' : resetSent ? 'Email sent ✓' : 'Forgot password?'}
                            </button>
                          </div>

                          {/* Submit */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            style={{
                              width: '100%', height: 56, borderRadius: 999,
                              border: 'none', cursor: 'pointer',
                              background: tier === 'blueprint'
                                ? 'linear-gradient(135deg, #C9A84C 0%, #9a7a30 100%)'
                                : 'rgba(255,255,255,0.92)',
                              color: '#060608',
                              fontSize: 14, fontWeight: 700,
                              letterSpacing: '0.06em', textTransform: 'uppercase',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                              marginTop: 6,
                            }}
                          >
                            <AnimatePresence mode="wait">
                              {isLoading
                                ? <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ width: 16, height: 16, border: '2px solid #060608', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                  </motion.div>
                                : <motion.span key="txt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    Sign In <ArrowRight size={15} />
                                  </motion.span>
                              }
                            </AnimatePresence>
                          </motion.button>
                        </form>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
