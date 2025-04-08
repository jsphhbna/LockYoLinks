import { NextResponse } from "next/server"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "@/lib/firebase/firebase-config"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function POST(request, { params }) {
  try {
    const { shortId } = await params
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 })
    }

    // Query the link by shortId
    const linksRef = collection(db, "links")
    const q = query(linksRef, where("shortId", "==", shortId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    const linkDoc = querySnapshot.docs[0]
    const linkData = linkDoc.data()

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

    // Verify the access token
    const accessTokens = linkData.accessTokens || {}
    const tokenData = accessTokens[token]

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid access token" }, { status: 401 })
    }

    if (tokenData.expiresAt < Date.now()) {
      return NextResponse.json({ error: "Access token has expired" }, { status: 401 })
    }

    // Token is valid, return success
    return NextResponse.json({
      message: "Access token verified successfully",
      valid: true,
    })
  } catch (error) {
    console.error("Error verifying access token:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

