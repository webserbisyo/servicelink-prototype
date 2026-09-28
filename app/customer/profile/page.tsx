"use client"

import * as React from "react"
import { useAppStore } from "@/lib/store"
import { Persona } from "@/lib/mock-data"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ShieldCheck,
  CheckCircle2,
  Save,
  RotateCcw,
} from "lucide-react"

function CustomerProfileForm({
  persona,
  onUpdate,
}: {
  persona: Persona
  onUpdate: (updates: Partial<Persona>) => void
}) {
  const [name, setName] = React.useState(persona.name)
  const [email, setEmail] = React.useState(persona.email)
  const [phone, setPhone] = React.useState(persona.phone || "+63 917 123 4567")
  const [address, setAddress] = React.useState(
    persona.address || "Unit 12B, Serendra Two, BGC, Taguig City"
  )
  const [isSaved, setIsSaved] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onUpdate({
      name,
      email,
      phone,
      address,
    })

    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleReset = () => {
    setName(persona.name)
    setEmail(persona.email)
    setPhone(persona.phone || "+63 917 123 4567")
    setAddress(persona.address || "Unit 12B, Serendra Two, BGC, Taguig City")
    setIsSaved(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold">Contact & Service Address</CardTitle>
          <CardDescription className="text-xs">
            This information will be pre-filled when requesting verified tradespeople.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isSaved && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Profile details successfully updated in session store.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Mobile Number
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+63 9XX XXX XXXX"
              required
              className="text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-semibold">
              Default Service Address
            </Label>
            <Textarea
              id="address"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Unit, Building, Street, Barangay, City, Metro Manila"
              required
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
            onClick={handleReset}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>

          <Button
            type="submit"
            size="sm"
            className="text-xs gap-1.5 font-semibold"
          >
            <Save className="h-3.5 w-3.5" />
            Save Profile Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default function CustomerProfilePage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const updateCurrentPersona = useAppStore((state) => state.updateCurrentPersona)

  const getInitials = (n: string) =>
    n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal details, default service address, and primary contact information.
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-border shrink-0">
              <AvatarImage src={currentPersona.avatar} alt={currentPersona.name} />
              <AvatarFallback className="text-base font-bold">
                {getInitials(currentPersona.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl font-bold">{currentPersona.name}</CardTitle>
                <Badge variant="outline" className="text-xs uppercase font-mono">
                  {currentPersona.role}
                </Badge>
              </div>
              <CardDescription className="text-xs font-mono text-muted-foreground">
                {currentPersona.email} • ID: #{currentPersona.id}
              </CardDescription>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium pt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Active Verified Customer Account
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Form keyed by currentPersona.id */}
      <CustomerProfileForm
        key={currentPersona.id}
        persona={currentPersona}
        onUpdate={updateCurrentPersona}
      />
    </div>
  )
}
