"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart } from "lucide-react"
import Link from "next/link"

export default function MaxClicksReached({ link }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Maximum Clicks Reached</CardTitle>
          <CardDescription>This link has reached its maximum number of clicks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full">
              <BarChart className="h-12 w-12 text-slate-400" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">{link.title || "Limited Access Link"}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This link has reached its maximum number of allowed clicks ({link.maxClicks}).
            </p>
            <p className="text-sm text-muted-foreground">Please contact the link owner for more information.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Shared by {link.username || "a LockYoLinks user"}
            {link.country && ` from ${link.country}`}
          </p>
          <Button asChild variant="outline">
            <Link href="/">Go to LockYoLinks</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

