/* eslint-disable */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
  onBooking?: (e?: React.MouseEvent) => void;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 520,
  radiusMd = 350,
  radiusSm = 450,
  cardSizeLg = 180,
  cardSizeMd = 110,
  cardSizeSm = 90,
  className = '',
  onBooking
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section ref={containerRef} className={`relative overflow-hidden bg-background text-accent min-h-[50vh] md:min-h-screen flex flex-col pt-10 md:pt-24 ${className}`}>
      
      {/* DESKTOP ARC GALLERY (>= 768px) */}
      <div
        className="hidden md:block relative mx-auto transition-all duration-500"
        style={{
          width: '100%',
          height: `${dimensions.radius * 1.2}px`,
        }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i; 
            const angleRad = (angle * Math.PI) / 180;
            
            const x = (Math.cos(angleRad) * dimensions.radius).toFixed(2);
            const y = (Math.sin(angleRad) * dimensions.radius).toFixed(2);
            const rotation = (angle / 4).toFixed(2);
            
            return (
              <div
                key={i}
                className={`absolute opacity-0 ${isInView ? 'animate-fade-in-up' : ''}`}
                suppressHydrationWarning
                style={{
                  width: `${dimensions.cardSize}px`,
                  height: `${dimensions.cardSize}px`,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  zIndex: count - i,
                }}
              >
                <div 
                  className="relative rounded-2xl shadow-xl overflow-hidden ring-1 ring-border-subtle bg-white transition-transform hover:scale-105 w-full h-full"
                  suppressHydrationWarning
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <Image
                    src={src}
                    alt={`Gallery Image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 250px, 350px"
                    quality={95}
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x400/334155/e2e8f0?text=Aura`;
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 mt-0 md:-mt-48 lg:-mt-64 pb-16 md:pb-20">
        <div className={`text-center max-w-4xl px-6 opacity-0 ${isInView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <h2 className="text-accent font-heading font-normal leading-[1.1] mb-6 max-w-3xl mx-auto" style={{ fontSize: 'clamp(32px, 7vw, 68px)' }}>
            We know this isn't your favorite place to be.
          </h2>
          <p className="text-accent/70 text-lg md:text-xl mb-10 max-w-3xl mx-auto font-body leading-relaxed">
            That's exactly why we built this one differently. No sterile smells, no lectures, and no judgment. Just clinical excellence wrapped in genuine hospitality.
          </p>

        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translate(-50%, 60%); }
          to { opacity: 1; transform: translate(-50%, 50%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation-name: fade-in-up; animation-duration: 0.8s; animation-timing-function: ease-out; }
        .animate-fade-in { animation-name: fade-in; animation-duration: 0.8s; animation-timing-function: ease-out; }
      `}</style>
    </section>
  );
};
