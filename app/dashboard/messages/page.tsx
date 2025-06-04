"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { RefreshCw, Search, User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Conversation = {
  id: string
  other_user_id: string
  other_user_name: string
  last_message: string
  last_message_time: string
  unread_count: number
  listing_id: string
  listing_title: string
}

export default function MessagesPage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/auth/signin")
    } else if (user) {
      fetchConversations()
    }
  }, [user, userLoading, router])

  const fetchConversations = async () => {
    try {
      // This is a simplified example - in a real app, you'd need a more complex query
      // to get conversations with other users, including the last message
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          id,
          other_user_id,
          other_user_name,
          last_message,
          last_message_time,
          unread_count,
          listing_id,
          listing_title
        `)
        .eq("user_id", user?.id)
        .order("last_message_time", { ascending: false })

      if (error) {
        throw error
      }

      // In a real app, you might need to fetch additional user data
      setConversations(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch conversations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.other_user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.listing_title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // For demo purposes, let's create some mock conversations
  const mockConversations: Conversation[] = [
    {
      id: "1",
      other_user_id: "user1",
      other_user_name: "Sarah Johnson",
      last_message: "Is the camera still available for trade?",
      last_message_time: "2023-06-02T14:30:00Z",
      unread_count: 2,
      listing_id: "listing1",
      listing_title: "Vintage Camera",
    },
    {
      id: "2",
      other_user_id: "user2",
      other_user_name: "Mike Peterson",
      last_message: "I can meet tomorrow to exchange the items.",
      last_message_time: "2023-06-01T09:15:00Z",
      unread_count: 0,
      listing_id: "listing2",
      listing_title: "Mountain Bike",
    },
    {
      id: "3",
      other_user_id: "user3",
      other_user_name: "Lisa Wong",
      last_message: "Thanks for the trade! Left you a 5-star rating.",
      last_message_time: "2023-05-30T16:45:00Z",
      unread_count: 0,
      listing_id: "listing3",
      listing_title: "Leather Jacket",
    },
  ]

  const displayConversations = loading ? [] : conversations.length > 0 ? filteredConversations : mockConversations

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <RefreshCw className="h-8 w-8 text-emerald-600" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin">
            <RefreshCw className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
      ) : displayConversations.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-white dark:bg-gray-950">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
              <RefreshCw className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-medium">No Messages Yet</h3>
            <p className="text-muted-foreground max-w-md">
              When you start trading with other users, your conversations will appear here.
            </p>
            <Link href="/browse">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-950">
          {displayConversations.map((conversation, index) => (
            <Link
              key={conversation.id}
              href={`/dashboard/messages/${conversation.id}`}
              className={cn(
                "flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
                index !== displayConversations.length - 1 && "border-b",
              )}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{conversation.other_user_name}</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{conversation.last_message_time}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{conversation.last_message}</p>
              </div>
              {conversation.unread_count > 0 && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                  {conversation.unread_count}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
