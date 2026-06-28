/* eslint-disable */
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32 pb-24">
        <section className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Legal Information</span>
          <AnimatedText
            as="h1"
            text="Terms of Service"
            className="mb-6 justify-center"
            textClassName="text-h2 text-accent leading-tight text-center"
            underlineClassName="text-primary"
          />
          <p className="text-accent/50 text-sm tracking-wider uppercase font-semibold">Last Updated: June 16, 2026</p>
        </section>

        <section className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="space-y-10 text-accent/80 leading-relaxed text-base md:text-lg font-body">
            <p>
              Welcome to the website of Aura Family Dental Care. By accessing or using our website, online forms, and booking services, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">1. Scheduling & Booking</h3>
              <p>
                Appointments scheduled online are pending confirmation. We verify scheduling coordinates (PPO coverage, patient details, and clinic hours) before locking the slot. Aura reserves the right to cancel or reschedule appointments due to emergency situations or verification failures.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">2. Cancellation Policy</h3>
              <p>
                We respect your time and ask that you respect ours. If you need to cancel or reschedule your visit, please provide at least 24 hours' notice. Failure to do so may result in a cancellation fee or restrictions on future online bookings.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">3. Accuracy of Information</h3>
              <p>
                You agree to provide accurate, current, and complete details when submitting booking requests. Providing false names, contact info, or fraudulent insurance details may result in termination of services.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-accent mb-3">4. Disclaimers</h3>
              <p>
                The content on this website (including guides, blog posts, and comfort recommendations) is for educational purposes only and does not constitute official medical advice. Always consult a qualified dentist for diagnosis.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
