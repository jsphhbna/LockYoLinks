"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/firebase/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Mail, CheckCircle } from "lucide-react"
import { sendEmailVerification } from "firebase/auth"
import { getAuth } from "firebase/auth"

export default function VerifyEmailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!loading && !user) {
      router.push("/login")
      return
    }

    // If user is logged in and email is verified, redirect to dashboard
    if (user?.emailVerified) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    // Countdown timer for resending verification email
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const sendVerificationEmail = async () => {
    setError("")
    setSuccess("")
    setIsSending(true)

    try {
      const auth = getAuth()
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser)
        setSuccess("Verification email sent! Please check your inbox and spam folder.")
        setCountdown(60) // Set countdown to 60 seconds
      } else {
        throw new Error("No user is currently signed in")
      }
    } catch (error) {
      console.error("Error sending verification email:", error)
      setError(error.message || "Failed to send verification email. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const checkVerification = async () => {
    try {
      const auth = getAuth()
      if (auth.currentUser) {
        // Reload the user to get the latest emailVerified status
        await auth.currentUser.reload()
        if (auth.currentUser.emailVerified) {
          router.push("/dashboard")
        } else {
          setError("Your email is not verified yet. Please check your inbox and click the verification link.")
        }
      }
    } catch (error) {
      console.error("Error checking verification:", error)
      setError(error.message || "Failed to check verification status. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>Please verify your email address to access all features of LockYoLinks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-300">{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
              <Mail className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-center">
              We've sent a verification email to <strong>{user?.email}</strong>. Please check your inbox and click the
              verification link to continue.
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={checkVerification} className="w-full bg-purple-600 hover:bg-purple-700">
              I've Verified My Email
            </Button>

            <Button
              onClick={sendVerificationEmail}
              variant="outline"
              className="w-full"
              disabled={isSending || countdown > 0}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend Email (${countdown}s)`
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">Need help? Contact our support team.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

