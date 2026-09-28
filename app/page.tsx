import Link from "next/link"
import { categories } from "@/lib/mock-data/categories"
import { providers } from "@/lib/mock-data/providers"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wrench,
  Zap,
  Hammer,
  Tv,
  Home as HomeIcon,
  ShieldCheck,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Coins,
} from "lucide-react"

export default function Home() {
  const juan = providers[0]

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Wrench":
        return <Wrench className="h-5 w-5" />
      case "Zap":
        return <Zap className="h-5 w-5" />
      case "Hammer":
        return <Hammer className="h-5 w-5" />
      case "Tv":
        return <Tv className="h-5 w-5" />
      case "Home":
        return <HomeIcon className="h-5 w-5" />
      default:
        return <Wrench className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Wrench className="h-4 w-4" />
            </div>
            <span>ServiceLink</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/customer" className="hover:text-foreground transition-colors">
              Find Services
            </Link>
            <Link href="/provider" className="hover:text-foreground transition-colors">
              For Providers
            </Link>
            <Link href="/signup" className="hover:text-foreground transition-colors">
              How It Works
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 px-4 sm:px-6 border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-6 bg-muted/30">
              <ShieldCheck className="h-3.5 w-3.5 text-foreground" />
              <span>Two-Sided Home Services Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Trusted home services, booked with confidence.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with background-checked plumbers, electricians, carpenters, and appliance repairmen.
              Upfront pricing estimates and verified community ratings.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/customer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Browse Services as Customer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign Up &amp; Choose Role
                </Button>
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-border">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-xs text-muted-foreground mt-1">Verified Credentials</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">₱0</span>
                <span className="text-xs text-muted-foreground mt-1">Hidden Booking Fees</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">4.9 ★</span>
                <span className="text-xs text-muted-foreground mt-1">Average Pro Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">&lt; 2 hrs</span>
                <span className="text-xs text-muted-foreground mt-1">Average Response Time</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pilot Categories Grid */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted/20 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Pilot Service Categories
                </h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                  Every category includes standardized baseline diagnostic and labor rate estimates.
                </p>
              </div>
              <Link href="/customer" className="mt-4 md:mt-0 text-sm font-medium hover:underline inline-flex items-center gap-1">
                View all categories in dashboard &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        ₱{cat.priceRange.min.toLocaleString()} - ₱{cat.priceRange.max.toLocaleString()}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cat.popularServices.slice(0, 3).map((serv) => (
                        <span
                          key={serv}
                          className="inline-block rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {serv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {cat.priceRange.unit}
                    </span>
                    <Link
                      href="/customer"
                      className="text-xs font-medium hover:underline flex items-center gap-1"
                    >
                      Book {cat.name} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-16 md:py-24 px-4 sm:px-6 border-b border-border">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built for homeowners and skilled pros alike
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              A transparent, two-sided workflow connecting verified service providers directly with clients.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="flex flex-col p-6 rounded-lg border border-border bg-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base">Verified Tradesmen</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Every provider submits government identification, trade credentials, and contact details for administrative verification before accepting bookings.
                </p>
              </div>

              <div className="flex flex-col p-6 rounded-lg border border-border bg-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background mb-4">
                  <Coins className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base">Transparent Pricing</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Clear upfront price estimates based on service scope. No surprise call-out charges or ambiguous billing.
                </p>
              </div>

              <div className="flex flex-col p-6 rounded-lg border border-border bg-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background mb-4">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base">Active Job Tracking</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Monitor service requests from pending confirmation through in-progress execution to completion and final review.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Provider Highlight */}
        <section className="py-16 px-4 sm:px-6 bg-muted/10 border-b border-border">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-border shrink-0">
                <AvatarImage src={juan.avatar} alt={juan.name} className="object-cover" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="text-lg font-bold">{juan.name}</h3>
                  <Badge variant="default" className="text-[10px] uppercase font-mono">
                    <CheckCircle className="h-2.5 w-2.5 mr-1" /> Verified Pro
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{juan.title} &bull; {juan.location}</p>
                <p className="text-xs text-foreground mt-2 leading-relaxed max-w-xl">
                  &ldquo;{juan.bio}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-center md:justify-start gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1 font-semibold">
                    <Star className="h-3.5 w-3.5 fill-foreground text-foreground" /> {juan.rating} ({juan.reviewCount} reviews)
                  </span>
                  <span>&bull;</span>
                  <span>{juan.completedJobsCount} jobs completed</span>
                </div>
              </div>
              <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                <Link href="/provider">
                  <Button variant="outline" size="sm" className="w-full">
                    View Provider Dashboard
                  </Button>
                </Link>
                <Link href="/customer">
                  <Button size="sm" className="w-full">
                    Book Juan &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-foreground" />
            <span className="font-semibold text-foreground">ServiceLink</span>
            <span>&mdash; Frontend Prototype (Phase 2 Stage 1)</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/customer" className="hover:text-foreground">
              Customer Portal
            </Link>
            <Link href="/provider" className="hover:text-foreground">
              Provider Portal
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-foreground">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
