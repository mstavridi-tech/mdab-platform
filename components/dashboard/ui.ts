import type { CSSProperties } from 'react';

// Shared design tokens — dark warm amber theme (matches dashboard page)
export const T = {
  gold: '#C9A84C',
  goldLight: '#E2C472',
  text: '#fafafa',
  dim: 'rgba(255,230,170,0.36)',
  faint: 'rgba(255,220,140,0.22)',
  cardBg: 'rgba(255,248,230,0.028)',
  cardBorder: '1px solid rgba(255,215,120,0.065)',
  goldGrad: 'linear-gradient(135deg, #E2C472, #C9A84C)',
};

export const card: CSSProperties = {
  padding: '22px 24px',
  borderRadius: 20,
  background: T.cardBg,
  border: T.cardBorder,
};

export const label: CSSProperties = {
  fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
  color: 'rgba(255,230,170,0.32)', fontWeight: 600, margin: '0 0 6px',
};

export const goldBtn: CSSProperties = {
  padding: '11px 20px', borderRadius: 10, border: 'none',
  background: T.goldGrad, color: '#0a0800',
  fontSize: 11, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase',
  cursor: 'pointer', boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
  textDecoration: 'none', display: 'inline-block', textAlign: 'center',
};

export const ghostBtn: CSSProperties = {
  padding: '11px 20px', borderRadius: 10,
  border: '1px solid rgba(255,215,120,0.13)', background: 'transparent',
  color: 'rgba(255,230,170,0.5)', fontSize: 11, fontWeight: 700,
  letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
  textDecoration: 'none', display: 'inline-block', textAlign: 'center',
};
