import type { CSSProperties } from 'react';

// Shared design tokens — dark warm amber, sleek glass
export const T = {
  gold: '#C9A84C',
  goldLight: '#E2C472',
  text: '#fafafa',
  dim: 'rgba(255,230,170,0.36)',
  faint: 'rgba(255,220,140,0.22)',
  cardBg: 'linear-gradient(160deg, rgba(255,248,230,0.04), rgba(255,248,230,0.016))',
  cardBorder: '1px solid rgba(255,215,120,0.08)',
  goldGrad: 'linear-gradient(135deg, #E2C472, #C9A84C)',
};

export const card: CSSProperties = {
  padding: '22px 24px',
  borderRadius: 20,
  background: T.cardBg,
  border: T.cardBorder,
  boxShadow: 'inset 0 1px 0 rgba(255,248,230,0.05), 0 24px 60px rgba(0,0,0,0.4)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
};

export const label: CSSProperties = {
  fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
  color: 'rgba(255,230,170,0.34)', fontWeight: 700, margin: '0 0 6px',
};

export const goldBtn: CSSProperties = {
  padding: '12px 22px', borderRadius: 11, border: 'none',
  background: T.goldGrad, color: '#0a0800',
  fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase',
  cursor: 'pointer', boxShadow: '0 6px 22px rgba(201,168,76,0.4), inset 0 1px 0 rgba(255,255,255,0.35)',
  textDecoration: 'none', display: 'inline-block', textAlign: 'center',
  transition: 'transform 150ms ease, box-shadow 150ms ease',
};

export const ghostBtn: CSSProperties = {
  padding: '12px 22px', borderRadius: 11,
  border: '1px solid rgba(255,215,120,0.14)', background: 'rgba(255,248,230,0.02)',
  color: 'rgba(255,230,170,0.55)', fontSize: 11, fontWeight: 700,
  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
  textDecoration: 'none', display: 'inline-block', textAlign: 'center',
  transition: 'border-color 150ms ease, color 150ms ease',
};
