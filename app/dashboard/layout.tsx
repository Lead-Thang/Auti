"use client"

import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/clerk-provider"
import { SiteHeader } from "@/components/site-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-background text-foreground">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-hidden">
            <SiteHeader />
            {children}
          </main>
        </SidebarProvider>
      </div>
      <Toaster />
    </Providers>
  )
}