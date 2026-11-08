"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Never silently simulate authentication or database writes.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "supabase-not-configured",
)

type SupabaseContextType = {
  supabase: SupabaseClient
  user: User | null
  loading: boolean
  configured: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase,
  user: null,
  loading: true,
  configured: isSupabaseConfigured,
})

export const useSupabase = () => useContext(SupabaseContext)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser(null)
      setLoading(false)
      return
    }

    let mounted = true
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return
      if (error) console.error("Unable to restore Supabase session:", error.message)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ supabase, user, loading, configured: isSupabaseConfigured }}>
      {children}
    </SupabaseContext.Provider>
  )
}
