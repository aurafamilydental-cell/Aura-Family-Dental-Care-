/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import Image from "next/image";

export default function FamilyDentistry() {
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
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Family Services</span>
          <AnimatedText
            as="h1"
            text="A dental home for every generation."
            className="mb-6"
            textClassName="text-h2 text-accent leading-tight whitespace-nowrap"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            We provide comprehensive dental care for kids, parents, and grandparents. Aura makes routine dental hygiene simple, convenient, and stress-free.
          </p>
        </section>

        {/* Focus on Convenience */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-accent">Coordinating dental visits shouldn't be a chore.</h2>
              <p className="text-accent/70 text-lg leading-relaxed">
                We know how busy family schedules are. That's why we offer Family Scheduling options to help you get cleanings and treatments for the entire family done in a single block of time.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Back-to-Back Appointments</h4>
                    <p className="text-accent/60 text-base">Book slots right after one another so you only make one trip and wait in our lounge.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Side-by-Side Cleanings</h4>
                    <p className="text-accent/60 text-base">Get cleanings at the same time in adjacent rooms with different hygienists to save hours.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Kids & Teen Care</h4>
                    <p className="text-accent/60 text-base">Gentle introductions to oral health, sealants to prevent decay, and alignment screening.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Image */}
            <div className="relative aspect-[4/3] rounded-brand overflow-hidden border border-primary/10">
              <Image
                src="/family-care-bento-black.png"
                alt="Family Comfort & Convenience"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </section>

        {/* Preventative Focus */}
        <section className="py-20 px-6 md:px-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-6">Our Focus: Long-Term Oral Health</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              Preventive dentistry is the core of family care. We focus on regular cleanings, low-radiation digital X-rays, screening for early-stage issues, and detailed patient guides to keep your family's smiles healthy and pain-free.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading text-accent mb-6">Coordinate your family's checkups today.</h2>
            <p className="text-accent/70 text-lg mb-10">
              Use our custom booking form to schedule appointments for multiple family members in a single step.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
            >
              Book Family Visit
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
