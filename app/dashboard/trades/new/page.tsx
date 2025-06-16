"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, RefreshCw, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Listing = {
  id: string
  title: string
  description: string
  category: string
  image_url: string | null
  user_id: string
  user_name: string
}

export default function NewTradePage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedListing, setSelectedListing] = useState<string | null>(null)
  const [selectedUserListing, setSelectedUserListing] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [step, setStep] = useState(1)

  // Mock data for demonstration
  const [myListings, setMyListings] = useState<Listing[]>([
    {
      id: "1",
      title: "Vintage Camera",
      description: "A beautiful vintage film camera in excellent condition",
      category: "Electronics",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user123",
      user_name: "Current User",
    },
    {
      id: "2",
      title: "Mountain Bike",
      description: "High-quality mountain bike, barely used",
      category: "Sports Equipment",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user123",
      user_name: "Current User",
    },
    {
      id: "3",
      title: "Leather Jacket",
      description: "Genuine leather jacket, size M",
      category: "Clothing",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user123",
      user_name: "Current User",
    },
  ])

  const [otherListings, setOtherListings] = useState<Listing[]>([
    {
      id: "101",
      title: "Professional Microphone",
      description: "Studio-quality microphone with stand and pop filter",
      category: "Electronics",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user456",
      user_name: "Sarah Johnson",
    },
    {
      id: "102",
      title: "Gaming Console",
      description: "Latest gaming console with two controllers",
      category: "Electronics",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user789",
      user_name: "Mike Peterson",
    },
    {
      id: "103",
      title: "Acoustic Guitar",
      description: "Beautiful acoustic guitar with case",
      category: "Musical Instruments",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user101",
      user_name: "Lisa Wong",
    },
    {
      id: "104",
      title: "Tablet",
      description: "10-inch tablet, perfect condition",
      category: "Electronics",
      image_url: "/placeholder.svg?height=100&width=100",
      user_id: "user202",
      user_name: "David Chen",
    },
  ])

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/auth/signin")
    }
  }, [user, userLoading, router])

  const filteredOtherListings = otherListings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.user_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) {
        throw new Error("You must be logged in to propose a trade")
      }

      if (!selectedListing || !selectedUserListing) {
        throw new Error("Please select both listings for the trade")
      }

      // In a real app, you would insert the trade into your database
      // For now, we'll simulate a successful trade proposal

      setTimeout(() => {
        toast({
          title: "Trade proposed!",
          description: "Your trade proposal has been sent successfully.",
        })
        router.push("/dashboard/trades")
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to propose trade",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <RefreshCw className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <Link href="/dashboard/trades" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Propose New Barter Deal</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>New Trade Proposal</CardTitle>
          <CardDescription>
            Join the #BringBackBarter movement! Select items to trade and prove that barter is back & better
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Step 1: Select what you want to barter</h3>
                <RadioGroup
                  value={selectedUserListing || ""}
                  onValueChange={setSelectedUserListing}
                  className="space-y-3"
                >
                  {myListings.map((listing) => (
                    <div key={listing.id} className="flex">
                      <RadioGroupItem value={listing.id} id={`listing-${listing.id}`} className="mt-3" />
                      <Label htmlFor={`listing-${listing.id}`} className="flex-1 ml-3">
                        <div className="flex items-start gap-3 p-3 rounded-md border border-gray-200 dark:border-gray-800">
                          {listing.image_url && (
                            <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                              <Image
                                src={listing.image_url || "/placeholder.svg"}
                                alt={listing.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{listing.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {listing.description}
                            </p>
                            <div className="mt-1">
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                                {listing.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedUserListing}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                >
                  Next: Select Item to Receive
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Step 2: Select what you want to receive in this barter</h3>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search listings by title, description, category or user..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <RadioGroup value={selectedListing || ""} onValueChange={setSelectedListing} className="space-y-3">
                  {filteredOtherListings.map((listing) => (
                    <div key={listing.id} className="flex">
                      <RadioGroupItem value={listing.id} id={`other-listing-${listing.id}`} className="mt-3" />
                      <Label htmlFor={`other-listing-${listing.id}`} className="flex-1 ml-3">
                        <div className="flex items-start gap-3 p-3 rounded-md border border-gray-200 dark:border-gray-800">
                          {listing.image_url && (
                            <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                              <Image
                                src={listing.image_url || "/placeholder.svg"}
                                alt={listing.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{listing.title}</h4>
                              <span className="text-xs text-gray-500">{listing.user_name}</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                              {listing.description}
                            </p>
                            <div className="mt-1">
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                                {listing.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedListing}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                >
                  Next: Add Message
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Step 3: Review your barter proposal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">You're offering:</h4>
                    {selectedUserListing && (
                      <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                        {(() => {
                          const listing = myListings.find((l) => l.id === selectedUserListing)
                          if (!listing) return null
                          return (
                            <div className="flex items-start gap-3">
                              {listing.image_url && (
                                <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                  <Image
                                    src={listing.image_url || "/placeholder.svg"}
                                    alt={listing.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium">{listing.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                  {listing.description}
                                </p>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">You'll receive:</h4>
                    {selectedListing && (
                      <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                        {(() => {
                          const listing = otherListings.find((l) => l.id === selectedListing)
                          if (!listing) return null
                          return (
                            <div className="flex items-start gap-3">
                              {listing.image_url && (
                                <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                  <Image
                                    src={listing.image_url || "/placeholder.svg"}
                                    alt={listing.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{listing.title}</h4>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                  From: {listing.user_name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                  {listing.description}
                                </p>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a personal message to the trade proposal..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !selectedListing || !selectedUserListing}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                >
                  {loading ? "Sending barter proposal..." : "Send Barter Proposal"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
