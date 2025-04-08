import { NextResponse } from "next/server"
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "@/lib/firebase/firebase-config"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function POST(request, { params }) {
  try {
    const { shortId } = await params
    const { password } = await request.json()

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

    // Verify password
    if (!linkData.hasPassword) {
      return NextResponse.json({ error: "This link is not password protected" }, { status: 400 })
    }

    if (password !== linkData.password) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }

    // Generate a temporary access token (session-based)
    const accessToken = nanoid(32)

    // Store the token in the database
    await updateDoc(doc(db, "links", linkDoc.id), {
      accessTokens: {
        ...(linkData.accessTokens || {}),
        [accessToken]: {
          createdAt: Date.now(),
          ip: request.headers.get("x-forwarded-for") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        },
      },
      // Increment click count
      clickCount: (linkData.clickCount || 0) + 1,
    })

    // Set a session cookie with the access token (expires when browser is closed)
    cookies().set({
      name: `access_token_${shortId}`,
      value: accessToken,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // Return the access token
    return NextResponse.json({
      message: "Password verified successfully",
      accessToken: accessToken,
    })
  } catch (error) {
    console.error("Error verifying password:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

