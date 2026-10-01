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
import { Checkbox } from "@/components/ui/checkbox"
import {
  ShieldCheck,
  CheckCircle2,
  Save,
  RotateCcw,
  Clock,
  AlertCircle,
  FileCheck,
} from "lucide-react"

function ProviderProfileForm({
  persona,
  onSave,
}: {
  persona: Persona
  onSave: (data: {
    name: string
    title: string
    bio: string
    hourlyRate: number
    location: string
    phone: string
    categoryIds: string[]
    skills: string[]
  }) => void
}) {
  const providers = useAppStore((state) => state.providers)
  const categories = useAppStore((state) => state.categories)
  const provider = providers.find((p) => p.personaId === persona.id || p.id === persona.id)

  const [name, setName] = React.useState(persona.name)
  const [title, setTitle] = React.useState(provider?.title || "Home Service Specialist")
  const [bio, setBio] = React.useState(provider?.bio || persona.bio || "")
  const [hourlyRate, setHourlyRate] = React.useState(provider?.hourlyRate || 600)
  const [location, setLocation] = React.useState(
    provider?.location || persona.address || "Metro Manila"
  )
  const [phone, setPhone] = React.useState(
    provider?.phone || persona.phone || "+63 920 987 6543"
  )
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    provider?.categoryIds || ["plumbing"]
  )
  const [skillsText, setSkillsText] = React.useState(
    (provider?.skills || ["Emergency repair", "Installation"]).join(", ")
  )
  const [isSaved, setIsSaved] = React.useState(false)

  const handleCategoryToggle = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedSkills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    onSave({
      name,
      title,
      bio,
      hourlyRate: Number(hourlyRate) || 500,
      location,
      phone,
      categoryIds: selectedCategories,
      skills: parsedSkills,
    })

    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleReset = () => {
    setName(persona.name)
    setTitle(provider?.title || "Home Service Specialist")
    setBio(provider?.bio || persona.bio || "")
    setHourlyRate(provider?.hourlyRate || 600)
    setLocation(provider?.location || persona.address || "Metro Manila")
    setPhone(provider?.phone || persona.phone || "+63 920 987 6543")
    setSelectedCategories(provider?.categoryIds || ["plumbing"])
    setSkillsText((provider?.skills || ["Emergency repair", "Installation"]).join(", "))
    setIsSaved(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold">Trade Credentials & Service Profile</CardTitle>
          <CardDescription className="text-xs">
            Manage public details shown to prospective clients on your specialist profile.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isSaved && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Specialist profile changes successfully updated in session store.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="providerName" className="text-xs font-semibold">
                Display Name
              </Label>
              <Input
                id="providerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold">
                Direct Contact Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold">
              Professional Title / Trade Qualification
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Plumber & Certified Electrician"
              required
              className="text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="hourlyRate" className="text-xs font-semibold">
                Standard Hourly Service Rate (₱)
              </Label>
              <Input
                id="hourlyRate"
                type="number"
                min="100"
                step="50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                required
                className="text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-xs font-semibold">
                Service Area / Coverage Zones
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Quezon City & Central Metro Manila"
                required
                className="text-xs"
              />
            </div>
          </div>

          {/* Trade Categories Checkboxes */}
          <div className="space-y-2 pt-2">
            <Label className="text-xs font-semibold">Primary Trade Categories</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-lg border border-border bg-muted/20">
              {categories.map((cat) => {
                const checked = selectedCategories.includes(cat.id)
                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer text-xs font-medium"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => handleCategoryToggle(cat.id)}
                    />
                    <span>{cat.name}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-xs font-semibold">
              Specialist Bio & Trade Experience
            </Label>
            <Textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Detail your years in trade, past installations, apprenticeship, or warranties offered..."
              required
              className="text-xs"
            />
          </div>

          {/* Skills comma-separated */}
          <div className="space-y-1.5">
            <Label htmlFor="skills" className="text-xs font-semibold">
              Specific Skills & Services (comma-separated)
            </Label>
            <Input
              id="skills"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="e.g. Pipe fitting, Emergency leak repair, Circuit breaker replacement"
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
            Save Profile Setup
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default function ProviderProfilePage() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const updateCurrentPersona = useAppStore((state) => state.updateCurrentPersona)
  const updateProviderProfile = useAppStore((state) => state.updateProviderProfile)

  const getInitials = (n: string) =>
    n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  const isApproved = currentPersona.verificationStatus === "approved"
  const isPending = currentPersona.verificationStatus === "pending"

  const handleSave = (data: {
    name: string
    title: string
    bio: string
    hourlyRate: number
    location: string
    phone: string
    categoryIds: string[]
    skills: string[]
  }) => {
    // Synchronize both currentPersona and the provider profile
    updateCurrentPersona({
      name: data.name,
      phone: data.phone,
      address: data.location,
      bio: data.bio,
    })

    updateProviderProfile(currentPersona.id, {
      name: data.name,
      title: data.title,
      bio: data.bio,
      hourlyRate: data.hourlyRate,
      location: data.location,
      phone: data.phone,
      categoryIds: data.categoryIds,
      skills: data.skills,
    })
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Provider Profile Setup</h1>
        <p className="text-sm text-muted-foreground">
          Configure your service catalog, hourly pricing, service location, and trade qualifications.
        </p>
      </div>

      {/* Account Status Header Card */}
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
                {isApproved ? (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs gap-1 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Provider
                  </Badge>
                ) : isPending ? (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs gap-1 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    Verification Pending
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-xs gap-1 font-medium">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Application Declined
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs font-mono text-muted-foreground">
                {currentPersona.email} • ID: #{currentPersona.id}
              </CardDescription>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                <FileCheck className="h-3.5 w-3.5" />
                <span>
                  {isApproved
                    ? "Government ID and TESDA trade certifications verified on file."
                    : "Compliance review active. Client matching unlocked upon validation."}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Form */}
      <ProviderProfileForm
        key={currentPersona.id}
        persona={currentPersona}
        onSave={handleSave}
      />
    </div>
  )
}
