export type PersonaRole = "customer" | "provider"

export type VerificationStatus = "none" | "pending" | "approved" | "rejected"

export interface Persona {
  id: string
  name: string
  role: PersonaRole
  email: string
  avatar: string
  verificationStatus: VerificationStatus
  bio?: string
  phone?: string
  address?: string
  description: string
}

export const personas: Persona[] = [
  {
    id: "maria-santos",
    name: "Maria Santos",
    role: "customer",
    email: "maria.santos@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    verificationStatus: "none",
    phone: "+63 917 123 4567",
    address: "BGC, Taguig City, Metro Manila",
    description: "Active customer: 1 completed (awaiting review), 1 in-progress, 1 requested booking",
  },
  {
    id: "new-customer",
    name: "New Customer",
    role: "customer",
    email: "new.customer@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verificationStatus: "none",
    phone: "+63 918 555 0199",
    address: "Makati City, Metro Manila",
    description: "First-time customer: 0 bookings",
  },
  {
    id: "juan-dela-cruz",
    name: "Juan Dela Cruz",
    role: "provider",
    email: "juan.delacruz@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verificationStatus: "approved",
    bio: "Certified master plumber & electrician with over 10 years of residential service experience.",
    phone: "+63 920 987 6543",
    address: "Quezon City, Metro Manila",
    description: "Approved provider: has pending requests, in-progress jobs, and customer reviews",
  },
  {
    id: "ana-reyes",
    name: "Ana Reyes",
    role: "provider",
    email: "ana.reyes@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    verificationStatus: "pending",
    bio: "Licensed residential electrician undergoing platform credential verification.",
    phone: "+63 922 456 7890",
    address: "Pasig City, Metro Manila",
    description: "Pending provider: documents submitted, awaiting admin verification",
  },
  {
    id: "mark-rejected",
    name: "Mark Rejected",
    role: "provider",
    email: "mark.rejected@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verificationStatus: "rejected",
    bio: "General repairman whose initial document application was rejected due to missing certifications.",
    phone: "+63 925 333 4455",
    address: "Mandaluyong City, Metro Manila",
    description: "Rejected provider: verification application denied",
  },
]

export const defaultPersona: Persona = personas[0]
