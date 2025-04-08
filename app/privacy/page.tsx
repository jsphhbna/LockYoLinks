"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="space-y-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Last updated: April 5, 2025
        </motion.p>
      </section>

      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Introduction</h2>
                <p>
                  Welcome to LockYoLinks. We respect your privacy and are committed to protecting your personal data.
                  This privacy policy will inform you about how we look after your personal data when you visit our
                  website and tell you about your privacy rights and how the law protects you.
                </p>
                <p>
                  This privacy policy applies to all users of LockYoLinks. Please read it carefully to understand our
                  practices regarding your personal data.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Information We Collect</h2>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have
                  grouped together as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Identity Data</strong> includes username, email address, and country of origin (if
                    provided).
                  </li>
                  <li>
                    <strong>Contact Data</strong> includes email address.
                  </li>
                  <li>
                    <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version,
                    time zone setting and location, browser plug-in types and versions, operating system and platform,
                    and other technology on the devices you use to access this website.
                  </li>
                  <li>
                    <strong>Usage Data</strong> includes information about how you use our website and services.
                  </li>
                  <li>
                    <strong>Link Data</strong> includes information about the links you create, including URLs,
                    passwords (stored securely), expiration settings, and allowed email addresses for invite-only links.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your
                  personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To register you as a new user</li>
                  <li>To provide and maintain our service</li>
                  <li>To manage your account</li>
                  <li>To provide the core functionality of creating and managing secure links</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Data Security</h2>
                <p>
                  We have implemented appropriate security measures to prevent your personal data from being
                  accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We use Firebase
                  Authentication and Firestore with strict security rules to ensure that only authorized users can
                  access their own data.
                </p>
                <p>
                  We limit access to your personal data to those employees, agents, contractors, and other third parties
                  who have a business need to know. They will only process your personal data on our instructions, and
                  they are subject to a duty of confidentiality.
                </p>
                <p>
                  We have procedures in place to deal with any suspected personal data breach and will notify you and
                  any applicable regulator of a breach where we are legally required to do so.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Data Retention</h2>
                <p>
                  We will only retain your personal data for as long as necessary to fulfill the purposes we collected
                  it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                </p>
                <p>
                  To determine the appropriate retention period for personal data, we consider the amount, nature, and
                  sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of
                  your personal data, the purposes for which we process your personal data, and whether we can achieve
                  those purposes through other means, and the applicable legal requirements.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Legal Rights</h2>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal
                  data, including the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p>If you wish to exercise any of these rights, please contact us at jsphhabana@gmail.com.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Third-Party Services</h2>
                <p>We use the following third-party services to help provide our service:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Firebase</strong>: We use Firebase for authentication, database (Firestore), and hosting.
                    Firebase is a Google service and is subject to Google's privacy policy.
                  </li>
                  <li>
                    <strong>Google Analytics</strong>: We may use Google Analytics to help us understand how our users
                    use the site.
                  </li>
                </ul>
                <p>
                  These third-party services may collect information sent by your browser as part of a web page request,
                  such as cookies or your IP address. Please refer to their privacy policies for more information on how
                  they handle your data.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy
                  Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                  Policy are effective when they are posted on this page.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at jsphhabana@gmail.com.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

