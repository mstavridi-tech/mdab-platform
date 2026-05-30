'use client';
import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'gold' | 'blue' | 'purple' | 'green';
}

const glowColorMap = {
  gold:   { base: 42,  spread: 20 },
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'gold',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', e.clientX.toFixed(2));
        cardRef.current.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', e.clientY.toFixed(2));
        cardRef.current.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const css = `
    [data-glow-card]::before,
    [data-glow-card]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
      -webkit-mask-composite: destination-in;
    }
    [data-glow-card]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 42) 90% 60% / 1), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow-card]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / 0.8), transparent 100%
      );
    }
    [data-glow-card] [data-glow-inner] {
      position: absolute;
      inset: 0;
      border-radius: calc(var(--radius) * 1px);
      border: calc(var(--border-size) * 20) solid transparent;
      filter: blur(calc(var(--border-size) * 10));
      pointer-events: none;
      background: none;
    }
    [data-glow-card] [data-glow-inner]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={cardRef}
        data-glow-card
        className={className}
        style={{
          '--base': base,
          '--spread': spread,
          '--radius': '20',
          '--border': '1.5',
          '--border-size': 'calc(var(--border, 2) * 1px)',
          '--spotlight-size': '300px',
          '--hue': `calc(${base} + (var(--xp, 0) * ${spread}))`,
          backgroundImage: `radial-gradient(
            300px 300px at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            rgba(201,168,76,0.08), transparent
          )`,
          backgroundColor: 'rgba(255,255,255,0.025)',
          border: '1.5px solid rgba(201,168,76,0.15)',
          borderRadius: 20,
          position: 'relative',
          backgroundAttachment: 'fixed',
        } as React.CSSProperties}
      >
        <div data-glow-inner />
        {children}
      </div>
    </>
  );
};

export { GlowCard };
