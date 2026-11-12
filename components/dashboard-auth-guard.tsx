"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!configured || !user)) {
      router.replace("/auth/signin")
    }
  }, [configured, loading, user, router])

  if (loading || !configured || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
        <span className="sr-only">Checking your B3 account…</span>
      </div>
    )
  }

  return <>{children}</>
}
