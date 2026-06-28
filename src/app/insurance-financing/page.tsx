/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function InsuranceFinancing() {
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
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Cost Transparency</span>
          <AnimatedText
            as="h1"
            text="Honest pricing, no surprise bills."
            className="mb-6"
            textClassName="text-h2 text-accent leading-tight"
            underlineClassName="text-primary"
          />
          <p className="text-accent/70 text-lg leading-relaxed max-w-2xl mx-auto font-body">
            We believe that financial anxiety shouldn't stand in the way of dental health. Aura provides clear, upfront costs before any treatment begins.
          </p>
        </section>

        {/* Insurance section */}
        <section className="py-12 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="font-heading text-4xl lg:text-5xl text-accent leading-tight mb-6">We accept most major PPO plans.</h2>
              <p className="text-accent/70 text-lg leading-relaxed font-body">
                We work with almost all major dental insurance providers to maximize your PPO benefits. Our team handles all claims, paperwork, and pre-determinations for you so you don't have to deal with the insurance company.
              </p>
              
              <div className="bg-white rounded-[32px] border border-border-subtle p-8 shadow-sm hover:shadow-md transition-all">
                <h4 className="font-heading text-xl text-accent mb-4">PPO Providers We Support Include:</h4>
                <ul className="grid grid-cols-2 gap-3 text-base text-accent/70 font-medium">
                  <li className="flex items-center gap-2"><span className="text-primary">✦</span> Delta Dental</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✦</span> Aetna PPO</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✦</span> Cigna PPO</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✦</span> MetLife</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✦</span> Guardian</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✦</span> Principal Financial</li>
                </ul>
              </div>
            </div>

            {/* Graphic Placeholder */}
            <div className="relative aspect-[4/3] rounded-[32px] bg-primary/5 border border-primary/10 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-5xl text-primary block mb-4"></span>
                <p className="text-accent font-heading text-xl">Insurance Verification</p>
                <p className="text-accent/50 text-xs mt-1">Verified *before* your visit</p>
              </div>
            </div>

          </div>
        </section>

        {/* Membership plan for uninsured */}
        <section className="py-24 px-6 md:px-12 bg-primary text-white rounded-[40px] max-w-7xl mx-auto shadow-2xl relative overflow-hidden mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-[#b534e6]/80 to-primary/95 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white leading-tight">No insurance? Explore the Aura Membership.</h2>
            <p className="text-white/85 text-lg leading-relaxed max-w-2xl mx-auto mb-12 font-body">
              We've created a simple, direct-care membership program. For a flat annual fee, you get complete preventative care and discounts on restorative treatments without dealing with deductibles, waiting periods, or claim denials.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] shadow-lg hover:-translate-y-1 transition-transform">
                <h4 className="font-heading text-2xl mb-2 text-white">Adult Membership</h4>
                <p className="text-white text-3xl font-bold mb-4">$29 <span className="text-lg font-normal text-white/70">/ month</span></p>
                <ul className="text-white/80 text-sm space-y-3 font-medium">
                  <li className="flex gap-2"><span>•</span> 2 Professional Cleanings & Exams</li>
                  <li className="flex gap-2"><span>•</span> All necessary checkup X-rays</li>
                  <li className="flex gap-2"><span>•</span> 1 Emergency Exam per year</li>
                  <li className="flex gap-2"><span>•</span> 15% discount on all restorative care</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] shadow-lg hover:-translate-y-1 transition-transform">
                <h4 className="font-heading text-2xl mb-2 text-white">Child Membership</h4>
                <p className="text-white text-3xl font-bold mb-4">$19 <span className="text-lg font-normal text-white/70">/ month</span></p>
                <ul className="text-white/80 text-sm space-y-3 font-medium">
                  <li className="flex gap-2"><span>•</span> 2 Pediatric Cleanings & Exams</li>
                  <li className="flex gap-2"><span>•</span> All checkup X-rays & fluoride</li>
                  <li className="flex gap-2"><span>•</span> 1 Emergency Exam per year</li>
                  <li className="flex gap-2"><span>•</span> 15% discount on sealants & fillings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Standard Fee Estimates */}
        <section className="py-24 px-6 md:px-12 bg-transparent mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-heading text-accent text-center mb-6 leading-tight">Transparent Starting Costs</h2>
            <p className="text-accent/70 text-center max-w-2xl mx-auto mb-12 text-lg font-body">
              If you don't have insurance or are paying out-of-pocket, here are typical starting costs for common diagnostic procedures.
            </p>
            
            <div className="bg-white border border-border-subtle rounded-brand shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-base">
                <thead>
                  <tr className="bg-accent/5 font-heading text-accent border-b border-border-subtle">
                    <th className="p-6 text-lg">Procedure</th>
                    <th className="p-6 text-right text-lg">Starting Cost</th>
                  </tr>
                </thead>
                <tbody className="text-accent/80 font-medium divide-y divide-border-subtle">
                  <tr className="hover:bg-accent/[0.02] transition-colors">
                    <td className="p-6">New Patient Comprehensive Exam & X-rays</td>
                    <td className="p-6 text-right text-primary text-lg font-bold">$99</td>
                  </tr>
                  <tr className="hover:bg-accent/[0.02] transition-colors">
                    <td className="p-6">Adult Routine Cleaning & Exam</td>
                    <td className="p-6 text-right text-primary text-lg font-bold">$149</td>
                  </tr>
                  <tr className="hover:bg-accent/[0.02] transition-colors">
                    <td className="p-6">Child Routine Cleaning & Exam</td>
                    <td className="p-6 text-right text-primary text-lg font-bold">$99</td>
                  </tr>
                  <tr className="hover:bg-accent/[0.02] transition-colors">
                    <td className="p-6">Emergency Visit (Targeted Exam & X-ray)</td>
                    <td className="p-6 text-right text-primary text-lg font-bold">$99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 text-center bg-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading text-accent mb-6 tracking-tight">Let us verify your benefits before you arrive.</h2>
            <p className="text-accent/70 text-xl mb-10 font-body">
              Provide your insurance details in our booking form or give us a call. We will handle the rest.
            </p>
            <button
              onClick={handleOpenBooking}
              className="bg-primary text-white px-10 py-5 rounded-brand font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] cursor-pointer"
            >
              Verify My Coverage
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
