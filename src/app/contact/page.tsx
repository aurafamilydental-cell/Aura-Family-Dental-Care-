"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDrawer from "@/components/BookingDrawer";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-grow pt-32">
        <section className="px-6 md:px-12 max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info Column */}
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">Get in Touch</span>
              <AnimatedText
                as="h1"
                align="left"
                text="We are here to make care easy."
                className="items-start mb-6"
                textClassName="text-h2 text-accent leading-tight text-left"
                underlineClassName="text-primary"
              />
              <p className="text-accent/70 text-base leading-relaxed mb-10">
                Have questions about insurance, scheduling, or dental anxiety? Contact us directly or use our custom booking form to schedule a visit in seconds.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-heading text-lg text-accent mb-1">Our Location</h4>
                  <p className="text-accent/70 text-sm mb-2">123 Wellness Avenue, Suite 200, Cityville, ST 12345</p>
                  <button className="bg-primary text-white py-2 px-4 rounded-brand font-semibold text-sm hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md cursor-pointer inline-block">
                    Get Directions
                  </button>
                </div>
                <div>
                  <h4 className="font-heading text-lg text-accent mb-1">Direct Contact</h4>
                  <p className="text-accent/70 text-sm">Phone: (+233) 0544079966</p>
                  <p className="text-accent/70 text-sm">Email: hello@aurafamilydental.com</p>
                </div>
                <div>
                  <h4 className="font-heading text-lg text-accent mb-3">Office Hours</h4>
                  <div className="space-y-1 text-sm text-accent/70 max-w-xs">
                    <div className="flex justify-between"><span>Monday – Friday</span><span>8:00 AM – 6:00 PM</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>9:00 AM – 2:00 PM</span></div>
                    <div className="flex justify-between text-accent/40"><span>Sunday</span><span>Closed</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-white border border-border-subtle rounded-[32px] p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 lg:sticky lg:top-32 self-start">
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-4xl mb-4 block"></span>
                  <h3 className="font-heading text-xl text-accent mb-2">Message Sent!</h3>
                  <p className="text-accent/70 text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. A patient coordinator will respond to your message within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-6">
                  <h3 className="font-heading text-xl text-accent mb-2">Send us a message</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-accent/80 mb-2 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-accent/80 mb-2 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-accent/80 mb-2 uppercase tracking-wider">How can we help you?</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background h-32"
                      placeholder="Type your inquiry here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white py-4 px-6 rounded-brand font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] w-full cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />
      <BookingDrawer isOpen={false} onClose={() => {}} />
    </div>
  );
}
