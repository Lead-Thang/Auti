"use client"

import type React from "react"
import { Toaster } from "../components/ui/toaster"
import { Providers } from "@/components/clerk-provider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-background text-foreground">{children}</div>
      <Toaster />
    </Providers>
  )
}