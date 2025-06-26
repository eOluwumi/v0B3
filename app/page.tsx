import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import {
  ArrowRight,
  MessageSquare,
  RefreshCw,
  Search,
  Sparkles,
  Users,
  Zap,
  Heart,
  Globe,
  Star,
  Camera,
  Shield,
  Smartphone,
} from "lucide-react"
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
                <Globe className="h-4 w-4" />
                From the Heart of Africa - #BringBackBarter 🌍🇳🇬
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Barter is Back{" "}
                <span className="bg-gradient-to-r from-green-600 via-green-500 to-yellow-400 bg-clip-text text-transparent">
                  & Better
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed transition-colors duration-300">
                From the blessed continent of abundance comes a revolution! We're bringing back the ancient African art
                of trading with modern technology. No cash needed, just pure value exchange between our people. Join the
                #BringBackBarter movement - because Ubuntu means "I am because we are!" 💚🌍
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Join the African Revolution <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 transition-colors duration-300"
                >
                  See how Ubuntu works
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 justify-center md:justify-start transition-colors duration-300">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>200+ African Warriors</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>150+ Ubuntu exchanges</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-800 dark:text-green-300 text-center md:text-left">
                🔥 <span className="font-bold">#BringBackBarter</span> - Celebrating African wisdom: "If you want to go
                fast, go alone. If you want to go far, go together!" 🌍
              </p>
            </div>
          </div>

          {/* Hero Visual - Hands with B3 Logo */}
          <div className="flex-1 relative animate-fade-in">
            <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 dark:from-green-400/10 dark:to-yellow-400/10 rounded-3xl blur-3xl transition-colors duration-300"></div>

              {/* Hands reaching toward each other */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left hand - African traditional */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-60">
                  <div className="w-full h-full bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 rounded-full blur-sm transform rotate-12"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-green-200 to-green-300 dark:from-green-800 dark:to-green-700 rounded-full opacity-70"></div>
                </div>

                {/* Right hand - modern African tech */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-60">
                  <div className="w-full h-full bg-gradient-to-l from-green-600 to-yellow-500 dark:from-green-700 dark:to-yellow-600 rounded-full blur-sm transform -rotate-12"></div>
                  <div className="absolute inset-4 bg-gradient-to-l from-green-200 to-yellow-300 dark:from-green-800 dark:to-yellow-700 rounded-full opacity-70"></div>
                  {/* African pattern overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <pattern id="african-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" className="text-yellow-500" />
                          <path
                            d="M5,5 L15,15 M15,5 L5,15"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-green-500"
                          />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#african-pattern)" />
                    </svg>
                  </div>
                </div>

                {/* Central B3 Logo with African pride */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Glowing background for logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full blur-xl opacity-60 scale-150"></div>

                  {/* B3 Logo */}
                  <div className="relative bg-white dark:bg-gray-900 rounded-full p-6 shadow-2xl border-4 border-green-200 dark:border-green-800">
                    <Image src="/b3-logo.png" alt="B3 Logo" width={80} height={80} className="w-20 h-20" />
                  </div>

                  {/* Subtitle */}
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                      BARTERVERSE
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Ubuntu Exchange Universe 🌍</p>
                  </div>
                </div>

                {/* Connection lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-80 animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-70 animate-pulse delay-700"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-green-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Showcase Section - NEW! */}
      <section className="py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the{" "}
              <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                Ubuntu Trading
              </span>{" "}
              Revolution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how our platform brings African wisdom and modern technology together for seamless bartering
              experiences! 🌍
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Listing Creation */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4">
                <Camera className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-green-200 to-green-300 dark:from-green-800 dark:to-green-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Upload Your Treasures</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">List Your African Treasures</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Snap beautiful photos, describe your items with love, and specify what Ubuntu treasures you're seeking
                  in return. Our platform makes listing as easy as WhatsApp! 📱✨
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
                <span>Easy • Fast • Beautiful</span>
              </div>
            </div>

            {/* Smart Matching */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4">
                <Search className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 dark:from-yellow-800 dark:to-yellow-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Search className="h-8 w-8 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Smart Ubuntu Matching</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Find Perfect Ubuntu Matches</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Our intelligent system connects you with Ubuntu warriors who have exactly what you need and want
                  exactly what you offer. African wisdom meets smart technology! 🧠🌍
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                <span>Smart • Accurate • Ubuntu-Powered</span>
              </div>
            </div>

            {/* Secure Communication */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4">
                <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-800 dark:to-orange-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-orange-600" />
                    </div>
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Secured Ubuntu Chat</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secured Ubuntu Communication</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Chat with love and confidence! Our secured messaging system protects your conversations while you
                  build Ubuntu relationships and negotiate with African warmth. 🤝💚
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                <span>Secured • Private • Ubuntu-Safe</span>
              </div>
            </div>
          </div>

          {/* Mobile App Preview */}
          <div className="bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Smartphone className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ubuntu Trading in Your Pocket</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Experience the full power of African bartering on your mobile device! 📱
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="font-semibold text-green-600">📸 Easy Listing</div>
                <div className="text-gray-600 dark:text-gray-300">Snap & Share</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="font-semibold text-yellow-600">🔍 Smart Search</div>
                <div className="text-gray-600 dark:text-gray-300">Find Matches</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="font-semibold text-orange-600">💬 Ubuntu Chat</div>
                <div className="text-gray-600 dark:text-gray-300">Connect Hearts</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="font-semibold text-green-600">🤝 Safe Trading</div>
                <div className="text-gray-600 dark:text-gray-300">Ubuntu Security</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* African Heritage Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-lg font-medium">
              <Star className="h-5 w-5" />
              From the Blessed Continent of Abundance 🌍
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">Ubuntu Meets Technology!</h2>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              From the markets of Lagos to the villages of Kano, from the shores of Cape Coast to the highlands of Addis
              Ababa - we're reviving the African spirit of community trading! No banks, no fees, no wahala - just pure
              Ubuntu in action. Because when we trade together, we rise together! 🇳🇬🌍
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-green-100 text-lg">Ubuntu Warriors</div>
                <div className="text-green-200 text-sm mt-1">Naija leading Africa! 🇳🇬</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-green-100 text-lg">Community Exchanges</div>
                <div className="text-green-200 text-sm mt-1">Ubuntu in action! 🤝</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">₦0</div>
                <div className="text-green-100 text-lg">Money Exchanged</div>
                <div className="text-green-200 text-sm mt-1">Pure African wisdom! 🌍</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Ubuntu Works */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              African Wisdom Meets Modern Tech 🌍
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How the{" "}
              <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                Ubuntu Revolution
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Three simple steps rooted in African tradition - join the #BringBackBarter movement and turn your unused
              treasures into community wealth! 🇳🇬
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-green-100 dark:border-green-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Share Your Abundance</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Like our ancestors in the great markets of Timbuktu and Benin, showcase your treasures! Snap photos,
                  describe your offerings, and let the Ubuntu spirit connect you with your community. Africa is blessed
                  with abundance! 🌍✨
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-yellow-100 dark:border-yellow-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ubuntu Connection</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Found your match? Start the conversation with love and respect - the African way! Share stories, build
                  relationships, negotiate with Ubuntu spirit. Remember: "I am because we are!" 🤝💚
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-orange-100 dark:border-orange-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg">
                  <RefreshCw className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Celebrate Ubuntu</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Meet in community, exchange with joy, and celebrate another Ubuntu victory! Rate each other with love
                  and build the African trading network. You've just proven that our ancestors' wisdom still works!
                  🎉🇳🇬🌍
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
              <Globe className="h-5 w-5" />
              Join the African Ubuntu Revolution 🌍
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Show the World{" "}
              <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                African Innovation?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Join hundreds of proud Africans who are proving that our continent leads in community, innovation, and
              Ubuntu spirit! From Nigeria to the world - let's show them how we do it! 🇳🇬🌍
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Ubuntu Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-200 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700 transition-colors duration-300"
                >
                  Explore African Innovation
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                🚀 #BringBackBarter is spreading across Africa!
              </p>
              <p className="text-green-700 dark:text-green-400">
                From Lagos to Accra, from Cairo to Cape Town - join the movement that's proving Ubuntu and African
                wisdom can change the world! No fees, no banks, just pure community love! 🌍💚
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
                Leading the #BringBackBarter revolution from the heart of Africa. Celebrating Ubuntu, community spirit,
                and the blessed abundance of our beautiful continent! 🌍
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">🇳🇬🌍</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Proudly African, Born in Nigeria</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <p className="text-xs font-medium text-green-700 dark:text-green-300">
                  #BringBackBarter - Ubuntu in Action! 🤝
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                The Ubuntu Revolution
              </h3>
              <div className="space-y-2">
                <Link
                  href="/how-it-works"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  How Ubuntu Works
                </Link>
                <Link
                  href="/browse"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Join the African Movement
                </Link>
                <Link
                  href="/categories"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  African Treasures
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                Our Community
              </h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  About Our Mission
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Connect With Us
                </Link>
                <Link
                  href="/careers"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Join Our Ubuntu Team
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                Trust & Safety
              </h3>
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
                  Community Guidelines
                </Link>
                <Link
                  href="/safety"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  Ubuntu Safety
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
              Made with 💚 for Africa, by Africans, with Ubuntu spirit 🌍
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
