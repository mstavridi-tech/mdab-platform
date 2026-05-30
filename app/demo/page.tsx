'use client';
import { useEffect, useRef, useState } from 'react';
import MinimalHero from "@/components/ui/hero-minimalism";
import CredibilitySection from "@/components/ui/credibility-section";
import FeaturesSection from "@/components/ui/features-section";
import HowItWorks from "@/components/ui/how-it-works";
import CurriculumSection from "@/components/ui/curriculum-section";
import TestimonialsSection from "@/components/ui/testimonials-section";
import AboutSection from "@/components/ui/about-section";
import AffiliateSection from "@/components/ui/affiliate-section";
import AgentsSection from "@/components/ui/agents-section";
import SiteFooter from "@/components/ui/site-footer";
import ScrollText from "@/components/ui/scroll-text";
import { PricingModal } from "@/components/ui/pricing-modal";
import CheckoutModal, { Plan } from "@/components/ui/checkout-modal";

export default function DemoOne() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  function handleSelectPlan(plan: Plan) {
    setPricingOpen(false);
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  }

  function handleBackToPricing() {
    setCheckoutOpen(false);
    setPricingOpen(true);
  }

  // Mouse-following gold glow
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.07;
      currentY += (mouseY - currentY) * 0.07;
      glow.style.transform = `translate(${currentX - 400}px, ${currentY - 400}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Aggressive fade-in — targets everything meaningful
  useEffect(() => {
    const SELECTORS = [
      '.fade-in',
      '.hiw-card',
      '.mod-card',
    ].join(', ');

    const els = document.querySelectorAll(SELECTORS);
    const seen = new Set<Element>();

    const obs = new IntersectionObserver(
      entries => entries.forEach((e, idx) => {
        if (e.isIntersecting && !seen.has(e.target)) {
          seen.add(e.target);
          const el = e.target as HTMLElement;
          const delay = el.dataset.delay || '0';
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
            el.style.filter = 'blur(0px)';
          }, parseInt(delay));
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el, i) => {
      if (seen.has(el)) return;
      const h = el as HTMLElement;
      // skip elements that are above the fold already
      const rect = h.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        seen.add(el);
        return;
      }
      h.style.opacity = '0';
      h.style.transform = 'translateY(52px) scale(0.98)';
      h.style.filter = 'blur(8px)';
      h.style.transition = `opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1), filter 700ms ease`;
      h.dataset.delay = String((i % 3) * 60);
      obs.observe(h);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: '#060608', minHeight: '100vh', position: 'relative', overflowX: 'clip' }}>

      {/* Mouse-following gold glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform',
        }}
      />

      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        plan={selectedPlan}
        onClose={() => setCheckoutOpen(false)}
        onBack={handleBackToPricing}
      />

      {/* Hero */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 2 }}>
        <MinimalHero onEnrol={() => setPricingOpen(true)} />
      </div>

      {/* All sections */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <CredibilitySection />
        <ScrollText />
        <FeaturesSection />
        <AgentsSection />
        <HowItWorks onEnrol={() => setPricingOpen(true)} />
        <CurriculumSection onEnrol={() => setPricingOpen(true)} />
        <AboutSection onEnrol={() => setPricingOpen(true)} />
        <TestimonialsSection />
        <AffiliateSection />
        <SiteFooter onEnrol={() => setPricingOpen(true)} />
      </div>

    </div>
  );
}
