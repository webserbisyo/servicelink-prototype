"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppStore } from "@/lib/store"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Compass,
  CalendarCheck,
  User,
  Wrench,
  ArrowRightLeft,
} from "lucide-react"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentPersona = useAppStore((state) => state.currentPersona)

  const navItems = [
    {
      title: "Browse",
      url: "/customer",
      icon: Compass,
      isActive: pathname === "/customer",
    },
    {
      title: "My Bookings",
      url: "/customer#bookings",
      icon: CalendarCheck,
      isActive: false,
    },
    {
      title: "Profile",
      url: "/customer#profile",
      icon: User,
      isActive: false,
    },
  ]

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border">
        {/* Sidebar Header */}
        <SidebarHeader className="border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
              <Wrench className="h-5 w-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm leading-tight truncate">ServiceLink</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Customer Portal
              </span>
            </div>
          </div>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                      className="gap-3"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer with Current Persona */}
        <SidebarFooter className="border-t border-border p-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/40">
            <Avatar className="h-8 w-8 border border-border shrink-0">
              <AvatarImage src={currentPersona.avatar} alt={currentPersona.name} />
              <AvatarFallback className="text-xs">{getInitials(currentPersona.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs truncate leading-tight">
                  {currentPersona.name}
                </span>
                <Badge variant="outline" className="text-[9px] uppercase px-1 py-0 h-3.5 font-mono">
                  {currentPersona.role}
                </Badge>
              </div>
              <span className="text-[11px] text-muted-foreground truncate leading-tight">
                {currentPersona.email}
              </span>
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {/* Top Header / Breadcrumb Bar */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-xs">
                  ServiceLink
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/customer" className="text-xs">
                  Customer
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs font-semibold">
                  Browse
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/provider"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border px-2.5 py-1 rounded-md bg-muted/20 transition-colors"
            >
              <ArrowRightLeft className="h-3 w-3" />
              Switch to Provider Portal
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 bg-muted/10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
