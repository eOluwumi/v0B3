"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function UpdatePasswordPage() {
  const { supabase, user, loading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      toast({ title: "Reset link not active", description: "Open the password reset link from your email again.", variant: "destructive" })
    }
  }, [loading, user, toast])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (password.length < 8 || password !== confirm) {
      toast({ title: "Check your password", description: "Use at least 8 characters and make sure both entries match.", variant: "destructive" })
      return
    }
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password })
    setSaving(false)
    if (error) {
      toast({ title: "Password update failed", description: error.message, variant: "destructive" })
      return
    }
    toast({ title: "Password updated", description: "Your new password is ready to use." })
    router.replace("/dashboard")
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  if (!user) return <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-4 text-center"><p>This password reset link is no longer active.</p><Link href="/auth/forgot-password"><Button>Request another link</Button></Link></div>

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf7] p-4">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl border bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-bold text-[#173d2c]">Choose a new password</h1>
        <div className="space-y-2"><Label htmlFor="password">New password</Label><Input id="password" type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="confirm">Confirm password</Label><Input id="confirm" type="password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} required /></div>
        <Button className="w-full" type="submit" disabled={saving}>{saving ? "Saving…" : "Update password"}</Button>
      </form>
    </main>
  )
}
