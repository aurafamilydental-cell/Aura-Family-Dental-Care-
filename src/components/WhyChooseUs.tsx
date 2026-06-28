import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/scroll-reveal";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Collage Grid (Left Column) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollRevealItem>
              <div className="relative w-full max-w-[500px] mx-auto aspect-square grid grid-cols-6 grid-rows-6 gap-4">
                {/* Purple Block 1 (Top Left) */}
                <div className="col-start-1 col-span-1 row-start-2 row-span-1 bg-primary"></div>

                {/* Teeth Close Up (Top Center) */}
                <div className="col-start-2 col-span-3 row-start-1 row-span-2 bg-primary/10 overflow-hidden rounded-tl-[40px] group relative">
                  <Image
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600"
                    fill
                    className="object-cover transition-transform duration-500 ease-out"
                    alt="Braces and smile design"
                    sizes="(max-w-768px) 50vw, 33vw"
                  />
                </div>

                {/* Dental Mold (Top Right) */}
                <div className="col-start-5 col-span-2 row-start-1 row-span-2 bg-primary/10 overflow-hidden rounded-tr-[40px] group relative">
                  <Image
                    src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=600"
                    fill
                    className="object-cover transition-transform duration-500 ease-out"
                    alt="Dental mold"
                    sizes="(max-w-768px) 50vw, 33vw"
                  />
                </div>

                {/* Aligners (Bottom Left) */}
                <div className="col-start-1 col-span-2 row-start-3 row-span-4 bg-primary/10 overflow-hidden rounded-bl-[40px] group relative">
                  <Image
                    src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600"
                    fill
                    className="object-cover transition-transform duration-500 ease-out"
                    alt="Clear Aligners"
                    sizes="(max-w-768px) 50vw, 33vw"
                  />
                </div>

                {/* Dental Model (Center) */}
                <div className="col-start-3 col-span-3 row-start-3 row-span-2 bg-primary/10 overflow-hidden group relative">
                  <Image
                    src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600"
                    fill
                    className="object-cover transition-transform duration-500 ease-out"
                    alt="Dental tools"
                    sizes="(max-w-768px) 50vw, 33vw"
                  />
                </div>

                {/* Syringe/Tools (Middle Right) */}
                <div className="col-start-6 col-span-1 row-start-3 row-span-2 bg-primary/10 overflow-hidden group relative">
                  <Image
                    src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?q=80&w=600"
                    fill
                    className="object-cover transition-transform duration-500 ease-out"
                    alt="Dental equipment"
                    sizes="(max-w-768px) 50vw, 33vw"
                  />
                </div>

                {/* Purple Block 2 (Bottom Center) */}
                <div className="col-start-3 col-span-1 row-start-5 row-span-1 bg-primary"></div>

                {/* Dentist Working (Bottom Right) */}
                <div className="col-start-4 col-span-3 row-start-5 row-span-2 bg-primary/10 overflow-hidden rounded-br-[40px] group relative">
                  <Image
                    src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600"
                    fill
                    className="object-cover transition-transform duration-500 ease-out"
                    alt="Dentist consultation"
                    sizes="(max-w-768px) 50vw, 33vw"
                  />
                </div>
              </div>
            </ScrollRevealItem>
          </div>

          {/* Text Right Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <ScrollReveal staggerChildren={0.15}>
              <ScrollRevealItem>
                <h2 className="font-heading text-[40px] lg:text-[44px] font-semibold text-accent leading-[1.15] mb-6">
                  Why Choose <br />
                  <span className="text-primary font-extrabold leading-[1.1] inline-block mt-2">
                    Aura Family Dental Care?
                  </span>
                </h2>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <p className="text-[17px] text-accent/70 font-medium mb-10 leading-[1.7] text-left max-w-[480px]">
                  We believe dental care should be relaxing, not stressful. Our team of experts uses the latest techniques to ensure your comfort and health comes first.
                </p>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </ScrollRevealItem>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
