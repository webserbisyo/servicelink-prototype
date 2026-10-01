"use client"

import * as React from "react"
import Link from "next/link"
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
  Star,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
} from "lucide-react"

export default function ProviderReviewsPage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const providers = useAppStore((state) => state.providers)
  const reviews = useAppStore((state) => state.reviews)

  const provider = providers.find(
    (p) => p.personaId === currentPersona.id || p.id === currentPersona.id
  )

  const isApproved = currentPersona.verificationStatus === "approved"
  const isPending = currentPersona.verificationStatus === "pending"

  // Only approved providers show real reviews; pending/rejected personas show 0
  const providerReviews = isApproved
    ? reviews.filter(
        (r) => r.providerId === provider?.id || r.providerId === currentPersona.id
      )
    : []

  const reviewCount = providerReviews.length
  const avgRating =
    reviewCount > 0
      ? providerReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
      : 0

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Client Reviews & Ratings</h1>
        <p className="text-sm text-muted-foreground">
          Verified feedback submitted by clients upon job sign-off and escrow release.
        </p>
      </div>

      {/* Verification Check / Locked State Banner */}
      {!isApproved && (
        <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-base font-bold text-foreground">
                Client Reviews Locked During Verification
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              {isPending
                ? "Your provider account is currently pending administrative verification. Verified client ratings and reviews will activate once your credentials are confirmed."
                : "Your provider application was declined. You cannot receive verified client reviews until your documents are re-submitted and verified."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button variant="outline" size="sm" asChild>
              <Link href="/provider">
                View Verification Status
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Metrics Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Rating Card */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">
              Average Rating
            </span>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-bold font-mono text-foreground">
                {avgRating > 0 ? avgRating.toFixed(1) : "—"}
              </span>
              <span className="text-xs text-muted-foreground">/ 5.0</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(avgRating)
                      ? "fill-current"
                      : "text-muted stroke-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1.5 font-medium">
                {reviewCount} total
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Reviews Card */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">
              Verified Reviews
            </span>
            <div className="pt-1">
              <span className="text-3xl font-bold font-mono text-foreground">
                {reviewCount}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% authenticated homeowners</span>
          </CardContent>
        </Card>

        {/* Quality Score */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">
              Satisfaction Score
            </span>
            <div className="pt-1">
              <span className="text-3xl font-bold font-mono text-foreground">
                {reviewCount > 0 ? "98%" : "—"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-emerald-600 flex items-center gap-1.5 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Top 5% in ServiceLink network</span>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Feed */}
      {reviewCount > 0 ? (
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Feedback Feed</CardTitle>
            <CardDescription className="text-xs">
              Chronological reviews from homeowners who completed bookings with you.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 divide-y divide-border">
            {providerReviews.map((rev) => (
              <div key={rev.id} className="py-5 first:pt-2 last:pb-2 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border shrink-0">
                      <AvatarImage src={rev.customerAvatar} alt={rev.customerName} />
                      <AvatarFallback className="text-xs font-semibold">
                        {getInitials(rev.customerName)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-foreground">
                          {rev.customerName}
                        </span>
                        <Badge variant="outline" className="text-[10px] font-mono uppercase px-1.5 py-0">
                          {rev.categoryName}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {rev.serviceTitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
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
                      <span className="text-xs font-bold font-mono text-foreground ml-1">
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>

                    <Separator orientation="vertical" className="h-3" />

                    <span className="text-[11px] text-muted-foreground font-mono">
                      {new Date(rev.createdAt).toLocaleDateString("en-PH", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-foreground/90 leading-relaxed italic pl-12 bg-muted/15 p-3 rounded-lg border border-border/40">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <Star className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No reviews yet</EmptyTitle>
            <EmptyDescription>
              Reviews submitted by clients after completed jobs will appear here with verified homeowner badges and feedback.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/provider/jobs">
                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                Go to Active Jobs
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
