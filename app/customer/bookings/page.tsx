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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"
import {
  Calendar,
  Clock,
  MapPin,
  CalendarCheck,
  ArrowRight,
  Plus,
  Star,
  CheckCircle2,
  AlertCircle,
  Timer,
  ChevronRight,
} from "lucide-react"

export default function CustomerBookingsPage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const bookings = useAppStore((state) => state.bookings)

  // Filter bookings for the active customer persona
  const customerBookings = bookings.filter(
    (b) => b.customerId === currentPersona.id
  )

  const [activeTab, setActiveTab] = React.useState("all")

  const filteredBookings = customerBookings.filter((b) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return b.status === "in-progress" || b.status === "requested"
    if (activeTab === "completed") return b.status === "completed"
    return true
  })

  const getStatusBadge = (status: string, awaitingReview?: boolean) => {
    switch (status) {
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
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1 font-medium">
              <CheckCircle2 className="h-3 w-3" />
              Completed
            </Badge>
            {awaitingReview && (
              <Badge variant="secondary" className="bg-amber-500/15 text-amber-700 text-[10px] gap-1 font-medium">
                <Star className="h-2.5 w-2.5 fill-current" />
                Review Needed
              </Badge>
            )}
          </div>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-muted-foreground border-border text-xs gap-1 font-medium">
            <AlertCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Track active service calls, upcoming appointments, and completed maintenance records.
          </p>
        </div>

        <Button size="sm" className="gap-1.5 self-start sm:self-auto" asChild>
          <Link href="/customer">
            <Plus className="h-4 w-4" />
            Book New Service
          </Link>
        </Button>
      </div>

      {customerBookings.length > 0 ? (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              All ({customerBookings.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs">
              Active ({customerBookings.filter((b) => b.status === "in-progress" || b.status === "requested").length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed ({customerBookings.filter((b) => b.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredBookings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="border-border bg-card hover:shadow-sm transition-all"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-muted-foreground uppercase">
                              {booking.categoryName} • #{booking.id.slice(-6)}
                            </span>
                            {getStatusBadge(booking.status, booking.awaitingReview)}
                          </div>
                          <Link
                            href={`/customer/bookings/${booking.id}`}
                            className="hover:underline"
                          >
                            <CardTitle className="text-base font-bold">
                              {booking.serviceTitle}
                            </CardTitle>
                          </Link>
                          <CardDescription className="text-xs">
                            Specialist: <strong className="text-foreground font-semibold">{booking.providerName}</strong>
                          </CardDescription>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                            {booking.finalAmount ? "Final Cost" : "Estimated Cost"}
                          </span>
                          <span className="text-base font-bold font-mono text-foreground">
                            ₱{(booking.finalAmount || booking.estimatedAmount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="py-2 space-y-2 text-xs text-muted-foreground border-y border-border/50 bg-muted/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                          <span>
                            {booking.scheduledDate} ({booking.scheduledTime})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                          <span className="truncate">{booking.address}</span>
                        </div>
                      </div>

                      {booking.description && (
                        <p className="line-clamp-1 italic text-foreground/80 pt-1">
                          &ldquo;{booking.description}&rdquo;
                        </p>
                      )}
                    </CardContent>

                    <CardFooter className="pt-3 pb-3 flex items-center justify-between">
                      {booking.status === "completed" && booking.awaitingReview ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/30 text-xs gap-1 py-1 px-2.5">
                            <Star className="h-3 w-3 fill-current" />
                            Review pending for {booking.providerName}
                          </Badge>
                        </div>
                      ) : (
                        <div className="text-[11px] text-muted-foreground font-mono">
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      )}

                      <div className="flex items-center gap-2 ml-auto">
                        {booking.status === "completed" && booking.awaitingReview && (
                          <Button size="sm" variant="default" className="text-xs gap-1.5 h-8 font-semibold" asChild>
                            <Link href={`/customer/bookings/${booking.id}`}>
                              <Star className="h-3 w-3" />
                              Write Review
                            </Link>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs gap-1 h-8" asChild>
                          <Link href={`/customer/bookings/${booking.id}`}>
                            View Details
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Empty className="border border-dashed py-12">
                <EmptyHeader>
                  <EmptyTitle>No {activeTab} bookings</EmptyTitle>
                  <EmptyDescription>
                    There are no bookings matching your selected filter.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        /* Empty state for New Customer persona */
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <CalendarCheck className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No service bookings yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t booked any home service appointments. Browse our certified plumbers, electricians, and carpenters to schedule your first repair.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="gap-2 font-medium" asChild>
              <Link href="/customer">
                Browse Trade Categories
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
