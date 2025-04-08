import { use } from "react"
import { notFound, redirect } from "next/navigation"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "@/lib/firebase/firebase-config"
import PasswordProtection from "@/components/link-access/password-protection"
import ExpiredLink from "@/components/link-access/expired-link"
import MaxClicksReached from "@/components/link-access/max-clicks-reached"
import DeletedLink from "@/components/link-access/deleted-link"
import DisabledLink from "@/components/link-access/disabled-link"
import InviteOnlyAccess from "@/components/link-access/invite-only-access"
import SecureLink from "@/components/link-access/secure-link"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function getLink(shortId) {
  try {
    const linksRef = collection(db, "links")
    const q = query(linksRef, where("shortId", "==", shortId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    }
  } catch (error) {
    console.error("Error fetching link:", error)
    return null
  }
}

export default function LinkAccessPage({ params }) {
  // Use React.use to properly handle the async params
  const resolvedParams = use(Promise.resolve(params))
  const { shortId } = resolvedParams

  // Use React.use to handle the async data fetching
  const link = use(getLink(shortId))

  if (!link) {
    notFound()
  }

  // Check if link is deleted
  if (link.isDeleted) {
    return <DeletedLink link={link} />
  }

  // Check if link is disabled
  if (link.isDisabled) {
    return <DisabledLink link={link} />
  }

  // Check if link has expired
  if (link.expiresAt) {
    const expiresAt = new Date(link.expiresAt)
    const now = new Date()

    if (expiresAt <= now) {
      return <ExpiredLink link={link} />
    }
  }

  // Check if max clicks reached
  if (link.maxClicks && link.clickCount >= link.maxClicks) {
    return <MaxClicksReached link={link} />
  }

  // Check if invite-only
  if (link.isInviteOnly) {
    return <InviteOnlyAccess link={link} />
  }

  // Check if password protected
  if (link.hasPassword) {
    // If it has password and other securities, show the combined secure link page
    if (link.expiresAt || link.maxClicks) {
      return <SecureLink link={link} />
    }
    // If it only has password, show the password protection page
    return <PasswordProtection link={link} />
  }

  // If it has expiration or max clicks (but no password), show the info page
  if (link.expiresAt || link.maxClicks) {
    return <SecureLink link={link} />
  }

  // If no restrictions or all checks passed, redirect to the proxy route
  redirect(`/api/redirect/${shortId}`)
}

