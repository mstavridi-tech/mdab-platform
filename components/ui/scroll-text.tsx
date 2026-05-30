'use client';
import React, { useEffect, useRef, useState } from 'react';
import { LampContainer } from '@/components/ui/lamp';
import { motion } from 'framer-motion';

const BIG_WORDS = ['Strategy.', 'Mindset.', 'Execution.'];
const SMALL_WORDS = ['Stop', 'guessing.', 'Start', 'closing.', 'The', 'proven', 'frameworks', 'used', 'by', 'the', "world's", 'top', 'luxury', 'agents.'];
const ALL_WORDS = [...BIG_WORDS, ...SMALL_WORDS];

export default function ScrollText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.85;
      const end = windowH * 0.15;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWordStyle = (i: number) => {
    const threshold = i / ALL_WORDS.length;
    const lit = progress > threshold + 0.02;
    const partial = !lit && progress > threshold;
    const opacity = lit ? 1 : partial ? 0.4 + (progress - threshold) / 0.02 * 0.6 : 0.15;
    const color = lit || partial ? '#fafafa' : 'rgba(255,255,255,0.15)';
    return { color, opacity, transition: 'color 300ms ease, opacity 300ms ease', display: 'inline' };
  };

  return (
    <div
      ref={sectionRef}
      style={{
        background: '#060608',
        borderTop: '1px solid rgba(201,168,76,0.06)',
      }}
    >
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8, ease: 'easeInOut' }}
          style={{
            textAlign: 'center',
            maxWidth: 900,
            padding: 'clamp(80px, 14vw, 160px) clamp(12px, 3vw, 32px) clamp(80px, 10vw, 120px)',
            margin: '0 auto',
          }}
        >
          {/* Big line */}
          <p style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 24px',
          }}>
            {BIG_WORDS.map((word, i) => (
              <span key={i} style={getWordStyle(i)}>
                {word}{' '}
              </span>
            ))}
          </p>

          {/* Smaller line */}
          <p style={{
            fontSize: 'clamp(18px, 2.6vw, 30px)',
            fontWeight: 700,
            lineHeight: 1.45,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            {SMALL_WORDS.map((word, i) => (
              <span key={i} style={getWordStyle(BIG_WORDS.length + i)}>
                {word}{' '}
              </span>
            ))}
          </p>
        </motion.div>
      </LampContainer>
    </div>
  );
}
