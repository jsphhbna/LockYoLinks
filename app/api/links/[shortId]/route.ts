import { NextResponse } from "next/server"
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "@/lib/firebase/firebase-config"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function GET(request, { params }) {
  try {
    const { shortId } = await params

    // Query the link by shortId
    const linksRef = collection(db, "links")
    const q = query(linksRef, where("shortId", "==", shortId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    const linkDoc = querySnapshot.docs[0]
    const linkData = linkDoc.data()

    // Check link status
    let status = "active"

    if (linkData.isDeleted) {
      status = "deleted"
    } else if (linkData.isDisabled) {
      status = "disabled"
    } else if (linkData.expiresAt && new Date(linkData.expiresAt) <= new Date()) {
      status = "expired"
    } else if (linkData.maxClicks && linkData.clickCount >= linkData.maxClicks) {
      status = "max_clicks_reached"
    }

    // Return link info
    return NextResponse.json({
      id: linkDoc.id,
      shortId: linkData.shortId,
      title: linkData.title,
      hasPassword: linkData.hasPassword,
      isInviteOnly: linkData.isInviteOnly,
      status,
    })
  } catch (error) {
    console.error("Error fetching link:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    const { shortId } = await params
    const { action } = await request.json()

    // Query the link by shortId
    const linksRef = collection(db, "links")
    const q = query(linksRef, where("shortId", "==", shortId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    const linkDoc = querySnapshot.docs[0]
    const linkData = linkDoc.data()

    // Handle different actions
    if (action === "access") {
      // Check if link is active
      if (linkData.isDeleted) {
        return NextResponse.json({ error: "This link has been deleted" }, { status: 400 })
      }

      if (linkData.isDisabled) {
        return NextResponse.json({ error: "This link has been disabled" }, { status: 400 })
      }

      if (linkData.expiresAt && new Date(linkData.expiresAt) <= new Date()) {
        return NextResponse.json({ error: "This link has expired" }, { status: 400 })
      }

      if (linkData.maxClicks && linkData.clickCount >= linkData.maxClicks) {
        return NextResponse.json({ error: "This link has reached its maximum click limit" }, { status: 400 })
      }

      if (linkData.hasPassword || linkData.isInviteOnly) {
        return NextResponse.json({ error: "This link requires authentication" }, { status: 401 })
      }

      // Update click count
      await updateDoc(doc(db, "links", linkDoc.id), {
        clickCount: (linkData.clickCount || 0) + 1,
      })

      // Return the original URL for redirection
      return NextResponse.json({
        originalUrl: linkData.originalUrl,
        message: "Access granted",
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error processing link action:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

