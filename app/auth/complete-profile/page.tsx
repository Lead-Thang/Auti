"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, AtSign } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { useUser } from "@clerk/nextjs";

export default function CompleteProfilePage() {
  const [displayName, setDisplayName] = useState("")
  const [userHandle, setUserHandle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter()

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/auth/signup");
      return;
    }

    // Check if user profile is already completed
    // You can customize this check based on your needs
    // For example, checking if firstName/lastName are filled in Clerk user
    if (user?.unsafeMetadata?.displayName) {
      router.push("/dashboard");
    } else {
      // Set initial display name from Clerk user if available
      if (user?.firstName && user?.lastName) {
        setDisplayName(`${user.firstName} ${user.lastName}`);
      } else if (user?.firstName) {
        setDisplayName(user.firstName);
      } else if (user?.lastName) {
        setDisplayName(user.lastName);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!isSignedIn || !user) {
        setError("Authentication error. Please try signing in again.")
        setIsLoading(false)
        return
      }

      // Update user profile in Clerk
      await user.update({
        firstName: displayName.split(' ')[0],
        lastName: displayName.split(' ').slice(1).join(' ') || undefined,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          displayName: displayName,
          handle: userHandle ? `@${userHandle.replaceAll('@', '')}` : null
        }
      });

      router.push("/dashboard")
    } catch (err: any) {
      console.error("Profile completion error:", err)
      setError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Checking authentication...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Image src="/logo.png" alt="Autilance Logo" width={40} height={40} className="rounded-xl" />
            <span className="text-2xl font-bold text-gradient-primary">Autilance</span>
          </div>
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>Let's get to know you better</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  placeholder="How should we call you?"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userHandle">Handle</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="userHandle"
                  placeholder="@yourhandle"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Continue to Dashboard"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            You can update this information later in your profile settings
          </div>
        </CardContent>
      </Card>
    </div>
  )
}