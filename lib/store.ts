import { create } from "zustand"
import {
  Persona,
  personas,
  defaultPersona,
  Booking,
  bookings as initialBookings,
  BookingStatus,
  Review,
  reviews as initialReviews,
  ProviderProfile,
  providers as initialProviders,
  ServiceCategory,
  categories as initialCategories,
} from "./mock-data"

export interface AppState {
  // Current active persona
  currentPersona: Persona
  setPersona: (persona: Persona) => void
  setPersonaById: (personaId: string) => void

  // Data collections (in-memory for prototype)
  personas: Persona[]
  bookings: Booking[]
  reviews: Review[]
  providers: ProviderProfile[]
  categories: ServiceCategory[]

  // Booking mutation actions (used in Phase 2 stages)
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void
  createBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking
  addReview: (review: Omit<Review, "id" | "createdAt">) => void
  updateCurrentPersona: (updates: Partial<Persona>) => void
  updateProviderProfile: (providerId: string, updates: Partial<ProviderProfile>) => void

  // Reset to initial mock state
  resetStore: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPersona: defaultPersona,
  personas: personas,
  bookings: initialBookings,
  reviews: initialReviews,
  providers: initialProviders,
  categories: initialCategories,

  setPersona: (persona: Persona) => set({ currentPersona: persona }),

  setPersonaById: (personaId: string) => {
    const matched = get().personas.find((p) => p.id === personaId)
    if (matched) {
      set({ currentPersona: matched })
    }
  },

  updateBookingStatus: (bookingId: string, status: BookingStatus) => {
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === bookingId ? { ...b, status } : b
      ),
    }))
  },

  createBooking: (bookingData) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      bookings: [newBooking, ...state.bookings],
    }))
    return newBooking
  },

  addReview: (reviewData) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      reviews: [newReview, ...state.reviews],
      bookings: state.bookings.map((b) =>
        b.id === reviewData.bookingId ? { ...b, awaitingReview: false } : b
      ),
    }))
  },

  updateCurrentPersona: (updates) => {
    set((state) => {
      const updated = { ...state.currentPersona, ...updates }
      return {
        currentPersona: updated,
        personas: state.personas.map((p) =>
          p.id === updated.id ? updated : p
        ),
      }
    })
  },

  updateProviderProfile: (providerId, updates) => {
    set((state) => {
      const updatedProviders = state.providers.map((p) =>
        p.id === providerId || p.personaId === providerId ? { ...p, ...updates } : p
      )
      return { providers: updatedProviders }
    })
  },

  resetStore: () =>
    set({
      currentPersona: defaultPersona,
      bookings: initialBookings,
      reviews: initialReviews,
      providers: initialProviders,
    }),
}))
