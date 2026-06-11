'use client';

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { motion } from 'motion/react';

export interface EffectRendererProps {
  text: string;
  isActive: boolean;
  allowDelete?: boolean;
  typeDurationMs: number;
  deleteDurationMs: number;
  pauseAfterTypeMs: number;
  prefersReducedMotion?: boolean;
  onDeleteComplete?: () => void;
  containerRef?: RefObject<HTMLElement | null>;
  placeholderColor?: string;
  cursorColor?: string;
}

export const TypewriterEffect: React.FC<EffectRendererProps> = ({
  text,
  isActive,
  allowDelete = true,
  typeDurationMs,
  deleteDurationMs,
  pauseAfterTypeMs,
  prefersReducedMotion,
  onDeleteComplete,
  containerRef,
  placeholderColor = 'rgba(255,230,170,0.38)',
  cursorColor = 'rgba(201,168,76,0.6)',
}) => {
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting'>('typing');
  const timers = useRef<ReturnType<typeof window.setTimeout>[]>([]);

  useEffect(() => {
    setPhase('typing');
    timers.current.forEach(clearTimeout);
    timers.current = [];
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [text, isActive, allowDelete]);

  useEffect(() => {
    if (!isActive) {
      setPhase('typing');
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (prefersReducedMotion) {
      if (!allowDelete) return;
      const t = window.setTimeout(() => onDeleteComplete?.(), Math.max(200, pauseAfterTypeMs));
      timers.current.push(t);
      return () => timers.current.forEach(clearTimeout);
    }
  }, [isActive, prefersReducedMotion, allowDelete, pauseAfterTypeMs, onDeleteComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement> | undefined}
      style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', alignItems: 'center' }}
    >
      {prefersReducedMotion ? (
        <span style={{ fontSize: 13, color: placeholderColor, userSelect: 'none' }}>{text}</span>
      ) : (
        <motion.div
          key={text}
          initial={{ width: '0%' }}
          animate={
            phase === 'typing' ? { width: '100%' } :
            phase === 'deleting' ? { width: '0%' } :
            { width: '100%' }
          }
          transition={
            phase === 'typing' ? { duration: typeDurationMs / 1000, ease: 'linear' } :
            phase === 'deleting' ? { duration: deleteDurationMs / 1000, ease: 'linear' } :
            {}
          }
          onAnimationComplete={() => {
            if (phase === 'typing') {
              setPhase('paused');
              if (allowDelete) {
                const t = window.setTimeout(() => setPhase('deleting'), pauseAfterTypeMs);
                timers.current.push(t);
              }
            } else if (phase === 'deleting') {
              onDeleteComplete?.();
            }
          }}
          style={{ display: 'inline-flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          <span style={{ fontSize: 13, color: placeholderColor, userSelect: 'none' }}>{text}</span>
          <motion.span
            aria-hidden
            style={{
              display: 'inline-block', width: 1, marginLeft: 3,
              height: '1em', verticalAlign: 'middle',
              background: cursorColor,
            }}
            animate={
              phase === 'typing' || phase === 'paused'
                ? { opacity: [0, 1, 0] }
                : { opacity: 0 }
            }
            transition={
              phase === 'typing' || phase === 'paused'
                ? { repeat: Infinity, duration: 0.9, ease: 'linear' }
                : { duration: 0.1 }
            }
          />
        </motion.div>
      )}
    </div>
  );
};

export interface SuggestiveSearchProps {
  onChange?: (val: string) => void;
  suggestions?: string[];
  style?: React.CSSProperties;
  placeholderColor?: string;
  cursorColor?: string;
  inputColor?: string;
  typeDurationMs?: number;
  deleteDurationMs?: number;
  pauseAfterTypeMs?: number;
  animateMode?: 'infinite' | 'once';
}

export const SuggestiveSearch: React.FC<SuggestiveSearchProps> = ({
  onChange,
  suggestions = ['Search modules, sessions...'],
  style,
  placeholderColor = 'rgba(255,230,170,0.38)',
  cursorColor = 'rgba(201,168,76,0.65)',
  inputColor = '#fafafa',
  typeDurationMs = 480,
  deleteDurationMs = 260,
  pauseAfterTypeMs = 2000,
  animateMode = 'infinite',
}) => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const current = useMemo(() => suggestions[index] ?? '', [suggestions, index]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const leadingRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [leftOffsetPx, setLeftOffsetPx] = useState<number | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const lead = leadingRef.current;
    if (!wrapper) return;
    const update = () => {
      const cs = getComputedStyle(wrapper);
      const padLeft = parseFloat(cs.paddingLeft || '0');
      const leadW = lead?.getBoundingClientRect().width ?? 0;
      setLeftOffsetPx(padLeft + leadW + 8);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    if (lead) ro.observe(lead);
    return () => ro.disconnect();
  }, []);

  const isLast = index === suggestions.length - 1;
  const allowDelete = animateMode === 'infinite' ? true : !isLast;
  const overlayActive = !search && !isFocused;

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      {/* Search icon */}
      <div ref={leadingRef} style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={placeholderColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={search}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={e => { setSearch(e.target.value); onChange?.(e.target.value); }}
        style={{
          background: 'transparent', outline: 'none', border: 'none',
          fontSize: 13, color: inputColor, width: '100%', minWidth: 140,
        }}
        placeholder=""
        aria-label="search"
      />

      {overlayActive && (
        <div
          ref={overlayRef}
          aria-hidden
          style={{
            position: 'absolute',
            left: leftOffsetPx != null ? `${leftOffsetPx}px` : '36px',
            right: '14px',
            top: 0, bottom: 0,
            display: 'flex', alignItems: 'center',
            pointerEvents: 'none',
            overflow: 'hidden', whiteSpace: 'nowrap',
          }}
        >
          <TypewriterEffect
            text={current}
            isActive={overlayActive}
            allowDelete={allowDelete}
            typeDurationMs={typeDurationMs}
            deleteDurationMs={deleteDurationMs}
            pauseAfterTypeMs={pauseAfterTypeMs}
            prefersReducedMotion={prefersReduced}
            onDeleteComplete={() => setIndex(i => (i + 1) % suggestions.length)}
            containerRef={overlayRef}
            placeholderColor={placeholderColor}
            cursorColor={cursorColor}
          />
        </div>
      )}
    </div>
  );
};

export default SuggestiveSearch;
