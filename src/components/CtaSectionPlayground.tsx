"use client";

import Image from "next/image";
import { ScrollReveal, ScrollRevealItem } from "./ui/scroll-reveal";
import { AnimatedText } from "./ui/animated-underline-text-one";
import { cn } from "@/lib/utils";

export default function CtaSectionPlayground() {
  const handleOpenBooking = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  return (
    <section className="py-20 bg-background overflow-visible relative">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* ========================================================== */}
        {/* DESKTOP VIEW (Always visible on lg, hidden on mobile)      */}
        {/* ========================================================== */}
        <ScrollReveal
          className="hidden lg:grid relative bg-primary text-white rounded-[40px] overflow-hidden p-6 sm:p-12 lg:p-20 shadow-2xl grid-cols-12 gap-8 items-center min-h-[380px] [isolation:isolate]"
          style={{
            transform: "translateZ(0)",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}
        >
          {/* Background Image overlay with mix-blend-overlay for watermark effect */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "url('/cta-banner-bg.png')",
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-[#b534e6]/80 to-primary/95 pointer-events-none"></div>

          {/* Absolute white porcelain tooth inside card (clipped by card boundary) */}
          <div className="absolute left-0 bottom-0 top-0 w-[42%] select-none pointer-events-none z-10">
            <Image
              src="/white_glossy_tooth.png"
              fill
              className="object-contain object-left-bottom scale-105 origin-bottom-left"
              alt="Glossy White Porcelain Tooth Graphic"
              sizes="500px"
            />
          </div>

          {/* Left spacing column */}
          <div className="col-span-5"></div>

          {/* Right Content Column */}
          <div className="col-span-7 z-10 text-left flex flex-col items-start w-full relative z-20">
            <ScrollRevealItem>
              <AnimatedText
                as="h2"
                align="left"
                text={"Ready to Shine?\nYour New Smile Awaits!"}
                className="items-start mb-4"
                textClassName="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white text-left whitespace-pre-line"
                underlineClassName="text-white/80"
              />
            </ScrollRevealItem>

            <ScrollRevealItem>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
                Schedule your consultation today and take the first step towards
                perfect oral health.
              </p>
            </ScrollRevealItem>

            {/* Button row */}
            <ScrollRevealItem className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleOpenBooking}
                className="w-full sm:w-auto bg-white hover:bg-white/90 text-primary px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                Schedule Your First Visit
              </button>

              <a
                href="tel:+1234567890"
                className="w-full sm:w-auto border-2 border-white/40 hover:border-white hover:bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
              >
                Call Us Now
              </a>
            </ScrollRevealItem>
          </div>
        </ScrollReveal>

        {/* ========================================================== */}
        {/* MOBILE VIEW (Hidden on lg)                                 */}
        {/* ========================================================== */}
        <div className="block lg:hidden">
          <ScrollReveal>
            <ScrollRevealItem className="rounded-brand overflow-hidden shadow-md bg-white border border-purple-100/40 flex flex-col">
              <div className="relative h-64 w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600" 
                  alt="Happy Patient" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="font-heading text-3xl font-semibold leading-tight text-white whitespace-pre-line">
                    Ready to Shine?{"\n"}Your New Smile Awaits!
                  </h2>
                </div>
              </div>
              <div className="p-6 pt-6">
                <p className="text-accent/70 text-sm leading-relaxed mb-8">
                  Schedule your consultation today and take the first step towards perfect oral health. Our team is ready to welcome you.
                </p>
                <div className="flex flex-col w-full gap-3">
                  <button onClick={handleOpenBooking} className="px-6 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center w-full bg-primary text-white hover:bg-[#0f0521] shadow-lg shadow-primary/20">
                    Schedule Your First Visit
                  </button>
                  <a href="tel:+1234567890" className="px-6 py-3.5 rounded-full font-semibold transition-all flex items-center justify-center text-center w-full border-2 border-accent/20 hover:border-accent hover:bg-accent/5 text-accent">
                    Call Us Now
                  </a>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
