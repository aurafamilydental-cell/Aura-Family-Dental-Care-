/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function Accessibility() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32 pb-24">
        <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Legal Information</span>
          <AnimatedText
            as="h1"
            text="Accessibility Statement"
            className="mb-6 justify-center"
            textClassName="text-h2 text-accent leading-tight text-center"
            underlineClassName="text-primary"
          />
          <p className="text-accent/50 text-sm tracking-wider uppercase font-semibold">Last Updated: June 16, 2026</p>
        </section>

        <section className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="space-y-10 text-accent/80 leading-relaxed text-lg font-body">
            <p>
              Aura Family Dental Care is committed to ensuring digital accessibility for people of all abilities. We are continuously improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">1. Conformance Status</h3>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Aura's website aims to conform with WCAG 2.1 Level AA standards.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">2. Accessibility Features</h3>
              <p>
                We have designed this site with the following accessibility highlights:
              </p>
              <ul className="list-disc pl-5 space-y-3 mt-3">
                <li>Proper heading hierarchy for screen reader navigation.</li>
                <li>Alternative text (alt text) for visual components and graphics.</li>
                <li>Strong color contrast variables that meet contrast ratio requirements.</li>
                <li>Keyboard-navigable menus, forms, and custom booking triggers.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">3. Feedback & Contact</h3>
              <p>
                We welcome your feedback on the accessibility of Aura's website. If you encounter accessibility barriers, please contact us at:
              </p>
              <address className="not-italic text-lg text-accent/70 mt-3 font-semibold">
                Email: accessibility@aurafamilydental.com<br />
                Phone: (+233) 0544079966
              </address>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
