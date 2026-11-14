"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"

type GoogleSignInButtonProps = {
  label?: string
}

export function GoogleSignInButton({ label = "Continue with Google" }: GoogleSignInButtonProps) {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)

    try {
      // Supabase stores the PKCE verifier in browser storage scoped to this origin.
      // The callback MUST return to the same host that initiated OAuth; switching
      // apex <-> www loses access to that verifier and makes code exchange fail.
      const redirectTo = `${window.location.origin}/auth/verify?next=/dashboard`

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            prompt: "select_account",
          },
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Google sign-in could not be started. Please try again."
      toast({
        title: "Google sign-in unavailable",
        description: message,
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
      onClick={handleGoogleSignIn}
      disabled={loading}
    >
      <span aria-hidden="true" className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-bold">
        <span className="bg-gradient-to-br from-blue-600 via-green-600 to-red-500 bg-clip-text text-transparent">G</span>
      </span>
      {loading ? "Connecting to Google…" : label}
    </Button>
  )
}
