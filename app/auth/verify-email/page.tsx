"use client";

import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MailCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Suspense } from "react";

// Component that uses useSearchParams - needs to be separate to wrap in Suspense
function VerifyEmailContent() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [verifyingComplete, setVerifyingComplete] = useState(false);

  // Check if we're coming back from email verification link
  useEffect(() => {
    const attemptAutoVerify = async () => {
      if (!isLoaded || !signUp) return;

      const codeParam = searchParams.get("code");
      if (codeParam) {
        setCode(codeParam);
        await verifyCode(codeParam);
      }
    };

    attemptAutoVerify();
  }, [isLoaded, signUp, searchParams]);

  const verifyCode = async (codeToSubmit: string) => {
    if (!isLoaded || !signUp) {
      setError("Authentication system is not loaded yet. Please try again.");
      return;
    }

    setVerifying(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: codeToSubmit,
      });

      if (result.status === "complete") {
        // Set the session active to log the user in
        await setActive({ session: result.createdSessionId });
        // Redirect to the dashboard or wherever you want
        router.push("/dashboard");
      } else {
        console.error("Verification result:", result);
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      let errorMessage = "Verification failed. Please try again.";
      
      if (err.errors && err.errors.length > 0) {
        errorMessage = err.errors[0].message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setVerifying(false);
      setVerifyingComplete(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyCode(code);
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) {
      setError("Authentication system is not loaded yet. Please try again.");
      return;
    }

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setError("Verification code resent successfully!");
    } catch (err: any) {
      console.error("Resend error:", err);
      let errorMessage = "Failed to resend verification code. Please try again.";
      
      if (err.errors && err.errors.length > 0) {
        errorMessage = err.errors[0].message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification code to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={verifying}
                required
                className="text-lg text-center tracking-widest uppercase"
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={verifying || code.length !== 6}
              className="w-full bg-gradient-primary hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {verifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Didn't receive the code?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary hover:underline"
                onClick={handleResendCode}
                type="button"
                disabled={verifying}
              >
                Resend
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}