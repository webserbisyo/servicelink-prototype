"use client"

import * as React from "react"
import { categories } from "@/lib/mock-data/categories"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Wrench,
  Zap,
  Hammer,
  Tv,
  Home,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react"

export default function CustomerBrowsePage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Wrench":
        return <Wrench className="h-5 w-5" />
      case "Zap":
        return <Zap className="h-5 w-5" />
      case "Hammer":
        return <Hammer className="h-5 w-5" />
      case "Tv":
        return <Tv className="h-5 w-5" />
      case "Home":
        return <Home className="h-5 w-5" />
      default:
        return <Wrench className="h-5 w-5" />
    }
  }

  const filteredCategories = categories.filter((cat) => {
    const q = searchQuery.toLowerCase()
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.popularServices.some((s) => s.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground mb-2 bg-background">
            <ShieldCheck className="h-3 w-3 text-foreground" />
            Verified Local Trade Directory
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Services</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Select a trade category below to explore standard pricing and connect with background-checked specialists.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search plumbing, wiring, leaks..."
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <Card
            key={cat.id}
            className="border-border bg-card hover:shadow-md transition-all flex flex-col justify-between"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <Badge variant="outline" className="font-mono text-xs font-semibold">
                  ₱{cat.priceRange.min.toLocaleString()} - ₱{cat.priceRange.max.toLocaleString()}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold">{cat.name}</CardTitle>
              <CardDescription className="text-xs leading-relaxed line-clamp-2">
                {cat.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider block mb-1.5">
                  Popular Service Calls
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.popularServices.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1 rounded bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      <CheckCircle className="h-2.5 w-2.5" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground text-[11px]">
                  {cat.priceRange.unit}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2.5 text-xs font-medium hover:text-foreground group"
                >
                  Explore Pros
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card">
          <p className="text-sm font-medium">No service categories match &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-xs text-muted-foreground mt-1">Try searching for plumbing, electrical, or carpentry.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSearchQuery("")}
            className="mt-4"
          >
            Reset Search
          </Button>
        </div>
      )}
    </div>
  )
}
