"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function CosmeticDentistry() {
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
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Cosmetic Services</span>
          <AnimatedText
            as="h1"
            text="Smile design that feels completely natural."
            className="mb-6"
            textClassName="text-h2 text-accent leading-tight"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            We focus on custom, conservative cosmetic treatments designed to enhance your confidence while keeping your original teeth strong and healthy.
          </p>
        </section>

        {/* Transformation & Copy Grid */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-accent">Confidence begins with a natural look.</h2>
              <p className="text-accent/70 text-lg leading-relaxed">
                We believe that cosmetic dentistry should never look artificial. Whether you want to fix a chipped tooth, brighten discolored enamel, or close a gap, our approach matches your unique facial structure.
              </p>
              
              {/* Treatments List */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Gentle Teeth Whitening</h4>
                    <p className="text-accent/60 text-base">Professional in-office whitening and customized take-home trays with low-sensitivity formulas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Composite Bonding</h4>
                    <p className="text-accent/60 text-base">A conservative, single-visit restoration to repair minor chips, spacing, or wear without drilling healthy enamel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold">✓</span>
                  <div>
                    <h4 className="font-heading text-accent text-lg">Premium Veneers</h4>
                    <p className="text-accent/60 text-base">Ultra-thin, handmade porcelain shells designed to align or reshape your smile with minimal tooth preparation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Before/After Slider */}
            <div>
              <BeforeAfterSlider
                beforeImage="/smile-before.jpg"
                afterImage="/smile-after.jpg"
                beforeLabel="Before Restoration"
                afterLabel="After Cosmetic Bonding"
              />
            </div>

          </div>
        </section>

        {/* Philosophy Block */}
        <section className="py-20 px-6 md:px-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-6">Our Cosmetic Oath: Protect Your Enamel</h2>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              Many dental chains push aggressive veneers that require grinding down healthy teeth. At Aura, we take a conservative approach. We explore non-invasive bonding and alignment first, preserving as much of your natural tooth structure as possible.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading text-accent mb-6">Explore the possibilities for your smile.</h2>
            <p className="text-accent/70 text-lg mb-10">
              Schedule a personalized cosmetic consultation to discuss your goals with Dr. Founder.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
