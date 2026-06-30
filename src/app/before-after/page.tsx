/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";

export default function BeforeAfterGallery() {
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
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Smile Gallery</span>
          <AnimatedText
            as="h1"
            text="See the transformations for yourself."
            className="mb-6 justify-center"
            textClassName="text-h2 text-accent leading-tight"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            Explore authentic, natural outcomes from real Aura patients. Drag the sliders to compare before and after results.
          </p>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
            
            {/* Case 1 */}
            <ScrollReveal staggerChildren={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col justify-center">
                <ScrollRevealItem>
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Case study 01</span>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <h3 className="font-heading text-3xl md:text-4xl text-accent mb-4">Composite Bonding</h3>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <p className="text-accent/70 text-lg mb-8 leading-relaxed">
                    This patient wanted to address chips and uneven spacing in their front teeth. Using a conservative composite bonding technique, we restored the length and shape of the teeth in a single, pain-free visit.
                  </p>
                </ScrollRevealItem>
                <ScrollRevealItem className="border-l-2 border-primary pl-6 my-8">
                  <p className="italic text-accent/80 text-base mb-2">
                    "I was self-conscious about my chipped front tooth for years. Dr. Founder completed the restoration in under an hour, and it looks completely natural."
                  </p>
                  <cite className="text-accent/60 text-sm font-semibold not-italic">
                    — Patient Review
                  </cite>
                </ScrollRevealItem>
              </div>
              <ScrollRevealItem>
                <BeforeAfterSlider
                  beforeImage="/smile-before.jpg"
                  afterImage="/smile-after.jpg"
                  beforeLabel="Before Treatment"
                  afterLabel="After Composite Bonding"
                />
              </ScrollRevealItem>
            </ScrollReveal>

            {/* Case 2 */}
            <ScrollReveal staggerChildren={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:flex-row-reverse">
              <div className="flex flex-col justify-center lg:order-2">
                <ScrollRevealItem>
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Case study 02</span>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <h3 className="font-heading text-3xl md:text-4xl text-accent mb-4">Conservative Porcelain Veneers</h3>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <p className="text-accent/70 text-lg mb-8 leading-relaxed">
                    To correct moderate discoloration and minor misalignment, we designed thin porcelain veneers that respect the patient's biological tooth structure and facial aesthetics.
                  </p>
                </ScrollRevealItem>
                <ScrollRevealItem className="border-l-2 border-primary pl-6 my-8">
                  <p className="italic text-accent/80 text-base mb-2">
                    "I wanted a brighter, straighter smile but feared having my healthy teeth filed down. Aura's conservative approach was exactly what I was looking for."
                  </p>
                  <cite className="text-accent/60 text-sm font-semibold not-italic">
                    — Patient Review
                  </cite>
                </ScrollRevealItem>
              </div>
              <ScrollRevealItem className="lg:order-1">
                <BeforeAfterSlider
                  beforeImage="/smile-before.jpg"
                  afterImage="/smile-after.jpg"
                  beforeLabel="Before Treatment"
                  afterLabel="After Veneers"
                />
              </ScrollRevealItem>
            </ScrollReveal>

          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-accent mb-6 tracking-tight">Ready to design your custom smile plan?</h2>
            <p className="text-accent/70 text-lg md:text-xl mb-8 md:mb-10 font-body">
              Schedule a cosmetic consultation to explore what is possible for your teeth.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-semibold text-base md:text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/30 cursor-pointer w-full sm:w-auto inline-flex justify-center items-center gap-2"
            >
              <span>Schedule Your First Visit</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
