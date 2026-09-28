"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { personas } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wrench, UserCheck, ArrowRight, Home } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const setPersona = useAppStore((state) => state.setPersona)

  const handleLoginAsCustomer = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const maria = personas.find((p) => p.id === "maria-santos") || personas[0]
    setPersona(maria)
    router.push("/customer")
  }

  const handleLoginAsProvider = () => {
    const juan = personas.find((p) => p.id === "juan-dela-cruz") || personas[2]
    setPersona(juan)
    router.push("/provider")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 bg-muted/40">
      <div className="flex w-full max-w-sm flex-col gap-6">
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

        <div className="flex flex-col gap-6">
          <Card className="shadow-lg border-border">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background mb-2">
                <Wrench className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl font-bold tracking-tight">
                ServiceLink Sign In
              </CardTitle>
              <CardDescription>
                Cosmetic prototype login — select a persona to jump in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* Direct Persona Quick-Login Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    className="w-full justify-between"
                    onClick={handleLoginAsCustomer}
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Sign in as Customer
                    </span>
                    <span className="text-xs opacity-75 flex items-center">
                      Maria Santos <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                    onClick={handleLoginAsProvider}
                  >
                    <span className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Sign in as Provider
                    </span>
                    <span className="text-xs opacity-75 flex items-center">
                      Juan Dela Cruz <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </Button>
                </div>

                <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-2">
                  <span className="relative z-10 bg-card px-2 text-muted-foreground font-mono">
                    Or mock email login
                  </span>
                </div>

                <form onSubmit={handleLoginAsCustomer} className="grid gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="maria.santos@example.com"
                      defaultValue="maria.santos@example.com"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs">
                        Password
                      </Label>
                      <span className="text-[11px] text-muted-foreground">
                        Any mock password
                      </span>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      defaultValue="password123"
                    />
                  </div>
                  <Button type="submit" variant="secondary" className="w-full mt-1">
                    Continue to Dashboard
                  </Button>
                </form>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  Need a new account?{" "}
                  <Link
                    href="/signup"
                    className="text-foreground underline underline-offset-4 hover:text-primary font-medium"
                  >
                    Sign up / Choose role
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
