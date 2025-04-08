"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function FaqPage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="space-y-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Find answers to common questions about LockYoLinks
        </motion.p>
      </section>

      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is LockYoLinks?</AccordionTrigger>
                  <AccordionContent>
                    LockYoLinks is a secure link-sharing platform that allows you to lock your URLs with features like
                    password protection, expiration dates, maximum clicks, and invite-only access. You can manage and
                    control the access to your links with ease.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I lock a link?</AccordionTrigger>
                  <AccordionContent>
                    <p>To lock a link:</p>
                    <ol className="list-decimal ml-5 mt-2 space-y-1">
                      <li>Create an account or log in.</li>
                      <li>Once logged in, click on the "Create New Link" button on your dashboard.</li>
                      <li>Enter the URL you want to lock.</li>
                      <li>
                        Set the desired settings like password protection, expiration time, max clicks, or invite-only
                        access.
                      </li>
                      <li>Save your locked link. It will be securely protected based on your chosen settings.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How can I access a locked link?</AccordionTrigger>
                  <AccordionContent>
                    <p>To access a locked link:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Click on the shared link.</li>
                      <li>
                        If a password is set, you'll be prompted to enter the password before being redirected to the
                        destination.
                      </li>
                      <li>
                        If the link has expired or reached its maximum clicks, you'll see a custom page informing you of
                        this.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I set a password for my link?</AccordionTrigger>
                  <AccordionContent>
                    When creating a locked link, you'll have the option to set a password. This password will be
                    required for anyone trying to access your link. Make sure to share the password securely with those
                    who need access.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I set an expiration for my link?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can set an expiration date for your link when creating it. Once the expiration date is
                    reached, anyone attempting to access the link will be shown an expired link page.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>How can I limit the number of clicks on my link?</AccordionTrigger>
                  <AccordionContent>
                    When creating a locked link, you can set a maximum number of clicks. Once the link is clicked that
                    many times, it will become inactive and display a custom Max Clicks Reached page.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>What does "invite-only access" mean?</AccordionTrigger>
                  <AccordionContent>
                    Invite-only access means that only people you specifically invite by email can access the locked
                    link. To enable this, you can add email addresses to an invite list when creating the link.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>Can I change the settings of my locked links?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Yes! After creating your locked link, you can go to your dashboard to edit the settings such as:
                    </p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Password</li>
                      <li>Expiration date</li>
                      <li>Max clicks</li>
                      <li>Invite-only email list</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>How do I delete or deactivate my locked link?</AccordionTrigger>
                  <AccordionContent>
                    In your dashboard, you can easily delete or deactivate any locked link you've created. Once deleted,
                    the link will no longer be accessible.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>Is my data secure on LockYoLinks?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We use Firebase Authentication for secure user login and Firestore for secure data storage. We
                    also implement strict Firestore Security Rules to ensure that only authorized users can access or
                    modify their links.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger>Can I log in with Google?</AccordionTrigger>
                  <AccordionContent>
                    Yes! LockYoLinks supports Google Login. Simply click the Google login button on the login page to
                    authenticate securely using your Google account.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>How do I contact support?</AccordionTrigger>
                  <AccordionContent>
                    If you encounter any issues or have questions that aren't answered here, feel free to reach out to
                    our support team via the Contact Us page. We'll get back to you as soon as possible!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger>How can I learn more about the creator of LockYoLinks?</AccordionTrigger>
                  <AccordionContent>
                    You can visit the About Us page to learn more about Joseph Habana, the creator of LockYoLinks, his
                    journey, and how the platform came to life.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger>Can I share a locked link with others?</AccordionTrigger>
                  <AccordionContent>
                    Yes! After creating a locked link, you can share the URL with others. If it's password-protected or
                    invite-only, make sure to provide the necessary details (password or email invites).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Still have questions?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you couldn't find the answer to your question, feel free to reach out to our support team.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

