"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react"

export default function BookProviderPage() {
  const params = useParams()
  const router = useRouter()
  const providerId = typeof params.providerId === "string" ? params.providerId : ""

  const providers = useAppStore((state) => state.providers)
  const categories = useAppStore((state) => state.categories)
  const currentPersona = useAppStore((state) => state.currentPersona)
  const createBooking = useAppStore((state) => state.createBooking)

  const provider = providers.find((p) => p.id === providerId)

  // Form State
  const [serviceTitle, setServiceTitle] = React.useState("")
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    provider?.categoryIds[0] || "plumbing"
  )
  const [scheduledDate, setScheduledDate] = React.useState("2026-10-05")
  const [scheduledTime, setScheduledTime] = React.useState("09:00 AM - 11:00 AM")
  const [address, setAddress] = React.useState(
    currentPersona.address || "Unit 12B, Serendra Two, BGC, Taguig City"
  )
  const [contactNumber, setContactNumber] = React.useState(
    currentPersona.phone || "+63 917 123 4567"
  )
  const [description, setDescription] = React.useState("")
  const [estimatedHours] = React.useState(2)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
              We couldn&apos;t load the specialist profile you requested for booking.
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

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)
  const estimatedAmount = provider.hourlyRate * estimatedHours

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Call store createBooking mutation
    createBooking({
      customerId: currentPersona.id,
      customerName: currentPersona.name,
      providerId: provider.id,
      providerName: provider.name,
      categoryId: selectedCategoryId,
      categoryName: selectedCategory?.name || "General Maintenance",
      serviceTitle: serviceTitle.trim() || `${selectedCategory?.name || "Home"} Service Request`,
      description: description.trim() || "Inspection, diagnosis, and required replacement parts.",
      status: "requested",
      scheduledDate,
      scheduledTime,
      estimatedAmount,
      address,
      contactNumber,
      awaitingReview: false,
      notes: "Submitted via ServiceLink instant booking portal.",
    })

    // Redirect to customer bookings list per blueprint
    setTimeout(() => {
      router.push("/customer/bookings")
    }, 250)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" asChild>
          <Link href={`/customer/providers/${provider.categoryIds[0] || "plumbing"}/${provider.id}`}>
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Specialist Profile
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Request Service Appointment</h1>
        <p className="text-sm text-muted-foreground">
          Fill in your job details and preferred appointment window. Your specialist will confirm availability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: The Request Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="border-border bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Service Details</CardTitle>
                <CardDescription className="text-xs">
                  Describe what needs attention at your home or commercial site.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Service Title */}
                <div className="space-y-1.5">
                  <Label htmlFor="serviceTitle" className="text-xs font-semibold">
                    Job Summary / Service Title
                  </Label>
                  <Input
                    id="serviceTitle"
                    required
                    placeholder="e.g. Master bathroom pipe repair and shut-off valve replace"
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                    className="text-xs"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <Label htmlFor="categorySelect" className="text-xs font-semibold">
                    Trade Category
                  </Label>
                  <Select
                    value={selectedCategoryId}
                    onValueChange={(val) => setSelectedCategoryId(val)}
                  >
                    <SelectTrigger id="categorySelect" className="text-xs">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id} className="text-xs">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="scheduledDate" className="text-xs font-semibold">
                      Preferred Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="scheduledDate"
                        type="date"
                        required
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="timeSlot" className="text-xs font-semibold">
                      Arrival Time Window
                    </Label>
                    <Select
                      value={scheduledTime}
                      onValueChange={(val) => setScheduledTime(val)}
                    >
                      <SelectTrigger id="timeSlot" className="text-xs">
                        <SelectValue placeholder="Select Time Window" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00 AM - 10:00 AM" className="text-xs">
                          08:00 AM - 10:00 AM (Early Morning)
                        </SelectItem>
                        <SelectItem value="09:00 AM - 11:00 AM" className="text-xs">
                          09:00 AM - 11:00 AM (Morning)
                        </SelectItem>
                        <SelectItem value="01:00 PM - 03:00 PM" className="text-xs">
                          01:00 PM - 03:00 PM (Afternoon)
                        </SelectItem>
                        <SelectItem value="03:00 PM - 05:00 PM" className="text-xs">
                          03:00 PM - 05:00 PM (Late Afternoon)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Service Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs font-semibold">
                    Service Address
                  </Label>
                  <Textarea
                    id="address"
                    required
                    rows={2}
                    placeholder="Unit / House No., Street, Barangay, City, Metro Manila"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-xs"
                  />
                </div>

                {/* Customer Contact Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="contactNumber" className="text-xs font-semibold">
                    Primary Phone Contact
                  </Label>
                  <Input
                    id="contactNumber"
                    required
                    placeholder="+63 9XX XXX XXXX"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                {/* Description & Notes */}
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-xs font-semibold">
                    Problem Description & Access Notes
                  </Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="Provide details about the issue, gate pass requirements, or building security instructions..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-xs"
                  />
                </div>
              </CardContent>

              <Separator />

              <CardFooter className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/customer/providers/${provider.categoryIds[0] || "plumbing"}/${provider.id}`}>
                    Cancel
                  </Link>
                </Button>

                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="gap-2 font-semibold"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? "Submitting Request..." : "Send Booking Request"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        {/* Right Col: Specialist Summary Card */}
        <div className="space-y-4">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Specialist Summary</span>
              <div className="flex items-center gap-3 pt-2">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback className="text-sm font-semibold">
                    {getInitials(provider.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-sm font-bold truncate">{provider.name}</CardTitle>
                  <CardDescription className="text-xs line-clamp-1">{provider.title}</CardDescription>
                  <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-medium mt-0.5">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Provider
                  </div>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-3 space-y-3 text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Standard Rate</span>
                <span className="font-mono font-bold text-foreground">
                  ₱{provider.hourlyRate.toLocaleString()} / hr
                </span>
              </div>

              <div className="flex justify-between items-center text-muted-foreground">
                <span>Estimated Time</span>
                <span className="font-mono text-foreground">{estimatedHours} hrs (Standard Inspection)</span>
              </div>

              <Separator />

              <div className="flex justify-between items-baseline pt-1">
                <span className="font-semibold text-foreground">Est. Total</span>
                <span className="font-mono text-lg font-bold text-foreground">
                  ₱{estimatedAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded bg-muted/30 border border-border text-[11px] text-muted-foreground space-y-1">
                <div className="flex items-center gap-1 text-foreground font-medium">
                  <CheckCircle className="h-3 w-3 text-primary" />
                  ServiceLink Guarantee
                </div>
                <p>
                  No payment charged now. Full payment is released only after you sign off on completed work.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
