"use client"

import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"

export default function VerifyPage() {
  const { user, loading } = useSupabase()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
      <div className="w-full max-w-md">
        <Card className="border-slate-200/60 bg-white/90 shadow-xl backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-950/90">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
                {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : user ? <CheckCircle2 className="h-8 w-8" /> : <Mail className="h-8 w-8" />}
              </div>
            </div>
            <CardTitle className="text-2xl">{loading ? "Checking your account…" : user ? "Your email is verified" : "Check your email"}</CardTitle>
            <CardDescription>
              {loading
                ? "We are confirming your BarterNaija session."
                : user
                  ? "Your BarterNaija account is active. You can now list items and arrange cashless exchanges."
                  : "We have sent a verification link if email confirmation is enabled. Open it on this device to activate your account."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <Link href="/dashboard" className="block"><Button className="w-full">Continue to your dashboard</Button></Link>
            ) : (
              <>
                <p className="text-center text-sm text-muted-foreground">If the message is not in your inbox, check your spam folder. You can return to sign in after verifying.</p>
                <Link href="/auth/signin" className="block"><Button className="w-full">Go to sign in</Button></Link>
              </>
            )}
            <Link href="/" className="block"><Button variant="outline" className="w-full"><ArrowLeft className="mr-2 h-4 w-4" />Back to home</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
