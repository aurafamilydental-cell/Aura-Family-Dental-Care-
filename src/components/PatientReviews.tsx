/* eslint-disable */
"use client";

import Image from "next/image";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function PatientReviews() {
  const handleOpenBooking = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  return (
    <section id="reviews" className="pt-16 pb-12 md:py-24 bg-[#FAF9FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Info and CTA */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <ScrollReveal staggerChildren={0.1}>
              <ScrollRevealItem>
                <span className="text-primary font-semibold tracking-wider uppercase text-xs md:text-sm mb-4 block font-body">
                  Feedback
                </span>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <AnimatedText
                  as="h2"
                  text={"Stories From\nOur Happy Patients"}
                  className="items-center lg:items-start mb-3 md:mb-6"
                  textClassName="text-h2 text-accent font-heading font-normal leading-[1.1] text-center lg:text-left whitespace-pre-line"
                  underlineClassName="text-primary"
                />
              </ScrollRevealItem>
              <ScrollRevealItem>
                <p className="text-accent/70 text-base md:text-lg leading-relaxed font-body mb-2 md:mb-8 max-w-md mx-auto lg:mx-0">
                  Don't just take our word for it. Here is what our dental clinic community has to say about our gentle, pain-free treatments.
                </p>
              </ScrollRevealItem>
              <ScrollRevealItem className="hidden lg:block">
                <button 
                  onClick={handleOpenBooking}
                  className="bg-primary text-white hover:bg-[#0f0521] px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Read More Stories
                </button>
              </ScrollRevealItem>
            </ScrollReveal>
          </div>

          {/* Right Testimonial Cards Layout (Staggered Grid) */}
          <div className="lg:col-span-7">
            <ScrollReveal
              staggerChildren={0.15}
              className="flex items-stretch overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 gap-6 md:items-start"
            >
              {/* Stagger column 1 */}
              <div className="contents md:block md:space-y-6">
                
                {/* Testimonial 1 */}
                <ScrollRevealItem className="flex-none w-[85vw] sm:w-[320px] md:w-auto flex flex-col snap-center shrink-0 md:shrink bg-white border border-purple-100/40 p-6 rounded-brand shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="text-amber-400 text-sm mb-4">★★★★★</div>
                  <p className="text-accent/80 text-sm leading-relaxed mb-6 font-body">
                    &ldquo;The clinic is beautiful, modern and the staff made me feel completely relaxed. Best cleaning ever!&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-100 shrink-0">
                      <Image 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" 
                        alt="Ama Boateng"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-accent text-sm font-heading">Ama Boateng</h4>
                      <p className="text-xs text-accent/60 font-body">Koforidua &bull; Invisalign</p>
                    </div>
                  </div>
                </ScrollRevealItem>
                
                {/* Testimonial 2 */}
                <ScrollRevealItem className="flex-none w-[85vw] sm:w-[320px] md:w-auto flex flex-col snap-center shrink-0 md:shrink bg-white border border-purple-100/40 p-6 rounded-brand shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="text-amber-400 text-sm mb-4">★★★★★</div>
                  <p className="text-accent/80 text-sm leading-relaxed mb-6 font-body">
                    &ldquo;Quick, gentle and transparent. They took detailed diagnostic images and showed me exactly what was happening. Pain-free!&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-100 shrink-0">
                      <Image 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" 
                        alt="Kofi Mensah"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-accent text-sm font-heading">Kofi Mensah</h4>
                      <p className="text-xs text-accent/60 font-body">Koforidua &bull; Teeth Whitening</p>
                    </div>
                  </div>
                </ScrollRevealItem>

              </div>
              
              {/* Stagger column 2 */}
              <div className="contents md:block md:space-y-6 md:mt-12">
                
                {/* Testimonial 3 (Highlighted) */}
                <ScrollRevealItem className="flex-none w-[85vw] sm:w-[320px] md:w-auto flex flex-col snap-center shrink-0 md:shrink bg-primary border border-primary/20 p-6 rounded-brand shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 text-white relative">
                  <div className="text-amber-300 text-sm mb-4">★★★★★</div>
                  <p className="text-purple-50 text-sm leading-relaxed mb-6 font-body">
                    &ldquo;The Best Dental Experience I've Ever Had. The Staff Was Incredibly Friendly And The Procedure Was Painless. Strongly recommend!&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                      <Image 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150" 
                        alt="Esi Owusu"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm font-heading">Esi Owusu</h4>
                      <p className="text-xs text-purple-200 font-body">Koforidua &bull; Emergency Care</p>
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold border border-white/10 font-body">Highlighted</span>
                </ScrollRevealItem>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Mobile CTA (Hidden on Desktop) */}
        <div className="mt-2 flex justify-center lg:hidden">
          <ScrollReveal>
            <ScrollRevealItem>
              <button 
                onClick={handleOpenBooking}
                className="bg-primary text-white hover:bg-[#0f0521] px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Read More Stories
              </button>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
