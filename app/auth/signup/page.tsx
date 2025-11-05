"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Mail, Lock, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"; // 引入 Image 组件
import { Eye, EyeOff } from "lucide-react"; // 引入眼睛图标
import { useSignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { isLoaded, signUp } = useSignUp(); // Move this to the top
  const router = useRouter()

  // Check for error in URL query parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlError = urlParams.get('error')
    
    if (urlError === 'oauth_error') {
      setError("There was an issue with your OAuth sign-in. Please try again.")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      setIsLoading(false)
      return
    }

    // For Clerk, we'll handle email/password sign-up using the signUp instance
    try {
      if (!isLoaded) {
        setError("Authentication system is not loaded yet. Please try again.");
        setIsLoading(false);
        return;
      }

      // Start the sign-up process with Clerk
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(' ')[0], // Using first part of name as first name
        lastName: name.split(' ').slice(1).join(' ') || undefined, // Rest as last name if exists
      });

      // Handle different sign-up statuses
      if (result.status === 'complete') {
        // If sign-up is complete, the user might be automatically signed in
        router.push('/dashboard');
      } else if (result.status === 'missing_requirements') {
        // Handle missing requirements - check what's needed
        if (result.verifications) {
          // Prepare to verify the email if required
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          // Redirect to verification page
          router.push("/auth/verify-email");
        }
      } else if (result.verifications) {
        // Prepare to verify the email if required
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        // Redirect to verification page
        router.push("/auth/verify-email");
      } else {
        // For other statuses, try to prepare verification anyway as fallback
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        // Redirect to verification page
        router.push("/auth/verify-email");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "Account creation failed. Please try again.";
      
      if (error.errors && error.errors.length > 0) {
        const clerkError = error.errors[0];
        if (clerkError.code === 'form_password_incorrect') {
          errorMessage = "Password does not meet requirements.";
        } else if (clerkError.code === 'form_identifier_exists') {
          errorMessage = "An account with this email already exists. Please sign in instead.";
        } else if (clerkError.code === 'verification_failed') {
          errorMessage = "Verification setup failed. Please try again.";
        } else if (clerkError.code === 'verification_not_found') {
          errorMessage = "Verification not found. Please try creating your account again.";
        } else if (clerkError.code === 'verification_max_attempts_reached') {
          errorMessage = "Too many verification attempts. Please try again later.";
        } else {
          errorMessage = clerkError.message || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

const handleGoogleSignUp = async () => {
  if (!isLoaded) {
    setError("Authentication system is not loaded yet. Please try again.");
    return;
  }

  setIsLoading(true);
  setError(""); // Clear any previous errors

  try {
    // Check if user is already signed in
    if (signUp.status === 'complete') {
      // User is already signed in, redirect to dashboard
      router.push('/dashboard');
      return;
    }

    // Start the OAuth flow with Google
    await signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/auth/sso-callback',
      redirectUrlComplete: '/dashboard', // or wherever you want to redirect after signup
    });
  } catch (error: any) {
    // Handle the specific "already signed in" error
    if (error.errors && error.errors.length > 0) {
      const clerkError = error.errors[0];
      if (clerkError.code === 'session_exists') {
        // User is already signed in, redirect to dashboard
        router.push('/dashboard');
        return;
      }
      setError(clerkError.message || "Failed to sign up with Google. Please try again.");
    } else {
      // Log the error for debugging
      console.error("Google OAuth signup failed:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });

      // Set user-facing error message
      setError("Failed to sign up with Google. Please check your connection and try again.");
    }
  } finally {
    setIsLoading(false);
  }
}

  const [showPassword, setShowPassword] = useState(false); // 新增状态管理

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Image src="/logo.png" alt="Autilance Logo" width={40} height={40} className="rounded-xl" /> {/* 添加 logo.png */}
            <span className="text-2xl font-bold text-gradient-primary">Autilance</span>
          </div>
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join thousands of learners and professionals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            variant="outline"
            className="w-full border-border/50 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 bg-transparent"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 focus-visible-ring"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 focus-visible-ring"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // 根据状态切换 type
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 focus-visible-ring"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"
                  onClick={togglePasswordVisibility} // 添加点击事件
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"} // 根据状态切换 type
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 focus-visible-ring"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"
                  onClick={togglePasswordVisibility} // 添加点击事件
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/signin" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Clerk CAPTCHA widget container - required for Smart CAPTCHA */}
      <div id="clerk-captcha" style={{ display: 'none' }}></div>
    </div>
  )
}
