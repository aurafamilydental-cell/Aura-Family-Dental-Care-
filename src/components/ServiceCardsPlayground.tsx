"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, ScrollRevealItem } from "./ui/scroll-reveal";

export type ServiceData = {
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
};

interface ServiceCardsPlaygroundProps {
  services: ServiceData[];
}

export const ServiceCardsPlayground: React.FC<ServiceCardsPlaygroundProps> = ({ services }) => {
  return (
    <div className="w-full">
      <ScrollReveal staggerChildren={0.1} className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <ScrollRevealItem
            key={index}
            className="flex-none w-[70vw] sm:w-[260px] md:w-auto snap-center shrink-0 md:shrink relative rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl overflow-hidden group aspect-square md:aspect-[3/4] cursor-pointer"
          >
            <Image
              src={service.image}
              alt={service.alt}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            {/* Default overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            
            {/* Hover overlay that slides up */}
            <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
            
            {/* Content Container */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
              <div className="transform transition-transform duration-500">
                <h3 className="font-heading text-2xl text-white font-medium mb-3 drop-shadow-md">
                  {service.title}
                </h3>
                {/* Subtle indicator line */}
                <div className="w-10 h-0.5 bg-white/50 group-hover:w-full group-hover:bg-white transition-all duration-500" />
              </div>
              
              {/* Reveal Content */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                <div className="overflow-hidden">
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white text-base md:text-lg leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <Link href={service.link} className="inline-flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider hover:underline underline-offset-4">
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
    </div>
  );
};
