"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Lock, Clock, BarChart, Shield, ExternalLink } from "lucide-react"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function SecureLink({ link }) {
  const { app } = useFirebase()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (link.hasPassword && !password) {
      setError("Please enter the password")
      return
    }

    setIsLoading(true)

    try {
      // Check if password is correct
      if (link.hasPassword && password !== link.password) {
        setError("Incorrect password")
        setIsLoading(false)
        return
      }

      // Password is correct or not needed, redirect to the proxy route
      // Note: We don't increment click count here - it will be done in the redirect API
      window.location.href = `/api/redirect/${link.shortId}`
    } catch (error) {
      console.error("Error accessing link:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Format expiration date
  const formatExpirationDate = () => {
    if (!link.expiresAt) return null
    const expiresAt = new Date(link.expiresAt)
    return expiresAt.toLocaleDateString()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {link.hasPassword ? "Protected Link" : "Link Information"}
          </CardTitle>
          <CardDescription>
            {link.hasPassword
              ? "This link is protected with multiple security features"
              : "This link has the following restrictions"}
          </CardDescription>
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
              <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">{link.title || "Protected Link"}</h2>
            <p className="text-sm text-muted-foreground">This link has the following security features:</p>

            <div className="mt-4 space-y-2">
              {link.hasPassword && (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="h-4 w-4 text-purple-600" />
                  <span>Password Protected</span>
                </div>
              )}

              {link.expiresAt && (
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>Expires on {formatExpirationDate()}</span>
                </div>
              )}

              {link.maxClicks && (
                <div className="flex items-center justify-center gap-2">
                  <BarChart className="h-4 w-4 text-purple-600" />
                  <span>
                    Limited to {link.maxClicks} clicks (Current: {link.clickCount || 0})
                  </span>
                </div>
              )}
            </div>
          </div>

          {link.hasPassword ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required={link.hasPassword}
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Access Link"
                )}
              </Button>
            </form>
          ) : (
            <Button
              onClick={() => (window.location.href = `/api/redirect/${link.shortId}`)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Go to Destination
            </Button>
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

