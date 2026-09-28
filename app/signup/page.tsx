"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { personas } from "@/lib/mock-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, User, Wrench, CheckCircle2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const setPersona = useAppStore((state) => state.setPersona)

  const handleSelectCustomer = () => {
    // Select the "New Customer" persona
    const newCustomer = personas.find((p) => p.id === "new-customer") || personas[1]
    setPersona(newCustomer)
    router.push("/customer")
  }

  const handleSelectProvider = () => {
    // Select the provider persona
    const provider = personas.find((p) => p.id === "juan-dela-cruz") || personas[2]
    setPersona(provider)
    router.push("/provider")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 bg-muted/40">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <span className="text-[11px] font-mono uppercase text-muted-foreground">
            Phase 2 Prototype
          </span>
        </div>

        <Card className="shadow-lg border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create your ServiceLink Account
            </CardTitle>
            <CardDescription className="text-sm">
              Select your role to get started with our home services marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 pt-2">
            {/* Option 1: Customer */}
            <div
              onClick={handleSelectCustomer}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg border-2 border-border hover:border-foreground bg-card hover:bg-muted/40 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base group-hover:text-foreground">
                      I need a service
                    </h3>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      Customer
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Book background-checked plumbers, electricians, carpenters, and appliance technicians.
                  </p>
                  <ul className="mt-2 text-[11px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-foreground" /> Upfront price estimates
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-foreground" /> Direct scheduling
                    </li>
                  </ul>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors"
              >
                Join as Customer <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>

            {/* Option 2: Provider */}
            <div
              onClick={handleSelectProvider}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg border-2 border-border hover:border-foreground bg-card hover:bg-muted/40 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base group-hover:text-foreground">
                      I offer a service
                    </h3>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      Provider
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Receive job requests from local homeowners, manage schedules, and get paid securely.
                  </p>
                  <ul className="mt-2 text-[11px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-foreground" /> Verified badge profile
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-foreground" /> Transparent requests
                    </li>
                  </ul>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors"
              >
                Join as Provider <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-foreground underline underline-offset-4 hover:text-primary font-medium"
              >
                Sign in with existing persona
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
