import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { ArrowRight, MessageSquare, RefreshCw, Search, Sparkles, Users, Zap, Heart, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950 transition-colors duration-300">
      {/* Navigation */}
      <header className="border-b border-green-200/60 dark:border-green-800/60 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 sticky top-0 z-50 transition-colors duration-300">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/b3-logo.png" alt="B3 Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-2xl font-bold text-green-800 dark:text-green-400">B3</span>
            <div className="hidden sm:flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              <Heart className="h-3 w-3 text-red-500" />
              <span className="text-green-700 dark:text-green-300">#BringBackBarter</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/browse"
              className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors"
            >
              Browse Items
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors"
            >
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/auth/signin">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Join the Revolution
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-500/10 dark:from-green-600/5 dark:to-green-500/5 transition-colors duration-300"></div>
        <div className="container relative flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8 text-center md:text-left animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium transition-colors duration-300">
                <TrendingUp className="h-4 w-4" />
                #BringBackBarter - The Revolution is Here! 🇳🇬
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Barter is Back{" "}
                <span className="bg-gradient-to-r from-green-600 via-green-500 to-yellow-400 bg-clip-text text-transparent">
                  & Better
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed transition-colors duration-300">
                The ancient art of trading is back with a modern twist! No cash needed, just pure value exchange between
                Naija people. Join the #BringBackBarter movement and discover how trading can be better than ever! 💚
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Join #BringBackBarter <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 transition-colors duration-300"
                >
                  See how it works
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 justify-center md:justify-start transition-colors duration-300">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>200+ Barter Warriors</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>150+ successful swaps</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-800 dark:text-green-300 text-center md:text-left">
                🔥 <span className="font-bold">#BringBackBarter</span> - Because the best things in life aren't bought,
                they're traded!
              </p>
            </div>
          </div>

          {/* Hero Visual - Hands with B3 Logo */}
          <div className="flex-1 relative animate-fade-in">
            <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-400/20 dark:from-green-400/10 dark:to-cyan-400/10 rounded-3xl blur-3xl transition-colors duration-300"></div>

              {/* Hands reaching toward each other */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left hand - more organic/human */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-60">
                  <div className="w-full h-full bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-400 rounded-full blur-sm transform rotate-12"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-green-200 to-green-300 dark:from-green-800 dark:to-green-700 rounded-full opacity-70"></div>
                </div>

                {/* Right hand - more digital/tech */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-60">
                  <div className="w-full h-full bg-gradient-to-l from-cyan-400 to-blue-600 dark:from-cyan-600 dark:to-blue-400 rounded-full blur-sm transform -rotate-12"></div>
                  <div className="absolute inset-4 bg-gradient-to-l from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-700 rounded-full opacity-70"></div>
                  {/* Network pattern overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <pattern id="network" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" className="text-cyan-400" />
                          <line
                            x1="10"
                            y1="10"
                            x2="20"
                            y2="10"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-cyan-400"
                          />
                          <line
                            x1="10"
                            y1="10"
                            x2="10"
                            y2="20"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-cyan-400"
                          />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#network)" />
                    </svg>
                  </div>
                </div>

                {/* Central B3 Logo with glow */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Glowing background for logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full blur-xl opacity-60 scale-150"></div>

                  {/* B3 Logo */}
                  <div className="relative bg-white dark:bg-gray-900 rounded-full p-6 shadow-2xl border-4 border-green-200 dark:border-green-800">
                    <Image src="/b3-logo.png" alt="B3 Logo" width={80} height={80} className="w-20 h-20" />
                  </div>

                  {/* Subtitle */}
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-cyan-500 bg-clip-text text-transparent">
                      BARTERVERSE
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Universe Of Exchange</p>
                  </div>
                </div>

                {/* Connection lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-80 animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-70 animate-pulse delay-700"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-green-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barter Revolution Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-lg font-medium">
              <TrendingUp className="h-5 w-5" />
              #BringBackBarter Movement
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">Barter is Back & Better Than Ever!</h2>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              We're bringing back the oldest form of trade with modern technology. No banks, no fees, no wahala - just
              pure value exchange between people who understand that the best deals happen when everyone wins!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-green-100 text-lg">Barter Warriors</div>
                <div className="text-green-200 text-sm mt-1">#BringBackBarter strong!</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-green-100 text-lg">Successful Swaps</div>
                <div className="text-green-200 text-sm mt-1">Barter is better!</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">₦0</div>
                <div className="text-green-100 text-lg">Money Exchanged</div>
                <div className="text-green-200 text-sm mt-1">Pure value trading!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Barter is Back & Better
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How the{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Barter Revolution
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Three simple steps to join the #BringBackBarter movement and turn your unused things into treasures
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-green-100 dark:border-green-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">List Your Treasure</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Snap photo, write wetin you want collect back, and gbam! Your item don join the #BringBackBarter
                  revolution. Our smart system go find perfect match for you.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-yellow-100 dark:border-yellow-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Connect & Negotiate</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Found your match? Start to dey gist! Talk the matter well, share more pictures. Barter is back &
                  better when both parties win!
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-orange-100 dark:border-orange-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg">
                  <RefreshCw className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Swap & Celebrate</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Meet up for safe place, do the exchange, rate each other. Congratulations! You just proved that barter
                  is back & better! 🎉 #BringBackBarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-green-950 transition-colors duration-300">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-lg font-medium">
              <TrendingUp className="h-5 w-5" />
              Join the #BringBackBarter Revolution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Prove{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Barter is Back & Better?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Join hundreds of Naija people who have discovered that the best trades happen without money. Be part of
              the movement that's bringing back the art of true value exchange!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Barter Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 transition-colors duration-300"
                >
                  Explore the Revolution
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                🚀 #BringBackBarter is trending!
              </p>
              <p className="text-green-700 dark:text-green-400">
                Join the movement that's proving barter is back & better than ever. No fees, no banks, no wahala - just
                pure value exchange!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm transition-colors duration-300">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/b3-logo.png" alt="B3 Logo" width={32} height={32} className="w-8 h-8" />
                <span className="text-2xl font-bold text-green-800 dark:text-green-400">B3</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                Leading the #BringBackBarter revolution. Making trading sweet, simple, and accessible for all Naija
                people.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">🇳🇬</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Proudly Nigerian</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <p className="text-xs font-medium text-green-700 dark:text-green-300">
                  #BringBackBarter - Barter is Back & Better!
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                The Revolution
              </h3>
              <div className="space-y-2">
                <Link
                  href="/how-it-works"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  How Barter Works
                </Link>
                <Link
                  href="/browse"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Join the Movement
                </Link>
                <Link
                  href="/categories"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Barter Categories
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                Company
              </h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  About the Revolution
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  href="/careers"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Legal</h3>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/safety"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Barter Safety
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-green-200 dark:border-green-800 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                © {new Date().getFullYear()} B3. All rights reserved.
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                <Image src="/b9-logo.png" alt="B9Tech Consult" width={16} height={16} className="w-4 h-4" />
                <span>Powered by B9Tech Consult</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Made with 💚 for the #BringBackBarter revolution
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
