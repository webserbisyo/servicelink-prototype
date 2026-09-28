"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Timer,
  Star,
  ShieldCheck,
  FileText,
  User,
  Check,
} from "lucide-react"

export default function BookingDetailPage() {
  const params = useParams()
  const bookingId = typeof params.bookingId === "string" ? params.bookingId : ""

  const bookings = useAppStore((state) => state.bookings)
  const reviews = useAppStore((state) => state.reviews)
  const currentPersona = useAppStore((state) => state.currentPersona)
  const addReview = useAppStore((state) => state.addReview)

  const booking = bookings.find((b) => b.id === bookingId)
  const existingReview = reviews.find((r) => r.bookingId === bookingId)

  // Review form state
  const [rating, setRating] = React.useState(5)
  const [hoverRating, setHoverRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [reviewSubmitted, setReviewSubmitted] = React.useState(false)

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Booking not found</EmptyTitle>
            <EmptyDescription>
              We couldn&apos;t locate the service appointment record for ID: {bookingId}.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/customer/bookings">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Return to Bookings
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addReview({
      bookingId: booking.id,
      providerId: booking.providerId,
      customerId: currentPersona.id,
      customerName: currentPersona.name,
      customerAvatar: currentPersona.avatar,
      rating,
      comment: comment.trim() || "Great workmanship and timely completion!",
      serviceTitle: booking.serviceTitle,
      categoryName: booking.categoryName,
    })

    setReviewSubmitted(true)
  }

  const isCompleted = booking.status === "completed"
  const isAwaitingReview = (booking.awaitingReview || !existingReview) && !reviewSubmitted

  const getStatusBadge = () => {
    switch (booking.status) {
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs gap-1 font-medium">
            <Timer className="h-3 w-3" />
            In Progress
          </Badge>
        )
      case "requested":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs gap-1 font-medium">
            <Clock className="h-3 w-3" />
            Requested
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1 font-medium">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{booking.status}</Badge>
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" asChild>
          <Link href="/customer/bookings">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Bookings
          </Link>
        </Button>
      </div>

      {/* Booking Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">
              {booking.categoryName}
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              #{booking.id}
            </span>
            {getStatusBadge()}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{booking.serviceTitle}</h1>
          <p className="text-xs text-muted-foreground">
            Created on {new Date(booking.createdAt).toLocaleDateString("en-PH", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="text-[11px] font-mono uppercase text-muted-foreground">
            {booking.finalAmount ? "Settled Total" : "Estimated Cost"}
          </span>
          <span className="text-2xl font-bold font-mono text-foreground">
            ₱{(booking.finalAmount || booking.estimatedAmount).toLocaleString()}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {booking.status === "completed" ? "Payment Released" : "Held in ServiceLink Escrow"}
          </span>
        </div>
      </div>

      {/* Review Prompt Section (Step 5 core requirement) */}
      {isCompleted && (
        <div className="space-y-4">
          {isAwaitingReview ? (
            <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600 fill-current" />
                  <CardTitle className="text-lg font-bold text-foreground">
                    Rate Your Experience with {booking.providerName}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Your job was completed on {booking.scheduledDate}. Help fellow homeowners by providing your feedback.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleReviewSubmit}>
                <CardContent className="space-y-4">
                  {/* Interactive Star Rating */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Overall Rating</Label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= (hoverRating || rating)
                                ? "fill-amber-500 text-amber-500"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold font-mono ml-2 text-foreground">
                        {rating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reviewComment" className="text-xs font-semibold">
                      Your Comments & Review
                    </Label>
                    <Textarea
                      id="reviewComment"
                      rows={3}
                      placeholder="Share details about punctuality, problem solving, cleanliness, and value..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="text-xs bg-background"
                      required
                    />
                  </div>
                </CardContent>

                <CardFooter className="pt-0 flex justify-end">
                  <Button type="submit" size="sm" className="gap-2 font-semibold">
                    <Check className="h-4 w-4" />
                    Publish Verified Review
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            /* Rendered Published Review */
            <Card className="border-emerald-500/30 bg-emerald-500/5 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <CardTitle className="text-sm font-bold">
                      Your Review Has Been Submitted
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                    Verified Feedback
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < (existingReview?.rating || rating) ? "fill-current" : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-foreground font-bold font-mono ml-1">
                    {(existingReview?.rating || rating).toFixed(1)} / 5.0
                  </span>
                </div>
                <p className="italic text-foreground/80 leading-relaxed">
                  &ldquo;{existingReview?.comment || comment || "Great service! Very professional."}&rdquo;
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Specialist Info */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Assigned Specialist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-border">
                <AvatarFallback className="font-semibold text-sm">
                  {getInitials(booking.providerName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-bold text-sm text-foreground block">
                  {booking.providerName}
                </span>
                <span className="text-xs text-muted-foreground block">
                  ServiceLink Verified Pro
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Specialist ID</span>
                <span className="font-mono text-foreground">{booking.providerId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verification</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Credentials Verified
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Location */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Schedule & Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground block">
                  {booking.scheduledDate}
                </span>
                <span className="text-muted-foreground">
                  Arrival window: {booking.scheduledTime}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground block">Site Address</span>
                <span className="text-muted-foreground">{booking.address}</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-foreground block">Contact Number</span>
                <span className="text-muted-foreground font-mono">{booking.contactNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scope Description & Notes */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Job Scope & Technician Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div>
            <span className="font-semibold text-foreground uppercase font-mono text-[11px] tracking-wider block mb-1">
              Customer Problem Summary
            </span>
            <p className="text-foreground/90 leading-relaxed bg-muted/20 p-3 rounded-lg border border-border">
              {booking.description}
            </p>
          </div>

          {booking.notes && (
            <div>
              <span className="font-semibold text-foreground uppercase font-mono text-[11px] tracking-wider block mb-1">
                Technician Work Notes
              </span>
              <p className="text-foreground/90 leading-relaxed bg-muted/20 p-3 rounded-lg border border-border">
                {booking.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
