export interface PriceRange {
  min: number
  max: number
  unit: string
  currency: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  iconName: string
  priceRange: PriceRange
  popularServices: string[]
}

export const categories: ServiceCategory[] = [
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    description: "Leak repair, pipe unclogging, fixture installation, and water heater servicing.",
    iconName: "Wrench",
    priceRange: {
      min: 500,
      max: 2500,
      unit: "per standard repair",
      currency: "PHP",
    },
    popularServices: ["Pipe Leak Repair", "Drain Unclogging", "Toilet Installation", "Faucet Replacement"],
  },
  {
    id: "electrical",
    name: "Electrical",
    slug: "electrical",
    description: "Wiring troubleshooting, breaker replacements, lighting setup, and outlet repairs.",
    iconName: "Zap",
    priceRange: {
      min: 600,
      max: 3000,
      unit: "per service call",
      currency: "PHP",
    },
    popularServices: ["Circuit Breaker Repair", "Ceiling Fan Installation", "Rewiring", "Socket Replacement"],
  },
  {
    id: "carpentry",
    name: "Carpentry",
    slug: "carpentry",
    description: "Custom cabinetry, door repair, shelving installation, and wooden fixture maintenance.",
    iconName: "Hammer",
    priceRange: {
      min: 700,
      max: 4000,
      unit: "per day rate",
      currency: "PHP",
    },
    popularServices: ["Door & Lock Fitting", "Cabinet Repair", "Deck & Floor Restoration", "Furniture Assembly"],
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    slug: "appliance-repair",
    description: "Air conditioner cleaning, refrigerator diagnosis, washing machine maintenance, and oven repair.",
    iconName: "Tv",
    priceRange: {
      min: 450,
      max: 2000,
      unit: "per appliance",
      currency: "PHP",
    },
    popularServices: ["AC Cleaning & Freon Recharge", "Refrigerator Diagnostic", "Washing Machine Motor Fix"],
  },
  {
    id: "roofing",
    name: "Roofing",
    slug: "roofing",
    description: "Roof leak sealing, gutter cleaning, corrugated sheet replacement, and flashing waterproofing.",
    iconName: "Home",
    priceRange: {
      min: 1200,
      max: 6000,
      unit: "per repair section",
      currency: "PHP",
    },
    popularServices: ["Leak Waterproofing", "Gutter Repair & Cleaning", "Sheet Replacement"],
  },
]
