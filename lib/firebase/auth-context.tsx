"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  type User,
  type UserCredential,
} from "firebase/auth"
import { useFirebase } from "./firebase-provider"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

interface UserProfile {
  uid: string
  email: string
  username?: string
  country?: string
  createdAt: number
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string, username: string, country?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => {
    throw new Error("AuthContext not initialized")
  },
  signUp: async () => {
    throw new Error("AuthContext not initialized")
  },
  signInWithGoogle: async () => {
    throw new Error("AuthContext not initialized")
  },
  signOut: async () => {
    throw new Error("AuthContext not initialized")
  },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { app, isInitialized } = useFirebase()
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isInitialized || !app) return

    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Fetch user profile from Firestore
        const db = getFirestore(app)
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile)
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [app, isInitialized])

  const signIn = async (email: string, password: string) => {
    if (!app) throw new Error("Firebase not initialized")
    const auth = getAuth(app)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, username: string, country?: string) => {
    if (!app) throw new Error("Firebase not initialized")
    const auth = getAuth(app)
    const db = getFirestore(app)

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Send email verification
    await sendEmailVerification(user)

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || email,
      username,
      createdAt: Date.now(),
    }

    if (country) {
      userProfile.country = country
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    setUserProfile(userProfile)
  }

  const signInWithGoogle = async () => {
    if (!app) throw new Error("Firebase not initialized")
    const auth = getAuth(app)
    const db = getFirestore(app)
    const provider = new GoogleAuthProvider()

    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user profile exists
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      // Create user profile if it doesn't exist
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        username: user.displayName || user.email?.split("@")[0] || "",
        createdAt: Date.now(),
      }

      await setDoc(doc(db, "users", user.uid), userProfile)
      setUserProfile(userProfile)
    }
  }

  const signOut = async () => {
    if (!app) throw new Error("Firebase not initialized")
    const auth = getAuth(app)
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

