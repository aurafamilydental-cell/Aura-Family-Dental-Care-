export const TREATMENT_DURATIONS: Record<string, number> = {
  "Routine Checkup & Cleaning": 30,
  "Cosmetic Consultation": 30,
  "Tooth Pain / Restorative": 60,
  "Emergency Visit": 60,
  "Child Pediatric Visit": 30,
  "Other": 60,
};

export function getTreatmentDuration(reason: string): number {
  return TREATMENT_DURATIONS[reason] || 60; // Default to 60 mins if reason is unknown
}
