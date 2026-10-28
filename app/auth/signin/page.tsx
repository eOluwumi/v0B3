"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import Link from "next/link"
import Image from "next/image"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { supabase, configured } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!configured) {
      toast({
        title: "Backend setup required",
        description: "Barter Nigeria is not connected to Supabase yet. Configure the Supabase environment variables before signing in.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        toast({
          title: "Welcome back! 🎉",
          description: "You've successfully signed in.",
        })
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/b3-logo.png" alt="B3 Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">B3</span>
          </Link>
        </div>
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-950/90 border-slate-200/60 dark:border-gray-800/60 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, Barter Warrior!</CardTitle>
            <CardDescription>
              Ready to continue the #BringBackBarter revolution? Sign in and let's prove barter is back & better! 🇳🇬
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-green-600 hover:underline">
                  Sign Up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
