"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { useToast } from "@/components/ui/use-toast"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "missing-supabase-key"

export const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_PUBLISHABLE_KEY ||
      process.env.SUPABASE_ANON_KEY,
  )

// OAuth callbacks are exchanged explicitly on /auth/verify. Disabling automatic
// URL detection prevents the client from racing that page to consume the PKCE code.
export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "pkce",
  },
})

type SupabaseContextType = {
  supabase: SupabaseClient<Database>
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
  const { toast } = useToast()

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let active = true
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === "SIGNED_IN") {
        toast({ title: "Welcome back!", description: "You're signed in to B3: Bring Back Barter." })
      } else if (event === "SIGNED_OUT") {
        toast({ title: "Signed out", description: "Your B3 session has ended." })
      }
    })

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        toast({
          title: "Session error",
          description: error.message,
          variant: "destructive",
        })
      }
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [toast])

  const value = useMemo(
    () => ({ supabase, user, loading, configured: isSupabaseConfigured }),
    [user, loading],
  )

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}
