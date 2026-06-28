/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import Image from "next/image";

export default function EmergencyDentistry() {
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
          <span className="text-red-500 font-semibold tracking-wider uppercase text-sm mb-3 block">Urgent Care</span>
          <AnimatedText
            as="h1"
            text="Same-day dental emergency care."
            className="mb-6"
            textClassName="text-h2 text-accent leading-tight whitespace-nowrap"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            In pain? Cracked a tooth? We save emergency spots in our calendar every single day to ensure you get out of discomfort quickly.
          </p>
        </section>

        {/* Contact Block */}
        <section className="relative max-w-3xl mx-auto mb-16 px-6">
          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-brand p-10 text-center shadow-xl">
            <h3 className="font-heading text-3xl text-accent mb-3">Need immediate assistance?</h3>
            <p className="text-accent/70 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              If you are experiencing severe swelling, uncontrollable bleeding, or absolute trauma, call us directly for immediate instructions.
            </p>
            <a
              href="tel:+233544079966"
              className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
            >
              CALL (+233) 0544079966
            </a>
          </div>
        </section>

        {/* What constitutes an emergency */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-accent">We are here to help, when it hurts.</h2>
              <p className="text-accent/70 text-lg leading-relaxed">
                A dental emergency can be incredibly stressful. We prioritize getting you diagnosed, numb, and comfortable immediately. We will explain your options clearly so you can choose the best path forward.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <span className="text-red-500 font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Severe Toothache</h4>
                    <p className="text-accent/60 text-base">Constant, throbbing pain that keeps you awake. We will isolate the issue and stop the pain.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-red-500 font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Chipped or Broken Tooth</h4>
                    <p className="text-accent/60 text-base">Rough edges can cut your tongue or lead to infection. We can seal and smooth the tooth in a single visit.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-red-500 font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Lost Crown or Filling</h4>
                    <p className="text-accent/60 text-base">Exposed nerves are highly sensitive. We can replace filling material or re-cement crowns quickly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Image */}
            <div className="relative aspect-[4/3] rounded-brand overflow-hidden border border-primary/10">
              <Image
                src="/emergency.JPG"
                alt="Daily Emergency Slots"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

          </div>
        </section>

        {/* Compassionate Care */}
        <section className="py-20 px-6 md:px-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-6">Compassionate Care When You Need It Most</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              Dental emergencies can be overwhelming, but you don't have to face them alone. Our dedicated team is trained to handle urgent situations with a calm and gentle approach, ensuring you get rapid relief and a clear plan for your recovery.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading text-accent mb-6">Book your emergency slot online.</h2>
            <p className="text-accent/70 text-lg mb-10">
              Check our live calendar availability for immediate openings.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
            >
              Check Live Slots
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
