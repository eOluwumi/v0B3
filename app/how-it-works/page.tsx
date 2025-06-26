import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Search, MessageCircle, CheckCircle, Globe, Heart } from "lucide-react"
import Image from "next/image"

export default function HowItWorksPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Globe className="h-4 w-4" />
              Ubuntu Wisdom Meets Modern Tech 🌍
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How Ubuntu Trading Works</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join the #BringBackBarter revolution in 4 simple steps - rooted in African tradition, powered by modern
              innovation! 🇳🇬
            </p>
          </div>

          {/* Ubuntu Introduction */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                <Heart className="w-6 h-6" />
                The Ubuntu Spirit
                <Heart className="w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                "I am because we are" - Ubuntu is the African philosophy that guides everything we do. When you trade on
                B3, you're not just exchanging items - you're building community, sharing abundance, and celebrating the
                beautiful spirit of African togetherness! 🌍💚
              </p>
            </CardContent>
          </Card>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-green-600 dark:text-green-400">Step 1</CardTitle>
                    <CardDescription>Join Our Ubuntu Community</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Join hundreds of proud Africans who are revolutionizing trade with Ubuntu spirit! Create your account
                  and become part of a community that celebrates African wisdom, indigenous support, and continental
                  love. Welcome to the family! 🇳🇬🌍
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Search className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-600 dark:text-yellow-400">Step 2</CardTitle>
                    <CardDescription>Share Your African Treasures</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Like our ancestors in the great markets of Timbuktu and Benin, showcase your abundance! Create
                  listings for items you want to trade, add beautiful photos, and specify what treasures you're seeking.
                  Africa is blessed with abundance - let's share it! ✨🏺
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-orange-600 dark:text-orange-400">Step 3</CardTitle>
                    <CardDescription>Connect with Ubuntu Love</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Found your Ubuntu match? Start conversations with love, respect, and the African spirit of community!
                  Share stories, build relationships, negotiate with kindness. Use our built-in chat to connect hearts
                  and minds - because "I am because we are!" 🤝💚
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-600 dark:text-purple-400">Step 4</CardTitle>
                    <CardDescription>Celebrate Ubuntu Victory</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Meet in community spaces, complete your Ubuntu exchange with joy, and celebrate another victory for
                  African wisdom! Rate each other with love, build your reputation, and strengthen the continental
                  trading network. You've just proven our ancestors were right! 🎉🌍
                </p>
              </CardContent>
            </Card>
          </div>

          {/* African Wisdom Section */}
          <Card className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-yellow-600 dark:text-yellow-400">
                Rooted in African Wisdom 🌍
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ancient Markets</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    From Timbuktu to Great Zimbabwe, our ancestors built the world's greatest trading networks through
                    community and trust.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ubuntu Philosophy</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    "I am because we are" - Every trade strengthens our community and celebrates our interconnectedness.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Continental Abundance</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Africa is blessed with natural resources, human talent, and cultural richness - let's share this
                    abundance!
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Modern Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Combining ancestral wisdom with cutting-edge technology to create something beautiful and uniquely
                    African.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience Ubuntu Trading?</h2>
            <p className="text-green-100 mb-6">
              Join the movement that's proving African wisdom can change the world! Ubuntu spirit, indigenous support,
              and continental love await you! 🌍💚
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Start Your Ubuntu Journey
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Welcome Back, Ubuntu Warrior
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
