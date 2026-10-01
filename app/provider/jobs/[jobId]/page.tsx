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
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Timer,
  Check,
  User,
  FileText,
  DollarSign,
} from "lucide-react"

export default function ProviderJobDetailPage() {
  const params = useParams()
  const jobId = typeof params.jobId === "string" ? params.jobId : ""

  const bookings = useAppStore((state) => state.bookings)
  const updateBookingStatus = useAppStore((state) => state.updateBookingStatus)

  const job = bookings.find((b) => b.id === jobId)
  const [completedNotice, setCompletedNotice] = React.useState(false)

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Job record not found</EmptyTitle>
            <EmptyDescription>
              We couldn&apos;t find an assigned service job matching ID: {jobId}.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/provider/jobs">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Return to Jobs List
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  const handleMarkComplete = () => {
    updateBookingStatus(job.id, "completed")
    setCompletedNotice(true)
  }

  const isCompleted = job.status === "completed"
  const isInProgress = job.status === "in-progress"

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" asChild>
          <Link href="/provider/jobs">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Assigned Jobs
          </Link>
        </Button>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs uppercase">
              {job.categoryName}
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              #{job.id}
            </span>
            {isInProgress ? (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs gap-1 font-medium">
                <Timer className="h-3 w-3" />
                In Progress
              </Badge>
            ) : isCompleted ? (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1 font-medium">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </Badge>
            ) : (
              <Badge variant="outline">{job.status}</Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight">{job.serviceTitle}</h1>
          <p className="text-xs text-muted-foreground">
            Scheduled on {job.scheduledDate} ({job.scheduledTime})
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="text-[11px] font-mono uppercase text-muted-foreground">
            {job.finalAmount ? "Settled Earnings" : "Expected Payout"}
          </span>
          <span className="text-2xl font-bold font-mono text-foreground">
            ₱{(job.finalAmount || job.estimatedAmount).toLocaleString()}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {isCompleted ? "Transferred to Available Balance" : "Held in Client Escrow"}
          </span>
        </div>
      </div>

      {/* Action Banner for In-Progress Jobs */}
      {isInProgress && (
        <Card className="border-blue-500/30 bg-blue-500/5 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-foreground">
                  Job Execution in Progress
                </CardTitle>
                <CardDescription className="text-xs">
                  Once repairs, diagnostics, and customer sign-off are finished on site, mark this job complete to release payment.
                </CardDescription>
              </div>

              <Button
                size="sm"
                onClick={handleMarkComplete}
                className="gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
              >
                <Check className="h-4 w-4" />
                Mark Job Complete
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Completion Notification if just completed */}
      {completedNotice && (
        <div className="p-4 rounded-lg bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 flex items-center gap-3 text-xs font-medium">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-bold">Job successfully completed!</p>
            <p className="text-[11px] text-emerald-600">
              Client escrow has been released and credited to your earnings report.
            </p>
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer / Client Card */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Customer Name</span>
              <span className="font-semibold text-foreground">{job.customerName}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone Contact</span>
              <span className="font-mono text-foreground flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                {job.contactNumber}
              </span>
            </div>

            <Separator />

            <div className="space-y-1">
              <span className="text-muted-foreground block">Service Site Address</span>
              <p className="text-foreground font-medium flex items-start gap-1">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                {job.address}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Payout */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Service Schedule & Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Appointment Date</span>
              <span className="font-medium text-foreground">{job.scheduledDate}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Arrival Window</span>
              <span className="font-medium text-foreground">{job.scheduledTime}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Settlement Status</span>
              <span className="font-medium text-foreground">
                {isCompleted ? "Released (Paid)" : "Guaranteed by ServiceLink Protect"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scope & Notes */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Job Scope & Diagnostic Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div>
            <span className="font-semibold uppercase font-mono text-[11px] text-muted-foreground block mb-1">
              Customer Problem Statement
            </span>
            <p className="p-3 bg-muted/20 rounded-lg border border-border text-foreground/90 leading-relaxed">
              {job.description}
            </p>
          </div>

          {job.notes && (
            <div>
              <span className="font-semibold uppercase font-mono text-[11px] text-muted-foreground block mb-1">
                Technician Field Notes
              </span>
              <p className="p-3 bg-muted/20 rounded-lg border border-border text-foreground/90 leading-relaxed">
                {job.notes}
              </p>
            </div>
          )}
        </CardContent>

        {isInProgress && (
          <>
            <Separator />
            <CardFooter className="pt-3 pb-3 flex justify-end">
              <Button
                size="sm"
                onClick={handleMarkComplete}
                className="gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Check className="h-3.5 w-3.5" />
                Mark Complete
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
