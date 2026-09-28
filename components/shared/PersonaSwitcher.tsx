"use client"

import * as React from "react"
import { useAppStore } from "@/lib/store"
import { personas, Persona } from "@/lib/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, ChevronsUpDown, User, Wrench, ShieldAlert, Clock, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function PersonaSwitcher() {
  const currentPersona = useAppStore((state) => state.currentPersona)
  const setPersona = useAppStore((state) => state.setPersona)

  const getStatusBadge = (persona: Persona) => {
    if (persona.role === "customer") {
      return (
        <Badge variant="outline" className="text-[10px] uppercase font-mono px-1.5 py-0 h-4">
          Customer
        </Badge>
      )
    }

    switch (persona.verificationStatus) {
      case "approved":
        return (
          <Badge variant="default" className="text-[10px] uppercase font-mono px-1.5 py-0 h-4 bg-foreground text-background">
            <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="text-[10px] uppercase font-mono px-1.5 py-0 h-4">
            <Clock className="w-2.5 h-2.5 mr-0.5" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="text-[10px] uppercase font-mono px-1.5 py-0 h-4">
            <ShieldAlert className="w-2.5 h-2.5 mr-0.5" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <aside aria-label="Dev Persona Switcher" className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-dashed border-border bg-card/95 text-card-foreground pl-1.5 pr-3 py-1 text-xs shadow-lg backdrop-blur hover:bg-muted/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="h-6 w-6 border border-border">
              <AvatarImage src={currentPersona.avatar} alt={currentPersona.name} />
              <AvatarFallback className="text-[10px]">{getInitials(currentPersona.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="font-semibold leading-tight flex items-center gap-1.5">
                {currentPersona.name}
                {getStatusBadge(currentPersona)}
              </span>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              [DEV] Persona Switcher
            </span>
            <Link
              href={currentPersona.role === "customer" ? "/customer" : "/provider"}
              className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Open {currentPersona.role === "customer" ? "Customer" : "Provider"} View &rarr;
            </Link>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> Customer Personas
          </DropdownMenuLabel>
          {personas
            .filter((p) => p.role === "customer")
            .map((persona) => {
              const isSelected = persona.id === currentPersona.id
              return (
                <DropdownMenuItem
                  key={persona.id}
                  onClick={() => setPersona(persona)}
                  className="flex items-start gap-2.5 p-2 cursor-pointer focus:bg-muted"
                >
                  <Avatar className="h-7 w-7 mt-0.5 border border-border">
                    <AvatarImage src={persona.avatar} alt={persona.name} />
                    <AvatarFallback className="text-[10px]">{getInitials(persona.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{persona.name}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-foreground" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug mt-0.5">
                      {persona.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              )
            })}

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5" /> Provider Personas
          </DropdownMenuLabel>
          {personas
            .filter((p) => p.role === "provider")
            .map((persona) => {
              const isSelected = persona.id === currentPersona.id
              return (
                <DropdownMenuItem
                  key={persona.id}
                  onClick={() => setPersona(persona)}
                  className="flex items-start gap-2.5 p-2 cursor-pointer focus:bg-muted"
                >
                  <Avatar className="h-7 w-7 mt-0.5 border border-border">
                    <AvatarImage src={persona.avatar} alt={persona.name} />
                    <AvatarFallback className="text-[10px]">{getInitials(persona.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium">{persona.name}</span>
                        {getStatusBadge(persona)}
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-foreground" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug mt-0.5">
                      {persona.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}
