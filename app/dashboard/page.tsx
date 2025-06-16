"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, RefreshCw, MessageSquare, Star, ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Trade = {
  id: string
  status: "pending" | "accepted" | "completed" | "rejected"
  with_user_name: string
  with_user_avatar?: string
  offering_item_title: string
  offering_item_image?: string
  receiving_item_title: string
  receiving_item_image?: string
  created_at: string
}

export default function DashboardPage() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [activeListings, setActiveListings] = useState(3)
  const [pendingTrades, setPendingTrades] = useState(2)
  const [completedTrades, setCompletedTrades] = useState(5)
  const [userRating, setUserRating] = useState(4.8)
  const [recentTrades, setRecentTrades] = useState<Trade[]>([
    {
      id: "1",
      status: "pending",
      with_user_name: "Sarah Johnson",
      with_user_avatar: "/placeholder.svg?height=40&width=40",
      offering_item_title: "Vintage Camera",
      offering_item_image: "/placeholder.svg?height=80&width=80",
      receiving_item_title: "Professional Microphone",
      receiving_item_image: "/placeholder.svg?height=80&width=80",
      created_at: "2023-06-02T14:30:00Z",
    },
    {
      id: "2",
      status: "accepted",
      with_user_name: "Mike Peterson",
      with_user_avatar: "/placeholder.svg?height=40&width=40",
      offering_item_title: "Mountain Bike",
      offering_item_image: "/placeholder.svg?height=80&width=80",
      receiving_item_title: "Gaming Console",
      receiving_item_image: "/placeholder.svg?height=80&width=80",
      created_at: "2023-06-01T09:15:00Z",
    },
    {
      id: "3",
      status: "completed",
      with_user_name: "Lisa Wong",
      offering_item_title: "Leather Jacket",
      offering_item_image: "/placeholder.svg?height=80&width=80",
      receiving_item_title: "Acoustic Guitar",
      receiving_item_image: "/placeholder.svg?height=80&width=80",
      created_at: "2023-05-30T16:45:00Z",
    },
    {
      id: "4",
      status: "rejected",
      with_user_name: "David Chen",
      offering_item_title: "Smartphone",
      receiving_item_title: "Tablet",
      created_at: "2023-05-28T11:20:00Z",
    },
  ])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <RefreshCw className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "accepted":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Accepted</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "accepted":
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <DashboardLayout>
      {/* Mobile-first header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          Welcome back, Barter Warrior! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Ready to prove that barter is back & better? Let's make some sweet trades today! 🇳🇬 #BringBackBarter
        </p>
      </div>

      {/* Quick actions - Mobile optimized */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link href="/dashboard/listings/new">
          <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
            <Plus className="mr-2 h-4 w-4" /> New Listing
          </Button>
        </Link>
        <Link href="/dashboard/trades/new">
          <Button variant="outline" className="w-full border-blue-200 hover:border-blue-300 dark:border-blue-800">
            <RefreshCw className="mr-2 h-4 w-4" /> Propose Trade
          </Button>
        </Link>
      </div>

      {/* Stats cards - Mobile optimized grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-slate-200/60 dark:border-gray-800/60">
          <CardHeader className="flex flex-row items-center justify-between p-3">
            <CardTitle className="text-xs font-medium">Barter Items</CardTitle>
            <Plus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{activeListings}</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-slate-200/60 dark:border-gray-800/60">
          <CardHeader className="flex flex-row items-center justify-between p-3">
            <CardTitle className="text-xs font-medium">Barter Deals</CardTitle>
            <MessageSquare className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{pendingTrades}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-slate-200/60 dark:border-gray-800/60">
          <CardHeader className="flex flex-row items-center justify-between p-3">
            <CardTitle className="text-xs font-medium">Barter Wins</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{completedTrades}</div>
            <p className="text-xs text-muted-foreground">Successful trades</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-slate-200/60 dark:border-gray-800/60">
          <CardHeader className="flex flex-row items-center justify-between p-3">
            <CardTitle className="text-xs font-medium">Your Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold">{userRating}/5</div>
            <p className="text-xs text-muted-foreground">Based on {completedTrades} trades</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-6">
        <p className="text-sm font-medium text-green-800 dark:text-green-300 text-center">
          🔥 You're part of the #BringBackBarter revolution! Barter is back & better than ever!
        </p>
      </div>

      {/* Recent Trades - Mobile optimized */}
      <Card className="mb-6 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-slate-200/60 dark:border-gray-800/60">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Trades</CardTitle>
            <Link href="/dashboard/trades">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="px-4">
              <TabsList className="w-full grid grid-cols-4 h-9 mb-2">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-xs">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="accepted" className="text-xs">
                  Accepted
                </TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={trade.with_user_avatar || "/placeholder.svg"} alt={trade.with_user_name} />
                        <AvatarFallback>{trade.with_user_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                          {getStatusBadge(trade.status)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {getStatusIcon(trade.status)}
                          <span className="ml-1">{formatDate(trade.created_at)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You're offering</p>
                            <div className="flex items-center gap-2">
                              {trade.offering_item_image && (
                                <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                  <Image
                                    src={trade.offering_item_image || "/placeholder.svg"}
                                    alt={trade.offering_item_title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <p className="text-xs font-medium truncate">{trade.offering_item_title}</p>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You'll receive</p>
                            <div className="flex items-center gap-2">
                              {trade.receiving_item_image && (
                                <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                  <Image
                                    src={trade.receiving_item_image || "/placeholder.svg"}
                                    alt={trade.receiving_item_title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <p className="text-xs font-medium truncate">{trade.receiving_item_title}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Link href={`/dashboard/trades/${trade.id}`}>
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentTrades
                  .filter((trade) => trade.status === "pending")
                  .map((trade) => (
                    <div key={trade.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={trade.with_user_avatar || "/placeholder.svg"} alt={trade.with_user_name} />
                          <AvatarFallback>{trade.with_user_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You're offering</p>
                              <div className="flex items-center gap-2">
                                {trade.offering_item_image && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={trade.offering_item_image || "/placeholder.svg"}
                                      alt={trade.offering_item_title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-medium truncate">{trade.offering_item_title}</p>
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You'll receive</p>
                              <div className="flex items-center gap-2">
                                {trade.receiving_item_image && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={trade.receiving_item_image || "/placeholder.svg"}
                                      alt={trade.receiving_item_title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-medium truncate">{trade.receiving_item_title}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          Decline
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">
                          Accept
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="accepted" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentTrades
                  .filter((trade) => trade.status === "accepted")
                  .map((trade) => (
                    <div key={trade.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={trade.with_user_avatar || "/placeholder.svg"} alt={trade.with_user_name} />
                          <AvatarFallback>{trade.with_user_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <RefreshCw className="h-4 w-4 text-blue-500 mr-1" />
                            <span>{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You're offering</p>
                              <div className="flex items-center gap-2">
                                {trade.offering_item_image && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={trade.offering_item_image || "/placeholder.svg"}
                                      alt={trade.offering_item_title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-medium truncate">{trade.offering_item_title}</p>
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You'll receive</p>
                              <div className="flex items-center gap-2">
                                {trade.receiving_item_image && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={trade.receiving_item_image || "/placeholder.svg"}
                                      alt={trade.receiving_item_title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-medium truncate">{trade.receiving_item_title}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button size="sm" className="h-8 text-xs">
                          Complete Trade
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentTrades
                  .filter((trade) => trade.status === "completed")
                  .map((trade) => (
                    <div key={trade.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={trade.with_user_avatar || "/placeholder.svg"} alt={trade.with_user_name} />
                          <AvatarFallback>{trade.with_user_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You offered</p>
                              <div className="flex items-center gap-2">
                                {trade.offering_item_image && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={trade.offering_item_image || "/placeholder.svg"}
                                      alt={trade.offering_item_title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-medium truncate">{trade.offering_item_title}</p>
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You received</p>
                              <div className="flex items-center gap-2">
                                {trade.receiving_item_image && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={trade.receiving_item_image || "/placeholder.svg"}
                                      alt={trade.receiving_item_title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <p className="text-xs font-medium truncate">{trade.receiving_item_title}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Link href={`/dashboard/trades/${trade.id}`}>
                          <Button size="sm" variant="outline" className="h-8 text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
