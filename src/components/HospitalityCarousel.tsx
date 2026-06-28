"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideData {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

const slides: SlideData[] = [
  {
    title: "Matcha & Treat Lounge",
    description: "Skip the stale coffee. Enjoy freshly prepared premium matcha, specialty tea, and organic treats while relaxing in our comfortable lobby lounge.",
    image: "/tea area.png",
    buttonText: "Experience The Lounge",
  },
  {
    title: "Gaming Centers",
    description: "Unwind and take your mind off things before your cleaning with classic games and consoles, creating an atmosphere that kids and adults love.",
    image: "/game section - 1.JPG",
    buttonText: "Reserve Game Session",
  },
  {
    title: "No Clinical Atmosphere",
    description: "No sterile, chemical smells. No loud drilling noises echoing down the hall. Just ambient acoustic design and warm lighting to soothe your senses.",
    image: "/no styrile!.JPG",
    buttonText: "Tour Our Clinic",
  },
];

const SLIDE_DURATION = 7000; // 7 seconds per slide

export default function HospitalityCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Setup
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background shifts opposite to cursor (slight parallax)
  const bgX = useTransform(smoothX, [0, 1], ["1.5%", "-1.5%"]);
  const bgY = useTransform(smoothY, [0, 1], ["1.5%", "-1.5%"]);

  // Card shifts with cursor
  const cardX = useTransform(smoothX, [0, 1], ["-12px", "12px"]);
  const cardY = useTransform(smoothY, [0, 1], ["-12px", "12px"]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  // Handle auto-advance progress ticker
  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const updateTicker = () => {
      // Pause progress if hovered (classic premium interaction)
      if (isHovered) {
        startTime += 30; // shift start time to halt progress
      }

      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= SLIDE_DURATION) {
        handleNext();
      } else {
        animationFrameId = requestAnimationFrame(updateTicker);
      }
    };

    animationFrameId = requestAnimationFrame(updateTicker);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIdx, isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const triggerBooking = () => {
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[65vh] md:h-[75vh] lg:h-[80vh] bg-accent overflow-hidden select-none flex items-center"
    >
      {/* Background Gradients & Images */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top Vignette Header Gradient (Subtle) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#141414]/60 to-transparent" />
        {/* Left Shadow Vignette for cardless text contrast */}
        <div className="absolute top-0 bottom-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
        {/* Bottom Navigation Vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#141414]/85 to-transparent" />
      </div>

      {/* Images Carousel Container */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = activeIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: isActive ? 1 : 0 }}
            >
              <motion.div
                style={{
                  x: isActive ? bgX : "0%",
                  y: isActive ? bgY : "0%",
                }}
                animate={isActive ? { scale: [1.04, 1.10] } : { scale: 1.04 }}
                transition={isActive ? { duration: 7, ease: "linear" } : undefined}
                className="absolute inset-0 w-full h-full origin-center"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center pointer-events-none"
                  priority={idx === 0}
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Swipe Overlay (z-10, just above images but behind cards/UI) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(e, info) => {
          const swipeThreshold = 60; // in px
          if (info.offset.x < -swipeThreshold) {
            handleNext();
          } else if (info.offset.x > swipeThreshold) {
            handlePrev();
          }
        }}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Glassmorphic Floating Text Card */}
      <div className="absolute inset-0 z-20 w-full max-w-7xl mx-auto pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{
              opacity: 0,
              x: -40,
              y: 0,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              x: 40,
              y: 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-24 left-6 right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-[calc(100%-3rem)] md:w-full md:max-w-xl lg:max-w-2xl md:left-16 lg:left-24 md:right-auto pointer-events-auto"
          >
            {/* Parallax spring inner container - card background removed for editorial styling */}
            <motion.div
              style={{ x: cardX, y: cardY }}
              className="p-2 text-white flex flex-col items-start"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading mb-5 text-white leading-[1.15] font-normal tracking-tight">
                {slides[activeIdx].title}
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-white leading-relaxed font-body font-light mb-8 max-w-lg md:max-w-xl">
                {slides[activeIdx].description}
              </p>
              
              <button
                onClick={triggerBooking}
                className="bg-primary text-white hover:bg-primary/95 px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.01]"
              >
                {slides[activeIdx].buttonText}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left/Right Chevrons navigation */}
      <button
        onClick={handlePrev}
        className={cn(
          "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        )}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className={cn(
          "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        )}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Instagram Stories Style Progress Bars */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 w-[calc(100%-3rem)] max-w-sm md:max-w-md px-6 pointer-events-auto">
        {slides.map((_, idx) => {
          const isActive = activeIdx === idx;
          const isCompleted = activeIdx > idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setProgress(0);
              }}
              className="h-1 flex-1 bg-white/20 hover:bg-white/40 rounded-full overflow-hidden transition-colors cursor-pointer focus:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className="h-full bg-primary origin-left transition-all duration-[30ms] ease-linear"
                style={{
                  width: isActive ? `${progress}%` : isCompleted ? "100%" : "0%",
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
