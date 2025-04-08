"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Lock } from "lucide-react"
import { motion } from "framer-motion"

/**
 * DashboardStats Component
 *
 * Displays key statistics about the user's links in card format.
 * Shows total links, active links, total clicks, and protected links.
 *
 * @param {Object} props - Component props
 * @param {Array} props.links - Array of link objects to calculate stats from
 */
export default function DashboardStats({ links }) {
  // Calculate stats
  const totalLinks = links.length

  const activeLinks = links.filter((link) => {
    const now = new Date()
    const expiresAt = link.expiresAt ? new Date(link.expiresAt) : null
    return !link.isDisabled && (!expiresAt || expiresAt > now)
  }).length

  const totalClicks = links.reduce((sum, link) => sum + (link.clickCount || 0), 0)

  const protectedLinks = links.filter(
    (link) => link.hasPassword || link.isInviteOnly || link.maxClicks || link.expiresAt,
  ).length

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      <motion.div variants={cardVariants}>
        <Card className="border-purple-200 dark:border-purple-900/50 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-purple-50 dark:bg-purple-900/10">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <BarChart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalLinks}</div>
            <p className="text-xs text-muted-foreground mt-1">{activeLinks} active</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="border-purple-200 dark:border-purple-900/50 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-purple-50 dark:bg-purple-900/10">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0} avg. per link
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="border-purple-200 dark:border-purple-900/50 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-purple-50 dark:bg-purple-900/10">
            <CardTitle className="text-sm font-medium">Protected Links</CardTitle>
            <Lock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{protectedLinks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalLinks > 0 ? Math.round((protectedLinks / totalLinks) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}

