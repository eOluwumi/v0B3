import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Globe, Shield, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/b3-logo.png" alt="B3 Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">B3</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About B3</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Bringing Back Barter - The future of trade is here! 🇳🇬
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                B3 is revolutionizing the way Nigerians trade by bringing back the ancient art of bartering with modern
                technology. We believe that not everything needs money - sometimes, what you have is exactly what
                someone else needs, and what they have is exactly what you're looking for.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Community First</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We're building a community where Nigerians help Nigerians. Every trade strengthens our bonds and
                  creates lasting relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-purple-600 dark:text-purple-400">Sustainable Trading</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Reduce waste, reuse resources, and create a more sustainable economy by giving items new life through
                  barter.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-orange-600 dark:text-orange-400">Safe & Secure</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Your safety is our priority. We provide secure communication, verified profiles, and trusted trade
                  facilitation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-green-600 dark:text-green-400">Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We're using cutting-edge technology to make bartering as easy as online shopping, but with the
                  personal touch of traditional markets.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">The B3 Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Born from the bustling markets of Lagos and inspired by the age-old tradition of bartering that has been
                part of Nigerian culture for centuries, B3 represents the perfect fusion of tradition and technology.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We saw how people were throwing away perfectly good items while others desperately needed those same
                things. We realized that money isn't always the answer - sometimes, a simple exchange is all that's
                needed.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, B3 is more than just a platform - it's a movement. We're proving that barter is back and better
                than ever, creating a more connected, sustainable, and prosperous Nigeria, one trade at a time.
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Join the #BringBackBarter Movement</h2>
            <p className="text-green-100 mb-6">Be part of the revolution that's changing how Nigeria trades! 🚀</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Start Bartering Today
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
