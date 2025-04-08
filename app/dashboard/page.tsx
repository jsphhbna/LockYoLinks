"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/firebase/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Plus, LinkIcon } from "lucide-react"
import LinkList from "@/components/dashboard/link-list"
import CreateLinkForm from "@/components/dashboard/create-link-form"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { motion } from "framer-motion"

/**
 * Dashboard Page Component
 *
 * This is the main dashboard page where users can manage their secure links.
 * It displays statistics, allows creating new links, and shows a list of existing links.
 */
export default function DashboardPage() {
  // Authentication and routing
  const { user, loading } = useAuth()
  const { app } = useFirebase()
  const router = useRouter()

  // Component state
  const [links, setLinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Animation variants
  const containerVariants = {
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
   * Redirect to login if user is not authenticated
   */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  /**
   * Fetch user's links from Firestore
   */
  const fetchLinks = async () => {
    if (!user || !app) return

    try {
      setIsLoading(true)
      const db = getFirestore(app)
      const linksRef = collection(db, "links")
      const q = query(linksRef, where("userId", "==", user.uid))
      const querySnapshot = await getDocs(q)

      const fetchedLinks = []
      querySnapshot.forEach((doc) => {
        fetchedLinks.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      // Sort links by creation date (newest first)
      fetchedLinks.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setLinks(fetchedLinks)
    } catch (error) {
      console.error("Error fetching links:", error)
      setError("Failed to load your links. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch links when component mounts or user changes
  useEffect(() => {
    fetchLinks()
  }, [user, app])

  // Show loading spinner while authentication is in progress
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        {/* Dashboard Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-purple-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30"
        >
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your secure links and track their performance</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 border-0 shadow-md shadow-purple-200 dark:shadow-purple-900/20"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Link
          </Button>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div variants={itemVariants}>
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Create Link Form */}
        {showCreateForm && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="mb-8 border-purple-200 dark:border-purple-900/50 shadow-md shadow-purple-100 dark:shadow-none overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-purple-100 dark:border-purple-900/30">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-purple-500" />
                  <CardTitle>Create New Secure Link</CardTitle>
                </div>
                <CardDescription>Add a new link with custom protection settings</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <CreateLinkForm
                  onSuccess={() => {
                    setShowCreateForm(false)
                    fetchLinks() // Refresh links after successful creation
                  }}
                  onCancel={() => setShowCreateForm(false)}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Links Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-purple-100 dark:bg-purple-900/20 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
              >
                All Links
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="disabled"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
              >
                Disabled
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <DashboardStats links={links} />
              </div>
              <LinkList
                links={links}
                isLoading={isLoading}
                onLinkUpdated={() => {
                  fetchLinks() // Refresh links after updates
                }}
              />
            </TabsContent>

            <TabsContent value="active">
              <LinkList
                links={links.filter((link) => {
                  const now = new Date()
                  const expiresAt = link.expiresAt ? new Date(link.expiresAt) : null
                  return (!expiresAt || expiresAt > now) && !link.isDisabled
                })}
                isLoading={isLoading}
                onLinkUpdated={() => {
                  fetchLinks() // Refresh links after updates
                }}
              />
            </TabsContent>

            <TabsContent value="disabled">
              <LinkList
                links={links.filter((link) => link.isDisabled)}
                isLoading={isLoading}
                onLinkUpdated={() => {
                  fetchLinks() // Refresh links after updates
                }}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

