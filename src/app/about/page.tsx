/* eslint-disable */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

const teamMembers = [
  { 
    name: "Dr. Mary Osei", 
    role: "Lead Hygienist", 
    trait: "✨ 10+ Years Exp", 
    image: "/staff 2.JPG",
    description: "Dedicated to ensuring a comfortable and thorough cleaning experience, focusing on patient education and preventive care.",
    education: "NYU College of Dentistry"
  },
  { 
    name: "Marcus Chen", 
    role: "Care Coordinator", 
    trait: "🌟 5-Star Service", 
    image: "/staff 3.JPG",
    description: "Expert in patient relations, ensuring every visit is seamless, stress-free, and well-coordinated from start to finish.",
    education: "UCLA Health Administration"
  },
  { 
    name: "Dr. Elena Rostova", 
    role: "Associate Dentist", 
    trait: "🦷 Cosmetic Expert", 
    image: "/staff 4.JPG",
    description: "Specializes in advanced restorative treatments, complex dental implants, and cosmetic smile designs.",
    education: "University of Pennsylvania"
  },
  { 
    name: "Sarah Jenkins", 
    role: "Dental Assistant", 
    trait: "💖 Pediatric Care", 
    image: "/staff 5.JPG",
    description: "A gentle, warm specialist who focuses on preventive care, kids' oral health, and pain-free treatments.",
    education: "King's College London"
  },
  { 
    name: "Dr. David Kim", 
    role: "Orthodontist", 
    trait: "🎯 Invisalign Pro", 
    image: "/staff 6.JPG",
    description: "Dedicated to perfecting alignments through clear aligners (Invisalign) and modern cosmetic bonding.",
    education: "Harvard Dental Medicine"
  },
  { 
    name: "Emily Clark", 
    role: "Office Manager", 
    trait: "📅 Scheduling Ace", 
    image: "/staff 7.JPG",
    description: "Ensures the clinic runs smoothly, handling insurance coordination and patient scheduling with efficiency.",
    education: "Boston University"
  },
  { 
    name: "Dr. Kelvin", 
    role: "Specialist Dentist", 
    trait: "🔍 Precision Care", 
    image: "/Kelvin.JPG",
    description: "Committed to delivering exceptional restorative and cosmetic dentistry.",
    education: "KNUST School of Medicine and Dentistry"
  },
  { 
    name: "Aisha", 
    role: "Patient Experience", 
    trait: "💬 Friendly Guide", 
    image: "/staff 8.JPG",
    description: "Dedicated to making your visit as smooth and comfortable as possible.",
    education: "University of Ghana"
  },
  { 
    name: "Grace", 
    role: "Clinic Coordinator", 
    trait: "📋 Detail Oriented", 
    image: "/staff 9.JPG",
    description: "Ensuring all your administrative and scheduling needs are met with a smile.",
    education: "GIMPA"
  }
];

