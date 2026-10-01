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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
  Coins,
  TrendingUp,
  Clock,
  ShieldCheck,
  Briefcase,
  ShieldAlert,
} from "lucide-react"

const chartConfig = {
  amount: {
    label: "Settled Payout (₱)",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig

export default function ProviderEarningsPage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const providers = useAppStore((state) => state.providers)
  const bookings = useAppStore((state) => state.bookings)

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

  // Filter provider bookings
  const providerBookings = isApproved
    ? bookings.filter(
        (b) => b.providerId === provider?.id || b.providerName === currentPersona.name
      )
    : []

  const completedJobs = providerBookings.filter((b) => b.status === "completed")
  const inProgressJobs = providerBookings.filter((b) => b.status === "in-progress")

  // Real numbers derived from store
  const totalEarnings = completedJobs.reduce(
    (sum, b) => sum + (b.finalAmount || b.estimatedAmount),
    0
  )

  const pendingEscrow = inProgressJobs.reduce(
    (sum, b) => sum + b.estimatedAmount,
    0
  )

  const avgPayout =
    completedJobs.length > 0 ? Math.round(totalEarnings / completedJobs.length) : 0

  // Chart data from real completed bookings (sorted chronologically)
  const chartData = completedJobs
    .slice()
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .map((b) => ({
      date: b.scheduledDate.slice(5), // e.g. "09-16", "09-24"
      service: b.serviceTitle,
      amount: b.finalAmount || b.estimatedAmount,
    }))

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Earnings & Revenue</h1>
        <p className="text-sm text-muted-foreground">
          Track completed service payouts, active escrow disbursements, and historical payment settlements.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border bg-card p-6 space-y-3">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-36" />
              </Card>
            ))}
          </div>
          <Card className="border-border bg-card p-6 space-y-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </Card>
        </div>
      ) : (
        <>
          {/* Verification Check / Locked State Banner */}
          {!isApproved && (
            <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                  <CardTitle className="text-base font-bold text-foreground">
                    Earnings Ledger Locked During Verification
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  {isPending
                    ? "Your provider account is currently pending administrative verification. Escrow settlements and payout ledgers will activate upon account approval."
                    : "Your provider application was declined. Financial ledgers are inaccessible until your credentials are verified."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/provider">
                    View Verification Status
                    <Briefcase className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Settled */}
            <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">
              Total Settled Earnings
            </span>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-bold font-mono text-foreground">
                ₱{totalEarnings.toLocaleString()}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Disbursed from {completedJobs.length} completed jobs</span>
          </CardContent>
        </Card>

        {/* Escrow Pending */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">
              In-Progress Escrow
            </span>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-bold font-mono text-foreground">
                ₱{pendingEscrow.toLocaleString()}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-amber-600 flex items-center gap-1.5 font-medium">
            <Clock className="h-4 w-4 shrink-0" />
            <span>Held in client escrow ({inProgressJobs.length} active)</span>
          </CardContent>
        </Card>

        {/* Average Ticket */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <span className="text-[11px] font-mono uppercase text-muted-foreground">
              Average Ticket Payout
            </span>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-bold font-mono text-foreground">
                ₱{avgPayout.toLocaleString()}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-xs text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-foreground/80 shrink-0" />
            <span>Per standard completed service call</span>
          </CardContent>
        </Card>
      </div>

      {/* Revenue History Chart */}
      {completedJobs.length > 0 && (
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Payout Trend per Completed Job</CardTitle>
                <CardDescription className="text-xs">
                  Settled revenue timeline derived from verified customer sign-offs.
                </CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                Real Mock Settlement Data
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(val) => `₱${val}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--foreground))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Settlement History Table */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Settlement History</CardTitle>
              <CardDescription className="text-xs">
                Detailed transaction records for finished service visits.
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {completedJobs.length} Transactions
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {completedJobs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="font-mono text-[11px]">DATE</TableHead>
                  <TableHead>SERVICE DETAILS</TableHead>
                  <TableHead>CUSTOMER</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead className="text-right font-mono text-[11px]">PAYOUT (₱)</TableHead>
                  <TableHead className="text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {completedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      {job.scheduledDate}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/provider/jobs/${job.id}`}
                        className="font-medium hover:underline text-foreground block truncate max-w-xs"
                      >
                        {job.serviceTitle}
                      </Link>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        #{job.id}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {job.customerName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] font-mono uppercase">
                        {job.categoryName}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-foreground">
                      ₱{(job.finalAmount || job.estimatedAmount).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[11px]"
                      >
                        Settled
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Empty className="border border-dashed py-12">
              <EmptyMedia variant="icon">
                <Coins className="h-6 w-6 text-muted-foreground" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No earnings history recorded</EmptyTitle>
                <EmptyDescription>
                  When you complete service appointments and customers sign off, released funds will automatically appear in this settlement ledger.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" asChild>
                  <Link href="/provider/jobs">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    Manage Active Jobs
                  </Link>
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </CardContent>
      </Card>
      </>
      )}
    </div>
  )
}
