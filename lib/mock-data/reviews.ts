export interface Review {
  id: string
  bookingId: string
  providerId: string
  customerId: string
  customerName: string
  customerAvatar: string
  rating: number
  comment: string
  serviceTitle: string
  createdAt: string
  categoryName: string
}

export const reviews: Review[] = [
  {
    id: "rev-01",
    bookingId: "booking-jdc-05",
    providerId: "provider-juan",
    customerId: "elena-torres",
    customerName: "Elena Torres",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Kuya Juan was extremely professional! He arrived 10 minutes early with all pipe fittings and pump brackets ready. Clean installation and explained how the automatic pressure switch works.",
    serviceTitle: "Whole-House Pressure Pump Installation",
    categoryName: "Plumbing",
    createdAt: "2026-09-16T10:30:00Z",
  },
  {
    id: "rev-02",
    bookingId: "booking-prev-02",
    providerId: "provider-juan",
    customerId: "roberto-tan",
    customerName: "Roberto Tan",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Fast diagnostic of our breaker tripping issues. Replaced the faulty GFCI breaker and checked all outdoor sockets for moisture leaks. Highly recommended!",
    serviceTitle: "Electrical Panel Safety Inspection",
    categoryName: "Electrical",
    createdAt: "2026-09-08T15:45:00Z",
  },
  {
    id: "rev-03",
    bookingId: "booking-prev-03",
    providerId: "provider-juan",
    customerId: "clara-lim",
    customerName: "Clara Lim",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    comment: "Very neat plumbing work on our kitchen renovation. Cleaned up all debris and tested water pressure before leaving.",
    serviceTitle: "Kitchen Sink & P-Trap Installation",
    categoryName: "Plumbing",
    createdAt: "2026-08-25T11:00:00Z",
  },
]
