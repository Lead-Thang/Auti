'use client'

import { useEffect, useMemo } from 'react'

// Simple hash function for generating error digest
function generateErrorDigest(message: string, stack?: string): string {
  const content = `${message}${stack || ''}`
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).toUpperCase().slice(0, 8)
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const errorDigest = useMemo(() => {
    return generateErrorDigest(error.message, error.stack)
  }, [error.message, error.stack])

  useEffect(() => {
    // Send full error details to logging/monitoring backend
    console.error('Error occurred:', {
      message: error.message,
      stack: error.stack,
      digest: errorDigest,
      timestamp: new Date().toISOString()
    })
  }, [error, errorDigest])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center p-8 bg-card rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-destructive">Oops!</h1>
        <p className="text-lg mb-4 text-muted-foreground">Something went wrong.</p>
        <p className="text-sm mb-6 text-muted-foreground break-words">
          An unexpected error occurred. Error ID: {errorDigest}
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}