"use client"

import * as React from "react"
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
import {
  ShieldCheck,
  Clock,
  ShieldAlert,
  Briefcase,
  Inbox,
  Star,
  Coins,
  CheckCircle2,
  Calendar,
  MapPin,
  Lock,
  FileText,
  AlertCircle,
} from "lucide-react"

export default function ProviderHomePage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const bookings = useAppStore((state) => state.bookings)
  const reviews = useAppStore((state) => state.reviews)
  const providers = useAppStore((state) => state.providers)

  // Identify matching provider profile
  const matchedProvider = providers.find((p) => p.personaId === currentPersona.id)
  const isJuan = currentPersona.id === "juan-dela-cruz"

  // Filter bookings for this provider
  const providerBookings = bookings.filter(
    (b) => b.providerId === matchedProvider?.id || (isJuan && b.providerId === "provider-juan")
  )

  const pendingRequests = providerBookings.filter((b) => b.status === "requested")
  const inProgressJobs = providerBookings.filter((b) => b.status === "in-progress")
  const completedJobs = providerBookings.filter((b) => b.status === "completed")

  // Filter reviews for this provider
  const providerReviews = reviews.filter(
    (r) => r.providerId === matchedProvider?.id || (isJuan && r.providerId === "provider-juan")
  )

  const avgRating =
    providerReviews.length > 0
      ? (
          providerReviews.reduce((sum, r) => sum + r.rating, 0) /
          providerReviews.length
        ).toFixed(1)
      : matchedProvider?.rating || 0

  const totalEarnings = completedJobs.reduce(
    (sum, b) => sum + (b.finalAmount || b.estimatedAmount),
    0
  )

  const isApproved = currentPersona.verificationStatus === "approved"
  const isPending = currentPersona.verificationStatus === "pending"
  const isRejected = currentPersona.verificationStatus === "rejected"
  const isCustomer = currentPersona.role === "customer"

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Customer Mode Alert */}
      {isCustomer && (
        <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>
              Currently previewing with a <strong>Customer Persona</strong> ({currentPersona.name}).
              Switch to <strong>Juan Dela Cruz</strong>, <strong>Ana Reyes</strong>, or <strong>Mark Rejected</strong> in the floating switcher to view provider states.
            </span>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            Dev Preview
          </Badge>
        </div>
      )}

      {/* Verification Status Banner */}
      {isApproved && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base">Verified Provider Account</h2>
                <Badge variant="default" className="text-[10px] font-mono uppercase bg-foreground text-background">
                  Approved
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                Your trade credentials and government ID are authenticated. Your profile is live in the customer directory and accepting service bookings.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="font-mono text-xs shrink-0 self-start sm:self-center">
            Badge: Verified Pro
          </Badge>
        </div>
      )}

      {isPending && (
        <div className="rounded-xl border border-border bg-muted/30 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground border border-border">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base">Verification Application Pending</h2>
                <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                  In Review
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                Your trade documents and license submission are currently under administrative review. Verification typically takes 24 to 48 business hours. Job requests remain paused until approval is granted.
              </p>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <Button size="sm" variant="outline" className="text-xs">
              View Uploaded Docs
            </Button>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-destructive">Verification Application Rejected</h2>
                <Badge variant="destructive" className="text-[10px] font-mono uppercase">
                  Declined
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                Your application could not be approved at this time. Reason: Missing required government-issued trade qualification (e.g. TESDA National Certificate II). Please update and re-submit your credentials.
              </p>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <Button size="sm" variant="destructive" className="text-xs">
              Re-submit Documentation
            </Button>
          </div>
        </div>
      )}

      {/* Main Dashboard Section: Active for Approved, Locked for Pending / Rejected */}
      {isApproved ? (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div>
            <h2 className="text-lg font-bold tracking-tight mb-4">Operations Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
                    Active Jobs
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inProgressJobs.length}</div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Currently in-progress on site
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
                    Pending Requests
                  </CardTitle>
                  <Inbox className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingRequests.length}</div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Awaiting your confirmation
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
                    Customer Rating
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-1.5">
                    {avgRating} <span className="text-xs font-normal text-muted-foreground">/ 5.0</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Based on {providerReviews.length || matchedProvider?.reviewCount || 0} verified reviews
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-mono uppercase text-muted-foreground">
                    Completed Earnings
                  </CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₱{totalEarnings.toLocaleString()}</div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    From {completedJobs.length} completed booking(s)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pending Requests & Active Jobs List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Requests Card */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">New Requests</CardTitle>
                    <CardDescription className="text-xs">
                      Incoming booking inquiries awaiting acceptance
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {pendingRequests.length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-xs block">{req.serviceTitle}</span>
                        <span className="text-[11px] text-muted-foreground">Customer: {req.customerName}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-mono shrink-0">
                        ₱{req.estimatedAmount.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {req.scheduledDate} ({req.scheduledTime})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {req.address}
                      </span>
                    </div>
                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-border/60">
                      <Button size="sm" variant="ghost" className="h-7 text-xs px-2.5">
                        Decline
                      </Button>
                      <Button size="sm" className="h-7 text-xs px-3">
                        Accept Request
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingRequests.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground">
                    No pending job requests at this moment.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Jobs Card */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Active Jobs</CardTitle>
                    <CardDescription className="text-xs">
                      Services currently underway or scheduled today
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {inProgressJobs.length} active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {inProgressJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3.5 rounded-lg border border-border bg-muted/20 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-xs block">{job.serviceTitle}</span>
                        <span className="text-[11px] text-muted-foreground">Customer: {job.customerName}</span>
                      </div>
                      <Badge variant="default" className="text-[10px] font-mono shrink-0 bg-foreground text-background">
                        In Progress
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {job.scheduledDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.address}
                      </span>
                    </div>
                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-border/60">
                      <Button size="sm" variant="outline" className="h-7 text-xs px-3">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Mark Completed
                      </Button>
                    </div>
                  </div>
                ))}
                {inProgressJobs.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground">
                    No active jobs in progress.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Locked Dashboard State for Pending / Rejected */
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center max-w-2xl mx-auto space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold">
              {isPending ? "Dashboard Locked During Verification" : "Dashboard Inactive"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto leading-relaxed">
              {isPending
                ? "Job management, direct client requests, schedule tracking, and payouts will automatically unlock once your credentials are confirmed by our compliance team."
                : "Your provider profile is currently disabled. Submit valid documentation or contact support to reactivate your provider privileges."}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button size="sm" variant="outline" className="text-xs gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {isPending ? "Check Document Status" : "Upload Required Certs"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
