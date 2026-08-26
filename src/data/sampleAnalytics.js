export const PATIENT_INFO = {
  name: "Biren Phukan",
  age: 74,
  gender: "Male",
  location: "Dispur, Guwahati, Assam",
  primaryLanguage: "Assamese (অসমীয়া)",
  primaryCaregiver: "Rahul Phukan (Son)",
  phcCenter: "Guwahati Community Health Centre (CHC Dispur)",
  attendingNeurologist: "Dr. K. N. Sarma, MD (Neurology)",
  diagnosis: "Mild-to-Moderate Cognitive Impairment (Early Stage Alzheimer's)",
  registrationDate: "2026-01-15",
  emergencyContact: "+91 98640 12345"
};

export const WEEKLY_COGNITIVE_TRENDS = [
  { day: "Mon", score: 68, reactionSec: 4.2, accuracy: 72, hydration: 6, medsTaken: 3 },
  { day: "Tue", score: 71, reactionSec: 3.9, accuracy: 78, hydration: 7, medsTaken: 3 },
  { day: "Wed", score: 65, reactionSec: 4.8, accuracy: 68, hydration: 5, medsTaken: 2 },
  { day: "Thu", score: 74, reactionSec: 3.5, accuracy: 82, hydration: 8, medsTaken: 3 },
  { day: "Fri", score: 78, reactionSec: 3.2, accuracy: 85, hydration: 8, medsTaken: 3 },
  { day: "Sat", score: 76, reactionSec: 3.4, accuracy: 80, hydration: 7, medsTaken: 3 },
  { day: "Sun", score: 82, reactionSec: 2.9, accuracy: 88, hydration: 8, medsTaken: 3 },
];

export const CAREGIVER_RISK_ALERTS = [
  {
    id: 1,
    severity: "HIGH",
    title: "Missed Evening Dosage Alert",
    timestamp: "Yesterday, 8:30 PM",
    description: "Donepezil 5mg dose mark as untaken. Automated voice prompt dispatched.",
    status: "OPEN",
    recommendation: "Caregiver verification needed"
  },
  {
    id: 2,
    severity: "MEDIUM",
    title: "Spatial Routine Confusion",
    timestamp: "2 days ago, 11:15 AM",
    description: "Slower sequencing on Daily Routine Module (Task ordering delay > 8s). AI scaled difficulty level to Stage 1.",
    status: "RESOLVED",
    recommendation: "AI difficulty automatically reduced"
  },
  {
    id: 3,
    severity: "LOW",
    title: "Hydration Milestone Reached",
    timestamp: "Today, 4:00 PM",
    description: "Target 8 glasses of water logged for 3 consecutive days.",
    status: "INFO",
    recommendation: "Positive reinforcement achieved"
  }
];

export const INITIAL_REMINDERS = [
  {
    id: 'med_1',
    type: 'MEDICATION',
    title: 'Morning Medicine (Donepezil 5mg)',
    time: '08:00 AM',
    taken: true,
    dose: '1 Tablet after breakfast',
    icon: '💊'
  },
  {
    id: 'med_2',
    type: 'MEDICATION',
    title: 'Afternoon Hydration & Vitamin D',
    time: '01:30 PM',
    taken: true,
    dose: '1 Capsule with water',
    icon: '💊'
  },
  {
    id: 'med_3',
    type: 'MEDICATION',
    title: 'Night Medicine (Memantine 10mg)',
    time: '08:30 PM',
    taken: false,
    dose: '1 Tablet before bed',
    icon: '🌙'
  },
  {
    id: 'appt_1',
    type: 'APPOINTMENT',
    title: 'Dr. K. N. Sarma - Memory Checkup',
    time: 'Thursday, 10:30 AM',
    taken: false,
    dose: 'Guwahati CHC Clinic Room 4',
    icon: '🩺'
  }
];
