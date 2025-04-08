import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Clock, Users, BarChart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">About LockYoLinks</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          LockYoLinks is a modern, secure platform for sharing links with advanced protection features.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            We believe in a web where sharing links doesn't mean compromising security. Our mission is to provide
            powerful yet simple tools that give you complete control over who can access your shared content and when.
          </p>
          <p className="text-lg text-muted-foreground">
            Whether you're sharing sensitive documents, exclusive content, or just want to limit access to your links,
            LockYoLinks gives you the tools to do it with confidence.
          </p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900/20 p-8 rounded-xl">
          <Shield className="w-24 h-24 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-center mb-4">Security First</h3>
          <p className="text-center text-muted-foreground">
            Every feature we build starts with security in mind. We use industry-standard encryption and best practices
            to ensure your links stay protected.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Lock className="h-10 w-10 text-purple-600" />}
            title="Password Protection"
            description="Secure your links with custom passwords that recipients must enter before accessing."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-purple-600" />}
            title="Expiration Times"
            description="Set links to automatically expire after a specific time period."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-600" />}
            title="Invite-Only Access"
            description="Restrict access to specific email addresses for maximum security."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10 text-purple-600" />}
            title="Click Tracking"
            description="Monitor how many times your links have been accessed."
          />
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900 p-12 rounded-xl text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to secure your links?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who trust LockYoLinks for secure link sharing.
        </p>
        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/register">Get Started</Link>
        </Button>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FaqItem
            question="Is LockYoLinks free to use?"
            answer="Yes, LockYoLinks offers a free tier with basic link protection features. Premium plans with advanced features are also available."
          />
          <FaqItem
            question="How secure are the passwords?"
            answer="We use industry-standard encryption to secure your passwords. They are never stored in plain text."
          />
          <FaqItem
            question="Can I track who accessed my links?"
            answer="Yes, LockYoLinks provides detailed analytics on who accessed your links, when, and how many times."
          />
          <FaqItem
            question="What happens when a link expires?"
            answer="When a link expires, visitors will see a custom expiration page informing them that the link is no longer available."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm">
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

function FaqItem({ question, answer }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

