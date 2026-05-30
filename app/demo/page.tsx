'use client';
import MinimalHero from "@/components/ui/hero-minimalism";
import CredibilitySection from "@/components/ui/credibility-section";

export default function DemoOne() {
  return (
    <div style={{ background: '#060608', minHeight: '100vh' }}>
      {/* Hero takes the first full screen */}
      <div style={{ height: '100vh', position: 'relative' }}>
        <MinimalHero />
      </div>
      {/* Everything below scrolls naturally */}
      <CredibilitySection />
    </div>
  );
}
