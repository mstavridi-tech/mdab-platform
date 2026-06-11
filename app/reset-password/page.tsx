'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'waiting' | 'ready' | 'success' | 'error'>('waiting');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setStatus('ready');
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setStatus('ready');
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) { setError(updateError.message); return; }
    setStatus('success');
    setTimeout(() => router.push('/'), 2500);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060608',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>

        {/* Wordmark */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', margin: 0,
          }}>
            Million Dollar Agent Blueprint
          </p>
        </div>

        <div style={{
          background: 'rgba(255,248,230,0.025)',
          border: '1px solid rgba(255,215,120,0.09)',
          borderRadius: 18,
          padding: '40px 36px',
        }}>

          {status === 'waiting' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16, color: '#C9A84C' }}>✦</div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fafafa', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Verifying your link
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.65 }}>
                Hold on a moment. If this takes too long,
                the link may have expired — go back and
                request a new one.
              </p>
            </div>
          )}

          {status === 'ready' && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 12, color: '#C9A84C' }}>✦</div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fafafa', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                  Set a new password
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                  Choose something strong and memorable.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* New password */}
                <div>
                  <label style={{
                    display: 'block', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.38)', marginBottom: 8,
                  }}>
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      style={{
                        width: '100%', padding: '12px 44px 12px 14px',
                        borderRadius: 10, fontSize: 14,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,215,120,0.1)',
                        color: '#fafafa', outline: 'none',
                        boxSizing: 'border-box', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,215,120,0.1)')}
                    />
                    <button type="button" onClick={() => setShowPass(p => !p)} style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      color: 'rgba(255,255,255,0.3)',
                    }}>
                      {showPass
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label style={{
                    display: 'block', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.38)', marginBottom: 8,
                  }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      placeholder="Repeat your password"
                      required
                      style={{
                        width: '100%', padding: '12px 44px 12px 14px',
                        borderRadius: 10, fontSize: 14,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,215,120,0.1)',
                        color: '#fafafa', outline: 'none',
                        boxSizing: 'border-box', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,215,120,0.1)')}
                    />
                    <button type="button" onClick={() => setShowConfirm(p => !p)} style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      color: 'rgba(255,255,255,0.3)',
                    }}>
                      {showConfirm
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>

                {error && (
                  <p style={{ fontSize: 13, color: '#f87171', margin: 0 }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 4,
                    padding: '13px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: loading
                      ? 'rgba(201,168,76,0.3)'
                      : 'linear-gradient(135deg, #E2C472 0%, #C9A84C 100%)',
                    color: '#0a0800',
                    border: 'none',
                    cursor: loading ? 'default' : 'pointer',
                    transition: 'opacity 0.2s',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.25)',
                  }}
                >
                  {loading ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            </>
          )}

          {status === 'success' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16, color: '#4ade80' }}>✓</div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fafafa', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Password updated
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.65 }}>
                You're all set. Taking you back to the home page…
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
