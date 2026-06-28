"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32 pb-24">
        <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Legal Information</span>
          <AnimatedText
            as="h1"
            text="Privacy Policy"
            className="mb-6 justify-center"
            textClassName="text-h2 text-accent leading-tight text-center"
            underlineClassName="text-primary"
          />
          <p className="text-accent/50 text-sm tracking-wider uppercase font-semibold">Last Updated: June 16, 2026</p>
        </section>

        <section className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="space-y-10 text-accent/80 leading-relaxed text-base md:text-lg font-body">
            <p>
              At Aura Family Dental Care, we protect the privacy of our patient information. This Privacy Policy details how we collect, store, verify, and handle data when you visit our website, use our custom booking form, or communicate with us.
            </p>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">1. HIPAA & Health Information Privacy</h3>
              <p>
                As a healthcare provider, our handling of Protected Health Information (PHI) is strictly governed by the Health Insurance Portability and Accountability Act (HIPAA). Information submitted via our booking portals is handled securely, stored in compliant databases, and shared only in accordance with HIPAA standards for treatment coordination and billing.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">2. Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Direct Contact Info:</strong> Name, phone number, email address, and reason for visit provided during booking.
                </li>
                <li>
                  <strong>Family & Child Info:</strong> Names and ages of minor dependents when booking family visits.
                </li>
                <li>
                  <strong>Insurance Data:</strong> PPO provider details for eligibility and coverage validation.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">3. Calendar Integration</h3>
              <p>
                Our scheduling system integrates with secure calendar APIs (including Google Calendar) to register appointment placeholders. Patient details are stored privately inside encrypted event fields accessible only to verified clinic administrators.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">4. Your Rights</h3>
              <p>
                Under HIPAA and privacy laws, you have the right to request a copy of your records, request amendments to inaccuracies, or ask for details about how your private contact information is utilized.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
