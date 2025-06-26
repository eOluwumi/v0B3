import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Globe, Shield, Zap, Star } from "lucide-react"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Globe className="h-4 w-4" />
              From the Heart of Africa 🌍
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About B3</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ubuntu in Action - Bringing Back Barter from the Blessed Continent! 🇳🇬🌍
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">Our Ubuntu Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Born from the blessed continent of abundance, B3 is revolutionizing trade by bringing back the ancient
                African art of bartering with modern technology. We believe in Ubuntu - "I am because we are" - and that
                our continent's wisdom can change the world! 🌍
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                From the great markets of Timbuktu to the bustling streets of Lagos, from the wisdom of our ancestors to
                the innovation of our youth - we're proving that Africa leads in community, love, and indigenous
                support. Not everything needs money when you have Ubuntu! 💚
              </p>
            </CardContent>
          </Card>

          {/* African Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle className="text-yellow-600 dark:text-yellow-400">Ubuntu Spirit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  "I am because we are" - We're building a community where Africans help Africans. Every trade
                  strengthens our Ubuntu bonds and celebrates our beautiful culture of togetherness! 🤝
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-green-600 dark:text-green-400">African Abundance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our continent is blessed with abundance! From natural resources to human talent, from cultural
                  richness to innovative spirit - we're sharing this abundance through Ubuntu trading! 🌍✨
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-orange-600 dark:text-orange-400">Indigenous Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Supporting our people, our culture, our traditions! We provide secured, trusted platforms that honor
                  African values while embracing modern technology. Safety with Ubuntu love! 🛡️💚
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-purple-600 dark:text-purple-400">African Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We are leveraging cutting-edge technology to bring you a wonderful bartering experience that's as easy
                  as WhatsApp, but with the personal touch of our traditional markets. Africa leads in mobile
                  innovation! 📱⚡
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                The Ubuntu Story
                <Star className="w-6 h-6 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Born from the bustling markets of Lagos and inspired by the age-old Ubuntu tradition that has been the
                heartbeat of African communities for millennia, B3 represents the perfect fusion of ancestral wisdom and
                modern innovation. 🌍
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We saw how our people were discarding perfectly good items while others desperately needed those same
                treasures. We realized that money isn't always the answer - sometimes, Ubuntu spirit and community
                exchange is all that's needed. Our ancestors knew this! 💡
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                From the great trading empires of Mali and Songhai to the vibrant markets of modern Africa, bartering
                has always been our way. We're not just reviving a practice - we're celebrating our heritage and showing
                the world that African wisdom can solve modern problems! 🏛️✨
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, B3 is more than just a platform - it's a movement of Ubuntu, a celebration of African abundance,
                and proof that when we come together with love and indigenous support, we can change the world. One
                trade at a time, one Ubuntu connection at a time! 🚀🇳🇬
              </p>
            </CardContent>
          </Card>

          {/* African Impact */}
          <Card className="mb-12 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-600 dark:text-green-400">
                Our Impact Across the Continent 🌍
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">200+</div>
                  <div className="text-gray-600 dark:text-gray-300">Ubuntu Warriors</div>
                  <div className="text-sm text-green-500 dark:text-green-400">Leading from Nigeria! 🇳🇬</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">150+</div>
                  <div className="text-gray-600 dark:text-gray-300">Community Exchanges</div>
                  <div className="text-sm text-yellow-500 dark:text-yellow-400">Ubuntu in action! 🤝</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">5+</div>
                  <div className="text-gray-600 dark:text-gray-300">African Cities</div>
                  <div className="text-sm text-orange-500 dark:text-orange-400">Growing across Africa! 🌍</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Join the Ubuntu Revolution!</h2>
            <p className="text-green-100 mb-6">
              Be part of the movement that's proving African wisdom can change the world! Ubuntu spirit, indigenous
              support, and continental love! 🌍💚
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Start Your Ubuntu Journey
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn Ubuntu Trading
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
