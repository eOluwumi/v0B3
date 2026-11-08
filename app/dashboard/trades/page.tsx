"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, RefreshCw, ArrowLeftRight } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

type Trade = { id: string; proposer_id: string; recipient_id: string; offering_listing_id: string; requested_listing_id: string; status: string; created_at: string }
type Listing = { id: string; title: string; image_url: string | null }

export default function TradesPage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [trades, setTrades] = useState<Trade[]>([])
  const [listings, setListings] = useState<Record<string, Listing>>({})
  const [loading, setLoading] = useState(true)

  const loadTrades = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase.from("trades").select("*").or(`proposer_id.eq.${user.id},recipient_id.eq.${user.id}`).order("created_at", { ascending: false })
    if (error) {
      toast({ title: "Unable to load trades", description: error.message, variant: "destructive" })
      setLoading(false)
      return
    }
    const rows = (data ?? []) as Trade[]
    setTrades(rows)
    const ids = Array.from(new Set(rows.flatMap((trade) => [trade.offering_listing_id, trade.requested_listing_id])))
    if (ids.length) {
      const result = await supabase.from("listings").select("id,title,image_url").in("id", ids)
      if (result.error) toast({ title: "Some listing details could not be loaded", description: result.error.message, variant: "destructive" })
      else setListings(Object.fromEntries(((result.data ?? []) as Listing[]).map((item) => [item.id, item])))
    } else setListings({})
    setLoading(false)
  }, [supabase, user, toast])

  useEffect(() => {
    if (!userLoading && !user) router.replace("/auth/signin")
    if (user) loadTrades()
  }, [user, userLoading, router, loadTrades])

  const updateStatus = async (trade: Trade, status: "accepted" | "rejected" | "cancelled") => {
    if (!user) return
    const { error } = await supabase.from("trades").update({ status, updated_at: new Date().toISOString() }).eq("id", trade.id)
    if (error) {
      toast({ title: "Trade not updated", description: error.message, variant: "destructive" })
      return
    }
    toast({ title: "Trade updated", description: `The proposal is now ${status}.` })
    loadTrades()
  }

  if (userLoading || loading) return <div className="flex min-h-screen items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin text-emerald-700" /></div>
  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-black">My swaps</h1><p className="mt-1 text-sm text-muted-foreground">Your real exchange proposals and their current status.</p></div>
        <Link href="/dashboard/trades/new"><Button><Plus className="mr-2 h-4 w-4" /> Propose a swap</Button></Link>
      </div>
      {trades.length === 0 ? <Card className="py-12 text-center"><CardContent><ArrowLeftRight className="mx-auto h-10 w-10 text-emerald-700" /><h2 className="mt-4 text-xl font-bold">No swap proposals yet</h2><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">When you propose or receive a swap, it will appear here. No demo trades are shown.</p><Link href="/browse"><Button className="mt-5">Browse available items</Button></Link></CardContent></Card> : <div className="space-y-4">{trades.map((trade) => {
        const outgoing = trade.proposer_id === user.id
        const offered = listings[trade.offering_listing_id]
        const requested = listings[trade.requested_listing_id]
        return <Card key={trade.id}><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardTitle className="text-base">{outgoing ? "You proposed this swap" : "Incoming swap proposal"}</CardTitle><CardDescription>{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(trade.created_at))}</CardDescription></div><Badge variant={trade.status === "accepted" ? "default" : trade.status === "rejected" || trade.status === "cancelled" ? "destructive" : "secondary"}>{trade.status}</Badge></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-lg bg-muted p-3"><p className="text-[11px] font-bold uppercase text-muted-foreground">{outgoing ? "You offer" : "They offer"}</p><p className="mt-1 font-semibold">{offered?.title ?? "Listing unavailable"}</p></div><ArrowLeftRight className="mx-auto h-5 w-5 text-emerald-700" /><div className="rounded-lg bg-muted p-3"><p className="text-[11px] font-bold uppercase text-muted-foreground">{outgoing ? "You requested" : "Your item"}</p><p className="mt-1 font-semibold">{requested?.title ?? "Listing unavailable"}</p></div></div>{trade.status === "pending" && <div className="mt-4 flex flex-wrap gap-2">{outgoing ? <Button variant="outline" size="sm" onClick={() => updateStatus(trade,"cancelled")}>Withdraw proposal</Button> : <><Button size="sm" onClick={() => updateStatus(trade,"accepted")}>Accept swap</Button><Button size="sm" variant="outline" onClick={() => updateStatus(trade,"rejected")}>Decline</Button></>}</div>}</CardContent></Card>
      })}</div>}
    </DashboardLayout>
  )
}
