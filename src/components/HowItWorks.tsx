"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: "Schedule an Appointment",
      description:
        "Contact us via phone or online to book a convenient time for your visit. Our team is ready to assist with any scheduling needs.",
      image: "/lounge_atmosphere.png",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6.5 h-6.5 text-white"
        >
          {/* Rounded calendar outer box */}
          <rect x="4" y="6" width="16" height="14" rx="2.5" />
          {/* Hanger loops */}
          <path d="M8 3v4M16 3v4" strokeLinecap="round" />
          {/* Horizontal divider line */}
          <path d="M4 11h16" strokeLinecap="round" />
          {/* Dots for days */}
          <circle cx="8" cy="14" r="0.75" fill="currentColor" />
          <circle cx="12" cy="14" r="0.75" fill="currentColor" />
          <circle cx="16" cy="14" r="0.75" fill="currentColor" />
          <circle cx="8" cy="17" r="0.75" fill="currentColor" />
          <circle cx="12" cy="17" r="0.75" fill="currentColor" />
          <circle cx="16" cy="17" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Consultation with Our Experts",
      description:
        "Meet our experienced dentists, who will carefully evaluate your oral health, discuss your concerns, and create a personalized treatment plan.",
      image: "/how-it-works.png",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6.5 h-6.5 text-white"
        >
          {/* Left earpiece dot */}
          <circle cx="8.5" cy="6.5" r="1" fill="currentColor" />
          {/* Right earpiece dot */}
          <circle cx="13.5" cy="6.5" r="1" fill="currentColor" />
          {/* Main U-shape of earpieces */}
          <path d="M8.5 6.5v5.5a2.5 2.5 0 0 0 5 0V6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Stem running from bottom center cleft of U-shape */}
          <path d="M11 14.5v3a2.5 2.5 0 0 0 5 0v-3a1.5 1.5 0 0 1 3 0v2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Chestpiece diaphragm bell */}
          <circle cx="19" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      title: "Begin Your Treatment",
      description:
        "Start your journey to a healthier, brighter smile with our advanced dental treatments designed for your comfort and satisfaction.",
      image: "/comfort-care-bento-patient.png",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6.5 h-6.5 text-white"
        >
          <path
            d="M12 6.5c-1.5-1.5-4-1.5-5.5-.5-2 1.3-2.5 4.5-2 7.5.5 3 2 6 3 7.5.3.5.8.5 1 0 .8-2.3 1.5-4.5 3.5-4.5s2.7 2.2 3.5 4.5c.2.5.7.5 1 0 1-1.5 2.5-4.5 3-7.5.5-3 0-6.2-2-7.5-1.5-1-4-1-5.5.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAF9FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Desktop View: Card Timeline ────────────────────────── */}
        <div className="hidden lg:block">
          <ScrollReveal staggerChildren={0.12} className="flex flex-col items-center">
            <div className="text-center max-w-2xl mb-16">
              <ScrollRevealItem>
                <span className="text-primary font-semibold tracking-wider uppercase text-xs md:text-sm mb-3 block font-body">
                  How It Works
                </span>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <AnimatedText
                  as="h2"
                  text="A Simple Process for Exceptional Care"
                  className="items-center mb-6"
                  textClassName="text-h2 text-accent font-heading font-normal leading-[1.1] text-center"
                  underlineClassName="text-primary"
                />
              </ScrollRevealItem>
              <ScrollRevealItem>
                <p className="text-accent/60 text-sm md:text-base leading-relaxed font-body max-w-lg mx-auto">
                  At Aura, we make your dental care journey simple and seamless. Here is how it works:
                </p>
              </ScrollRevealItem>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full">
              {steps.map((step, idx) => (
                <ScrollRevealItem
                  key={idx}
                  className="bg-white border border-accent/5 p-8 rounded-brand shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-center min-h-[280px]"
                >
                  <div className="flex flex-col items-center">
                    {/* Centered Large Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-[#0F0521] flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-sm group-hover:scale-105">
                        {step.icon}
                      </div>
                    </div>
                    {/* Title */}
                    <h3 className="font-heading text-lg text-accent font-bold mb-2 group-hover:text-primary transition-colors duration-300 text-center">
                      {step.title}
                    </h3>
                    {/* Description */}
                    <p className="text-accent/55 text-sm leading-relaxed font-body text-center">
                      {step.description}
                    </p>
                  </div>
                </ScrollRevealItem>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Mobile/Tablet View: Accordion Slider ───────────────── */}
        <div className="block lg:hidden">
          <ScrollReveal
            staggerChildren={0.12}
            className="flex flex-col justify-center w-full max-w-2xl mx-auto"
          >
            {/* Accordion Column */}
            <div className="flex flex-col justify-center w-full">
              <ScrollRevealItem>
                <span className="text-primary font-semibold tracking-wider uppercase text-xs md:text-sm mb-3 block font-body">
                  How It Works
                </span>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <AnimatedText
                  as="h2"
                  align="left"
                  text="A Simple Process for Exceptional Care"
                  className="items-start mb-6"
                  textClassName="text-h2 text-accent font-heading font-normal leading-[1.1] text-left"
                  underlineClassName="text-primary"
                />
              </ScrollRevealItem>

              <ScrollRevealItem>
                <p className="text-accent/60 text-sm md:text-base leading-relaxed font-body mb-8 max-w-lg">
                  At Aura, we make your dental care journey simple and seamless. Click through each step to reveal details and images.
                </p>
              </ScrollRevealItem>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <ScrollRevealItem
                    key={idx}
                    className="border-b border-accent/10 pb-4"
                  >
                    <button
                      onClick={() => setActiveStep(idx)}
                      className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`font-heading text-lg font-semibold transition-colors ${
                          activeStep === idx ? "text-primary" : "text-accent/40"
                        }`}>
                          0{idx + 1}
                        </span>
                        <h3 className={`font-heading text-base md:text-lg font-semibold transition-colors ${
                          activeStep === idx ? "text-primary" : "text-accent group-hover:text-primary"
                        }`}>
                          {step.title}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center transition-transform duration-300 ${
                        activeStep === idx ? "rotate-180 bg-primary/10 text-primary" : "text-accent/50"
                      }`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <div className={`grid transition-all duration-300 ease-in-out ${
                      activeStep === idx
                        ? "grid-rows-[1fr] opacity-100 mt-2"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}>
                      <div className="overflow-hidden">
                        <p className="text-accent/60 text-sm leading-relaxed font-body pl-9">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollRevealItem>
                ))}
              </div>
            </div>

          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
