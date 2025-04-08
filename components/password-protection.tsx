"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Lock } from "lucide-react"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function PasswordProtection({ link }) {
  const { app } = useFirebase()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!password) {
      setError("Please enter the password")
      return
    }

    setIsLoading(true)

    try {
      // Check if password is correct
      if (password !== link.password) {
        setError("Incorrect password")
        setIsLoading(false)
        return
      }

      // Password is correct, redirect to the proxy route
      // Note: We don't increment click count here - it will be done in the redirect API
      window.location.href = `/api/redirect/${link.shortId}`
    } catch (error) {
      console.error("Error verifying password:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Password Protected</CardTitle>
          <CardDescription>This link is protected with a password</CardDescription>
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
              <Lock className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">{link.title || "Protected Link"}</h2>
            <p className="text-sm text-muted-foreground">Please enter the password to access this link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
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

