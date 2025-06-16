"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Plus, RefreshCw, Search, CheckCircle, Clock, XCircle, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  updated_at: string
  is_incoming: boolean
}

export default function TradesPage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [directionFilter, setDirectionFilter] = useState<string | null>(null)

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/auth/signin")
    } else if (user) {
      fetchTrades()
    }
  }, [user, userLoading, router])

  const fetchTrades = async () => {
    setLoading(true)
    // In a real app, you would fetch trades from your database
    // For now, we'll use mock data

    const mockTrades: Trade[] = [
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
        updated_at: "2023-06-02T14:30:00Z",
        is_incoming: true,
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
        updated_at: "2023-06-01T15:20:00Z",
        is_incoming: false,
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
        updated_at: "2023-05-31T10:15:00Z",
        is_incoming: false,
      },
      {
        id: "4",
        status: "rejected",
        with_user_name: "David Chen",
        offering_item_title: "Smartphone",
        receiving_item_title: "Tablet",
        created_at: "2023-05-28T11:20:00Z",
        updated_at: "2023-05-28T14:30:00Z",
        is_incoming: true,
      },
      {
        id: "5",
        status: "pending",
        with_user_name: "Emma Wilson",
        with_user_avatar: "/placeholder.svg?height=40&width=40",
        offering_item_title: "Designer Handbag",
        offering_item_image: "/placeholder.svg?height=80&width=80",
        receiving_item_title: "Wireless Headphones",
        receiving_item_image: "/placeholder.svg?height=80&width=80",
        created_at: "2023-06-03T08:45:00Z",
        updated_at: "2023-06-03T08:45:00Z",
        is_incoming: false,
      },
      {
        id: "6",
        status: "completed",
        with_user_name: "James Brown",
        offering_item_title: "Drone",
        offering_item_image: "/placeholder.svg?height=80&width=80",
        receiving_item_title: "DSLR Camera",
        receiving_item_image: "/placeholder.svg?height=80&width=80",
        created_at: "2023-05-25T13:10:00Z",
        updated_at: "2023-05-27T09:30:00Z",
        is_incoming: true,
      },
    ]

    setTrades(mockTrades)
    setLoading(false)
  }

  const handleAcceptTrade = async (id: string) => {
    try {
      // In a real app, you would update the trade status in your database
      setTrades(trades.map((trade) => (trade.id === id ? { ...trade, status: "accepted" as const } : trade)))

      toast({
        title: "Trade accepted!",
        description: "You've accepted the trade proposal.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to accept trade",
        variant: "destructive",
      })
    }
  }

  const handleRejectTrade = async (id: string) => {
    try {
      // In a real app, you would update the trade status in your database
      setTrades(trades.map((trade) => (trade.id === id ? { ...trade, status: "rejected" as const } : trade)))

      toast({
        title: "Trade rejected",
        description: "You've rejected the trade proposal.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject trade",
        variant: "destructive",
      })
    }
  }

  const handleCompleteTrade = async (id: string) => {
    try {
      // In a real app, you would update the trade status in your database
      setTrades(trades.map((trade) => (trade.id === id ? { ...trade, status: "completed" as const } : trade)))

      toast({
        title: "Trade completed!",
        description: "You've marked this trade as completed.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete trade",
        variant: "destructive",
      })
    }
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

  const filteredTrades = trades.filter((trade) => {
    // Apply search filter
    const searchMatch =
      trade.with_user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.offering_item_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.receiving_item_title.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const statusMatch = !statusFilter || trade.status === statusFilter

    // Apply direction filter
    const directionMatch =
      !directionFilter ||
      (directionFilter === "incoming" && trade.is_incoming) ||
      (directionFilter === "outgoing" && !trade.is_incoming)

    return searchMatch && statusMatch && directionMatch
  })

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">My Barter Deals</h1>
        <Link href="/dashboard/trades/new">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
            <Plus className="mr-2 h-4 w-4" /> Propose New Barter
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Barter History</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search trades..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => setStatusFilter(null)}
                    className={!statusFilter ? "bg-gray-100 dark:bg-gray-800" : ""}
                  >
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("pending")}
                    className={statusFilter === "pending" ? "bg-gray-100 dark:bg-gray-800" : ""}
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("accepted")}
                    className={statusFilter === "accepted" ? "bg-gray-100 dark:bg-gray-800" : ""}
                  >
                    Accepted
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                    className={statusFilter === "completed" ? "bg-gray-100 dark:bg-gray-800" : ""}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("rejected")}
                    className={statusFilter === "rejected" ? "bg-gray-100 dark:bg-gray-800" : ""}
                  >
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    {directionFilter === "incoming"
                      ? "Incoming"
                      : directionFilter === "outgoing"
                        ? "Outgoing"
                        : "All Trades"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setDirectionFilter(null)}>All Trades</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDirectionFilter("incoming")}>Incoming</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDirectionFilter("outgoing")}>Outgoing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin">
                    <RefreshCw className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              ) : filteredTrades.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                      <RefreshCw className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-medium">No barter deals yet</h3>
                    <p className="text-muted-foreground max-w-md">
                      {searchQuery || statusFilter || directionFilter
                        ? "Try adjusting your filters to see more barter deals."
                        : "Start the #BringBackBarter revolution by proposing your first barter deal!"}
                    </p>
                    {!searchQuery && !statusFilter && !directionFilter && (
                      <Link href="/dashboard/trades/new">
                        <Button>Propose New Barter</Button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredTrades.map((trade) => (
                    <div key={trade.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={trade.with_user_avatar || "/placeholder.svg"} alt={trade.with_user_name} />
                          <AvatarFallback>{trade.with_user_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                              <Badge variant="outline" className="text-xs">
                                {trade.is_incoming ? "Incoming" : "Outgoing"}
                              </Badge>
                            </div>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {getStatusIcon(trade.status)}
                            <span className="ml-1">{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "They're offering" : "You're offering"}
                              </p>
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
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "You'll receive" : "They'll receive"}
                              </p>
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
                        {trade.status === "pending" && trade.is_incoming && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleRejectTrade(trade.id)}
                            >
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 text-xs bg-green-600 hover:bg-green-700"
                              onClick={() => handleAcceptTrade(trade.id)}
                            >
                              Accept
                            </Button>
                          </>
                        )}
                        {trade.status === "accepted" && (
                          <Button size="sm" className="h-8 text-xs" onClick={() => handleCompleteTrade(trade.id)}>
                            Mark Complete
                          </Button>
                        )}
                        <Link href={`/dashboard/trades/${trade.id}`}>
                          <Button size="sm" variant="outline" className="h-8 text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTrades
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
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                              <Badge variant="outline" className="text-xs">
                                {trade.is_incoming ? "Incoming" : "Outgoing"}
                              </Badge>
                            </div>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "They're offering" : "You're offering"}
                              </p>
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
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "You'll receive" : "They'll receive"}
                              </p>
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
                        {trade.is_incoming && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleRejectTrade(trade.id)}
                            >
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 text-xs bg-green-600 hover:bg-green-700"
                              onClick={() => handleAcceptTrade(trade.id)}
                            >
                              Accept
                            </Button>
                          </>
                        )}
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

            <TabsContent value="accepted" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTrades
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
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                              <Badge variant="outline" className="text-xs">
                                {trade.is_incoming ? "Incoming" : "Outgoing"}
                              </Badge>
                            </div>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <RefreshCw className="h-4 w-4 text-blue-500 mr-1" />
                            <span>{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "They're offering" : "You're offering"}
                              </p>
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
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "You'll receive" : "They'll receive"}
                              </p>
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
                        <Button size="sm" className="h-8 text-xs" onClick={() => handleCompleteTrade(trade.id)}>
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="m-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTrades
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
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium truncate">{trade.with_user_name}</p>
                              <Badge variant="outline" className="text-xs">
                                {trade.is_incoming ? "Incoming" : "Outgoing"}
                              </Badge>
                            </div>
                            {getStatusBadge(trade.status)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span>{formatDate(trade.created_at)}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "They offered" : "You offered"}
                              </p>
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
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {trade.is_incoming ? "You received" : "They received"}
                              </p>
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
