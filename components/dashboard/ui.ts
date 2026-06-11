import type { CSSProperties } from 'react';

// Shared design tokens — Blanted-reference glass in warm gold.
// Near-borderless cards defined by luminance, radius 24, airy spacing.
export const T = {
  gold: '#C9A84C',
  goldLight: '#E2C472',
  text: '#fff',
  dim: 'rgba(255,240,210,0.45)',
  faint: 'rgba(255,240,210,0.3)',
  cardBg: 'linear-gradient(165deg, rgba(255,248,230,0.05), rgba(255,248,230,0.012) 60%)',
  cardBorder: '1px solid rgba(255,248,230,0.045)',
  goldGrad: 'linear-gradient(135deg, #E2C472, #C9A84C)',
};

export const card: CSSProperties = {
  padding: '26px 28px',
  borderRadius: 24,
  background: T.cardBg,
  border: T.cardBorder,
  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
};

// calm sentence-case labels (the old 9px uppercase was the "slop" tell)
export const label: CSSProperties = {
  fontSize: 13.5, fontWeight: 600,
  color: 'rgba(255,240,210,0.5)', margin: '0 0 6px',
};

export const goldBtn: CSSProperties = {
  padding: '13px 24px', borderRadius: 13, border: 'none',
  background: T.goldGrad, color: '#0a0800',
  fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase',
  cursor: 'pointer', boxShadow: '0 8px 28px rgba(201,168,76,0.45)',
  textDecoration: 'none', display: 'inline-block', textAlign: 'center',
};

export const ghostBtn: CSSProperties = {
  padding: '13px 24px', borderRadius: 13,
  border: '1px solid rgba(255,248,230,0.09)', background: 'rgba(255,248,230,0.035)',
  color: 'rgba(255,240,210,0.6)', fontSize: 12, fontWeight: 700,
  letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
  textDecoration: 'none', display: 'inline-block', textAlign: 'center',
};
