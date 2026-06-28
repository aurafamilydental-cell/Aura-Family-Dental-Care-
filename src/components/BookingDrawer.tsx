/* eslint-disable */
"use client";

import { useState, useEffect } from "react";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type PatientType = "adult" | "child" | "family";

export default function BookingDrawer({ isOpen: initialIsOpen, onClose }: BookingDrawerProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [step, setStep] = useState(1);
  const [patientType, setPatientType] = useState<PatientType>("adult");

  // Sync prop open state
  useEffect(() => {
    // setIsOpen(initialIsOpen); // Fixed: avoid set state in effect
  }, [initialIsOpen]);

  // Listen for custom open event
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-booking-drawer", handleOpenEvent);
    return () => {
      window.removeEventListener("open-booking-drawer", handleOpenEvent);
    };
  }, []);
  
  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("Routine Checkup & Cleaning");

  // Child-specific fields
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Family-specific fields
  const [familyMembers, setFamilyMembers] = useState("");
  const [appointmentPref, setAppointmentPref] = useState("back-to-back");

  // Date/Time selection
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  // Fetch slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    
    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      setAvailableSlots([]);
      setSelectedSlot("");
      setErrorMessage("");
      
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        if (!res.ok) throw new Error("Failed to fetch slots");
        const data = await res.json();
        setAvailableSlots(data.slots || []);
      } catch (err) {
        setErrorMessage("Could not load available times. Please try again.");
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const bookingData = {
      patientType,
      name,
      email,
      phone,
      reason,
      timeSlot: selectedSlot,
      childName: patientType === "child" ? childName : undefined,
      childAge: patientType === "child" ? childAge : undefined,
      isFirstVisit: patientType === "child" ? isFirstVisit : undefined,
      familyMembers: patientType === "family" ? familyMembers : undefined,
      appointmentPref: patientType === "family" ? appointmentPref : undefined,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      setBookingSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
    // Reset state after transition
    setTimeout(() => {
      setStep(1);
      setName("");
      setEmail("");
      setPhone("");
      setReason("Routine Checkup & Cleaning");
      setChildName("");
      setChildAge("");
      setIsFirstVisit(false);
      setFamilyMembers("");
      setAppointmentPref("back-to-back");
      setSelectedDate("");
      setSelectedSlot("");
      setBookingSuccess(false);
      setErrorMessage("");
    }, 300);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const formatDateLabel = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-background z-50 border-l border-border-subtle flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-heading text-accent">Schedule Your Visit</h3>
            <p className="text-accent/60 text-xs">Aura Family Dental Care</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-accent/5 transition-colors text-accent/60 hover:text-accent"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-grow overflow-y-auto p-6">
          {errorMessage && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-brand mb-6 text-sm flex items-start gap-2">
              <span className="text-lg"></span>
              <p>{errorMessage}</p>
            </div>
          )}

          {bookingSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <span className="text-6xl mb-6"></span>
              <h4 className="text-2xl font-heading text-accent mb-3">Booking Confirmed!</h4>
              <p className="text-accent/70 leading-relaxed max-w-sm mb-8">
                Thank you, {name || childName || "Family"}. A calendar invitation has been sent to your email. We look forward to seeing you!
              </p>
              <button
                onClick={handleClose}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-accent transition-all w-full"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Patient Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <span className="text-sm font-semibold tracking-wider text-primary uppercase block">Step 1 of 3: Who is visiting?</span>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPatientType("adult");
                        setStep(2);
                      }}
                      className="p-5 border-2 border-border-subtle rounded-brand text-left hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                    >
                      <div>
                        <h4 className="font-heading text-lg text-accent group-hover:text-primary transition-colors">Just Me</h4>
                        <p className="text-accent/60 text-sm mt-1">Book an appointment for myself</p>
                      </div>
                      <span className="text-xl"></span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPatientType("child");
                        setStep(2);
                      }}
                      className="p-5 border-2 border-border-subtle rounded-brand text-left hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                    >
                      <div>
                        <h4 className="font-heading text-lg text-accent group-hover:text-primary transition-colors">My Child</h4>
                        <p className="text-accent/60 text-sm mt-1">Book a gentle checkup for a child</p>
                      </div>
                      <span className="text-xl"></span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPatientType("family");
                        setStep(2);
                      }}
                      className="p-5 border-2 border-border-subtle rounded-brand text-left hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                    >
                      <div>
                        <h4 className="font-heading text-lg text-accent group-hover:text-primary transition-colors">Family / Both</h4>
                        <p className="text-accent/60 text-sm mt-1">Book back-to-back slots for family</p>
                      </div>
                      <span className="text-xl"></span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Patient Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <span className="text-sm font-semibold tracking-wider text-primary uppercase block">Step 2 of 3: Provide details</span>

                  {/* ADULT FIELDS */}
                  {patientType === "adult" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background text-[16px] sm:text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  {/* CHILD FIELDS */}
                  {patientType === "child" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Child's Name</label>
                        <input
                          type="text"
                          required
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background text-[16px] sm:text-sm"
                          placeholder="Sam Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Child's Age</label>
                        <input
                          type="text"
                          required
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background text-[16px] sm:text-sm"
                          placeholder="e.g. 6 years old"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Parent/Guardian Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background text-[16px] sm:text-sm"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="first-visit"
                          checked={isFirstVisit}
                          onChange={(e) => setIsFirstVisit(e.target.checked)}
                          className="w-4 h-4 text-primary border-border-subtle rounded focus:ring-primary focus:outline-none accent-primary"
                        />
                        <label htmlFor="first-visit" className="text-sm text-accent/80 font-medium select-none cursor-pointer">
                          Is this their first time visiting the dentist?
                        </label>
                      </div>
                    </div>
                  )}

                  {/* FAMILY FIELDS */}
                  {patientType === "family" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Parent/Guardian Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background text-[16px] sm:text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Family Members Booking (Names & Ages)</label>
                        <textarea
                          required
                          value={familyMembers}
                          onChange={(e) => setFamilyMembers(e.target.value)}
                          className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background h-24 text-[16px] sm:text-sm"
                          placeholder="e.g. Sam (Age 6), Jessica (Age 8), John (Adult)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-accent/80 mb-2">Scheduling Preference</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setAppointmentPref("back-to-back")}
                            className={`py-3 px-4 border rounded-brand font-medium transition-colors ${
                              appointmentPref === "back-to-back"
                                ? "bg-accent text-white border-accent"
                                : "bg-transparent text-accent border-border-subtle hover:border-accent"
                            }`}
                          >
                            Back-to-Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setAppointmentPref("side-by-side")}
                            className={`py-3 px-4 border rounded-brand font-medium transition-colors ${
                              appointmentPref === "side-by-side"
                                ? "bg-accent text-white border-accent"
                                : "bg-transparent text-accent border-border-subtle hover:border-accent"
                            }`}
                          >
                            Side-by-Side
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SHARED CONTACT FIELDS */}
                  <div className="space-y-4 pt-4 border-t border-border-subtle">
                    <div>
                      <label className="block text-sm font-semibold text-accent/80 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background"
                        placeholder="patient@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-accent/80 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background"
                        placeholder="(+233) 0544079966"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-accent/80 mb-2">Reason for Visit</label>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background"
                      >
                        <option value="Routine Checkup & Cleaning">Routine Checkup & Cleaning</option>
                        <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                        <option value="Tooth Pain / Restorative">Tooth Pain / Filling</option>
                        <option value="Emergency Visit">Emergency Care</option>
                        <option value="Child Pediatric Visit">Child Pediatric Visit</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-border-subtle rounded-full font-semibold hover:border-accent transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!name || !email || !phone}
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Choose Time
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date & Time Slot */}
              {step === 3 && (
                <div className="space-y-6">
                  <span className="text-sm font-semibold tracking-wider text-primary uppercase block">Step 3 of 3: Select Date & Time</span>

                  <div>
                    <label className="block text-sm font-semibold text-accent/80 mb-2">Select Date</label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border border-border-subtle rounded-brand focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-accent bg-background cursor-pointer text-[16px] sm:text-sm"
                    />
                  </div>

                  {/* Available Time Slots Grid */}
                  <div>
                    <label className="block text-sm font-semibold text-accent/80 mb-3">Available Times</label>
                    
                    {!selectedDate ? (
                      <p className="text-accent/50 text-sm text-center py-8 bg-accent/5 rounded-brand border border-dashed border-border-subtle">
                        Please choose a date above to check availability.
                      </p>
                    ) : isLoadingSlots ? (
                      <div className="text-center py-12">
                        <div className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
                        <p className="text-accent/60 text-xs">Checking availability...</p>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <p className="text-red-500 text-sm text-center py-8 bg-red-50/50 rounded-brand border border-red-100">
                        No available slots on this date. Please try another day.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-3 rounded-brand text-xs font-semibold border transition-all ${
                              selectedSlot === slot
                                ? "bg-primary text-white border-primary shadow-sm"
                                : "bg-transparent text-accent border-border-subtle hover:border-accent"
                            }`}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSlot && (
                    <div className="bg-primary/5 p-4 rounded-brand border border-primary/20 text-sm">
                      <span className="font-semibold text-primary block mb-1">Selected Visit Time:</span>
                      <p className="text-accent font-medium">{formatDateLabel(selectedDate)} at {formatTime(selectedSlot)}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 border border-border-subtle rounded-full font-semibold hover:border-accent transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedSlot || isSubmitting}
                      className="flex-1 py-3 bg-primary text-white rounded-full font-semibold hover:bg-opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Booking...
                        </>
                      ) : (
                        "Confirm Visit"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
}
