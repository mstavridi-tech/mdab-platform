"use client";

import React, { useEffect, useRef } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { LoginModal } from "@/components/ui/login-modal";

export default function MinimalHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loginOpen, setLoginOpen] = React.useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    type Particle = {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeDelay: number;
      fadeStart: number;
      fadingOut: boolean;
    };

    let particles: Particle[] = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p: Particle) => {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 5 + 0.1;
      p.opacity = 0.7;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="minimal-root">
      <style suppressHydrationWarning>{`
@import url('https://fonts.cdnfonts.com/css/hubot-sans');

.minimal-root, .minimal-root * {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.minimal-root {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  --bg: #060608;
  --fg: #fafafa;
  --muted: #8a8a8a;
  --border: rgba(201, 168, 76, 0.18);
  --accent: #C9A84C;
  --gold: #C9A84C;
  --gold-bright: #E2C472;

  background: var(--bg);
  color: var(--fg);
  font-family: 'Hubot Sans', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
}

/* header */
.header {
  position: absolute;
  top: 0; left: 0; right: 0;
  padding: 16px 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid var(--border);
}
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
}
.nav a {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 200ms ease;
}
.nav a:hover {
  color: var(--fg);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
}
.btn-ghost {
  height: 34px;
  padding: 0 18px;
  background: transparent;
  color: rgba(250,250,250,0.55);
  border: 1px solid rgba(250,250,250,0.15);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 200ms ease, border-color 200ms ease;
}
.btn-ghost:hover {
  color: rgba(250,250,250,0.9);
  border-color: rgba(250,250,250,0.35);
}
.btn-outline-gold {
  height: 34px;
  padding: 0 18px;
  background: transparent;
  color: var(--gold);
  border: 1px solid rgba(201,168,76,0.5);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 200ms ease, border-color 200ms ease;
}
.btn-outline-gold:hover {
  background: rgba(201,168,76,0.08);
  border-color: rgba(201,168,76,0.8);
}
.brand {
  text-decoration: none;
  display: flex;
  align-items: center;
}
.logo {
  height: 36px;
  width: auto;
  object-fit: contain;
}
.cta {
  height: 36px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--gold);
  color: #060608;
  border: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 36px;
  cursor: pointer;
  transition: background 200ms ease;
}
.cta:hover { background: var(--gold-bright); }

/* hero center */
.hero {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}
.kicker {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
  opacity: 0.8;
}
.title {
  font-weight: 700;
  font-size: clamp(36px, 8vw, 90px);
  line-height: 1.1;
  margin: 0;
  padding-bottom: 4px;
  background: linear-gradient(135deg, #E2C472 0%, #C9A84C 40%, #fafafa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  letter-spacing: -0.02em;
}
.subtitle {
  margin-top: 18px;
  font-size: clamp(14px, 2.2vw, 18px);
  color: var(--muted);
}
.supporting {
  margin-top: 24px;
  font-size: 13px;
  color: var(--muted);
  opacity: 0.6;
  line-height: 1.7;
}
.hero-buttons {
  margin-top: 32px;
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
  pointer-events: all;
}
.btn-secondary {
  height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  border: 1px solid rgba(201,168,76,0.25);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease;
}
.btn-secondary:hover {
  border-color: rgba(201,168,76,0.6);
  color: var(--fg);
}

/* accent lines container */
.accent-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* base line visuals */
.hline, .vline {
  position: absolute;
  background: var(--gold);
  opacity: .12;
  will-change: transform, opacity;
}

/* horizontal lines */
.hline {
  height: 1px; left: 0; right: 0;
  transform: scaleX(0);
  transform-origin: 50% 50%;
  animation: drawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
}
.hline:nth-child(1){ top: 20%; animation-delay: 150ms; }
.hline:nth-child(2){ top: 50%; animation-delay: 280ms; }
.hline:nth-child(3){ top: 80%; animation-delay: 410ms; }

/* vertical lines */
.vline {
  width: 1px; top: 0; bottom: 0;
  transform: scaleY(0);
  transform-origin: 50% 0%;
  animation: drawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
}
.vline:nth-child(4){ left: 20%; animation-delay: 520ms; }
.vline:nth-child(5){ left: 50%; animation-delay: 640ms; }
.vline:nth-child(6){ left: 80%; animation-delay: 760ms; }

/* gold shimmer while drawing */
.hline::after, .vline::after{
  content:"";
  position:absolute;
  inset:0;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,.5), transparent);
  opacity:0;
  animation: shimmer 900ms ease-out forwards;
}
.hline:nth-child(1)::after{ animation-delay: 150ms; }
.hline:nth-child(2)::after{ animation-delay: 280ms; }
.hline:nth-child(3)::after{ animation-delay: 410ms; }
.vline:nth-child(4)::after{ animation-delay: 520ms; }
.vline:nth-child(5)::after{ animation-delay: 640ms; }
.vline:nth-child(6)::after{ animation-delay: 760ms; }

/* keyframes */
@keyframes drawX {
  0% { transform: scaleX(0); opacity: 0; }
  60% { opacity: .35; }
  100% { transform: scaleX(1); opacity: .12; }
}
@keyframes drawY {
  0% { transform: scaleY(0); opacity: 0; }
  60% { opacity: .35; }
  100% { transform: scaleY(1); opacity: .12; }
}
@keyframes shimmer {
  0% { opacity: .0; }
  30% { opacity: .25; }
  100% { opacity: 0; }
}

/* canvas */
.particleCanvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: .6;
}

/* footer section (copy) */
.content {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 32px 24px;
  border-top: 1px solid var(--border);
  display: grid;
  place-items: center;
  text-align: center;
  gap: 6px;
}
.content .tag {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.content .heading {
  font-size: 20px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.content .desc {
  font-size: 14px;
  color: var(--muted);
  max-width: 680px;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .header {
    grid-template-columns: 1fr auto;
    padding: 14px 20px;
  }
  .nav {
    display: none;
  }
  .header-actions {
    gap: 8px;
  }
  .btn-ghost, .btn-outline-gold {
    height: 32px;
    padding: 0 14px;
    font-size: 10px;
    white-space: nowrap;
  }
  .logo {
    height: 28px;
  }
  .hero {
    top: 56px;
    bottom: 80px;
    padding: 0 24px;
  }
  .kicker {
    font-size: 9px;
    letter-spacing: 0.14em;
    margin-bottom: 12px;
  }
  .title {
    font-size: clamp(36px, 10vw, 60px);
    letter-spacing: -0.02em;
  }
  .subtitle {
    font-size: 14px;
    margin-top: 14px;
  }
  .subtitle br {
    display: none;
  }
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
  }
  .hero-buttons > * {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
  .btn-secondary {
    width: 100%;
    max-width: 320px;
    height: 44px;
    font-size: 12px;
  }
  .supporting {
    font-size: 12px;
    margin-top: 20px;
  }
  .supporting br {
    display: none;
  }
  .content {
    padding: 20px 16px;
  }
}
      `}</style>

      {/* Header */}
      <header className="header">
        <a className="brand" href="#">
          <img src="/ta-logo.png" alt="Tyron Ash International" className="logo" />
        </a>
        <nav className="nav">
          <a href="#">Course</a>
          <a href="#">About</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </nav>
        <div className="header-actions">
          <button className="btn-ghost" onClick={() => setLoginOpen(true)}>Log In</button>
          <button className="btn-outline-gold">Enroll</button>
        </div>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      </header>

      {/* Particles */}
      <canvas ref={canvasRef} className="particleCanvas" />

      {/* Accent Lines (now animated on mount) */}
      <div className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      {/* Hero */}
      <main className="hero">
        <div>
          <div className="kicker">The Blueprint for Elite Agents</div>
          <h1 className="title">Million Dollar<br/>Agent Blueprint</h1>
          <p className="subtitle">The exact system Tyron Ash used to build a<br/>9-figure international real estate empire.</p>
          <div className="hero-buttons">
            <ShinyButton>Enroll Now — Join the Elite</ShinyButton>
            <button className="btn-secondary">See the Course</button>
          </div>
          <p className="supporting">Strategy. Mindset. Execution. — Stop guessing. Start closing.<br/>The proven frameworks used by the world&apos;s top luxury agents.</p>
        </div>
      </main>

    </section>
  );
}
