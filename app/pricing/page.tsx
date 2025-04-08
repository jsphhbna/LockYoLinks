"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PricingPage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          LockYoLinks is completely free. We believe securing your content online should be accessible to everyone.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="overflow-hidden border-purple-200 dark:border-purple-900">
            <CardHeader className="bg-purple-600 text-white text-center py-8">
              <CardTitle className="text-3xl font-bold">Free Forever</CardTitle>
              <CardDescription className="text-purple-100 text-lg">All features included at no cost</CardDescription>
              <div className="mt-4 text-4xl font-bold">$0</div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Everything you need to secure your links:</h3>
                <ul className="space-y-3">
                  <FeatureItem text="Password protection for links" />
                  <FeatureItem text="Expiration time settings" />
                  <FeatureItem text="Maximum click limits" />
                  <FeatureItem text="Invite-only access via email" />
                  <FeatureItem text="Click tracking and analytics" />
                  <FeatureItem text="Custom access pages" />
                  <FeatureItem text="Link management dashboard" />
                  <FeatureItem text="Unlimited link creation" />
                  <FeatureItem text="Google account integration" />
                </ul>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-col items-center">
              <p className="text-center mb-4 text-muted-foreground">
                No credit card required. No hidden fees. Just create an account and start securing your links.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                  <Link href="/register">Get Started Now</Link>
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Why We're Free</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">Security Should Be Accessible</h3>
                <p className="text-muted-foreground flex-grow">
                  We believe that everyone should have access to tools that help them protect their content online,
                  regardless of budget.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">Community-Driven Project</h3>
                <p className="text-muted-foreground flex-grow">
                  LockYoLinks was created as a learning project and to serve the community. We're focused on providing
                  value rather than profit.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2">Future Sustainability</h3>
                <p className="text-muted-foreground flex-grow">
                  While we're committed to keeping core features free forever, we may introduce optional premium
                  features in the future to support ongoing development.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900 p-12 rounded-xl text-center space-y-6">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have more questions about our pricing? Check out our FAQ page or contact us directly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">View FAQ</Link>
          </Button>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ text }) {
  return (
    <li className="flex items-start">
      <div className="mr-2 mt-1">
        <Check className="h-5 w-5 text-green-500" />
      </div>
      <span>{text}</span>
    </li>
  )
}

