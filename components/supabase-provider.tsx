"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Mock user type
type MockUser = {
  id: string
  email: string
  user_metadata: {
    full_name: string
  }
}

// Mock Supabase client
const createMockSupabaseClient = () => ({
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful sign in
      const mockUser: MockUser = {
        id: "mock-user-id",
        email,
        user_metadata: {
          full_name: "Mock User",
        },
      }

      // Store in localStorage for persistence
      localStorage.setItem("mock-user", JSON.stringify(mockUser))

      return {
        data: { user: mockUser },
        error: null,
      }
    },

    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: MockUser = {
        id: "mock-user-id",
        email,
        user_metadata: {
          full_name: options?.data?.full_name || "Mock User",
        },
      }

      // Store in localStorage for persistence
      localStorage.setItem("mock-user", JSON.stringify(mockUser))

      return {
        data: { user: mockUser },
        error: null,
      }
    },

    signOut: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove from localStorage
      localStorage.removeItem("mock-user")

      return { error: null }
    },

    getSession: async () => {
      const storedUser = localStorage.getItem("mock-user")
      const user = storedUser ? JSON.parse(storedUser) : null

      return {
        data: {
          session: user ? { user } : null,
        },
      }
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Mock auth state change listener
      const checkAuth = () => {
        const storedUser = localStorage.getItem("mock-user")
        const user = storedUser ? JSON.parse(storedUser) : null
        callback(user ? "SIGNED_IN" : "SIGNED_OUT", user ? { user } : null)
      }

      // Check immediately
      setTimeout(checkAuth, 100)

      // Return the correct structure that matches Supabase
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      }
    },
  },

  from: (table: string) => ({
    insert: async (data: any) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { data, error: null }
    },

    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        order: (column: string, options?: any) => ({
          then: async (resolve: any) => {
            // Simulate network delay
            await new Promise((r) => setTimeout(r, 500))
            resolve({ data: [], error: null })
          },
        }),
      }),
    }),

    delete: () => ({
      eq: (column: string, value: any) => ({
        then: async (resolve: any) => {
          // Simulate network delay
          await new Promise((r) => setTimeout(r, 500))
          resolve({ error: null })
        },
      }),
    }),
  }),

  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return {
          data: { path },
          error: null,
        }
      },

      getPublicUrl: (path: string) => ({
        data: {
          publicUrl: `/placeholder.svg?height=200&width=200`,
        },
      }),
    }),
  },
})

export const supabase = createMockSupabaseClient()

type SupabaseContextType = {
  supabase: typeof supabase
  user: MockUser | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase,
  user: null,
  loading: true,
})

export const useSupabase = () => useContext(SupabaseContext)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to the demo.",
        })
      }
      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You've been signed out of the demo.",
        })
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [toast])

  return <SupabaseContext.Provider value={{ supabase, user, loading }}>{children}</SupabaseContext.Provider>
}
