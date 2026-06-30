/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { Sparkles, Users, Wrench, Baby, Stethoscope, Calendar } from "lucide-react";
import { useState } from "react";

export default function ServicesHub() {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleOpenBooking = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (!hasScrolled && e.currentTarget.scrollLeft > 10) {
      setHasScrolled(true);
    }
  };

  const servicesData = [
    {
      id: 'cosmetic',
      title: "Cosmetic Dentistry",
      desc: "Enhance your smile naturally. From professional whitening to custom veneers, we deliver subtle, confidence-boosting smile adjustments.",
      link: "/services/cosmetic",
      linkText: "Read About Cosmetic Care",
      icon: Sparkles,
      image: "/smile-after.jpg", 
    },
    {
      id: 'family',
      title: "Family Dentistry",
      desc: "From routines, digital scans, to checkups, we make dental maintenance convenient and comfortable for patients of all ages.",
      link: "/services/family",
      linkText: "Read About Family Care",
      icon: Users,
      image: "/family-care-bento-black.png", 
    },
    {
      id: 'restorative',
      title: "Restorative Care",
      desc: "Repair damaged or missing teeth with conservative fillings, crowns, or implants. We prioritize keeping your natural teeth strong.",
      link: "/services/restorative",
      linkText: "Read About Restorative Care",
      icon: Wrench,
      imagePosition: "object-top",
      image: "/doctor-patient.JPG", 
    },
    {
      id: 'pediatric',
      title: "Pediatric Dentistry",
      desc: "Making dental visits fun for kids. We take things slow, use simple terms, and build positive relationships with young smiles early on.",
      link: "/services/pediatric",
      linkText: "Read About Children's Care",
      icon: Baby,
      image: "/kids section.JPG", 
    },
    {
      id: 'emergency',
      title: "Emergency Care",
      desc: "Sore tooth? Broken filling? We save emergency slots daily to ensure you get pain relief fast when you need it most.",
      link: "/services/emergency",
      linkText: "Read About Emergency Help",
      icon: Stethoscope,
      image: "/emergency-room.jpg", 
    },
    {
      id: 'booking',
      title: "Need to schedule?",
      desc: "Verify slots in real-time. Simply choose a date, choose a time, and confirm.",
      action: handleOpenBooking,
      linkText: "Schedule Visit",
      icon: Calendar,
      isAction: true,
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop", 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32">
        {/* Hero */}
        <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Care We Offer</span>
          <AnimatedText
            as="h1"
            text="Conservative treatments built for your health."
            className="mb-6 justify-center"
            textClassName="text-h2 text-accent leading-tight text-center"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-body">
            <span className="md:hidden">Conservative treatments for your health. No pressure.</span>
            <span className="hidden md:inline">We prioritize preserving your natural teeth and only recommend procedures that protect your long-term health. No pressure, no upselling.</span>
          </p>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-6 md:px-12 mb-16 md:mb-24 max-w-6xl mx-auto">
          <div className={`flex items-center justify-center mb-6 md:hidden transition-opacity duration-500 ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center gap-2 bg-accent/5 border border-accent/10 text-accent/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>Swipe to explore</span>
              <svg className="w-4 h-4 animate-pulse text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
          </div>
          <ScrollReveal onScroll={handleScroll} staggerChildren={0.1} className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 md:pb-0">
            {servicesData.map((svc) => {
              
              let cardClasses = "relative overflow-hidden group flex flex-col justify-between transition-all duration-300 min-h-[300px] rounded-brand backdrop-blur-md border shadow-lg w-[85vw] sm:w-[300px] md:w-auto snap-center shrink-0 md:shrink ";
              
              if (svc.isAction) {
                cardClasses += "bg-primary/10 border-primary/30 p-8";
              } else {
                cardClasses += "bg-white/70 border-white/60 p-0";
              }

              return (
                <ScrollRevealItem key={svc.id} className={cardClasses}>
                  
                  {/* Photography Image */}
                  {!svc.isAction && (
                    <div className="h-44 w-full relative overflow-hidden flex-shrink-0">
                      <Image src={svc.image} alt={svc.title} fill className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ${('imagePosition' in svc) ? (svc as any).imagePosition : 'object-center'}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <h3 className="absolute bottom-4 left-6 font-heading text-2xl text-white z-10">{svc.title}</h3>
                    </div>
                  )}

                  {/* Action Icon Block */}
                  {svc.isAction && (
                    <div className="h-32 w-full relative flex items-center justify-center text-primary opacity-20 flex-shrink-0 mb-4">
                      <svc.icon size={100} />
                    </div>
                  )}

                  {/* Content Container */}
                  <div className={`flex-grow flex flex-col justify-between z-10 ${!svc.isAction ? 'p-6 pt-5' : 'items-center text-center'}`}>
                    <div>
                      {svc.isAction && (
                        <h3 className="font-heading text-2xl text-accent mb-3">{svc.title}</h3>
                      )}
                      <p className="text-base leading-relaxed mb-6 text-accent/80">
                        {svc.desc}
                      </p>
                    </div>
                    
                    <div className={`mt-4 ${svc.isAction ? 'w-full' : ''}`}>
                      {svc.isAction ? (
                        <button
                          onClick={svc.action}
                          className="w-full bg-primary text-white hover:bg-accent px-5 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                        >
                          {svc.linkText}
                        </button>
                      ) : (
                        <Link href={svc.link || ""} className="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md">
                          {svc.linkText}
                        </Link>
                      )}
                    </div>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </section>


      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
