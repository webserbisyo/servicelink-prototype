"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  AlertCircle,
  MapPin,
  CheckCircle2,
  Search,
} from "lucide-react"

export default function CategoryProvidersPage() {
  const params = useParams()
  const categorySlug = typeof params.category === "string" ? params.category : ""

  const categories = useAppStore((state) => state.categories)
  const providers = useAppStore((state) => state.providers)

  const category = categories.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase() || c.id.toLowerCase() === categorySlug.toLowerCase()
  )

  const matchedProviders = providers.filter((p) =>
    p.categoryIds.includes(category?.id || categorySlug)
  )

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back Link & Header */}
      <div className="space-y-4">
        <Link
          href="/customer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all categories
        </Link>

        {category ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-border bg-card p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
                  Category Directory
                </span>
                <Badge variant="outline" className="font-mono text-xs">
                  {matchedProviders.length} Pro{matchedProviders.length === 1 ? "" : "s"} Available
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{category.name} Specialists</h1>
              <p className="text-sm text-muted-foreground max-w-2xl">{category.description}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 shrink-0 bg-muted/30 p-3 rounded-lg border border-border">
              <span className="text-[11px] font-mono uppercase text-muted-foreground">Standard Market Rate</span>
              <span className="text-lg font-bold font-mono">
                ₱{category.priceRange.min.toLocaleString()} - ₱{category.priceRange.max.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">{category.priceRange.unit}</span>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6">
            <h1 className="text-2xl font-bold tracking-tight">Providers: {categorySlug}</h1>
          </div>
        )}
      </div>

      {/* Provider List */}
      {matchedProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchedProviders.map((provider) => {
            const isApproved = provider.verificationStatus === "approved"
            const isPending = provider.verificationStatus === "pending"

            return (
              <Card
                key={provider.id}
                className="border-border bg-card hover:shadow-md transition-all flex flex-col justify-between"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 border border-border shrink-0">
                      <AvatarImage src={provider.avatar} alt={provider.name} />
                      <AvatarFallback className="text-base font-semibold">
                        {getInitials(provider.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <Link
                          href={`/customer/providers/${categorySlug}/${provider.id}`}
                          className="hover:underline"
                        >
                          <CardTitle className="text-base font-bold truncate">
                            {provider.name}
                          </CardTitle>
                        </Link>

                        {isApproved ? (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[11px] gap-1 shrink-0 font-medium">
                            <ShieldCheck className="h-3 w-3" />
                            Verified Pro
                          </Badge>
                        ) : isPending ? (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[11px] gap-1 shrink-0 font-medium">
                            <Clock className="h-3 w-3" />
                            Pending Review
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[11px] gap-1 shrink-0 font-medium">
                            <AlertCircle className="h-3 w-3" />
                            Not Verified
                          </Badge>
                        )}
                      </div>

                      <CardDescription className="text-xs text-foreground/80 line-clamp-1">
                        {provider.title}
                      </CardDescription>

                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{provider.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {provider.bio}
                  </p>

                  {/* Skills */}
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {provider.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded bg-muted/70 px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats & CTA */}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      {provider.rating > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-xs font-bold text-foreground ml-1">
                              {provider.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            ({provider.reviewCount} reviews)
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">New to ServiceLink</span>
                      )}
                      <div className="text-xs font-semibold font-mono text-foreground mt-0.5">
                        ₱{provider.hourlyRate.toLocaleString()} <span className="text-[10px] text-muted-foreground font-normal">/ hour</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="gap-1.5 text-xs font-medium"
                      asChild
                    >
                      <Link href={`/customer/providers/${categorySlug}/${provider.id}`}>
                        View Profile
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Empty className="border border-dashed py-16">
          <EmptyMedia variant="icon">
            <Search className="h-6 w-6" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No providers listed in this category yet</EmptyTitle>
            <EmptyDescription>
              We are currently onboarding certified specialists for this category. Check back soon or explore our other services.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" asChild>
              <Link href="/customer">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Browse Other Categories
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
