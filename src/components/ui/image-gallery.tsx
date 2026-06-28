import React from "react";
import Image from "next/image";

const images = [
  { src: "/doctor-patient.JPG",                                                                                          alt: "Aura dentist reviewing treatment plan with patient on a tablet" },
  { src: "/front desk.JPG",                                                                                               alt: "Aura Family Dental Care beautifully decorated front desk at grand opening" },
  { src: "/game section.JPG",                                                                                             alt: "Aura clinic lounge and game area with TV, seating, and plants" },
  { src: "/no styrile atmosphere.JPG",                                                                                    alt: "Patients and family relaxing comfortably in the Aura clinic waiting area" },
  { src: "/banner.JPG",                                                                                                   alt: "Aura Family Dental Care clinic interior showing the brand signage and modern lighting" },
  { src: "/gassed man smillinag.JPG",                                                                                    alt: "Happy patient smiling with confidence after treatment at Aura Family Dental Care" },
];

export default function ImageGallery() {
  return (
    <section className="w-full flex flex-col items-center justify-start pb-24 pt-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 sm:h-[400px] w-full max-w-6xl px-6">
        {images.map((image, idx) => (
          <div
            key={idx}
            className="relative group flex-grow transition-all w-full sm:w-56 h-[300px] sm:h-full rounded-2xl overflow-hidden duration-500 sm:hover:w-full cursor-pointer shadow-sm hover:shadow-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={90}
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
