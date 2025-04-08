import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function CreatorPage() {
  return (
    <div className="container py-12 space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">About the Creator</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Meet Joseph Habana, the mind behind LockYoLinks
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 p-8 rounded-xl flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-purple-300 dark:bg-purple-700 flex items-center justify-center">
            <span className="text-6xl font-bold text-purple-600 dark:text-purple-300">JH</span>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Joseph Habana</h2>
          <p className="text-lg">19 years old, passionate about technology and building useful tools.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/jsphhbna" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">My Journey</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="text-lg">
              I'm Joseph Habana, 19 years old. I have a hard time learning programming, but I understand the logic.
            </p>
            <p className="text-lg">
              I use vibe coding — instructing AI to build projects, then polishing the results. It's not always secure
              by default, but with proper care and knowledge, you can build beautiful, functional, and secure apps even
              as a beginner.
            </p>
            <p className="text-lg">
              LockYoLinks is a project that combines my interest in security with my desire to create useful tools that
              solve real problems. I believe that everyone should have access to tools that help them protect their
              content online.
            </p>
            <p className="text-lg">
              Through this project, I've learned a lot about web development, security practices, and building
              user-friendly interfaces. I hope you find LockYoLinks useful!
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">My Approach to Development</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 space-y-4 h-full">
              <h3 className="text-xl font-semibold">Vibe Coding</h3>
              <p>
                I use AI as a collaborative tool to help me build projects faster. This allows me to focus on the
                creative aspects and user experience while leveraging AI for implementation details.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4 h-full">
              <h3 className="text-xl font-semibold">Security First</h3>
              <p>
                I believe that security should never be an afterthought. Even as a beginner, I prioritize learning about
                security best practices and implementing them in my projects.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4 h-full">
              <h3 className="text-xl font-semibold">User-Centered Design</h3>
              <p>
                I focus on creating intuitive, accessible interfaces that make complex security features easy to use for
                everyone, regardless of their technical background.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900 p-12 rounded-xl text-center space-y-6">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, feedback, or just want to say hello? I'd love to hear from you!
        </p>
        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/contact">
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Link>
        </Button>
      </section>
    </div>
  )
}

