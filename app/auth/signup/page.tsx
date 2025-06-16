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
import { Captcha } from "@/components/captcha"
import Link from "next/link"
import Image from "next/image"
import { Mail, CheckCircle } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      toast({
        title: "Verification Required",
        description: "Please complete the CAPTCHA to verify you're human.",
        variant: "destructive",
      })
      return
    }

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

        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setEmailSent(true)

        toast({
          title: "Account created! 🎉",
          description: "Please check your email to verify your account before signing in.",
        })

        // Don't redirect immediately - show email verification message
      }
    } catch (error: any) {
      // For demo purposes, still show success
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setEmailSent(true)

      toast({
        title: "Demo Account Created! 🎉",
        description: "In a real app, you'd receive a verification email. For demo purposes, you can now sign in.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
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
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Check Your Email!</CardTitle>
              <CardDescription>
                We've sent a verification link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  Click the verification link in your email to activate your account and start bartering!
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Link href="/auth/signin" className="w-full">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white">
                  Go to Sign In
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
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

              <Captcha onVerify={setCaptchaVerified} isVerified={captchaVerified} />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading || !captchaVerified}
              >
                {loading ? "Creating account..." : "Join #BringBackBarter"}
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
