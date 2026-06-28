"use client";

import Image from "next/image";
import Link from "next/link";
import heroImg from "../../public/Hero.png";
import heroImgMobile from "../../public/hero-mobile.png";

interface HeroSectionProps {
  onBooking: () => void;
}

/* ─── Shared sub-components ─────────────────────────────────────────────── */

function BgImage() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Desktop Background */}
      <Image
        src={heroImg}
        alt="Smiling Black woman with hands touching her face on a vibrant purple background"
        fill
        className="hidden md:block object-cover object-right"
        priority
      />
      {/* Mobile Background */}
      <Image
        src={heroImgMobile}
        alt="Smiling Black woman with hands touching her face on a vibrant purple background"
        fill
        className="block md:hidden object-cover object-center"
        priority
      />
    </div>
  );
}

function StatsCard() {
  /* Single clean tooth icon reused across all pills */
  const ToothIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M19 6.5c0-2.49-2.01-4.5-4.5-4.5-1.04 0-2 .36-2.75.95C11.0 2.36 10.04 2 9 2 6.51 2 4.5 4.01 4.5 6.5c0 1.49.73 2.81 1.84 3.63C6.11 11 6 11.98 6 13c0 1.1.17 2.17.49 3.17L7.5 21c.28.58.76 1 1.5 1 .55 0 1.02-.3 1.3-.76L11 19.5l.7 1.74c.28.46.75.76 1.3.76.74 0 1.22-.42 1.5-1l1.01-4.83c.32-1 .49-2.07.49-3.17 0-1.02-.11-2-.34-2.87C17.27 9.31 18 7.99 19 6.5z"/>
    </svg>
  );

  const services = [
    "Teeth Cleaning",
    "Teeth Whitening",
    "Dental Braces",
    "Teeth Implants",
    "Cosmetic Dentistry",
    "Lost Filling",
    "Root Canal",
    "Smile Makeover",
  ];

  /* Duplicate for seamless infinite loop */
  const looped = [...services, ...services];

  return (
    <div className="absolute bottom-8 right-8 z-20 hidden md:block w-56">
      {/* Clipping viewport with top/bottom fade mask */}
      <div
        className="overflow-hidden"
        style={{
          height: "192px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 72%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 72%, transparent 100%)",
        }}
      >
        {/* Scrolling track */}
        <div
          className="flex flex-col gap-2.5"
          style={{ animation: "serviceTicker 12s linear infinite" }}
        >
          {looped.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-2.5 shadow-lg text-white flex-shrink-0"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ToothIcon />
              </div>
              <span className="text-sm font-semibold flex-1 whitespace-nowrap">{name}</span>
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/80 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes serviceTicker {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

function BookBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full sm:w-auto bg-[#f5d5f5] hover:bg-[#e8c0e8] text-[#141414] px-6 py-3.5 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer shadow-lg whitespace-nowrap"
    >
      <span className="md:hidden">Book Visit</span>
      <span className="hidden md:inline">Schedule Your First Visit</span>
    </button>
  );
}

/* ─── Hero Section Final Layout ─────────────────────────────────────────── */

export default function HeroSection({ onBooking }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-end bg-[#a819dd] overflow-hidden animate-[fadeIn_0.35s_ease]">
      <BgImage />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black/70 md:via-black/10 md:to-transparent" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-32 md:pt-32 pb-8 md:pb-24 mt-auto md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:justify-center space-y-5 md:space-y-6">
            <h1 className="text-[clamp(40px,10vw,80px)] leading-[1.1] font-bold text-white tracking-tight drop-shadow-md">
              Bright Smiles,<br className="hidden md:block" />
              <span className="md:hidden"> </span>Expert Care
            </h1>
            <p className="text-white/90 md:text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl font-medium md:font-normal">
              Exceptional dental care tailored to your needs, ensuring a confident<br className="hidden md:block" /> and radiant smile that you can proudly share with the world.
            </p>
            <div className="hidden md:block w-full h-[1px] bg-white/20 my-2" />
            <div className="flex flex-row items-center justify-center gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
              <BookBtn onClick={onBooking} />
              <Link 
                href="/services" 
                className="w-full sm:w-auto text-center bg-transparent md:bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-2 border-white/40 md:border-white/30 px-6 py-3.5 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.01] transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="md:hidden">Treatments</span>
                <span className="hidden md:inline">Explore Our Services</span>
              </Link>
            </div>
          </div>
          {/* Right column — image bleeds through */}
          <div />
        </div>
      </div>
      <StatsCard />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
