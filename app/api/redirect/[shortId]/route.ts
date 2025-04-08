import { NextResponse } from "next/server"
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "@/lib/firebase/firebase-config"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

/**
 * GET handler for the redirect API route
 *
 * This route handles redirecting users to the original URL when they access a short link.
 * It performs various checks to ensure the link is valid and active before redirecting.
 * It also increments the click count for the link.
 *
 * @param {Request} request - The incoming request object
 * @param {Object} params - The route parameters containing the shortId
 * @returns {Response} A redirect response or an error response
 */
export async function GET(request, { params }) {
  try {
    // Await params before destructuring to avoid Next.js warning
    const { shortId } = await params

    // Query the link by shortId from Firestore
    const linksRef = collection(db, "links")
    const q = query(linksRef, where("shortId", "==", shortId))
    const querySnapshot = await getDocs(q)

    // Check if link exists
    if (querySnapshot.empty) {
      return new Response("Link not found", { status: 404 })
    }

    const linkDoc = querySnapshot.docs[0]
    const linkData = linkDoc.data()

    // Check if link is active by validating various conditions
    if (linkData.isDeleted) {
      return new Response("This link has been deleted", { status: 400 })
    }

    if (linkData.isDisabled) {
      return new Response("This link has been disabled", { status: 400 })
    }

    if (linkData.expiresAt && new Date(linkData.expiresAt) <= new Date()) {
      return new Response("This link has expired", { status: 400 })
    }

    if (linkData.maxClicks && linkData.clickCount >= linkData.maxClicks) {
      return new Response("This link has reached its maximum click limit", { status: 400 })
    }

    // Update click count in Firestore
    try {
      await updateDoc(doc(db, "links", linkDoc.id), {
        clickCount: (linkData.clickCount || 0) + 1,
      })
    } catch (error) {
      console.error("Error updating click count:", error)
      // Continue with redirect even if click count update fails
    }

    // Use server-side redirect with status 307 to better mask the original URL
    // Status 307 ensures the request method and body are preserved
    return NextResponse.redirect(linkData.originalUrl, { status: 307 })
  } catch (error) {
    console.error("Error redirecting:", error)
    return new Response("Internal server error", { status: 500 })
  }
}

