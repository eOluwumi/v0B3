import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart2, MessageSquare, RefreshCw, Search } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">B3</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="/browse" className="text-sm font-medium">
              Browse
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Barter <span className="text-emerald-600">Better</span> with B3
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md">
              Exchange goods without money. Find perfect matches for what you have and what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="People trading items"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How B3 Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white dark:bg-gray-900">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">List & Find</h3>
              <p className="text-gray-600 dark:text-gray-400">
                List what you're offering and what you're seeking. Our smart algorithm finds potential matches.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white dark:bg-gray-900">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Chat & Negotiate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with potential trading partners through our secure in-app messaging system.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white dark:bg-gray-900">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Trade & Rate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete your trade with our secure escrow system and rate your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <BarChart2 className="h-8 w-8 text-emerald-600 mb-2" />
              <span className="text-3xl font-bold">1,000+</span>
              <span className="text-gray-600 dark:text-gray-400">Active Listings</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 text-emerald-600 mb-2" />
              <span className="text-3xl font-bold">500+</span>
              <span className="text-gray-600 dark:text-gray-400">Successful Trades</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="h-8 w-8 text-emerald-600 mb-2" />
              <span className="text-3xl font-bold">5,000+</span>
              <span className="text-gray-600 dark:text-gray-400">Messages Exchanged</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <RefreshCw className="h-5 w-5 text-emerald-600" />
            <span className="font-bold">B3</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400">
              Contact Us
            </Link>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} B3. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