export default function About() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleOpenBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      carouselRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const renderCard = (member: typeof teamMembers[0]) => (
    <div className="relative group overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 z-10 mix-blend-multiply"></div>
      <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700" />
      
      {/* Always visible minimal info */}
      <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-4 group-hover:opacity-0">
        <h3 className="font-heading text-2xl text-white drop-shadow-md mb-1">{member.name}</h3>
        <p className="text-white/90 text-base drop-shadow-md font-medium">{member.role}</p>
      </div>

      {/* Solid Reveal */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out p-6 bg-white border-t border-gray-100 z-30 flex flex-col justify-end h-[40%]">
        <h3 className="font-heading text-2xl text-accent mb-1">{member.name}</h3>
        <p className="text-primary text-base font-semibold mb-3">{member.role}</p>
        <p className="text-accent/70 text-sm leading-relaxed hidden xl:block">Dedicated professional committed to ensuring your visit is absolutely exceptional.</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Style injection to hide scrollbars */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />

        {/* Hero Section */}
        <section className="relative w-full mt-[68px] md:mt-0 aspect-[21/9] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/all smiles original.png" alt="Aura Dental Team" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[#0f0521]/70"></div>
          </div>
          <div className="relative z-10 text-center w-full max-w-6xl px-6 pt-12 md:pt-16">
            <span className="text-white/80 font-semibold tracking-wider uppercase text-xs md:text-sm mb-2 md:mb-4 block">Meet Aura</span>
            <AnimatedText
              as="h1"
              align="center"
              text="About Us"
              className="mb-0 justify-center"
              textClassName="text-5xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-lg text-center"
              underlineClassName="text-white"
            />
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 md:py-32 px-6 md:px-12 bg-white text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-4xl lg:text-5xl font-heading text-accent leading-relaxed md:leading-tight font-light">
              Aura was founded on a simple realization: dental visits shouldn't be <span className="text-primary">stressful, judgmental, or commercialized</span>. We built a practice centered entirely on human comfort.
            </p>
          </div>
        </section>

        {/* The Aura Philosophy / Stats Band */}
        <section className="w-full">
          {/* Desktop View (Original 3-Column Design) */}
          <div className="hidden md:block bg-primary text-white py-20 px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-12 text-left">
              <div>
                <h3 className="text-3xl lg:text-4xl font-heading mb-4">No Upselling</h3>
                <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                  We practice conservative dentistry. We suggest solutions only when they are clinically necessary to protect your oral health. You will never feel pushed to buy clinical gimmicks.
                </p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-heading mb-4">Cost Transparency</h3>
                <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                  Money shouldn't be a barrier to trust. We provide transparent, upfront pricing. You will always know the cost of treatments before we begin, with no surprise bills.
                </p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-heading mb-4">Comfort Pace</h3>
                <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                  If you need a break during a cleaning or treatment, just tell us. We move at your pace, explain each step, and design a comfortable space to make you feel safe.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile View (Inspiration Design) */}
          <div className="md:hidden flex flex-col w-full">
            {/* Item 1 */}
            <div className="bg-primary text-white py-12 px-6">
              <h3 className="text-4xl font-heading">No Upselling</h3>
            </div>
            <div className="bg-white text-accent py-10 px-6 border-b border-gray-100">
              <p className="text-accent/40 text-[10px] font-bold tracking-widest uppercase mb-3">Conservative Care</p>
              <p className="text-accent/90 text-lg leading-relaxed">
                We practice conservative dentistry. We suggest solutions only when they are clinically necessary to protect your oral health. You will never feel pushed to buy clinical gimmicks.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-accent text-white py-12 px-6">
              <h3 className="text-4xl font-heading">Cost Transparency</h3>
            </div>
            <div className="bg-white text-accent py-10 px-6 border-b border-gray-100">
              <p className="text-accent/40 text-[10px] font-bold tracking-widest uppercase mb-3">No Surprises</p>
              <p className="text-accent/90 text-lg leading-relaxed">
                Money shouldn't be a barrier to trust. We provide transparent, upfront pricing. You will always know the cost of treatments before we begin, with no surprise bills.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-[#f5d5f5] text-accent py-12 px-6">
              <h3 className="text-4xl font-heading">Comfort Pace</h3>
            </div>
            <div className="bg-white text-accent py-10 px-6">
              <p className="text-accent/40 text-[10px] font-bold tracking-widest uppercase mb-3">On Your Terms</p>
              <p className="text-accent/90 text-lg leading-relaxed">
                If you need a break during a cleaning or treatment, just tell us. We move at your pace, explain each step, and design a comfortable space to make you feel safe.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-12 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-2">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Founder Story</span>
              <h2 className="text-3xl md:text-4xl font-heading text-accent mb-6 leading-tight">
                "I hated going to the dentist, too."
              </h2>
              <div className="space-y-6 text-accent/70 text-lg md:text-xl leading-relaxed">
                <p>
                  Growing up, dental visits were a source of deep anxiety for me. The cold rooms, sharp smells, and lectures about flossing left me feeling ashamed rather than cared for. 
                </p>
                <p>
                  When I decided to become a dentist, I resolved to build a practice that did the exact opposite. Aura was built to feel like home. Our clinical tools are cutting-edge, but our approach is grounded in empathy, safety, and respect for your time.
                </p>
                <p>
                  We don't judge how long it's been since your last cleaning, we don't upsell cosmetic trends, and we only suggest work that is absolutely necessary for your health. That is our promise.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-1 flex flex-col items-start lg:pr-12">
              <div className="w-full aspect-square rounded-xl bg-accent/5 overflow-hidden mb-6 relative shadow-sm">
                 <Image src="/Mr Abekah.JPG" alt="Dr. Emmanuel Baah Abekah" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div>
                <p className="font-heading text-xl text-accent">Dr. Emmanuel Baah Abekah, DDS</p>
                <p className="text-accent/60 text-sm mt-1">Chief Dental Officer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-12 md:py-24 bg-white overflow-hidden w-full">
          {/* Header Row: Centered title and description */}
          <div className="text-center mb-16 max-w-5xl mx-auto px-6 md:px-12">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Our Professionals</span>
            <AnimatedText
              as="h2"
              align="center"
              text={"Meet the Specialists\nBehind Your Perfect Smile"}
              className="mb-6 justify-center"
              textClassName="text-3xl md:text-4xl lg:text-5xl font-heading text-accent leading-tight text-center whitespace-pre-line"
              underlineClassName="text-primary"
            />
            <p className="text-accent/70 text-lg leading-relaxed max-w-3xl mx-auto">
              Our team of world-class dentists combines decades of international training with a warm, gentle touch to provide extraordinary experiences.
            </p>
          </div>

          {/* Full-bleed Carousel track with absolute floating controls */}
          <div className="relative w-full">
            {/* Left navigation arrow */}
            <button 
              onClick={() => scrollCarousel("left")}
              className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full border border-accent/10 bg-white/80 backdrop-blur-md shadow-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 hidden md:flex items-center justify-center cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right navigation arrow */}
            <button 
              onClick={() => scrollCarousel("right")}
              className="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full border border-accent/10 bg-white/80 backdrop-blur-md shadow-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 hidden md:flex items-center justify-center cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar pb-8 scroll-smooth px-6 md:px-12 xl:px-[calc((100vw-1280px)/2+48px)] scroll-pl-6 md:scroll-pl-12 xl:scroll-pl-[calc((100vw-1280px)/2+48px)]"
            >
              {teamMembers.map((member, i) => (
                <div key={i} className="w-[240px] sm:w-[280px] md:w-[340px] flex-shrink-0 snap-start">
                  {renderCard(member)}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Simple CTA */}
        <section className="py-12 md:py-24 px-6 md:px-12 text-center bg-white border-t border-border-subtle">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-accent mb-6 leading-tight">Experience Aura for yourself.</h2>
            <p className="text-accent/70 text-lg mb-10">
              Book your visit in under a minute and experience a clinic that puts your comfort first.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all cursor-pointer"
            >
              Schedule Your First Visit
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}



