"use client";

import { useState, useEffect } from "react";
import PricingModal from "./PricingModal";
import LoginModal from "./LoginModal";

export default function Modals() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const openPricing = () => setModal("pricing");
    const openLogin = () => setModal("login");
    window.addEventListener("open-pricing-modal", openPricing);
    window.addEventListener("open-login-modal", openLogin);
    return () => {
      window.removeEventListener("open-pricing-modal", openPricing);
      window.removeEventListener("open-login-modal", openLogin);
    };
  }, []);

  useEffect(() => {
    if (!modal) return;
    const handleKey = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modal]);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  if (modal === "pricing") return <PricingModal onClose={() => setModal(null)} />;
  if (modal === "login") return <LoginModal onClose={() => setModal(null)} />;
  return null;
}
