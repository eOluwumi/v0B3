"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, RefreshCw, MessageSquare, Star, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

type RecentTrade = {
  id: string
  status: string
  proposer_id: string
  recipient_id: string
  created_at: string
  offering_listing: { title: string } | null
  requested_listing: { title: string } | null
  proposer: { full_name: string } | null
  recipient: { full_name: string } | null
}

export default function DashboardPage() {
  const { supabase, user, loading } = useSupabase()
  const router = useRouter()
  const [activeListings, setActiveListings] = useState<number | null>(null)
  const [pendingTrades, setPendingTrades] = useState<number | null>(null)
  const [completedTrades, setCompletedTrades] = useState<number | null>(null)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  const loadDashboard = useCallback(async () => {
    if (!user) return
    setDataLoading(true)
    const [listingCount, tradesResult, reviewsResult] = await Promise.all([
      supabase.from("listings").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active"),
      supabase.from("trades")
        .select("id,status,proposer_id,recipient_id,created_at,offering_listing:listings!trades_offering_listing_id_fkey(title),requested_listing:listings!trades_requested_listing_id_fkey(title),proposer:profiles!trades_proposer_id_fkey(full_name),recipient:profiles!trades_recipient_id_fkey(full_name)")
        .order("created_at", { ascending: false }),
      supabase.from("reviews").select("rating").eq("reviewee_id", user.id),
    ])
    if (listingCount.error) setActiveListings(0)
    else setActiveListings(listingCount.count || 0)
    if (tradesResult.error) {
      setPendingTrades(0)
      setCompletedTrades(0)
      setRecentTrades([])
    } else {
      const trades = (tradesResult.data || []).map((trade: any) => ({
        ...trade,
        offering_listing: Array.isArray(trade.offering_listing) ? trade.offering_listing[0] : trade.offering_listing,
        requested_listing: Array.isArray(trade.requested_listing) ? trade.requested_listing[0] : trade.requested_listing,
      }))
      setPendingTrades(trades.filter((trade) => trade.status === "pending").length)
      setCompletedTrades(trades.filter((trade) => trade.status === "completed").length)
      setRecentTrades(trades.slice(0, 5))
    }
    if (!reviewsResult.error && reviewsResult.data?.length) {
      setUserRating(reviewsResult.data.reduce((sum, review) => sum + review.rating, 0) / reviewsResult.data.length)
    } else {
      setUserRating(null)
    }
    setDataLoading(false)
  }, [supabase, user])

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/signin")
  }, [user, loading, router])

  useEffect(() => { loadDashboard() }, [loadDashboard])

  if (loading || dataLoading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>
  if (!user) return null

  const displayName = user.user_metadata?.full_name || user.email || "Member"

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, Barter Warrior!</h1><p className="mt-1 text-xs text-muted-foreground">Signed in as {displayName}</p>
        <p className="mt-1 text-sm text-muted-foreground">You're part of the B3 Revolution. Barter is back & better.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between p-4"><CardTitle className="text-sm font-medium">Active listings</CardTitle><Plus className="h-4 w-4 text-emerald-600" /></CardHeader><CardContent className="px-4 pb-4 pt-0"><p className="text-2xl font-bold">{activeListings ?? "—"}</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between p-4"><CardTitle className="text-sm font-medium">Pending proposals</CardTitle><MessageSquare className="h-4 w-4 text-emerald-600" /></CardHeader><CardContent className="px-4 pb-4 pt-0"><p className="text-2xl font-bold">{pendingTrades ?? "—"}</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between p-4"><CardTitle className="text-sm font-medium">Completed exchanges</CardTitle><RefreshCw className="h-4 w-4 text-emerald-600" /></CardHeader><CardContent className="px-4 pb-4 pt-0"><p className="text-2xl font-bold">{completedTrades ?? "—"}</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between p-4"><CardTitle className="text-sm font-medium">Your rating</CardTitle><Star className="h-4 w-4 text-amber-500" /></CardHeader><CardContent className="px-4 pb-4 pt-0"><p className="text-2xl font-bold">{userRating === null ? "—" : userRating.toFixed(1) + "/5"}</p></CardContent></Card>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link href="/dashboard/listings/new"><Button className="w-full"><Plus className="mr-2 h-4 w-4" />Create a listing</Button></Link>
        <Link href="/dashboard/trades/new"><Button variant="outline" className="w-full">Propose a barter</Button></Link>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle>Recent proposals</CardTitle><p className="mt-1 text-sm text-muted-foreground">Your latest incoming and outgoing exchanges.</p></div>
          <Link href="/dashboard/trades" className="text-sm font-medium text-emerald-700 hover:underline">View all <ArrowRight className="inline h-3 w-3" /></Link>
        </CardHeader>
        <CardContent>
          {recentTrades.length === 0 ? (
            <div className="py-8 text-center"><p className="font-medium">No barter activity yet</p><p className="mt-1 text-sm text-muted-foreground">Create a listing or propose an exchange to get started.</p></div>
          ) : (
            <div className="divide-y">
              {recentTrades.map((trade) => (
                <Link key={trade.id} href={`/dashboard/messages/${trade.id}`} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                  <div><p className="font-medium">{trade.offering_listing?.title || "Your item"} <span className="text-muted-foreground">⇄</span> {trade.requested_listing?.title || "Requested item"}</p><p className="mt-1 text-xs text-muted-foreground">{(trade.proposer_id === user.id ? "Outgoing to " + (trade.recipient?.full_name || "member") : "Incoming from " + (trade.proposer?.full_name || "member"))} · {new Date(trade.created_at).toLocaleDateString()}</p></div>
                  <Badge variant={trade.status === "accepted" ? "default" : "outline"}>{trade.status}</Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
