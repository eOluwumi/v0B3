"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftRight, ClipboardList, MessageSquare, Plus, RefreshCw } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type RecentTrade = { id: string; status: string; proposer_id: string; offering_listing_id: string; requested_listing_id: string; created_at: string }

export default function DashboardPage() {
  const { supabase, user, loading } = useSupabase()
  const router = useRouter()
  const [activeListings, setActiveListings] = useState(0)
  const [pendingTrades, setPendingTrades] = useState(0)
  const [completedTrades, setCompletedTrades] = useState(0)
  const [recent, setRecent] = useState<RecentTrade[]>([])
  const [fetching, setFetching] = useState(true)

  const load = useCallback(async () => {
    if (!user) return
    setFetching(true)
    const [listingResult, tradeResult] = await Promise.all([
      supabase.from("listings").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active"),
      supabase.from("trades").select("id,status,proposer_id,offering_listing_id,requested_listing_id,created_at").or(`proposer_id.eq.${user.id},recipient_id.eq.${user.id}`).order("created_at", { ascending: false }).limit(6),
    ])
    setActiveListings(listingResult.count ?? 0)
    const rows = (tradeResult.data ?? []) as RecentTrade[]
    setRecent(rows)
    setPendingTrades(rows.filter((item) => item.status === "pending").length)
    setCompletedTrades(rows.filter((item) => item.status === "completed").length)
    setFetching(false)
  }, [supabase, user])

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/signin")
    if (user) load()
  }, [user, loading, router, load])

  if (loading || fetching) return <div className="flex min-h-screen items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin text-emerald-700" /></div>
  if (!user) return null
  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "there"

  return <DashboardLayout>
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-emerald-700">Your BarterNaija account</p><h1 className="mt-1 text-3xl font-black text-[#173d2c] dark:text-white">Welcome, {name}.</h1><p className="mt-2 text-sm text-muted-foreground">Your real listings and swap activity, all in one place.</p></div><div className="flex gap-2"><Link href="/dashboard/listings/new"><Button><Plus className="mr-2 h-4 w-4" /> List an item</Button></Link><Link href="/browse"><Button variant="outline">Browse items</Button></Link></div></div>
    <div className="grid gap-4 sm:grid-cols-3">
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-semibold">Active listings</CardTitle><ClipboardList className="h-4 w-4 text-emerald-700" /></CardHeader><CardContent><p className="text-3xl font-black">{activeListings}</p><Link href="/dashboard/listings" className="mt-2 inline-block text-xs font-semibold text-emerald-700">Manage your items →</Link></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-semibold">Pending proposals</CardTitle><ArrowLeftRight className="h-4 w-4 text-emerald-700" /></CardHeader><CardContent><p className="text-3xl font-black">{pendingTrades}</p><Link href="/dashboard/trades" className="mt-2 inline-block text-xs font-semibold text-emerald-700">Review swaps →</Link></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-semibold">Completed swaps</CardTitle><MessageSquare className="h-4 w-4 text-emerald-700" /></CardHeader><CardContent><p className="text-3xl font-black">{completedTrades}</p><p className="mt-2 text-xs text-muted-foreground">Based on your latest six proposals</p></CardContent></Card>
    </div>
    <Card className="mt-7"><CardHeader><CardTitle>Recent swap activity</CardTitle></CardHeader><CardContent>{recent.length === 0 ? <div className="py-8 text-center"><p className="font-semibold">Nothing here yet.</p><p className="mt-1 text-sm text-muted-foreground">Create a listing or browse items to start your first swap.</p><Link href="/browse"><Button className="mt-4">Explore listings</Button></Link></div> : <div className="space-y-3">{recent.map((trade) => <div key={trade.id} className="flex items-center justify-between gap-3 rounded-lg border p-3"><div><p className="text-sm font-semibold">{trade.proposer_id === user.id ? "Outgoing proposal" : "Incoming proposal"}</p><p className="text-xs text-muted-foreground">{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(trade.created_at))}</p></div><Badge variant={trade.status === "accepted" || trade.status === "completed" ? "default" : trade.status === "rejected" || trade.status === "cancelled" ? "destructive" : "secondary"}>{trade.status}</Badge></div>)}</div>}</CardContent></Card>
  </DashboardLayout>
}
