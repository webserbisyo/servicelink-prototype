"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAppStore } from "@/lib/store"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Clock,
  AlertCircle,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
} from "lucide-react"

export default function ProviderProfilePage() {
  const params = useParams()
  const categorySlug = typeof params.category === "string" ? params.category : ""
  const providerId = typeof params.providerId === "string" ? params.providerId : ""

  const providers = useAppStore((state) => state.providers)
  const categories = useAppStore((state) => state.categories)
  const reviews = useAppStore((state) => state.reviews)

  const provider = providers.find((p) => p.id === providerId)
  const category = categories.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase() || c.id.toLowerCase() === categorySlug.toLowerCase()
  )

  const providerReviews = reviews.filter((r) => r.providerId === providerId)

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Provider not found</EmptyTitle>
            <EmptyDescription>
              The service specialist you are looking for is not listed or has been deactivated.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/customer">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Return to Directory
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  const isApproved = provider.verificationStatus === "approved"
  const isPending = provider.verificationStatus === "pending"

  // Sample portfolio photos representing trade craftsmanship
  const workSamplePhotos = [
    {
      title: "Commercial P-Trap & Main Water Meter Setup",
      url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Dual Sub-Panel Rewiring & Surge Protection",
      url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Pressure Booster Pump & Check Valves",
      url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80",
    },
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Back Link */}
      <Link
        href={category ? `/customer/providers/${category.slug}` : "/customer"}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to {category ? category.name : "providers"}
      </Link>

      {/* Main Grid: Profile Info & Booking Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Profile Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <Avatar className="h-20 w-20 border-2 border-border shrink-0">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback className="text-xl font-bold">
                    {getInitials(provider.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">{provider.name}</h1>

                    {isApproved ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1 font-medium">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified Pro
                      </Badge>
                    ) : isPending ? (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        Verification Pending
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Application Declined
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm font-medium text-foreground/80">{provider.title}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{provider.location}</span>
                    </div>

                    {provider.rating > 0 && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="font-bold text-foreground">
                          {provider.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({provider.reviewCount} reviews)
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5" />
                      <span>{provider.completedJobsCount} jobs completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              {provider.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {provider.badges.map((b) => (
                    <Badge key={b} variant="secondary" className="text-xs font-normal">
                      <Sparkles className="h-3 w-3 mr-1 text-primary" />
                      {b}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>

            <Separator />

            {/* Bio */}
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-muted-foreground">
                  About Specialist
                </h3>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {provider.bio}
                </p>
              </div>

              {/* Skills & Services Offered */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-muted-foreground">
                  Services & Specialties
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {provider.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-muted/20 text-xs font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Sample Photos */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Past Work & Portfolio Samples</CardTitle>
              <CardDescription className="text-xs">
                Verified photos of completed on-site installations and diagnostic repairs.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {workSamplePhotos.map((sample, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-lg border border-border bg-muted aspect-video"
                  >
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage
                        src={sample.url}
                        alt={sample.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <AvatarFallback className="rounded-none text-xs">Work sample</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                      <p className="text-[11px] font-medium truncate">{sample.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Customer Reviews</CardTitle>
                  <CardDescription className="text-xs">
                    Authentic feedback from verified ServiceLink homeowners.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  {providerReviews.length} Verified Review{providerReviews.length === 1 ? "" : "s"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {providerReviews.length > 0 ? (
                <div className="divide-y divide-border">
                  {providerReviews.map((rev) => (
                    <div key={rev.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 border border-border shrink-0">
                            <AvatarImage src={rev.customerAvatar} alt={rev.customerName} />
                            <AvatarFallback className="text-xs">
                              {getInitials(rev.customerName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold text-xs text-foreground block">
                              {rev.customerName}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {rev.serviceTitle} ({rev.categoryName})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(rev.rating)
                                  ? "fill-current"
                                  : "text-muted stroke-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-foreground ml-1">
                            {rev.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-foreground/80 leading-relaxed italic pl-10">
                        &ldquo;{rev.comment}&rdquo;
                      </p>

                      <div className="pl-10 text-[10px] text-muted-foreground">
                        Posted on {new Date(rev.createdAt).toLocaleDateString("en-PH", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-lg">
                  No public reviews recorded yet for this specialist.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Booking Action Box */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-4">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Standard Service Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono">
                  ₱{provider.hourlyRate.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground font-normal">/ hour</span>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Service Guarantee</span>
                  <span className="font-medium text-foreground">ServiceLink Protect</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Payment</span>
                  <span className="font-medium text-foreground">Escrow on completion</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Coverage</span>
                  <span className="font-medium text-foreground">{provider.location}</span>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg border border-border text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  Fast Scheduling Available
                </p>
                <p className="text-[11px]">
                  Submit your address, requested service time, and diagnostic notes to initiate a booking request.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 font-semibold text-sm shadow-sm"
                asChild
              >
                <Link href={`/customer/book/${provider.id}`}>
                  Book Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-muted-foreground">
                  No upfront charge until technician accepts request
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
