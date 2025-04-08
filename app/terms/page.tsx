"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="space-y-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Terms of Service
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
                <h2 className="text-2xl font-bold">1. Introduction</h2>
                <p>
                  Welcome to LockYoLinks. These Terms of Service ("Terms") govern your use of the LockYoLinks website
                  and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound
                  by these Terms. If you disagree with any part of the Terms, you may not access the Service.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Accounts</h2>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information.
                  Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your
                  account on our Service.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service and for any
                  activities or actions under your password. You agree not to disclose your password to any third party.
                  You must notify us immediately upon becoming aware of any breach of security or unauthorized use of
                  your account.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. Content</h2>
                <p>
                  Our Service allows you to create, store, and share links with various protection features. You are
                  responsible for the links you create and the content they point to.
                </p>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Create or share links to content that is illegal, harmful, threatening, abusive, harassing,
                    tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or
                    racially, ethnically, or otherwise objectionable.
                  </li>
                  <li>
                    Create or share links to content that you do not have a right to make available under any law or
                    under contractual or fiduciary relationships.
                  </li>
                  <li>
                    Create or share links to content that infringes any patent, trademark, trade secret, copyright, or
                    other proprietary rights of any party.
                  </li>
                  <li>
                    Create or share links to unsolicited or unauthorized advertising, promotional materials, "junk
                    mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation.
                  </li>
                  <li>
                    Create or share links to material that contains software viruses or any other computer code, files,
                    or programs designed to interrupt, destroy, or limit the functionality of any computer software or
                    hardware or telecommunications equipment.
                  </li>
                </ul>
                <p>
                  We reserve the right to terminate your account and access to the Service if you violate these content
                  guidelines.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
                <p>
                  The Service and its original content (excluding content provided by users), features, and
                  functionality are and will remain the exclusive property of LockYoLinks and its licensors. The Service
                  is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                  Our trademarks and trade dress may not be used in connection with any product or service without the
                  prior written consent of LockYoLinks.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Links To Other Web Sites</h2>
                <p>
                  Our Service may contain links to third-party websites or services that are not owned or controlled by
                  LockYoLinks.
                </p>
                <p>
                  LockYoLinks has no control over, and assumes no responsibility for, the content, privacy policies, or
                  practices of any third-party websites or services. You further acknowledge and agree that LockYoLinks
                  shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged
                  to be caused by or in connection with the use of or reliance on any such content, goods, or services
                  available on or through any such websites or services.
                </p>
                <p>
                  We strongly advise you to read the terms and conditions and privacy policies of any third-party
                  websites or services that you visit.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">6. Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any
                  reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                  account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">7. Limitation Of Liability</h2>
                <p>
                  In no event shall LockYoLinks, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from (i) your access to or use of or inability to access or use the Service; (ii) any
                  conduct or content of any third party on the Service; (iii) any content obtained from the Service; and
                  (iv) unauthorized access, use or alteration of your transmissions or content, whether based on
                  warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been
                  informed of the possibility of such damage.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">8. Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
                  basis. The Service is provided without warranties of any kind, whether express or implied, including,
                  but not limited to, implied warranties of merchantability, fitness for a particular purpose,
                  non-infringement or course of performance.
                </p>
                <p>
                  LockYoLinks, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will
                  function uninterrupted, secure or available at any particular time or location; b) any errors or
                  defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the
                  results of using the Service will meet your requirements.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">9. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the United States, without
                  regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                  rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the
                  remaining provisions of these Terms will remain in effect.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">10. Changes</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                  effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be
                  bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">11. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at jsphhabana@gmail.com.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

