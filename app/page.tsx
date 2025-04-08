"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Clock, Users, BarChart, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"

/**
 * Home Page Component
 *
 * This is the main landing page of the application that showcases the key features
 * and provides entry points for users to sign up or learn more.
 */
export default function Home() {
  // Reference for the features section for scroll animation
  const featuresRef = useRef(null)

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  // Scroll to features section when the "Learn more" button is clicked
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-32 text-center bg-gradient-to-br from-purple-50 via-slate-50 to-purple-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-6 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full"
          >
            Secure Link Sharing Made Simple
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            Secure Your Links with
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 mt-2"
            >
              LockYoLinks
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Create and share links with advanced protection - passwords, expiration times, invite-only access, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shadow-lg shadow-purple-500/20"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 border-0 text-base px-8"
              >
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToFeatures}
                className="border-purple-300 dark:border-purple-700 text-base"
              >
                Learn More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="w-6 h-10 border-2 border-purple-400 dark:border-purple-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="w-1.5 h-3 bg-purple-500 dark:bg-purple-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Powerful Link Protection Features</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              LockYoLinks provides multiple layers of security to ensure your shared content remains protected and
              accessible only to intended recipients.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-purple-600" />}
              title="Password Protection"
              description="Secure your links with custom passwords that recipients must enter before accessing."
              variants={itemVariants}
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-purple-600" />}
              title="Expiration Times"
              description="Set links to automatically expire after a specific time period."
              variants={itemVariants}
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-600" />}
              title="Invite-Only Access"
              description="Restrict access to specific email addresses for maximum security."
              variants={itemVariants}
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-purple-600" />}
              title="Click Tracking"
              description="Monitor how many times your links have been accessed."
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-purple-50 dark:from-slate-950 dark:to-purple-950/20">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-16"
          >
            How LockYoLinks Works
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Connection line */}
            <div className="absolute top-24 left-1/2 h-[calc(100%-120px)] w-1 bg-gradient-to-b from-purple-500 to-purple-300 dark:from-purple-600 dark:to-purple-800 -translate-x-1/2 rounded-full hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Create Your Link"
                description="Sign up, paste your URL, and choose your protection settings."
                delay={0.1}
              />
              <StepCard
                number="2"
                title="Share Securely"
                description="Share your protected link with your intended recipients."
                delay={0.2}
              />
              <StepCard
                number="3"
                title="Monitor Access"
                description="Track who's accessing your links and manage settings anytime."
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-900 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Links?</h2>
            <p className="text-xl mb-10 text-purple-100 max-w-2xl mx-auto">
              Join thousands of users who trust LockYoLinks for secure link sharing.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-purple-700 hover:bg-purple-50 border-0 text-base px-8 shadow-xl"
              >
                <Link href="/register">Create Your Account</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/**
 * FeatureCard Component
 *
 * Displays a feature with an icon, title, and description.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - The icon to display
 * @param {string} props.title - The feature title
 * @param {string} props.description - The feature description
 * @param {Object} props.variants - The animation variants
 */
function FeatureCard({ icon, title, description, variants }) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg shadow-purple-100 dark:shadow-none border border-purple-100 dark:border-purple-900/50 transition-all duration-300"
    >
      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  )
}

/**
 * StepCard Component
 *
 * Displays a step in the process with a number, title, and description.
 *
 * @param {Object} props - Component props
 * @param {string} props.number - The step number
 * @param {string} props.title - The step title
 * @param {string} props.description - The step description
 * @param {number} props.delay - The animation delay
 */
function StepCard({ number, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6 relative z-10"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white font-bold text-xl mb-6 shadow-lg shadow-purple-300 dark:shadow-purple-900/30"
      >
        {number}
      </motion.div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg shadow-purple-100 dark:shadow-none border border-purple-100 dark:border-purple-900/50 w-full">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </motion.div>
  )
}

