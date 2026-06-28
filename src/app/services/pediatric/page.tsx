/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import Image from "next/image";

export default function PediatricDentistry() {
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
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Pediatric Services</span>
          <AnimatedText
            as="h1"
            text="Gentle dental care built for growing smiles."
            className="mb-6"
            textClassName="text-h2 text-accent leading-tight"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            We make visits positive and fun. By taking things slow and speaking in simple terms, we help children feel safe and excited about dental health.
          </p>
        </section>

        {/* Fun features */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-accent">Making children's visits positive.</h2>
              <p className="text-accent/70 text-lg leading-relaxed">
                A child's early dental experiences shape their view of oral care for life. Our team uses positive reinforcement, gentle explanations, and distractions to make cleanings feel like a breeze.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Favorite Shows on Ceiling Screens</h4>
                    <p className="text-accent/60 text-base">We have screens mounted on the ceiling above our dental chairs so kids can stream their favorite cartoon or movie.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Kid-Friendly Terminology</h4>
                    <p className="text-accent/60 text-base">We call the suction the "thirsty straw" and the polisher the "tooth tickler" to avoid scary clinical jargon.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Wait-Time Gaming Hubs</h4>
                    <p className="text-accent/60 text-base">Kids can play gaming consoles in our lounge before their appointment, replacing nerves with play.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Image */}
            <div className="relative aspect-[4/3] rounded-brand overflow-hidden border border-primary/10">
              <Image
                src="/kids section.JPG"
                alt="Gentle First Visits - Stickers & treats after visits"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

          </div>
        </section>

        {/* First Visit Philosophy */}
        <section className="py-20 px-6 md:px-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-6">The "Happy Visit" Philosophy</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              If your child is under 3 or extremely nervous, we start with a "Happy Visit." This is a quick, low-pressure appointment where we show them the chair, count their teeth, and give them a prize. No treatment, just building a foundation of comfort and trust.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading text-accent mb-6">Schedule your child's visit today.</h2>
            <p className="text-accent/70 text-lg mb-10">
              Select "My Child" in our custom booking form to specify their comfort options.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
            >
              Book Child Visit
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
