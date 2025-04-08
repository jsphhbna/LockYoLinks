"use client"

import { useState, useEffect } from "react"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertCircle, X, Info } from "lucide-react"
import { getFirestore, doc, updateDoc } from "firebase/firestore"

export default function EditLinkDialog({ link, open, onOpenChange, onSave }) {
  const { app } = useFirebase()
  const [title, setTitle] = useState(link.title || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")

  const [usePassword, setUsePassword] = useState(link.hasPassword || false)
  const [password, setPassword] = useState(link.password || "")

  const [useExpiration, setUseExpiration] = useState(!!link.expiresAt)
  const [expirationDays, setExpirationDays] = useState(7)

  const [useMaxClicks, setUseMaxClicks] = useState(!!link.maxClicks)
  const [maxClicks, setMaxClicks] = useState(link.maxClicks || 100)

  const [useInviteOnly, setUseInviteOnly] = useState(link.isInviteOnly || false)
  const [currentEmail, setCurrentEmail] = useState("")
  const [emailList, setEmailList] = useState(link.allowedEmails || [])

  // Calculate days remaining if expiration is set
  useEffect(() => {
    if (link.expiresAt) {
      const expiresAt = new Date(link.expiresAt)
      const now = new Date()
      const diffTime = expiresAt.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setExpirationDays(diffDays > 0 ? diffDays : 1)
    }
  }, [link.expiresAt])

  // Handle turning on invite-only security
  useEffect(() => {
    if (useInviteOnly) {
      if (usePassword || useExpiration || useMaxClicks) {
        setWarning("Enabling invite-only access will disable all other security features. Continue?")
      }
    } else {
      setWarning("")
    }
  }, [useInviteOnly, usePassword, useExpiration, useMaxClicks])

  const addEmail = () => {
    if (!currentEmail) return

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(currentEmail)) {
      setError("Please enter a valid email address")
      return
    }

    if (emailList.includes(currentEmail)) {
      setError("This email is already in the list")
      return
    }

    setEmailList([...emailList, currentEmail])
    setCurrentEmail("")
    setError("")
  }

  const removeEmail = (email) => {
    setEmailList(emailList.filter((e) => e !== email))
  }

  const handleDisableOtherSecurities = () => {
    if (useInviteOnly) {
      setUsePassword(false)
      setPassword("")
      setUseExpiration(false)
      setUseMaxClicks(false)
      setWarning("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (usePassword && !password) {
      setError("Password is required when password protection is enabled")
      return
    }

    setIsLoading(true)

    try {
      const db = getFirestore(app)

      // Calculate expiration date if enabled
      let expiresAt = null
      if (useExpiration) {
        const date = new Date()
        date.setDate(date.getDate() + expirationDays)
        expiresAt = date.toISOString()
      }

      // Update the link document
      const linkData = {
        title: title || link.originalUrl,
        updatedAt: new Date().toISOString(),
        hasPassword: usePassword,
        password: usePassword ? password : null,
        expiresAt: expiresAt,
        maxClicks: useMaxClicks ? maxClicks : null,
        isInviteOnly: useInviteOnly,
        allowedEmails: useInviteOnly ? emailList : [],
      }

      await updateDoc(doc(db, "links", link.id), linkData)

      onSave()
    } catch (error) {
      console.error("Error updating link:", error)
      setError("Failed to update link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>Update the settings for your secure link</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {warning && (
            <Alert className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertDescription className="flex justify-between items-center w-full">
                <span>{warning}</span>
                <Button type="button" size="sm" onClick={handleDisableOtherSecurities}>
                  Confirm
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="originalUrl">Original URL</Label>
              <Input
                id="originalUrl"
                type="text"
                value={link.originalUrl}
                disabled
                className="bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Link title</Label>
              <Input
                id="title"
                type="text"
                placeholder="My Secure Link"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="password" className="mb-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="expiration">Expiration</TabsTrigger>
              <TabsTrigger value="clicks">Max Clicks</TabsTrigger>
              <TabsTrigger value="invite">Invite Only</TabsTrigger>
            </TabsList>

            <TabsContent value="password" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usePassword"
                  checked={usePassword}
                  onCheckedChange={(checked) => setUsePassword(!!checked)}
                  disabled={useInviteOnly}
                />
                <Label htmlFor="usePassword" className={useInviteOnly ? "text-muted-foreground" : ""}>
                  Protect with password
                  {useInviteOnly && " (disabled when invite-only is enabled)"}
                </Label>
              </div>

              {usePassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a secure password"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="expiration" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useExpiration"
                  checked={useExpiration}
                  onCheckedChange={(checked) => setUseExpiration(!!checked)}
                  disabled={useInviteOnly}
                />
                <Label htmlFor="useExpiration" className={useInviteOnly ? "text-muted-foreground" : ""}>
                  Set expiration time
                  {useInviteOnly && " (disabled when invite-only is enabled)"}
                </Label>
              </div>

              {useExpiration && (
                <div className="space-y-2">
                  <Label htmlFor="expirationDays">Expires after (days)</Label>
                  <Input
                    id="expirationDays"
                    type="number"
                    min="1"
                    max="365"
                    value={expirationDays}
                    onChange={(e) => setExpirationDays(Number.parseInt(e.target.value))}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="clicks" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useMaxClicks"
                  checked={useMaxClicks}
                  onCheckedChange={(checked) => setUseMaxClicks(!!checked)}
                  disabled={useInviteOnly}
                />
                <Label htmlFor="useMaxClicks" className={useInviteOnly ? "text-muted-foreground" : ""}>
                  Limit maximum clicks
                  {useInviteOnly && " (disabled when invite-only is enabled)"}
                </Label>
              </div>

              {useMaxClicks && (
                <div className="space-y-2">
                  <Label htmlFor="maxClicks">Maximum number of clicks</Label>
                  <Input
                    id="maxClicks"
                    type="number"
                    min="1"
                    value={maxClicks}
                    onChange={(e) => setMaxClicks(Number.parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">Current clicks: {link.clickCount || 0}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="invite" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useInviteOnly"
                  checked={useInviteOnly}
                  onCheckedChange={(checked) => setUseInviteOnly(!!checked)}
                />
                <Label htmlFor="useInviteOnly">
                  Invite-only access
                  {(usePassword || useExpiration || useMaxClicks) &&
                    !warning &&
                    " (will disable other security features)"}
                </Label>
              </div>

              {useInviteOnly && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                    />
                    <Button type="button" onClick={addEmail}>
                      Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Allowed emails</Label>
                    <div className="border rounded-md p-2 min-h-[100px]">
                      {emailList.length === 0 ? (
                        <p className="text-muted-foreground text-sm p-2">
                          No emails added yet. Add emails to restrict access.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {emailList.map((email) => (
                            <div
                              key={email}
                              className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md flex items-center text-sm"
                            >
                              {email}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1"
                                onClick={() => removeEmail(email)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

