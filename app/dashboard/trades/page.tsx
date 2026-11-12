"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, Clock3, Loader2, Plus, RefreshCw, XCircle } from "lucide-react"
import Link from "next/link"

type Trade = {
  id: string
  proposer_id: string
  recipient_id: string
  offering_listing_id: string
  requested_listing_id: string
  status: "pending" | "accepted" | "completed" | "rejected" | "cancelled"
  created_at: string
  offering_listing: { title: string } | null
  requested_listing: { title: string } | null
  proposer: { full_name: string } | null
  recipient: { full_name: string } | null
}

export default function TradesPage() {
  const { supabase, user, loading: authLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState<string | null>(null)

  const fetchTrades = useCallback(async () => {
    if (!user) return
    const { data, error } = await supabase.from("trades")
      .select("id,proposer_id,recipient_id,offering_listing_id,requested_listing_id,status,created_at,offering_listing:listings!trades_offering_listing_id_fkey(title),requested_listing:listings!trades_requested_listing_id_fkey(title),proposer:profiles!trades_proposer_id_fkey(full_name),recipient:profiles!trades_recipient_id_fkey(full_name)")
      .order("created_at", { ascending: false })
    if (error) {
      toast({ title: "Could not load barter proposals", description: error.message, variant: "destructive" })
    } else {
      setTrades((data || []).map((trade: any) => ({
        ...trade,
        offering_listing: Array.isArray(trade.offering_listing) ? trade.offering_listing[0] : trade.offering_listing,
        requested_listing: Array.isArray(trade.requested_listing) ? trade.requested_listing[0] : trade.requested_listing,
      })))
    }
    setLoading(false)
  }, [supabase, user, toast])

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth/signin")
  }, [authLoading, user, router])

  useEffect(() => { fetchTrades() }, [fetchTrades])

  const act = async (trade: Trade, action: "accept" | "reject" | "cancel" | "complete") => {
    setActingId(trade.id)
    const result = action === "complete"
      ? await supabase.rpc("confirm_trade_completion", { p_trade_id: trade.id })
      : await supabase.rpc("respond_to_trade", { p_trade_id: trade.id, p_action: action })
    setActingId(null)
    if (result.error) {
      toast({ title: "Trade update failed", description: result.error.message, variant: "destructive" })
      return
    }
    toast({ title: "Trade updated", description: action === "complete" ? "Your confirmation has been recorded." : "The proposal status has changed." })
    await fetchTrades()
  }

  if (authLoading || loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>
  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold">Barter proposals</h1><p className="text-sm text-muted-foreground">Track incoming and outgoing item-for-item exchanges.</p></div>
        <Link href="/dashboard/trades/new"><Button><Plus className="mr-2 h-4 w-4" />New proposal</Button></Link>
      </div>
      {trades.length === 0 ? (
        <div className="rounded-lg border bg-white py-12 text-center dark:bg-gray-950">
          <RefreshCw className="mx-auto mb-3 h-9 w-9 text-emerald-600" />
          <h2 className="text-xl font-medium">No barter proposals yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">When you propose an exchange or someone proposes one to you, it will appear here.</p>
          <Link href="/dashboard/trades/new"><Button className="mt-5">Propose an exchange</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {trades.map((trade) => {
            const incoming = trade.recipient_id === user.id
            const partner = incoming ? trade.proposer?.full_name : trade.recipient?.full_name
            const badge = trade.status === "accepted" ? "default" : trade.status === "completed" ? "secondary" : "outline"
            return (
              <div key={trade.id} className="rounded-xl border bg-white p-4 dark:bg-gray-950">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{incoming ? "Incoming proposal" : "You proposed"}</p>
                    <h2 className="mt-1 font-semibold">{trade.offering_listing?.title || "Your item"} <span className="text-muted-foreground">⇄</span> {trade.requested_listing?.title || "Requested item"}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Trade partner · {partner || "BarterNaija member"} · {new Date(trade.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={badge as any}>{trade.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/dashboard/messages/${trade.id}`}><Button size="sm" variant="outline">Open conversation</Button></Link>
                  {trade.status === "pending" && incoming && <>
                    <Button size="sm" disabled={actingId === trade.id} onClick={() => act(trade, "accept")}>Accept</Button>
                    <Button size="sm" variant="outline" disabled={actingId === trade.id} onClick={() => act(trade, "reject")}><XCircle className="mr-1 h-4 w-4" />Decline</Button>
                  </>}
                  {(trade.status === "pending" || trade.status === "accepted") && !incoming && (
                    <Button size="sm" variant="outline" disabled={actingId === trade.id} onClick={() => act(trade, "cancel")}>Cancel proposal</Button>
                  )}
                  {trade.status === "accepted" && (
                    <Button size="sm" variant="outline" disabled={actingId === trade.id} onClick={() => act(trade, "complete")}><CheckCircle2 className="mr-1 h-4 w-4" />Confirm exchange</Button>
                  )}
                  {actingId === trade.id && <Loader2 className="h-4 w-4 animate-spin self-center" />}
                </div>
                {trade.status === "accepted" && <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />Both parties must confirm before the exchange is marked complete.</p>}
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
