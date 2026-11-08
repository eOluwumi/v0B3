"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MessageSquare, RefreshCw, Search } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = { id: string; trade_id: string; sender_id: string; recipient_id: string; body: string; created_at: string }
type Trade = { id: string; proposer_id: string; offering_listing_id: string; requested_listing_id: string }

export default function MessagesPage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [trades, setTrades] = useState<Record<string, Trade>>({})
  const [listings, setListings] = useState<Record<string, string>>({})
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userLoading && !user) router.replace("/auth/signin")
    if (!user) return
    let active = true
    async function load() {
      const result = await supabase.from("messages").select("id,trade_id,sender_id,recipient_id,body,created_at").or(`sender_id.eq.${user!.id},recipient_id.eq.${user!.id}`).order("created_at", { ascending: false })
      if (!active) return
      const rows = (result.data ?? []) as Message[]
      setMessages(rows)
      const tradeIds = Array.from(new Set(rows.map((row) => row.trade_id)))
      if (tradeIds.length) {
        const tradeResult = await supabase.from("trades").select("id,proposer_id,offering_listing_id,requested_listing_id").in("id", tradeIds)
        const tradeRows = (tradeResult.data ?? []) as Trade[]
        setTrades(Object.fromEntries(tradeRows.map((trade) => [trade.id, trade])))
        const listingIds = Array.from(new Set(tradeRows.flatMap((trade) => [trade.offering_listing_id, trade.requested_listing_id])))
        if (listingIds.length) {
          const listingResult = await supabase.from("listings").select("id,title").in("id", listingIds)
          setListings(Object.fromEntries((listingResult.data ?? []).map((listing: {id:string;title:string}) => [listing.id, listing.title])))
        }
      }
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [user, userLoading, router, supabase])

  const conversations = useMemo(() => {
    const latest = new Map<string, Message>()
    for (const message of messages) if (!latest.has(message.trade_id)) latest.set(message.trade_id, message)
    return Array.from(latest.values()).filter((message) => {
      const trade = trades[message.trade_id]
      const title = trade ? `${listings[trade.offering_listing_id] ?? ""} ${listings[trade.requested_listing_id] ?? ""}` : ""
      return title.toLowerCase().includes(search.toLowerCase()) || message.body.toLowerCase().includes(search.toLowerCase())
    })
  }, [messages, trades, listings, search])

  if (userLoading || loading) return <div className="flex min-h-screen items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin text-emerald-700" /></div>
  if (!user) return null

  return <DashboardLayout>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-black">Messages</h1><p className="mt-1 text-sm text-muted-foreground">Conversations attached to your swap proposals.</p></div><div className="relative w-full max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages or items" className="pl-9" /></div></div>
    {conversations.length === 0 ? <div className="rounded-2xl border border-dashed p-12 text-center"><MessageSquare className="mx-auto h-10 w-10 text-emerald-700" /><h2 className="mt-4 text-xl font-bold">No conversations yet</h2><p className="mt-2 text-sm text-muted-foreground">Send a note with a swap proposal and your conversation will appear here. No sample messages are displayed.</p><Link href="/browse"><Button className="mt-5">Browse items</Button></Link></div> : <div className="divide-y rounded-xl border bg-card">{conversations.map((message) => { const trade = trades[message.trade_id]; return <Link key={message.trade_id} href={`/dashboard/messages/${message.trade_id}`} className="flex items-start gap-4 p-4 transition hover:bg-muted/60"><div className="rounded-full bg-emerald-100 p-3 text-emerald-800"><MessageSquare className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold">{trade ? `${listings[trade.offering_listing_id] ?? "Item"} ↔ ${listings[trade.requested_listing_id] ?? "Item"}` : "Swap conversation"}</p><time className="text-xs text-muted-foreground">{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.created_at))}</time></div><p className="mt-1 truncate text-sm text-muted-foreground">{message.sender_id === user.id ? "You: " : ""}{message.body}</p></div></Link> })}</div>}
  </DashboardLayout>
}
