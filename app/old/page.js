import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import ModulesPreview from "@/components/ModulesPreview";
import AboutTyron from "@/components/AboutTyron";
import Reviews from "@/components/Reviews";
import AffiliateStrip from "@/components/AffiliateStrip";
import Footer from "@/components/Footer";
import Modals from "@/components/Modals";

export default function OldSite() {
  return (
    <main style={{ background: "#000", color: "#fff" }}>
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <ModulesPreview />
      <AboutTyron />
      <Reviews />
      <AffiliateStrip />
      <Footer />
      <Modals />
    </main>
  );
}
