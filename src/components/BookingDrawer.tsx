/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import CustomDropdown from "./ui/CustomDropdown";
import CustomCalendar from "./ui/CustomCalendar";
import { Stethoscope, Sparkles, Activity, PlusCircle, Baby } from "lucide-react";
import { getTreatmentDuration } from "@/lib/treatmentDurations";

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
  const [customReason, setCustomReason] = useState("");

  // Child-specific fields
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  
  // Shared fields
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Family-specific fields
  const [familyMembers, setFamilyMembers] = useState("");

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
      
      const duration = getTreatmentDuration(reason);

      try {
        const res = await fetch(`/api/availability?date=${selectedDate}&duration=${duration}`);
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
  }, [selectedDate, reason]);

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
      reason: reason === "Other" ? customReason : reason,
      timeSlot: selectedSlot,
      durationMinutes: getTreatmentDuration(reason),
      childName: patientType === "child" ? childName : undefined,
      childAge: patientType === "child" ? childAge : undefined,
      isFirstVisit,
      familyMembers: patientType === "family" ? familyMembers : undefined,
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
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
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
      setCustomReason("");
      setChildName("");
      setChildAge("");
      setIsFirstVisit(false);
      setFamilyMembers("");
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

  const reasonOptions = [
    { value: "Routine Checkup & Cleaning", label: "Routine Checkup & Cleaning", icon: Stethoscope },
    { value: "Cosmetic Consultation", label: "Cosmetic Consultation", icon: Sparkles },
    { value: "Tooth Pain / Restorative", label: "Tooth Pain / Filling", icon: Activity },
    { value: "Emergency Visit", label: "Emergency Care", icon: PlusCircle },
    { value: "Child Dental Care", label: "Child Dental Care", icon: Baby },
    { value: "Other", label: "Other (Please specify)", icon: PlusCircle },
  ];

  const currentTheme = {
    drawer: "bg-white border-l border-gray-200 text-accent",
    header: "border-b border-gray-100",
    card: "p-5 border border-gray-100 bg-gray-50 rounded-2xl shadow-sm hover:bg-gray-100 hover:scale-[1.01] transition-all group",
    cardText: "text-accent group-hover:text-primary transition-colors",
    input: "w-full px-4 py-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:border-gray-400 focus:ring-0 text-[16px] text-accent [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill]:-webkit-text-fill-color-accent",
    primaryBtn: "bg-gradient-to-r from-primary to-purple-500 text-white rounded-full hover:scale-[1.02] transition-all",
    secondaryBtn: "border border-gray-200 bg-white text-accent rounded-full hover:bg-gray-50 transition-all",
    slotBtn: "py-3 rounded-xl text-xs font-semibold border border-gray-200 bg-gray-50 text-accent hover:bg-gray-100 transition-all",
    slotBtnActive: "py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-purple-500 text-white",
    stepText: "text-sm font-medium tracking-wider text-primary/80 uppercase block",
    label: "block text-sm font-semibold text-accent/80 mb-2",
    h3: "text-2xl font-heading text-accent",
    subLabel: "text-accent/60 text-xs mt-1",
    closeBtn: "hover:bg-accent/5 text-accent/60 hover:text-accent",
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] z-50 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${currentTheme.drawer} ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className={`p-6 flex items-center justify-between ${currentTheme.header}`}>
          <div>
            <h3 className={currentTheme.h3}>Schedule Your Visit</h3>
            <p className={currentTheme.subLabel}>
              Aura Family Dental Care
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-full transition-colors ${currentTheme.closeBtn}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
          {errorMessage && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl mb-6 text-sm flex items-start gap-2">
              <p>{errorMessage}</p>
            </div>
          )}

          {bookingSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-gradient-to-r from-primary to-purple-500 text-white">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h4 className={currentTheme.h3 + " mb-3"}>Booking Confirmed!</h4>
              <p className="text-gray-500 leading-relaxed max-w-sm mb-8">
                Thank you, {name || childName || "Family"}. A calendar invitation has been sent to your email. We look forward to seeing you!
              </p>
              <button
                onClick={handleClose}
                className={`w-full py-4 ${currentTheme.primaryBtn}`}
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1: Patient Type */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                  <span className={currentTheme.stepText}>Step 1 of 3: Who is visiting?</span>
                  
                  <div className="grid grid-cols-1 gap-5">
                    <button
                      type="button"
                      onClick={() => {
                        setPatientType("adult");
                        setStep(2);
                      }}
                      className={currentTheme.card}
                    >
                      <div className="text-left">
                        <h4 className={`font-heading text-lg ${currentTheme.cardText}`}>Just Me</h4>
                        <p className="text-gray-500 text-sm mt-1 font-normal">Book an appointment for myself</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPatientType("child");
                        setStep(2);
                      }}
                      className={currentTheme.card}
                    >
                      <div className="text-left">
                        <h4 className={`font-heading text-lg ${currentTheme.cardText}`}>My Child</h4>
                        <p className="text-gray-500 text-sm mt-1 font-normal">Book a gentle checkup for a child</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPatientType("family");
                        setStep(2);
                      }}
                      className={currentTheme.card}
                    >
                      <div className="text-left">
                        <h4 className={`font-heading text-lg ${currentTheme.cardText}`}>Family / Both</h4>
                        <p className="text-gray-500 text-sm mt-1 font-normal">Book back-to-back slots for family</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Patient Info */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                  <span className={currentTheme.stepText}>Step 2 of 3: Provide details</span>

                  {/* ADULT FIELDS */}
                  {patientType === "adult" && (
                    <div className="space-y-5">
                      <div>
                        <label className={currentTheme.label}>Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={currentTheme.input}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  {/* CHILD FIELDS */}
                  {patientType === "child" && (
                    <div className="space-y-5">
                      <div>
                        <label className={currentTheme.label}>Child's Name</label>
                        <input
                          type="text"
                          required
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          className={currentTheme.input}
                          placeholder="Sam Doe"
                        />
                      </div>
                      <div>
                        <label className={currentTheme.label}>Child's Age</label>
                        <input
                          type="text"
                          required
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className={currentTheme.input}
                          placeholder="e.g. 6 years old"
                        />
                      </div>
                      <div>
                        <label className={currentTheme.label}>Parent/Guardian Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={currentTheme.input}
                          placeholder="Jane Doe"
                        />
                      </div>
                    </div>
                  )}

                  {/* FAMILY FIELDS */}
                  {patientType === "family" && (
                    <div className="space-y-5">
                      <div>
                        <label className={currentTheme.label}>Parent/Guardian Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={currentTheme.input}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className={currentTheme.label}>Family Members Booking</label>
                        <textarea
                          required
                          value={familyMembers}
                          onChange={(e) => setFamilyMembers(e.target.value)}
                          className={currentTheme.input + " h-24 resize-none"}
                          placeholder="e.g. Sam (Age 6), Jessica (Age 8), John (Adult)"
                        />
                      </div>
                    </div>
                  )}

                  {/* SHARED CONTACT FIELDS */}
                  <div className={`space-y-5 pt-6 ${currentTheme.header}`}>
                    <div>
                      <label className={currentTheme.label}>Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={currentTheme.input}
                        placeholder="patient@example.com"
                      />
                    </div>
                    <div>
                      <label className={currentTheme.label}>Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={currentTheme.input}
                        placeholder="(+233) 0544079966"
                      />
                    </div>
                    <div>
                      <label className={currentTheme.label}>Reason for Visit</label>
                      <CustomDropdown
                        value={reason}
                        onChange={setReason}
                        options={reasonOptions}
                      />
                    </div>
                    {reason === "Other" && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className={currentTheme.label}>Please specify your reason</label>
                        <input
                          type="text"
                          required
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                          className={currentTheme.input}
                          placeholder="Briefly describe your concern"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 pt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`flex-1 py-4 ${currentTheme.secondaryBtn}`}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!name || !email || !phone}
                      onClick={() => setStep(3)}
                      className={`flex-1 py-4 disabled:opacity-50 disabled:pointer-events-none ${currentTheme.primaryBtn}`}
                    >
                      Choose Time
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date & Time Slot */}
              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                  <span className={currentTheme.stepText}>Step 3 of 3: Select Date & Time</span>

                  <div>
                    <label className={currentTheme.label}>Select Date</label>
                    <CustomCalendar
                      value={selectedDate}
                      onChange={setSelectedDate}
                    />
                  </div>

                  {/* Available Time Slots Grid */}
                  <div className="min-h-[160px]">
                    <label className={currentTheme.label}>Available Times</label>
                    
                    {!selectedDate ? (
                      <p className="text-sm text-center py-8 border border-dashed rounded-xl border-border-subtle text-accent/50 bg-accent/5">
                        Please choose a date above to check availability.
                      </p>
                    ) : isLoadingSlots ? (
                      <div className="text-center py-12">
                        <div className="animate-spin inline-block w-8 h-8 border-4 border-t-transparent rounded-full mb-4 border-primary"></div>
                        <p className={currentTheme.label}>Checking availability...</p>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <p className="text-sm text-center py-8 rounded-xl border text-red-500 bg-red-50 border-red-100">
                        No available slots on this date. Please try another day.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={selectedSlot === slot ? currentTheme.slotBtnActive : currentTheme.slotBtn}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSlot && (
                    <div className="p-4 animate-in zoom-in-95 duration-300 bg-primary/10 rounded-xl border border-primary/20 backdrop-blur-sm mb-6">
                      <span className="font-semibold text-primary block mb-1">Selected Visit Time:</span>
                      <p className="text-gray-800 font-semibold">{formatDateLabel(selectedDate)} at {formatTime(selectedSlot)}</p>
                    </div>
                  )}

                  {selectedSlot && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <label className={currentTheme.label}>Is this your first visit to Aura Family Dental?</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setIsFirstVisit(true)}
                          className={isFirstVisit ? currentTheme.slotBtnActive : currentTheme.slotBtn}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsFirstVisit(false)}
                          className={!isFirstVisit ? currentTheme.slotBtnActive : currentTheme.slotBtn}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-8">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={`flex-1 py-4 ${currentTheme.secondaryBtn}`}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedSlot || isSubmitting}
                      className={`flex-1 py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none ${currentTheme.primaryBtn}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
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
