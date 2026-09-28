import { VerificationStatus } from "./personas"

export interface ProviderProfile {
  id: string
  personaId: string
  name: string
  email: string
  phone: string
  avatar: string
  title: string
  bio: string
  categoryIds: string[]
  rating: number
  reviewCount: number
  completedJobsCount: number
  verificationStatus: VerificationStatus
  hourlyRate: number
  location: string
  skills: string[]
  badges: string[]
}

export const providers: ProviderProfile[] = [
  {
    id: "provider-juan",
    personaId: "juan-dela-cruz",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    phone: "+63 920 987 6543",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    title: "Master Plumber & Certified Electrician",
    bio: "Over 10 years of trusted service across Metro Manila. Certified TESDA NC II in Plumbing and Electrical Installation.",
    categoryIds: ["plumbing", "electrical"],
    rating: 4.9,
    reviewCount: 24,
    completedJobsCount: 42,
    verificationStatus: "approved",
    hourlyRate: 650,
    location: "Quezon City & Central Metro Manila",
    skills: ["Pipe fitting", "Emergency leak repair", "Circuit breaker replacement", "Rewiring", "Water heaters"],
    badges: ["Top Rated", "Verified Pro", "Fast Responder"],
  },
  {
    id: "provider-ana",
    personaId: "ana-reyes",
    name: "Ana Reyes",
    email: "ana.reyes@example.com",
    phone: "+63 922 456 7890",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    title: "Residential Electrician (Verification Pending)",
    bio: "Specializing in residential wiring, lighting design, and power efficiency assessments.",
    categoryIds: ["electrical"],
    rating: 0,
    reviewCount: 0,
    completedJobsCount: 0,
    verificationStatus: "pending",
    hourlyRate: 500,
    location: "Pasig & Mandaluyong",
    skills: ["Lighting fixtures", "Outlet servicing", "Load checking"],
    badges: ["Identity Submitted"],
  },
  {
    id: "provider-mark",
    personaId: "mark-rejected",
    name: "Mark Rejected",
    email: "mark.rejected@example.com",
    phone: "+63 925 333 4455",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    title: "General Handyman (Application Declined)",
    bio: "Handyman services for small household repairs. Verification currently not approved due to incomplete license documentation.",
    categoryIds: ["carpentry"],
    rating: 0,
    reviewCount: 0,
    completedJobsCount: 0,
    verificationStatus: "rejected",
    hourlyRate: 400,
    location: "Mandaluyong City",
    skills: ["Furniture assembly", "Minor carpentry"],
    badges: ["Application Denied"],
  },
]
