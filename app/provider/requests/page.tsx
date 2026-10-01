"use client"

import * as React from "react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"
import {
  Inbox,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  ShieldAlert,
  ArrowRight,
} from "lucide-react"

export default function ProviderRequestsPage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const providers = useAppStore((state) => state.providers)
  const bookings = useAppStore((state) => state.bookings)
  const updateBookingStatus = useAppStore((state) => state.updateBookingStatus)

  const provider = providers.find(
    (p) => p.personaId === currentPersona.id || p.id === currentPersona.id
  )

  const isApproved = currentPersona.verificationStatus === "approved"
  const isPending = currentPersona.verificationStatus === "pending"

  // Only approved providers see real requests; otherwise empty/locked
  const pendingRequests = isApproved
    ? bookings.filter(
        (b) =>
          (b.providerId === provider?.id || b.providerName === currentPersona.name) &&
          b.status === "requested"
      )
    : []

  const handleAccept = (bookingId: string) => {
    updateBookingStatus(bookingId, "in-progress")
  }

  const handleDecline = (bookingId: string) => {
    updateBookingStatus(bookingId, "cancelled")
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incoming Job Requests</h1>
          <p className="text-sm text-muted-foreground">
            Review client service requests and schedule confirmation requests.
          </p>
        </div>

        {isApproved && (
          <Badge variant="outline" className="font-mono text-xs self-start sm:self-auto">
            {pendingRequests.length} Pending Inquiry{pendingRequests.length === 1 ? "" : "s"}
          </Badge>
        )}
      </div>

      {/* Verification Check / Locked Dashboard State */}
      {!isApproved ? (
        <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-base font-bold text-foreground">
                Requests Locked During Verification
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {isPending
                ? "Your trade documentation is currently under compliance review. Incoming booking requests from homeowners remain hidden until your account is approved."
                : "Your provider application was declined. You cannot receive or accept client requests until credentials are re-submitted and verified."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button variant="outline" size="sm" asChild>
              <Link href="/provider">
                View Account Verification Status
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : pendingRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {pendingRequests.map((request) => (
            <Card
              key={request.id}
              className="border-border bg-card shadow-sm hover:shadow-md transition-all"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-xs uppercase">
                        {request.categoryName}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        #{request.id.slice(-6)}
                      </span>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs">
                        Awaiting Your Confirmation
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold">
                      {request.serviceTitle}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Client: <strong className="text-foreground">{request.customerName}</strong>
                    </CardDescription>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                      Estimated Fee
                    </span>
                    <span className="text-lg font-bold font-mono text-foreground">
                      ₱{request.estimatedAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="py-3 text-xs space-y-3 bg-muted/10 border-y border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-foreground shrink-0" />
                    <span>
                      {request.scheduledDate} ({request.scheduledTime})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-foreground shrink-0" />
                    <span className="truncate">{request.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-foreground shrink-0" />
                    <span className="font-mono">{request.contactNumber}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-foreground shrink-0" />
                    <span>Requested on {new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {request.description && (
                  <div className="pt-1">
                    <span className="font-semibold uppercase font-mono text-[10px] text-muted-foreground block mb-0.5">
                      Client Problem Notes
                    </span>
                    <p className="italic text-foreground/90 bg-background/50 p-2.5 rounded border border-border/60">
                      &ldquo;{request.description}&rdquo;
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-3 pb-3 flex items-center justify-between">
                <div className="text-[11px] text-muted-foreground">
                  Accepting will move this to your active Jobs list.
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecline(request.id)}
                    className="h-8 text-xs gap-1.5 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Decline
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleAccept(request.id)}
                    className="h-8 text-xs gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Accept Request
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <Inbox className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No pending requests</EmptyTitle>
            <EmptyDescription>
              You have responded to all incoming client inquiries. New homeowner booking requests will appear here immediately.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/provider/jobs">
                View Active Jobs
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
