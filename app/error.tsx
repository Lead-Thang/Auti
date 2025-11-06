'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center p-8 bg-card rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-destructive">Oops!</h1>
        <p className="text-lg mb-4 text-muted-foreground">Something went wrong.</p>
        <p className="text-sm mb-6 text-muted-foreground break-words">
          {error.message || 'An unexpected error occurred'}
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