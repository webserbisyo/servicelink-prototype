export type BookingStatus = "requested" | "in-progress" | "completed" | "cancelled"

export interface Booking {
  id: string
  customerId: string
  customerName: string
  providerId: string
  providerName: string
  categoryId: string
  categoryName: string
  serviceTitle: string
  description: string
  status: BookingStatus
  scheduledDate: string
  scheduledTime: string
  estimatedAmount: number
  finalAmount?: number
  address: string
  contactNumber: string
  createdAt: string
  awaitingReview?: boolean
  notes?: string
}

export const bookings: Booking[] = [
  // 1. Maria Santos - Completed / awaiting review (with Juan Dela Cruz)
  {
    id: "booking-ms-01",
    customerId: "maria-santos",
    customerName: "Maria Santos",
    providerId: "provider-juan",
    providerName: "Juan Dela Cruz",
    categoryId: "plumbing",
    categoryName: "Plumbing",
    serviceTitle: "Bathroom Pipe Repair & Valve Replacement",
    description: "Fixed persistent leak under the double vanity and replaced corroded shut-off valves.",
    status: "completed",
    scheduledDate: "2026-09-24",
    scheduledTime: "10:00 AM - 12:00 PM",
    estimatedAmount: 1800,
    finalAmount: 1850,
    address: "Unit 12B, Serendra Two, BGC, Taguig City",
    contactNumber: "+63 917 123 4567",
    createdAt: "2026-09-22T08:30:00Z",
    awaitingReview: true,
    notes: "Job finished cleanly. Customer needs to rate and submit review.",
  },

  // 2. Maria Santos - In-progress (with Juan Dela Cruz)
  {
    id: "booking-ms-02",
    customerId: "maria-santos",
    customerName: "Maria Santos",
    providerId: "provider-juan",
    providerName: "Juan Dela Cruz",
    categoryId: "electrical",
    categoryName: "Electrical",
    serviceTitle: "Main Circuit Breaker Diagnostic & Rewiring",
    description: "Diagnosing intermittent tripping on kitchen appliance circuits and balancing sub-panel load.",
    status: "in-progress",
    scheduledDate: "2026-09-28",
    scheduledTime: "01:00 PM - 04:00 PM",
    estimatedAmount: 2400,
    address: "Unit 12B, Serendra Two, BGC, Taguig City",
    contactNumber: "+63 917 123 4567",
    createdAt: "2026-09-26T14:15:00Z",
    awaitingReview: false,
    notes: "Technician on site; replacement 40A tandem breaker currently being installed.",
  },

  // 3. Maria Santos - Requested / pending acceptance (with Juan Dela Cruz)
  {
    id: "booking-ms-03",
    customerId: "maria-santos",
    customerName: "Maria Santos",
    providerId: "provider-juan",
    providerName: "Juan Dela Cruz",
    categoryId: "plumbing",
    categoryName: "Plumbing",
    serviceTitle: "Kitchen Grease Trap Cleaning & Seal Inspection",
    description: "Routine 6-month grease trap clearing and re-sealing drain pipe joints to eliminate odor.",
    status: "requested",
    scheduledDate: "2026-10-02",
    scheduledTime: "09:00 AM - 11:00 AM",
    estimatedAmount: 1200,
    address: "Unit 12B, Serendra Two, BGC, Taguig City",
    contactNumber: "+63 917 123 4567",
    createdAt: "2026-09-28T09:00:00Z",
    awaitingReview: false,
    notes: "Awaiting provider confirmation.",
  },

  // 4. Another customer booking for Juan Dela Cruz - Pending request
  {
    id: "booking-jdc-04",
    customerId: "carlos-mendoza",
    customerName: "Carlos Mendoza",
    providerId: "provider-juan",
    providerName: "Juan Dela Cruz",
    categoryId: "electrical",
    categoryName: "Electrical",
    serviceTitle: "Emergency Water Heater Tripping Breaker Fix",
    description: "Multipoint water heater trips circuit when switching to high temperature.",
    status: "requested",
    scheduledDate: "2026-09-29",
    scheduledTime: "03:00 PM - 05:00 PM",
    estimatedAmount: 1500,
    address: "15 Orchid St., Valle Verde 3, Pasig City",
    contactNumber: "+63 917 999 8877",
    createdAt: "2026-09-28T11:20:00Z",
    awaitingReview: false,
    notes: "Customer marked as urgent.",
  },

  // 5. Past completed booking for Juan Dela Cruz with submitted review
  {
    id: "booking-jdc-05",
    customerId: "elena-torres",
    customerName: "Elena Torres",
    providerId: "provider-juan",
    providerName: "Juan Dela Cruz",
    categoryId: "plumbing",
    categoryName: "Plumbing",
    serviceTitle: "Whole-House Pressure Pump Installation",
    description: "Installed 0.5HP booster pump with automatic pressure switch and bypass valves.",
    status: "completed",
    scheduledDate: "2026-09-15",
    scheduledTime: "08:00 AM - 02:00 PM",
    estimatedAmount: 4500,
    finalAmount: 4500,
    address: "88 Katipunan Ave., Loyola Heights, Quezon City",
    contactNumber: "+63 918 222 3344",
    createdAt: "2026-09-10T10:00:00Z",
    awaitingReview: false,
    notes: "Successfully completed with 5-star review.",
  },
]
