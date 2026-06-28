/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

const images = [
  "/all smiles-1.JPG",
  "/all smiles 2.JPG",
  "/all smiles 3.JPG",
  "/meet the team.JPG",
];

const wipeVariants: Record<string, any> = {
  enter: { clipPath: "inset(0 0 0 100%)", opacity: 1, scale: 1.05 },
  center: { 
    clipPath: "inset(0 0 0 0)", 
    opacity: 1, 
    scale: 1, 
    transition: { 
      clipPath: { duration: 1.5, ease: [0.7, 0, 0.3, 1] },
      scale: { duration: 1.5, ease: [0.7, 0, 0.3, 1] }
    } 
  },
  exit: { 
    clipPath: "inset(0 100% 0 0)", 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.5, ease: [0.7, 0, 0.3, 1] } 
  }
};

export default function TeamShowcase() {
  const [imageIndex, setImageIndex] = useState(0);

  // Auto-advance the image every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const Headline = "We're All Smiles";
  const BodyText = "Our team loves what we do and it shows. We'll transform your expectations for what a doctors office should be. From the environment. To every interaction with our staff. That's a promise.";

  return (
    <section className="relative w-full overflow-hidden min-h-[600px] md:min-h-[700px] bg-black">
      


      {/* Animated Background Images */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={imageIndex}
            variants={wipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full origin-center"
          >
            <Image
              src={images[imageIndex]}
              alt="Team"
              fill
              className="object-cover object-center pointer-events-none"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10 pointer-events-none" />

      {/* Static Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center min-h-[600px] md:min-h-[700px] pointer-events-none">
        <div className="text-center px-6 max-w-4xl pt-20 pointer-events-auto">
          <AnimatedText
            as="h2"
            text={Headline}
            className="mb-6"
            textClassName="text-h1 font-normal text-white leading-tight drop-shadow-lg max-w-3xl mx-auto"
            underlineClassName="text-primary"
          />
          <p className="text-white/90 text-base md:text-lg leading-relaxed font-body mb-10 max-w-2xl mx-auto drop-shadow-md">
            {BodyText}
          </p>
          <Link href="/team" className="inline-block bg-primary text-white px-10 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-sm uppercase font-semibold tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.01]">
            Learn More About Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
