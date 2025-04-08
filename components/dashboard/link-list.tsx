"use client"

import { useState } from "react"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertCircle, Copy, Trash2, Pencil, ExternalLink, Calendar, BarChart, Plus } from "lucide-react"
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore"
import EditLinkDialog from "@/components/dashboard/edit-link-dialog"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

/**
 * LinkList Component
 *
 * Displays a grid of link cards with options to copy, edit, delete, and toggle links.
 *
 * @param {Object} props - Component props
 * @param {Array} props.links - Array of link objects to display
 * @param {boolean} props.isLoading - Whether links are currently loading
 * @param {Function} props.onLinkUpdated - Callback function when a link is updated
 */
export default function LinkList({ links, isLoading, onLinkUpdated }) {
  // Firebase context
  const { app } = useFirebase()

  // Component state
  const [error, setError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState(null)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  }

  /**
   * Copy link URL to clipboard
   *
   * @param {string} text - The URL to copy
   */
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
      duration: 3000,
    })
  }

  /**
   * Toggle link enabled/disabled state
   *
   * @param {Object} link - The link to toggle
   */
  const toggleDisableLink = async (link) => {
    setError("")
    setIsDeleting(true)

    try {
      const db = getFirestore(app)
      await updateDoc(doc(db, "links", link.id), {
        isDisabled: !link.isDisabled,
      })
      onLinkUpdated()

      toast({
        title: link.isDisabled ? "Link enabled" : "Link disabled",
        description: link.isDisabled
          ? "Your link is now active and accessible."
          : "Your link is now disabled and cannot be accessed.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error toggling link:", error)
      setError("Failed to toggle link. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  /**
   * Open delete confirmation dialog
   *
   * @param {Object} link - The link to delete
   */
  const confirmDeleteLink = (link) => {
    setLinkToDelete(link)
    setDeleteDialogOpen(true)
  }

  /**
   * Cancel link deletion
   */
  const cancelDeleteLink = () => {
    setLinkToDelete(null)
    setDeleteDialogOpen(false)
  }

  /**
   * Delete a link permanently
   */
  const deleteLink = async () => {
    setError("")
    setIsDeleting(true)

    try {
      const db = getFirestore(app)
      await deleteDoc(doc(db, "links", linkToDelete.id))
      onLinkUpdated()

      toast({
        title: "Link deleted",
        description: "Your link has been permanently deleted.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error deleting link:", error)
      setError("Failed to delete link. Please try again.")
    } finally {
      setIsDeleting(false)
      setLinkToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  /**
   * Open edit link dialog
   *
   * @param {Object} link - The link to edit
   */
  const handleEditLink = (link) => {
    setSelectedLink(link)
    setOpenEditDialog(true)
  }

  /**
   * Format the expiration date in a human-readable format
   *
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatExpirationDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  /**
   * Check if a link is expired
   *
   * @param {Object} link - The link to check
   * @returns {boolean} Whether the link is expired
   */
  const isLinkExpired = (link) => {
    if (!link.expiresAt) return false
    const expiresAt = new Date(link.expiresAt)
    const now = new Date()
    return expiresAt <= now
  }

  /**
   * Check if a link has reached its maximum clicks
   *
   * @param {Object} link - The link to check
   * @returns {boolean} Whether the link has reached max clicks
   */
  const hasReachedMaxClicks = (link) => {
    return link.maxClicks && link.clickCount >= link.maxClicks
  }

  return (
    <>
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : links.length === 0 ? (
        <Alert className="bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-900/50">
          <AlertDescription className="flex flex-col items-center justify-center py-8">
            <div className="text-center mb-4">
              <p className="text-lg font-medium mb-2">No links found</p>
              <p className="text-muted-foreground">Create your first secure link to get started.</p>
            </div>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-purple-600 hover:bg-purple-700 mt-2"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Link
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {links.map((link) => (
            <motion.div key={link.id} variants={itemVariants}>
              <Card
                className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
                  link.isDisabled
                    ? "border-slate-200 dark:border-slate-800 opacity-75"
                    : isLinkExpired(link) || hasReachedMaxClicks(link)
                      ? "border-amber-200 dark:border-amber-900/50"
                      : "border-purple-200 dark:border-purple-900/50"
                }`}
              >
                <CardHeader
                  className={`pb-2 ${
                    link.isDisabled
                      ? "bg-slate-50 dark:bg-slate-900/50"
                      : isLinkExpired(link) || hasReachedMaxClicks(link)
                        ? "bg-amber-50 dark:bg-amber-900/10"
                        : "bg-purple-50 dark:bg-purple-900/10"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-1">{link.title}</CardTitle>
                      <CardDescription className="mt-1">
                        <a
                          href={link.fullShortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 flex items-center gap-1"
                        >
                          <span className="truncate max-w-[180px]">{link.fullShortUrl}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      {link.hasPassword && (
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full">
                          Password
                        </span>
                      )}
                      {link.isInviteOnly && (
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                          Invite
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Clicks:</span>
                      <span className="font-medium flex items-center gap-1">
                        <BarChart className="h-3.5 w-3.5 text-purple-500" />
                        {link.clickCount || 0}
                        {link.maxClicks && <span className="text-xs text-muted-foreground">/ {link.maxClicks}</span>}
                      </span>
                    </div>

                    {link.expiresAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expires:</span>
                        <span
                          className={`font-medium flex items-center gap-1 ${isLinkExpired(link) ? "text-red-500" : ""}`}
                        >
                          <Calendar className="h-3.5 w-3.5 text-purple-500" />
                          {isLinkExpired(link) ? "Expired" : formatExpirationDate(link.expiresAt)}
                        </span>
                      </div>
                    )}

                    {(isLinkExpired(link) || hasReachedMaxClicks(link)) && !link.isDisabled && (
                      <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                        {isLinkExpired(link)
                          ? "This link has expired and is no longer accessible."
                          : "This link has reached its maximum click limit."}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(link.fullShortUrl)}
                      className="text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditLink(link)}
                      className="text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDeleteLink(link)}
                      className="text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`link-${link.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      {link.isDisabled ? "Enable" : "Disable"}
                    </Label>
                    <Switch
                      id={`link-${link.id}`}
                      checked={!link.isDisabled}
                      onCheckedChange={() => toggleDisableLink(link)}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete your link.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={cancelDeleteLink}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isDeleting} onClick={deleteLink}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Link Dialog */}
      {selectedLink && (
        <EditLinkDialog
          link={selectedLink}
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          onSave={() => {
            setOpenEditDialog(false)
            setSelectedLink(null)
            onLinkUpdated()
          }}
        />
      )}
    </>
  )
}

