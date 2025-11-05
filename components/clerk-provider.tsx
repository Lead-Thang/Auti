"use client"

import { ClerkProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'
import type { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { ErrorLogger } from './error-logger'

export function Providers({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: '#4A3AFF', // Use the primary color from your theme
        },
      }}
      localization={{
        socialButtonsBlockButton: 'Continue with {{provider|titleize}}',
      }}
    >
      <ThemeProvider defaultTheme="system" storageKey="Autilance-theme">
        <ErrorLogger />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  )
}