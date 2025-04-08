"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Users, LogIn, ExternalLink } from "lucide-react"
import { useAuth } from "@/lib/firebase/auth-context"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function InviteOnlyAccess({ link }) {
  const router = useRouter()
  const { user } = useAuth()
  const { app } = useFirebase()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    // Check if user is logged in and their email is in the allowed list
    const checkAccess = async () => {
      setIsChecking(true)

      if (user && user.email) {
        const allowedEmails = link.allowedEmails || []

        if (allowedEmails.includes(user.email)) {
          setHasAccess(true)
        } else {
          setError("Your email is not authorized to access this link")
        }
      }

      setIsChecking(false)
    }

    checkAccess()
  }, [user, link])

  const handleAccessLink = async () => {
    setIsLoading(true)

    try {
      // Redirect to the proxy route - click count will be updated there
      window.location.href = `/api/redirect/${link.shortId}`
    } catch (error) {
      console.error("Error accessing link:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
        <p>Checking access...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Invite Only Access</CardTitle>
          <CardDescription>This link is restricted to specific email addresses</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
              <Users className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">{link.title || "Invite Only Link"}</h2>
            <p className="text-sm text-muted-foreground">
              {hasAccess ? "You have access to this link" : "This link is only accessible to invited email addresses"}
            </p>
          </div>

          {!user ? (
            <div className="text-center">
              <p className="mb-4">You need to be logged in to access this link.</p>
              <Button
                onClick={() => router.push(`/login?redirect=${encodeURIComponent(`/${link.shortId}`)}`)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </div>
          ) : hasAccess ? (
            <Button
              onClick={handleAccessLink}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accessing...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Go to Destination
                </>
              )}
            </Button>
          ) : (
            <Alert>
              <AlertDescription>Your email ({user.email}) is not on the invite list for this link.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Shared by {link.username || "a LockYoLinks user"}
            {link.country && ` from ${link.country}`}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

