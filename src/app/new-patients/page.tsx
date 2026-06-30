/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function NewPatients() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleOpenBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-booking-drawer"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32">
        {/* Intro */}
        <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">First Visit Guide</span>
          <AnimatedText
            as="h1"
            text="Here is exactly what happens on your first visit."
            className="mb-6"
            textClassName="text-4xl md:text-5xl lg:text-7xl text-accent leading-tight text-center"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            Fearing the unknown is completely natural. We want you to feel in control from the moment you schedule to the moment you leave.
          </p>
        </section>

        {/* Step-by-Step Walkthrough (Bento Grid) */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-16 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {/* Phase 1: Arrival (Spans 2 cols, Image Right) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-2 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row min-h-[320px] w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center md:snap-align-none"
            >
              <div className="p-6 md:p-12 lg:p-16 flex-grow flex-1 flex flex-col justify-center z-10">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-5 uppercase tracking-wider">
                    01 / Arrival
                  </span>
                  <h3 className="font-heading text-2xl text-accent mb-4">A Welcoming Arrival</h3>
                  <p className="text-accent/70 text-base leading-relaxed mb-6">
                    Walk in and leave the clinic feeling behind. Grace will greet you, help verify any details, and offer you a freshly prepared matcha, specialty tea, or warm treat. Relax in our lounge, listen to calming music, or play a game.
                  </p>

                </div>
              </div>
              <div className="relative w-full md:w-[45%] h-56 md:min-h-[600px] overflow-hidden">
                <Image
                  src="/tea area-horizontal.png"
                  alt="A Welcoming Arrival"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>

            {/* Phase 2: Consultation (Spans 1 col, Image Top) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-1 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col min-h-[320px] w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center md:snap-align-none"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/doctor-patient.JPG"
                  alt="The Comfort Consultation"
                  fill
                  className="object-cover transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-start">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                    02 / Consultation
                  </span>
                  <h3 className="font-heading text-2xl text-accent mb-3">The Comfort Consultation</h3>
                  <p className="text-accent/70 text-base leading-relaxed">
                    Before we look at your teeth, we listen. We sit down to discuss any past dental fears, what makes you uncomfortable, and your immediate oral goals.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phase 3: Diagnostics (Spans 1 col, Image Bottom) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-1 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col min-h-[320px] w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center md:snap-align-none"
            >
              <div className="p-8 flex-grow flex flex-col justify-start z-10">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                    03 / Diagnostics
                  </span>
                  <h3 className="font-heading text-2xl text-accent mb-3">Gentle, Modern Diagnostics</h3>
                  <p className="text-accent/70 text-base leading-relaxed">
                    We use ultra-fast digital 3D camera scanners and low-radiation digital X-rays to get a clear picture of your mouth without gagging impressions.
                  </p>
                </div>
              </div>
              <div className="relative w-full h-48 mt-auto overflow-hidden">
                <Image
                  src="/chck up 1.JPG"
                  alt="Gentle Diagnostics"
                  fill
                  className="object-cover transition-transform duration-700 ease-out object-top"
                />
              </div>
            </motion.div>

            {/* Phase 4: Care Plan (Spans 2 cols, Image Left) */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-2 relative overflow-hidden bg-white rounded-brand border border-border-subtle hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row min-h-[320px] w-[85vw] sm:w-[300px] md:w-auto shrink-0 snap-center md:snap-align-none"
            >
              <div className="relative w-full md:w-[45%] h-56 md:min-h-[600px] overflow-hidden">
                <Image
                  src="/collab-2.JPG"
                  alt="Care Plan"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-8 lg:p-10 flex-grow flex-1 flex flex-col justify-center md:pl-12">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-5 uppercase tracking-wider">
                    04 / Care Plan
                  </span>
                  <h3 className="font-heading text-2xl text-accent mb-4">A Collaborative Care Plan</h3>
                  <p className="text-accent/70 text-base leading-relaxed mb-6">
                    We display your scans on a screen and explain what we see—with absolute transparency. If treatments are needed, we prioritize them based on urgency and provide clear, upfront cost sheets.
                  </p>

                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-24 px-6 md:px-12 bg-transparent relative">
          {/* Subtle background shapes if desired */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="text-accent/60 font-semibold tracking-wide text-sm mb-3 block uppercase">Ask Us Anything</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading text-accent leading-tight font-light mb-4">Frequently Asked Questions</h2>
              <p className="text-accent/70 text-lg">Our friendly team would love to answer your questions.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "I haven't seen a dentist in 10 years. Will I be scolded?",
                  answer: "Absolutely not. We are here to support your health moving forward. We respect the courage it takes to return to care, and our team is trained to deliver supportive, non-judgmental dental care."
                },
                {
                  question: "What if I need treatment but have a panic attack?",
                  answer: "We establish a \"pause signal\" (such as raising your left hand). Whenever you raise your hand, we stop the procedure immediately to let you breathe, adjust, or rest. You are in complete control of the pace."
                },
                {
                  question: "Do you offer sedation options?",
                  answer: "Yes. We offer nitrous oxide (laughing gas) and oral conscious sedation to help you feel completely relaxed during cleanings or treatments. Let us know your comfort preferences during booking."
                }
              ].map((faq, index) => {
                const isActive = activeFaq === index;
                
                return (
                  <div 
                    key={index}
                    className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive 
                        ? "bg-[#0f0521] text-white shadow-xl scale-[1.02]" 
                        : "bg-white text-accent border border-border-subtle hover:border-primary/20 hover:shadow-md"
                    }`}
                    onClick={() => setActiveFaq(isActive ? null : index)}
                  >
                    <div className="p-6 md:p-8 flex justify-between items-center">
                      <h4 className={`font-heading text-lg md:text-xl pr-8 ${isActive ? 'text-white' : 'text-accent'}`}>
                        {faq.question}
                      </h4>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                        isActive ? "border-white/20 text-white" : "border-accent/20 text-accent/60"
                      }`}>
                        {isActive ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 md:px-8 pb-8 pt-0 text-white/70 text-base leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-accent mb-6 leading-tight drop-shadow-sm">Ready for Your First Visit?</h2>
            <p className="text-accent/70 text-xl mb-10 font-body">
              Select "Just Me" or "My Child" in our form, and let us know your comfort preferences. We've got you.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/30 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Your First Visit</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
