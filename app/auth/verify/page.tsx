import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-950/90 border-slate-200/60 dark:border-gray-800/60 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Check Your Email! 📧🇳🇬</CardTitle>
            <CardDescription>
              We don send you verification link. Click am to activate your account and start trading with your fellow
              Naija people!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Didn't receive the email? Check your spam folder or try signing up again.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/auth/signin" className="w-full">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white">
                  Go to Sign In
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
