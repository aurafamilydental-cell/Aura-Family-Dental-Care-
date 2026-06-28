"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    // While practically they declined, we hide the banner anyway
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[400px] z-50 bg-white border border-border-subtle rounded-[var(--radius-brand)] shadow-2xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Cookie size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-heading font-semibold text-accent text-lg">We use cookies</h3>
            </div>
            <button
              onClick={handleDecline}
              className="text-black/40 hover:text-black/80 transition-colors p-1"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
          
          <p className="text-[13px] text-accent/70 leading-relaxed mb-6">
            We use cookies to improve your experience and analyze site traffic. By continuing to use this website, you agree to our use of cookies as described in our{" "}
            <Link href="/privacy" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium text-sm py-2.5 rounded-[var(--radius-brand)] transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-black/5 hover:bg-black/10 text-accent font-medium text-sm py-2.5 rounded-[var(--radius-brand)] transition-colors"
            >
              Decline Optional
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
