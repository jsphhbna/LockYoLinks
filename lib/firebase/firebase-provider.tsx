"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { firebaseConfig } from "./firebase-config"

interface FirebaseContextType {
  app: FirebaseApp | null
  isInitialized: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  isInitialized: false,
})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig)
      setApp(app)
    } else {
      setApp(getApps()[0])
    }
    setIsInitialized(true)
  }, [])

  return <FirebaseContext.Provider value={{ app, isInitialized }}>{children}</FirebaseContext.Provider>
}

export const useFirebase = () => useContext(FirebaseContext)

