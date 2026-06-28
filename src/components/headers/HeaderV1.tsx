/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderV1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isLightBgPage = false;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Base Desktop Classes (Always Pill)
  const desktopHeader = "md:fixed md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-6xl md:px-0";
  const desktopInner = `md:rounded-full md:border md:px-8 md:py-3 md:flex md:items-center md:justify-between transition-all duration-500 ${
    isScrolled 
      ? "md:bg-white/90 md:backdrop-blur-xl md:border-white/60 md:shadow-lg" 
      : "md:bg-white/90 md:backdrop-blur-xl md:border-white/60 md:shadow-md"
  }`;

  // Mobile Classes (Solid White Full-Width)
  const mobileHeader = "fixed top-0 left-0 w-full z-50";
  const mobileInner = `flex items-center justify-between px-4 py-3 transition-all duration-300 bg-white shadow-sm border-b border-gray-200`;

  const linkClasses = "text-accent/80 hover:text-primary";

  return (
    <>
      <header className={`${desktopHeader} ${mobileHeader}`}>
        <div className={`${desktopInner} ${mobileInner}`}>
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center z-10"
          >
            <img alt="logo" src="/logo 2.png" alt="Aura Family Dental Care" className="h-7 md:h-10 w-auto object-contain scale-[2.4] md:scale-[1.8] origin-left" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {["About", "Treatments", "Patient Info", "Financing"].map((item, i) => {
              const href = item === "About" ? "/about" : item === "Treatments" ? "/services" : item === "Patient Info" ? "/new-patients" : "/insurance-financing";
              return (
                <Link
                  key={i}
                  href={href}
                  className={`font-body font-semibold transition-all relative group text-base ${linkClasses}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 bg-primary"></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4 z-10">
            <button
              onClick={() => window.dispatchEvent(new Event("open-booking-drawer"))}
              className="hidden sm:inline-flex px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 cursor-pointer bg-primary text-white hover:bg-accent shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.6)]"
            >
              Book Visit
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden focus:outline-none text-accent p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute left-0 w-full shadow-xl transition-all duration-300 overflow-hidden bg-white border-b border-gray-200 text-accent ${
          isMobileMenuOpen ? "max-h-96 opacity-100 p-6" : "max-h-0 opacity-0 pointer-events-none"
        } top-full`}>
          <nav className="flex flex-col items-center gap-5">
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">About</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Treatments</Link>
            <Link href="/new-patients" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Patient Info</Link>
            <Link href="/insurance-financing" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Financing</Link>
            <button onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new Event("open-booking-drawer")); }} className="py-3.5 px-8 rounded-full font-semibold w-full max-w-[200px] text-center mt-3 bg-primary text-white shadow-md hover:bg-accent transition-all">Book Visit</button>
          </nav>
        </div>
      </header>
    </>
  );
}
