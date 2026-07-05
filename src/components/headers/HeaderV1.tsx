/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function HeaderV1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Apply transparent hero style only on the homepage
  const isLightBgPage = pathname !== '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Base Desktop Classes (Always Pill)
  const desktopHeader = "xl:fixed xl:top-4 xl:left-1/2 xl:-translate-x-1/2 xl:w-[95%] xl:max-w-6xl xl:px-0 transition-all duration-500 z-50";
  const desktopInner = `xl:rounded-full xl:pl-8 xl:pr-3 xl:py-3 xl:flex xl:items-center xl:justify-between transition-all duration-500 ${
    isScrolled || isLightBgPage
      ? "xl:bg-white/90 xl:backdrop-blur-xl xl:border xl:border-white/60 xl:shadow-lg" 
      : "xl:bg-transparent xl:border-transparent xl:shadow-none"
  }`;

  // Mobile Classes (Solid White Full-Width)
  const mobileHeader = "fixed top-0 left-0 w-full z-50 transition-all duration-300";
  const mobileInner = `flex items-center justify-between px-4 py-3 transition-all duration-300 ${
    isScrolled || isMobileMenuOpen || isLightBgPage ? "bg-white shadow-sm border-b border-gray-200" : "bg-transparent"
  }`;

  const isDarkText = isScrolled || isMobileMenuOpen || isLightBgPage;
  const linkClasses = isDarkText ? "text-accent/80 hover:text-primary" : "text-white/90 hover:text-white";
  const textColor = isDarkText ? "text-primary" : "text-white";
  const subTextColor = isDarkText ? "text-gray-500" : "text-white/80";
  const hamburgerColor = isDarkText ? "text-accent" : "text-white";
  const bookBtnClass = isDarkText 
    ? "bg-primary text-white hover:bg-accent shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.6)]" 
    : "bg-[#f5d5f5] text-[#141414] hover:bg-[#e8c0e8] shadow-lg hover:shadow-xl";

  return (
    <>
      <header className={`${desktopHeader} ${mobileHeader}`}>
        <div className={`${desktopInner} ${mobileInner}`}>
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center z-10"
          >
            <div className="flex items-center">
              <img src="/brand/New-Aura-Logo.png" alt="Aura Family Dental Care" className="h-7 xl:h-10 w-auto object-contain scale-[2.1] xl:scale-[1.5] origin-left transition-all duration-500" />
              <div className={`flex flex-col ml-8 sm:ml-10 xl:ml-5 ${inter.className} w-max transition-colors duration-300`}>
                <span className={`font-bold text-base xl:text-lg leading-none tracking-wide uppercase transition-colors duration-300 ${textColor}`}>AURA FAMILY</span>
                <div className={`flex w-full justify-between mt-0.5 text-[9px] xl:text-[10px] font-semibold uppercase transition-colors duration-300 ${subTextColor}`}>
                  {"DENTAL CARE".split("").map((char, i) => (
                    <span key={i}>{char === " " ? "\u00A0\u00A0" : char}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {["Home", "About", "Treatments", "Experience", "Contact"].map((item, i) => {
              const href = item === "Home" ? "/" : item === "About" ? "/about" : item === "Treatments" ? "/services" : item === "Experience" ? "/new-patients" : "/contact";
              return (
                <Link
                  key={i}
                  href={href}
                  className={`font-body font-semibold transition-all relative group text-base ${linkClasses}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-1/2 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ${isDarkText ? 'bg-primary' : 'bg-white'}`}></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4 z-10">
            <button
              onClick={() => window.dispatchEvent(new Event("open-booking-drawer"))}
              className={`hidden sm:inline-flex px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 cursor-pointer ${bookBtnClass}`}
            >
              Book Visit
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden focus:outline-none p-2 transition-colors duration-300 ${hamburgerColor}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`xl:hidden absolute left-0 w-full shadow-xl transition-all duration-300 overflow-hidden bg-white border-b border-gray-200 text-accent ${
          isMobileMenuOpen ? "max-h-96 opacity-100 p-6" : "max-h-0 opacity-0 pointer-events-none"
        } top-full`}>
          <nav className="flex flex-col items-center gap-5">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">About</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Treatments</Link>
            <Link href="/new-patients" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Experience</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg text-accent/80 hover:text-primary transition-colors">Contact</Link>
            <button onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new Event("open-booking-drawer")); }} className="py-3.5 px-8 rounded-full font-semibold w-full max-w-[200px] text-center mt-3 bg-primary text-white shadow-md hover:bg-accent transition-all">Book Visit</button>
          </nav>
        </div>
      </header>
    </>
  );
}
