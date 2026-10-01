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
import { Skeleton } from "@/components/ui/skeleton"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"
import {
  Briefcase,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  Timer,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Check,
} from "lucide-react"

export default function ProviderJobsPage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const providers = useAppStore((state) => state.providers)
  const bookings = useAppStore((state) => state.bookings)
  const updateBookingStatus = useAppStore((state) => state.updateBookingStatus)

  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350)
    return () => clearTimeout(timer)
  }, [])

  const provider = providers.find(
    (p) => p.personaId === currentPersona.id || p.id === currentPersona.id
  )

  const isApproved = currentPersona.verificationStatus === "approved"
  const isPending = currentPersona.verificationStatus === "pending"

  const providerJobs = isApproved
    ? bookings.filter(
        (b) =>
          (b.providerId === provider?.id || b.providerName === currentPersona.name) &&
          (b.status === "in-progress" || b.status === "completed")
      )
    : []

  const [activeTab, setActiveTab] = React.useState("all")

  const filteredJobs = providerJobs.filter((j) => {
    if (activeTab === "all") return true
    if (activeTab === "in-progress") return j.status === "in-progress"
    if (activeTab === "completed") return j.status === "completed"
    return true
  })

  const inProgressCount = providerJobs.filter((j) => j.status === "in-progress").length
  const completedCount = providerJobs.filter((j) => j.status === "completed").length

  const handleMarkComplete = (jobId: string) => {
    updateBookingStatus(jobId, "completed")
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assigned Service Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Manage your scheduled work, active diagnostic visits, and completed service contracts.
          </p>
        </div>

        {isApproved && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-mono text-xs">
              {inProgressCount} Active
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono text-xs">
              {completedCount} Completed
            </Badge>
          </div>
        )}
      </div>

      {/* Verification Check / Locked State */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border bg-card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="space-y-1 text-right">
                  <Skeleton className="h-3 w-20 ml-auto" />
                  <Skeleton className="h-6 w-24 ml-auto" />
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      ) : !isApproved ? (
        <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-base font-bold text-foreground">
                Job Management Locked During Verification
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {isPending
                ? "Your provider account is currently pending administrative verification. Scheduled jobs and service operations will unlock once approved."
                : "Your provider application was declined. You cannot view or execute service jobs until your credentials are verified."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button variant="outline" size="sm" asChild>
              <Link href="/provider">
                Check Verification Status
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : providerJobs.length > 0 ? (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              All Jobs ({providerJobs.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="text-xs">
              In Progress ({inProgressCount})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed ({completedCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border-border bg-card shadow-sm hover:shadow-md transition-all"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase text-muted-foreground">
                              {job.categoryName} • #{job.id.slice(-6)}
                            </span>
                            {job.status === "in-progress" ? (
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs gap-1 font-medium">
                                <Timer className="h-3 w-3" />
                                In Progress
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1 font-medium">
                                <CheckCircle2 className="h-3 w-3" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          <Link href={`/provider/jobs/${job.id}`} className="hover:underline">
                            <CardTitle className="text-base font-bold">
                              {job.serviceTitle}
                            </CardTitle>
                          </Link>
                          <CardDescription className="text-xs">
                            Client: <strong className="text-foreground">{job.customerName}</strong>
                          </CardDescription>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-[11px] font-mono uppercase text-muted-foreground block">
                            {job.finalAmount ? "Settled Total" : "Est. Earnings"}
                          </span>
                          <span className="text-base font-bold font-mono text-foreground">
                            ₱{(job.finalAmount || job.estimatedAmount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="py-2.5 text-xs text-muted-foreground border-y border-border/50 bg-muted/10 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-foreground/80 shrink-0" />
                          <span>
                            {job.scheduledDate} ({job.scheduledTime})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-foreground/80 shrink-0" />
                          <span className="truncate">{job.address}</span>
                        </div>
                      </div>

                      {job.description && (
                        <p className="line-clamp-1 italic text-foreground/80 pt-1">
                          &ldquo;{job.description}&rdquo;
                        </p>
                      )}
                    </CardContent>

                    <CardFooter className="pt-3 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 text-foreground/70" />
                        <span className="font-mono">{job.contactNumber}</span>
                      </div>

                      <div className="flex items-center gap-2 ml-auto">
                        {job.status === "in-progress" && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkComplete(job.id)}
                            className="h-8 text-xs gap-1.5 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Mark Complete
                          </Button>
                        )}

                        <Button size="sm" variant="outline" className="h-8 text-xs gap-1" asChild>
                          <Link href={`/provider/jobs/${job.id}`}>
                            Job Details
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
                  <EmptyTitle>No {activeTab} jobs</EmptyTitle>
                  <EmptyDescription>
                    There are no jobs currently matching this tab filter.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <Briefcase className="h-6 w-6 text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No active service jobs</EmptyTitle>
            <EmptyDescription>
              You do not have any accepted or completed service jobs on record. When you accept client requests, they will appear here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/provider/requests">
                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                Check Incoming Requests
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
