"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/firebase/auth-context"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, X, Info, LinkIcon } from "lucide-react"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { nanoid } from "nanoid"
import { motion } from "framer-motion"

/**
 * CreateLinkForm Component
 *
 * This component provides a form for users to create new secure links with
 * various protection options like password, expiration, max clicks, and invite-only access.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Callback function when link is successfully created
 * @param {Function} props.onCancel - Callback function when form is cancelled
 */
export default function CreateLinkForm({ onSuccess, onCancel }) {
  // Authentication and Firebase context
  const { user } = useAuth()
  const { app } = useFirebase()

  // Form state
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")

  // Security options state
  const [usePassword, setUsePassword] = useState(false)
  const [password, setPassword] = useState("")
  const [useExpiration, setUseExpiration] = useState(false)
  const [expirationDays, setExpirationDays] = useState(7)
  const [useMaxClicks, setUseMaxClicks] = useState(false)
  const [maxClicks, setMaxClicks] = useState(100)
  const [useInviteOnly, setUseInviteOnly] = useState(false)
  const [currentEmail, setCurrentEmail] = useState("")
  const [emailList, setEmailList] = useState([])
  const [baseUrl, setBaseUrl] = useState("")

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  }

  /**
   * Get the base URL of the application
   * This is used to create the full short URL
   */
  useEffect(() => {
    // Only set the baseUrl on the client side to avoid hydration issues
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol
      const host = window.location.host
      setBaseUrl(`${protocol}//${host}`)
    }
  }, [])

  /**
   * Handle turning on invite-only security
   * This will show a warning if other security features are enabled
   */
  useEffect(() => {
    if (useInviteOnly) {
      if (usePassword || useExpiration || useMaxClicks) {
        setWarning("Enabling invite-only access will disable all other security features. Continue?")
      }
    } else {
      setWarning("")
    }
  }, [useInviteOnly, usePassword, useExpiration, useMaxClicks])

  /**
   * Add an email to the allowed emails list
   */
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

  /**
   * Remove an email from the allowed emails list
   *
   * @param {string} email - The email to remove
   */
  const removeEmail = (email) => {
    setEmailList(emailList.filter((e) => e !== email))
  }

  /**
   * Handle disabling other security features when invite-only is enabled
   */
  const handleDisableOtherSecurities = () => {
    if (useInviteOnly) {
      setUsePassword(false)
      setPassword("")
      setUseExpiration(false)
      setUseMaxClicks(false)
      setWarning("")
    }
  }

  /**
   * Handle form submission to create a new secure link
   *
   * @param {React.FormEvent} e - The form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate form inputs
    if (!url) {
      setError("URL is required")
      return
    }

    // Simple URL validation
    try {
      new URL(url)
    } catch (err) {
      setError("Please enter a valid URL")
      return
    }

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

      // Generate a short ID for the link
      const shortId = nanoid(8)

      // Create the link document in Firestore
      const linkData = {
        userId: user.uid,
        originalUrl: url,
        title: title || url,
        shortId: shortId,
        fullShortUrl: `${baseUrl}/${shortId}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clickCount: 0,
        hasPassword: usePassword,
        password: usePassword ? password : null,
        expiresAt: expiresAt,
        maxClicks: useMaxClicks ? maxClicks : null,
        isInviteOnly: useInviteOnly,
        allowedEmails: useInviteOnly ? emailList : [],
        isDisabled: false,
        accessTokens: {},
      }

      await addDoc(collection(db, "links"), linkData)

      // Clear form fields
      setUrl("")
      setTitle("")
      setPassword("")
      setExpirationDays(7)
      setMaxClicks(100)
      setEmailList([])
      setCurrentEmail("")

      // Call onSuccess to notify parent component
      onSuccess()
    } catch (error) {
      console.error("Error creating link:", error)
      setError("Failed to create link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Warning Alert */}
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

      {/* URL and Title Inputs */}
      <div className="space-y-4 mb-6">
        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-purple-500" />
            URL to protect
          </Label>
          <Input
            id="url"
            type="text"
            placeholder="https://example.com/your-link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="border-purple-200 dark:border-purple-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </motion.div>

        <motion.div className="space-y-2" variants={itemVariants}>
          <Label htmlFor="title">Link title (optional)</Label>
          <Input
            id="title"
            type="text"
            placeholder="My Secure Link"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-purple-200 dark:border-purple-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </motion.div>
      </div>

      {/* Security Options Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="password" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4 bg-purple-100 dark:bg-purple-900/20">
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
            >
              Password
            </TabsTrigger>
            <TabsTrigger
              value="expiration"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
            >
              Expiration
            </TabsTrigger>
            <TabsTrigger value="clicks" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
              Max Clicks
            </TabsTrigger>
            <TabsTrigger value="invite" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
              Invite Only
            </TabsTrigger>
          </TabsList>

          {/* Password Protection Tab */}
          <TabsContent
            value="password"
            className="space-y-4 p-4 border rounded-md border-purple-100 dark:border-purple-900/50"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="usePassword"
                checked={usePassword}
                onCheckedChange={(checked) => setUsePassword(!!checked)}
                disabled={useInviteOnly}
                className="text-purple-600 border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="usePassword" className={useInviteOnly ? "text-muted-foreground" : ""}>
                Protect with password
                {useInviteOnly && " (disabled when invite-only is enabled)"}
              </Label>
            </div>

            {usePassword && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a secure password"
                  className="border-purple-200 dark:border-purple-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-muted-foreground">
                  Choose a strong password that's hard to guess but easy for your recipients to remember.
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Expiration Tab */}
          <TabsContent
            value="expiration"
            className="space-y-4 p-4 border rounded-md border-purple-100 dark:border-purple-900/50"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useExpiration"
                checked={useExpiration}
                onCheckedChange={(checked) => setUseExpiration(!!checked)}
                disabled={useInviteOnly}
                className="text-purple-600 border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="useExpiration" className={useInviteOnly ? "text-muted-foreground" : ""}>
                Set expiration time
                {useInviteOnly && " (disabled when invite-only is enabled)"}
              </Label>
            </div>

            {useExpiration && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <Label htmlFor="expirationDays">Expires after (days)</Label>
                <Input
                  id="expirationDays"
                  type="number"
                  min="1"
                  max="365"
                  value={expirationDays}
                  onChange={(e) => setExpirationDays(Number.parseInt(e.target.value))}
                  className="border-purple-200 dark:border-purple-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-muted-foreground">
                  The link will automatically expire after this many days. Maximum is 365 days.
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Max Clicks Tab */}
          <TabsContent
            value="clicks"
            className="space-y-4 p-4 border rounded-md border-purple-100 dark:border-purple-900/50"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useMaxClicks"
                checked={useMaxClicks}
                onCheckedChange={(checked) => setUseMaxClicks(!!checked)}
                disabled={useInviteOnly}
                className="text-purple-600 border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="useMaxClicks" className={useInviteOnly ? "text-muted-foreground" : ""}>
                Limit maximum clicks
                {useInviteOnly && " (disabled when invite-only is enabled)"}
              </Label>
            </div>

            {useMaxClicks && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <Label htmlFor="maxClicks">Maximum number of clicks</Label>
                <Input
                  id="maxClicks"
                  type="number"
                  min="1"
                  value={maxClicks}
                  onChange={(e) => setMaxClicks(Number.parseInt(e.target.value))}
                  className="border-purple-200 dark:border-purple-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-muted-foreground">
                  The link will become inactive after it has been clicked this many times.
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Invite Only Tab */}
          <TabsContent
            value="invite"
            className="space-y-4 p-4 border rounded-md border-purple-100 dark:border-purple-900/50"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useInviteOnly"
                checked={useInviteOnly}
                onCheckedChange={(checked) => setUseInviteOnly(!!checked)}
                className="text-purple-600 border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="useInviteOnly">
                Invite-only access
                {(usePassword || useExpiration || useMaxClicks) &&
                  !warning &&
                  " (will disable other security features)"}
              </Label>
            </div>

            {useInviteOnly && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    className="border-purple-200 dark:border-purple-900/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <Button type="button" onClick={addEmail} className="bg-purple-600 hover:bg-purple-700">
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Allowed emails</Label>
                  <div className="border rounded-md p-2 min-h-[100px] border-purple-200 dark:border-purple-900/50">
                    {emailList.length === 0 ? (
                      <p className="text-muted-foreground text-sm p-2">
                        No emails added yet. Add emails to restrict access.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {emailList.map((email) => (
                          <motion.div
                            key={email}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-md flex items-center text-sm"
                          >
                            {email}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 ml-1 text-purple-700 dark:text-purple-300 hover:text-red-500 dark:hover:text-red-400"
                              onClick={() => removeEmail(email)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only users with these email addresses will be able to access the link.
                  </p>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Form Actions */}
      <motion.div className="flex justify-end space-x-2" variants={itemVariants}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 border-0"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Secure Link"
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}

