"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { LoginModal } from "@/components/ui/login-modal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}
@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);    opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes footer-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
.animate-footer-breathe       { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee{ animation: footer-scroll-marquee 40s linear infinite; }

/* Grid bg */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(201,168,76,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(201,168,76,0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
/* Aurora */
.footer-aurora {
  background: radial-gradient(circle at 50% 50%, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 45%, transparent 70%);
}
/* Giant text — pure stroke, no clip, no overflow cut */
.footer-giant-bg-text {
  font-size: 22vw;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,76,0.08);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  display: block;
  padding-bottom: 0.2em;
}
/* Heading gradient */
.footer-text-glow {
  background: linear-gradient(160deg, #fafafa 0%, #E2C472 55%, rgba(201,168,76,0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow: visible;
  display: block;
}
/* CTA button — matches site ShinyButton aesthetic */
.footer-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  border-radius: 999px;
  background: linear-gradient(135deg, #E2C472 0%, #C9A84C 100%);
  color: #0a0800;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease;
  box-shadow: 0 4px 24px rgba(201,168,76,0.35);
  text-decoration: none;
}
.footer-cta-btn:hover {
  animation: footer-bounce 0.6s ease infinite;
  box-shadow: 0 8px 40px rgba(201,168,76,0.55);
}
/* Nav links — plain, no bubbles */
.footer-nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 28px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.footer-nav-links a {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 200ms ease;
}
.footer-nav-links a:hover { color: rgba(201,168,76,0.85); }
.footer-bottom-bar {
  position: relative;
  z-index: 20;
  padding: clamp(16px,2vw,24px) clamp(20px,4vw,48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(201,168,76,0.06);
  flex-wrap: wrap;
  gap: 12px;
}
@media (max-width: 768px) {
  .footer-bottom-bar {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
    padding-bottom: 20px;
  }
  .footer-bottom-bar p { font-size: 9px !important; letter-spacing: 0.08em !important; }
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (typeof window === "undefined") return;
      const el = localRef.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(el, { x: x * 0.35, y: y * 0.35, ease: "power2.out", duration: 0.4 });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, ease: "elastic.out(1,0.3)", duration: 1.2 });
        el.addEventListener("mousemove", onMove as any);
        el.addEventListener("mouseleave", onLeave);
        return () => { el.removeEventListener("mousemove", onMove as any); el.removeEventListener("mouseleave", onLeave); };
      }, el);
      return () => ctx.revert();
    }, []);
    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 48, padding: '0 24px', color: 'rgba(201,168,76,0.45)', fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
    <span>Million Dollar Agent Blueprint</span><span style={{ color: 'rgba(201,168,76,0.2)' }}>✦</span>
    <span>Tyron Ash International</span><span style={{ color: 'rgba(201,168,76,0.2)' }}>✦</span>
    <span>Dubai &amp; UK</span><span style={{ color: 'rgba(201,168,76,0.2)' }}>✦</span>
    <span>£500M+ Transactions</span><span style={{ color: 'rgba(201,168,76,0.2)' }}>✦</span>
    <span>500+ Agents Trained</span><span style={{ color: 'rgba(201,168,76,0.2)' }}>✦</span>
  </div>
);

const NAV = ['About', 'FAQ', 'Contact', 'Terms', 'Privacy'];

export default function SiteFooter({ onEnrol }: { onEnrol?: () => void }) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const giantRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantRef.current,
        { y: "8vh", opacity: 0 },
        { y: "0vh", opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo([headingRef.current, contentRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 45%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        ref={wrapperRef}
        style={{ position: 'relative', height: '100vh', width: '100%', clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <footer className="cinematic-footer-wrapper" style={{
          position: 'fixed', bottom: 0, left: 0,
          width: '100%', height: '100vh',
          background: '#060608', color: '#fafafa',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          overflow: 'clip',
        }}>
          {/* Aurora */}
          <div className="footer-aurora animate-footer-breathe" style={{ position: 'absolute', left: '50%', top: '50%', width: '80vw', height: '60vh', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
          <div className="footer-bg-grid" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

          {/* Giant BG text — bottom anchored */}
          <div ref={giantRef} className="footer-giant-bg-text" style={{ position: 'absolute', bottom: '2vh', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
            BLUEPRINT
          </div>

          {/* Marquee */}
          <div style={{ position: 'absolute', top: 48, left: 0, width: '100%', overflow: 'hidden', zIndex: 10, borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)', background: 'rgba(6,6,8,0.7)', backdropFilter: 'blur(8px)', padding: '14px 0', transform: 'rotate(-1.5deg) scaleX(1.1)' }}>
            <div className="animate-footer-scroll-marquee" style={{ display: 'flex', width: 'max-content' }}>
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 0', gap: 36 }}>
            <h2
              ref={headingRef}
              className="footer-text-glow"
              style={{ fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, textAlign: 'center', margin: 0, paddingBottom: '0.1em' }}
            >
              Ready to become<br />an elite agent?
            </h2>

            <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
              {/* Single CTA button */}
              <MagneticButton as="button" onClick={onEnrol} className="footer-cta-btn">
                Enrol Now — Join the Elite
              </MagneticButton>

              {/* Plain nav links */}
              <ul className="footer-nav-links">
                {NAV.map(label => (
                  <li key={label}>
                    <a href={`#${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setLoginOpen(true)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', transition: 'color 200ms ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.85)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
                  >
                    Member Login
                  </button>
                </li>
              </ul>
              <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
            </div>
          </div>

          {/* Bottom bar — back to top button + copyright stacked below BLUEPRINT text */}
          <div className="footer-bottom-bar">
            {/* Back to top — centred on mobile, left on desktop */}
            <MagneticButton
              as="button"
              className="footer-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', flexShrink: 0, transition: 'color 200ms ease, border-color 200ms ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.85)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)'; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>

            <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontWeight: 500, margin: 0 }}>
              © 2025 Tyron Ash International. All rights reserved.{' '}
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>{' '}
              Designed &amp; built by <span style={{ color: 'rgba(201,168,76,0.4)' }}>Maria Stavridi</span>
            </p>
          </div>

        </footer>
      </div>
    </>
  );
}
