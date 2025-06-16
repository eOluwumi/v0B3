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

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Step 1: Create user with Mock Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // For demo purposes, we'll simulate the profile creation
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            full_name: fullName,
            email: email,
            password_hash: "demo-hash", // Mock hash for demo
          },
        ])

        toast({
          title: "Account created! 🎉",
          description: "Welcome to the B3 demo! You can now explore the platform.",
        })

        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "Demo Sign Up",
        description: "This is a demo - your account has been created successfully!",
      })
      // For demo purposes, still redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
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
            <CardTitle className="text-2xl">Join the #BringBackBarter Revolution!</CardTitle>
            <CardDescription>
              Ready to prove that barter is back & better? Join thousands of Naija people who are revolutionizing trade!
              🇳🇬
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
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
                  minLength={8}
                />
                <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Joining the revolution..." : "Join #BringBackBarter"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-green-600 hover:underline">
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
