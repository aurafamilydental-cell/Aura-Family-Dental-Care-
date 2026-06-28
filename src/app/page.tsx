/* eslint-disable */
"use client";

import Link from "next/link";

import Image from "next/image";

import Header from "@/components/Header";

import Footer from "@/components/Footer";
import CtaSectionPlayground from "@/components/CtaSectionPlayground";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";

import BookingDrawer from "@/components/BookingDrawer";

import HeroSection from "@/components/HeroSection";

import { AnimatedText } from "@/components/ui/animated-underline-text-one";

import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";

import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";

import HospitalityCarousel from "@/components/HospitalityCarousel";

import TeamShowcase from "@/components/TeamShowcase";
import PatientReviews from "@/components/PatientReviews";
import HowItWorks from "@/components/HowItWorks";
import { ServiceCardsPlayground } from "@/components/ServiceCardsPlayground";

const arcImages = [
  "/doctor-patient.JPG",
  "/front desk.JPG",
  "/game section.JPG",
  "/no styrile atmosphere.JPG",
  "/banner.JPG",
  "/gassed man smillinag.JPG",
  "/no styrile!.JPG",
  "/game section - 1.JPG",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=800&auto=format&fit=crop",
];

export default function Home() {

  const handleOpenBooking = (e?: React.MouseEvent) => {
    e?.preventDefault();

    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* ========================================================

            STAGE 1: BRAND EMPATHY (Purple Smiling Lady Hero)

           ======================================================== */}

        <HeroSection onBooking={handleOpenBooking} />

        {/* ========================================================

            STAGE 1.5: STATS STRIP

           ======================================================== */}

        <section className="relative z-30 bg-[#0f0521] border-y border-white/10 py-6 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-wrap justify-around md:justify-between items-center gap-y-6 gap-x-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
                  500+
                </span>

                <span className="text-[10px] sm:text-xs text-[#ddd6fe] uppercase tracking-widest font-bold leading-tight">
                  Satisfied
                  <br />
                  Patients
                </span>
              </div>

              <div className="hidden md:block w-px h-10 bg-white/20" />

              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
                  15+
                </span>

                <span className="text-[10px] sm:text-xs text-[#ddd6fe] uppercase tracking-widest font-bold leading-tight">
                  Expert
                  <br />
                  Specialists
                </span>
              </div>

              <div className="hidden lg:block w-px h-10 bg-white/20" />

              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
                  24/7
                </span>

                <span className="text-[10px] sm:text-xs text-[#ddd6fe] uppercase tracking-widest font-bold leading-tight">
                  Emergency
                  <br />
                  Support
                </span>
              </div>

              <div className="hidden xl:block w-px h-10 bg-white/20" />

              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
                  4.9
                </span>

                <span className="text-[10px] sm:text-xs text-[#ddd6fe] uppercase tracking-widest font-bold leading-tight">
                  Average
                  <br />
                  Rating
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================

            STAGE 2: RECOGNITION (Empathy Hero & Pattern Interrupter)
            (Experiment Variants)

           ======================================================== */}

        <ArcGalleryHero images={arcImages} onBooking={handleOpenBooking} />

        {/* ========================================================

            SEGMENTED PATIENT JOURNEYS (Three Clear Paths - Bento Grid)

           ======================================================== */}

        <section className="pt-12 pb-6 md:py-12 bg-background relative z-25 -mt-10 max-w-6xl mx-auto px-6">
          <ScrollReveal
            staggerChildren={0.1}
            className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-4 md:gap-6"
          >
            {/* Path 1: Nervous Patients (Comfort Care) */}

            <ScrollRevealItem className="flex-none w-[85vw] sm:w-[300px] md:w-auto snap-center shrink-0 md:shrink md:col-span-2 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row min-h-[220px] md:min-h-[300px]">
              <div className="p-4 md:p-8 flex-grow flex-1 flex flex-col justify-between z-10">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-accent mb-2 md:mb-3">
                    Haven't been in years?
                  </h3>

                  <p className="text-accent/70 text-base leading-relaxed max-w-md">
                    We specialize in dental anxiety. No judgment, no lectures,
                    and no shame. Read our comfort guide to see how we make your
                    visit completely stress-free.
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/new-patients"
                    className="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Learn About Comfort Care
                  </Link>
                </div>
              </div>

              <div className="relative w-full md:w-[42%] h-48 md:h-auto overflow-hidden">
                <Image
                  src="/comfort-care-bento-patient-highres.png"
                  alt="Smiling patient getting her teeth examined by a friendly dentist wearing purple gloves"
                  fill
                  className="object-cover transition-transform duration-500 ease-out"
                  sizes="(max-w-768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/0 via-transparent to-white/10" />
              </div>
            </ScrollRevealItem>

            {/* Path 2: Cosmetic Seekers */}

            <ScrollRevealItem className="flex-none w-[85vw] sm:w-[300px] md:w-auto snap-center shrink-0 md:shrink md:col-span-1 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col min-h-[200px] md:min-h-[300px]">
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src="/smile-after.jpg"
                  alt="Close-up of a beautifully whitened, bright natural smile"
                  fill
                  className="object-cover transition-transform duration-500 ease-out"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
              </div>

              <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-accent mb-2 md:mb-3">
                    Transform Your Smile
                  </h3>

                  <p className="text-accent/70 text-base leading-relaxed">
                    Explore hand-crafted smile enhancements, gentle whitening,
                    and conservative cosmetic consulting.
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    href="/services/cosmetic"
                    className="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    View Smile Design
                  </Link>
                </div>
              </div>
            </ScrollRevealItem>

            {/* Path 3: Family Dental Home */}

            <ScrollRevealItem className="flex-none w-[85vw] sm:w-[300px] md:w-auto snap-center shrink-0 md:shrink md:col-span-3 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row min-h-[220px] md:min-h-[260px]">
              <div className="relative w-full md:w-[32%] h-48 md:h-auto overflow-hidden">
                <Image
                  src="/family-care-bento-black.png"
                  alt="Happy Black family laughing together in a bright, modern, family-friendly dental clinic"
                  fill
                  className="object-cover transition-transform duration-500 ease-out"
                  sizes="(max-w-768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/0 via-transparent to-white/10" />
              </div>

              <div className="p-4 md:p-8 flex-grow flex flex-col justify-between md:pl-10">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-accent mb-2">
                    A True Dental Home
                  </h3>

                  {/* Mobile version (shorter) */}
                  <p className="md:hidden text-accent/70 text-base leading-relaxed max-w-2xl">
                    Convenient, back-to-back family scheduling under one roof for a stress-free visit.
                  </p>
                  {/* Desktop version (full) */}
                  <p className="hidden md:block text-accent/70 text-base leading-relaxed max-w-2xl">
                    Convenient scheduling for the whole family under one roof.
                    We offer coordinated, back-to-back appointment blocks so you
                    can get everyone taken care of in a single, stress-free
                    visit.
                  </p>
                </div>

                <div className="border-t border-border-subtle/50 mt-6 pt-4">
                  <Link
                    href="/services/family"
                    className="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Explore Family Services
                  </Link>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </section>

        {/* ========================================================

            STAGE 2: RELIEF (Sensory Experience & Reframing)

           ======================================================== */}

        <section className="pt-10 md:pt-24 pb-12 px-6 md:px-12 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <ScrollReveal staggerChildren={0.1}>
                <ScrollRevealItem className="mb-6">
                  <AnimatedText
                    text="Welcome to hospitality."
                    textClassName="text-h2 text-accent font-heading font-normal"
                    underlineClassName="text-primary"
                  />
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <p className="text-accent/70 text-lg max-w-2xl mx-auto">
                    Leave clinical anxiety at the door. Our space is
                    intentionally designed to look, feel, and smell like a
                    high-end lounge.
                  </p>
                </ScrollRevealItem>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <HospitalityCarousel />

        {/* ========================================================

            STAGE 2.5: SERVICES (Discover Our Expertise)

           ======================================================== */}

        <section className="pt-16 pb-12 md:py-24 px-6 md:px-12 bg-background">
          <div className="max-w-6xl mx-auto">
            {/* Split Header */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-12 mb-16">
              <div className="max-w-2xl">
                <span className="text-primary font-semibold tracking-wider uppercase text-xs md:text-sm mb-4 block">
                  Our Service
                </span>

                <AnimatedText
                  as="h2"
                  align="left"
                  text="Discover Our Expertise in Comprehensive Dental Care for Your Perfect Smile"
                  className="items-start"
                  textClassName="text-h2 text-accent font-heading font-normal leading-[1.1] text-left"
                  underlineClassName="text-primary"
                />
              </div>

              <div className="max-w-md md:pt-16">
                <p className="text-accent/70 text-base md:text-lg leading-relaxed font-body">
                  At Aura, we proudly offer a wide range of dental services
                  tailored to meet your needs. Our experienced team combines
                  advanced technology and personalized care to ensure the best
                  possible results for your smile and oral health.
                </p>
              </div>
            </div>

            {/* Service Cards Grid */}

            <ServiceCardsPlayground
              services={[
                {
                  title: "Dental Implants",
                  description:
                    "Restore your smile and confidence with our durable, natural-looking dental implants",
                  image: "/dental-implants-v3.png",
                  alt: "A close-up of a smiling Black person showing healthy white teeth, with a circular magnifier overlay detailing a titanium dental implant screw embedded in the gum line and jawbone",
                  link: "/services/restorative",
                },
                {
                  title: "Teeth Whitening",
                  description:
                    "Achieve a bright, radiant smile with our professional teeth whitening treatments",
                  image: "/teeth-whitening-v3.png",
                  alt: "A close-up of a smiling Black woman wearing protective orange eyewear while undergoing a professional teeth whitening treatment with a blue light device",
                  link: "/services/cosmetic",
                },
                {
                  title: "Orthodontics",
                  description:
                    "Straighten your teeth and perfect your smile with our advanced orthodontic options",
                  image: "/orthodontics-v3.png",
                  alt: "A close-up macro shot of a Black person smiling, showing white teeth with metal and clear ceramic orthodontic braces",
                  link: "/services/family",
                },
                {
                  title: "Routine Checkups",
                  description:
                    "Maintain optimal oral health with regular checkups and cleanings",
                  image: "/routine-checkups-v3.png",
                  alt: "A smiling Black man reclining in a dental chair while a dentist in blue gloves holds dental mirrors for a checkup",
                  link: "/services/family",
                },
              ]}
            />

            {/* See More Button */}

            <div className="flex justify-end mt-6 md:mt-12">
              <Link
                href="/services"
                className="bg-[#0f0521] text-white hover:bg-primary px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                See More
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================

            STAGE 4: DESIRE (Social Proof & Transformation)

           ======================================================== */}

        <section className="pt-12 pb-20 md:py-24 px-6 md:px-12 bg-background">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal
              staggerChildren={0.2}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Left Column: Copy & Stories */}

              <div className="flex flex-col justify-center">
                <ScrollRevealItem>
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
                    Visual Proof
                  </span>
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <AnimatedText
                    as="h2"
                    align="left"
                    text={
                      <>
                        Authentic smile{" "}
                        <br className="hidden md:block" />
                        transformations.
                      </>
                    }
                    className="items-start mb-6"
                    textClassName="text-[1.35rem] min-[400px]:text-2xl md:text-h2 text-accent leading-tight text-left whitespace-nowrap tracking-tight"
                    underlineClassName="text-primary"
                  />
                </ScrollRevealItem>

                <ScrollRevealItem>
                  <p className="text-accent/70 text-base md:text-lg mb-4 md:mb-8 leading-relaxed">
                    "Imagine walking into every room knowing your smile is
                    exactly what you want it to be. We focus on natural,
                    life-changing outcomes that respect your anatomy."
                  </p>
                </ScrollRevealItem>

                {/* Patient Quote */}

                <ScrollRevealItem className="border-l-2 border-primary pl-4 md:pl-6 mt-4 mb-8 md:my-8">
                  <p className="italic text-accent/80 text-sm md:text-base mb-2">
                    "I hadn't seen a dentist in 8 years out of embarrassment.
                    The team at Aura welcomed me like family, set up a
                    comfortable care plan, and restored my confidence."
                  </p>

                  <cite className="text-accent/60 text-xs md:text-sm font-semibold not-italic">
                    — Sarah K., Patient
                  </cite>
                </ScrollRevealItem>
              </div>

              {/* Right Column: Before/After Interactive Component */}

              <ScrollRevealItem className="w-[90%] sm:w-[80%] mx-auto md:w-full">
                <BeforeAfterSlider
                  beforeImage="/smile-before.jpg"
                  afterImage="/smile-after.jpg"
                  beforeLabel="Before Aura"
                  afterLabel="After Aura"
                />
              </ScrollRevealItem>
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================

            STAGE 3: BELIEF (Team & Culture)

           ======================================================== */}

        <TeamShowcase />

        {/* ========================================================
            STAGE 3.5: PATIENT REVIEWS (Social Proof)
           ======================================================== */}
        <PatientReviews />

        {/* ========================================================
            STAGE 3.8: HOW IT WORKS (Process Section)
           ======================================================== */}
        <HowItWorks />

        {/* ========================================================
            STAGE 5: ACTION (Frictionless Booking Gateway)
           ======================================================== */}

        <CtaSectionPlayground />
      </main>

      <Footer />

      {/* Booking Drawer Instance (Controlled Globally via Custom Events) */}

      <BookingDrawer isOpen={false} onClose={() => {}} />


    </div>
  );
}
