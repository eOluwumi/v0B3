"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Search, MessageCircle } from "lucide-react"
import Link from "next/link"

type Trade = {
  id: string
  proposer_id: string
  recipient_id: string
  status: string
  created_at: string
  requested_listing: { title: string } | null
  latest_message?: { body: string; created_at: string } | null
}

export default function MessagesPage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!userLoading && !user) router.replace("/auth/signin")
  }, [user, userLoading, router])

  useEffect(() => {
    if (!user) return
    let active = true
    const load = async () => {
      setLoading(true)
      const { data: tradeRows, error } = await supabase
        .from("trades")
        .select("id, proposer_id, recipient_id, status, created_at, requested_listing:listings!trades_requested_listing_id_fkey(title)")
        .order("created_at", { ascending: false })

      if (error) {
        if (active) setLoading(false)
        return
      }

      const ids = (tradeRows || []).map((trade: any) => trade.id)
      let latestByTrade: Record<string, { body: string; created_at: string }> = {}
      if (ids.length) {
        const { data: messageRows } = await supabase
          .from("messages")
          .select("trade_id, body, created_at")
          .in("trade_id", ids)
          .order("created_at", { ascending: false })
        for (const message of messageRows || []) {
          if (!latestByTrade[message.trade_id]) {
            latestByTrade[message.trade_id] = { body: message.body, created_at: message.created_at }
          }
        }
      }

      if (active) {
        setTrades((tradeRows || []).map((trade: any) => ({
          ...trade,
          requested_listing: Array.isArray(trade.requested_listing) ? trade.requested_listing[0] : trade.requested_listing,
          latest_message: latestByTrade[trade.id] || null,
        })))
        setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [supabase, user])

  const filteredTrades = useMemo(() => trades.filter((trade) => {
    const title = trade.requested_listing?.title || "Barter discussion"
    const status = trade.status || ""
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      status.toLowerCase().includes(searchQuery.toLowerCase())
  }), [trades, searchQuery])

  if (userLoading || (!user && loading)) {
    return <div className="flex min-h-screen items-center justify-center"><RefreshCw className="h-8 w-8 animate-spin text-emerald-600" /></div>
  }
  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">Conversations connected to your barter proposals.</p>
        </div>
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search conversations..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="h-8 w-8 animate-spin text-emerald-600" /></div>
      ) : filteredTrades.length === 0 ? (
        <div className="rounded-lg border bg-white py-12 text-center dark:bg-gray-950">
          <MessageCircle className="mx-auto mb-3 h-9 w-9 text-emerald-600" />
          <h2 className="text-xl font-medium">No conversations yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">When someone responds to one of your barter proposals, your conversation will appear here.</p>
          <Link href="/browse"><Button className="mt-5">Browse listings</Button></Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white dark:bg-gray-950">
          {filteredTrades.map((trade, index) => {
            const otherParty = trade.proposer_id === user.id ? trade.recipient_id : trade.proposer_id
            return (
              <Link key={trade.id} href={`/dashboard/messages/${trade.id}`} className={`block p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 ${index < filteredTrades.length - 1 ? "border-b" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{trade.requested_listing?.title || "Barter discussion"}</p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{trade.latest_message?.body || "Open conversation with your trade partner"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Trade partner · {otherParty.slice(0, 8)} · {trade.status}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{new Date(trade.latest_message?.created_at || trade.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
