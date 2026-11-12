"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2, MailCheck } from "lucide-react"

export default function ForgotPasswordPage() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: window.location.origin + "/auth/update-password",
    })
    setLoading(false)
    if (error) {
      toast({ title: "Could not send reset link", description: error.message, variant: "destructive" })
      return
    }
    setSent(true)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] p-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-7 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><MailCheck /></div>
        <h1 className="text-2xl font-bold text-[#173d2c]">Reset your password</h1>
        <p className="mt-2 text-sm text-muted-foreground">{sent ? "If an account exists for that email, a password reset link has been sent." : "Enter the email address linked to your B3 account."}</p>
        {!sent && <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</> : "Send reset link"}</Button>
        </form>}
        <Link href="/auth/signin" className="mt-5 inline-flex items-center text-sm font-medium text-emerald-700 hover:underline"><ArrowLeft className="mr-2 h-4 w-4" />Back to sign in</Link>
      </div>
    </main>
  )
}
