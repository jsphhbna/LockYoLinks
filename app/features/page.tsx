"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lock, Clock, Users, BarChart, Shield, Eye, Fingerprint, Gauge } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturesPage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover all the powerful features that make LockYoLinks the best choice for secure link sharing
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Core Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Lock className="h-12 w-12 text-purple-600" />}
            title="Password Protection"
            description="Secure your links with custom passwords. Only users with the correct password can access your content, adding an essential layer of security."
          />
          <FeatureCard
            icon={<Clock className="h-12 w-12 text-purple-600" />}
            title="Expiration Times"
            description="Set links to automatically expire after a specific time period. Perfect for time-sensitive content or limited-time offers."
          />
          <FeatureCard
            icon={<Users className="h-12 w-12 text-purple-600" />}
            title="Invite-Only Access"
            description="Restrict access to specific email addresses. Only invited users can view your content, ensuring maximum privacy and control."
          />
          <FeatureCard
            icon={<BarChart className="h-12 w-12 text-purple-600" />}
            title="Click Tracking & Limits"
            description="Monitor how many times your links have been accessed and set maximum click limits to control the reach of your content."
          />
        </div>
      </section>

      <section className="space-y-8 bg-slate-50 dark:bg-slate-900 p-12 rounded-xl">
        <h2 className="text-3xl font-bold text-center">Advanced Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Shield className="h-12 w-12 text-purple-600" />}
            title="Custom Access Pages"
            description="Personalized pages for different link states: password input, expired links, maximum clicks reached, and more."
          />
          <FeatureCard
            icon={<Eye className="h-12 w-12 text-purple-600" />}
            title="Link Management Dashboard"
            description="Comprehensive dashboard to create, edit, and monitor all your secure links in one place."
          />
          <FeatureCard
            icon={<Fingerprint className="h-12 w-12 text-purple-600" />}
            title="User Authentication"
            description="Secure account creation with email/password or Google login to keep all your links organized."
          />
          <FeatureCard
            icon={<Gauge className="h-12 w-12 text-purple-600" />}
            title="Performance Analytics"
            description="Track link performance with detailed analytics on clicks, access patterns, and user engagement."
          />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-purple-200 dark:bg-purple-900/30 z-0"></div>
          <div className="relative z-10 space-y-12">
            <TimelineItem
              number="1"
              title="Create Your Account"
              description="Sign up for LockYoLinks using your email or Google account to get started."
            />
            <TimelineItem
              number="2"
              title="Add Your Link"
              description="Enter the URL you want to protect and give it a memorable title."
            />
            <TimelineItem
              number="3"
              title="Choose Protection Settings"
              description="Select from password protection, expiration dates, click limits, or invite-only access."
            />
            <TimelineItem
              number="4"
              title="Share Securely"
              description="Share your protected link with your intended recipients along with any necessary access information."
            />
            <TimelineItem
              number="5"
              title="Monitor Access"
              description="Track who's accessing your links and manage settings anytime from your dashboard."
            />
          </div>
        </div>
      </section>

      <section className="bg-purple-600 text-white p-12 rounded-xl text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Secure Your Links?</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Join thousands of users who trust LockYoLinks for secure link sharing.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-md bg-white text-purple-600 px-8 py-3 text-lg font-medium shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            Get Started for Free
          </a>
        </motion.div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TimelineItem({ number, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex"
    >
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-lg z-10">
          {number}
        </div>
        <div className="h-full w-0.5 bg-transparent"></div>
      </div>
      <div className="pt-1 pb-8">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </motion.div>
  )
}

