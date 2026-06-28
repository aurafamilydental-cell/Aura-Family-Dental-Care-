"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import Image from "next/image";

export default function RestorativeDentistry() {
  const handleOpenBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32">
        {/* Intro */}
        <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Restorative Care</span>
          <AnimatedText
            as="h1"
            text="Restoring oral health, comfortably."
            className="mb-6"
            textClassName="text-h2 text-accent leading-tight whitespace-nowrap"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            If you have a broken tooth, decay, or missing teeth, we rebuild your smile with conservative fillings, crowns, and implants designed for longevity.
          </p>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-accent">No lectures, just solutions.</h2>
              <p className="text-accent/70 text-lg leading-relaxed">
                Many patients avoid restorative work because they fear being scolded or lectured about past dental neglect. At Aura, we look forward, not backward. We focus on getting you out of discomfort and restoring your bite.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Composite (Tooth-Colored) Fillings</h4>
                    <p className="text-accent/60 text-base">We use durable, metal-free composite resins that bond directly to your enamel, preserving tooth structure.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Porcelain Crowns & Inlays</h4>
                    <p className="text-accent/60 text-base">Custom-crafted restorations to reinforce cracked or heavily decayed teeth, designed to blend with your natural smile.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Implant Restoration</h4>
                    <p className="text-accent/60 text-base">A permanent solution for missing teeth. Implants function and feel exactly like natural teeth, protecting your jawbone.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Image */}
            <div className="relative aspect-[4/3] rounded-brand overflow-hidden border border-primary/10">
              <Image
                src="/doctor-patient.JPG"
                alt="Conservative Dentistry - Painless Wand Numbing"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

          </div>
        </section>

        {/* Numbing Focus */}
        <section className="py-20 px-6 md:px-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-6">Painless Numbing Technology</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              The primary source of pain in restorative procedures is the speed of anesthetic delivery. We use computer-controlled numbing wands that deliver anesthetic drop-by-drop at a pressure that is completely imperceptible. No heavy syringes, no fear.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading text-accent mb-6">Get relief and restore your health today.</h2>
            <p className="text-accent/70 text-lg mb-10">
              Schedule a visit. We will outline a clear, prioritized care plan with upfront costs before any work begins.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
            >
              Book Care Visit
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
