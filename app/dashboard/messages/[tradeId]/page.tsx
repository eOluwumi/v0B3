"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, CheckCircle2, Loader2, Send } from "lucide-react"
import Link from "next/link"

type Trade = {
  id: string
  proposer_id: string
  recipient_id: string
  status: string
  requested_listing: { title: string } | null
}
type Message = { id: string; sender_id: string; recipient_id: string; body: string; created_at: string }

export default function TradeConversationPage() {
  const params = useParams<{ tradeId: string }>()
  const tradeId = params.tradeId
  const { supabase, user, loading: authLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [trade, setTrade] = useState<Trade | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [acting, setActing] = useState(false)

  const loadMessages = useCallback(async () => {
    const { data, error } = await supabase.from("messages")
      .select("id, sender_id, recipient_id, body, created_at")
      .eq("trade_id", tradeId).order("created_at", { ascending: true })
    if (error) {
      toast({ title: "Unable to load messages", description: error.message, variant: "destructive" })
      return
    }
    setMessages(data || [])
  }, [supabase, tradeId, toast])

  const loadTrade = useCallback(async () => {
    const { data, error } = await supabase.from("trades")
      .select("id, proposer_id, recipient_id, status, requested_listing:listings!trades_requested_listing_id_fkey(title)")
      .eq("id", tradeId).single()
    if (error) {
      toast({ title: "Unable to load barter conversation", description: error.message, variant: "destructive" })
      setTrade(null)
    } else {
      const listing = Array.isArray((data as any).requested_listing) ? (data as any).requested_listing[0] : (data as any).requested_listing
      setTrade({ ...(data as any), requested_listing: listing })
    }
    setLoading(false)
  }, [supabase, tradeId, toast])

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth/signin")
  }, [authLoading, user, router])

  useEffect(() => {
    if (!user || !tradeId) return
    loadTrade()
    loadMessages()
    const channel = supabase.channel("trade-messages-" + tradeId)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: "trade_id=eq." + tradeId }, () => loadMessages())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user, tradeId, supabase, loadTrade, loadMessages])

  const handleSend = async () => {
    if (!user || !trade || !draft.trim() || trade.status !== "accepted") return
    const recipientId = trade.proposer_id === user.id ? trade.recipient_id : trade.proposer_id
    setSending(true)
    const { error } = await supabase.from("messages").insert({
      trade_id: trade.id, sender_id: user.id, recipient_id: recipientId, body: draft.trim(),
    })
    setSending(false)
    if (error) {
      toast({ title: "Message not sent", description: error.message, variant: "destructive" })
      return
    }
    setDraft("")
    await loadMessages()
  }

  const handleTradeAction = async (action: "accept" | "reject" | "cancel" | "complete") => {
    setActing(true)
    const result = action === "complete"
      ? await supabase.rpc("confirm_trade_completion", { p_trade_id: tradeId })
      : await supabase.rpc("respond_to_trade", { p_trade_id: tradeId, p_action: action })
    setActing(false)
    if (result.error) {
      toast({ title: "Trade update failed", description: result.error.message, variant: "destructive" })
      return
    }
    toast({ title: "Trade updated", description: action === "complete" ? "Your confirmation has been recorded." : "The proposal status has been updated." })
    await loadTrade()
  }

  if (authLoading || loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>
  if (!user || !trade) return null
  const isRecipient = trade.recipient_id === user.id
  const isProposer = trade.proposer_id === user.id
  const partnerId = isProposer ? trade.recipient_id : trade.proposer_id

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/messages"><Button variant="ghost" size="icon" aria-label="Back to messages"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold">{trade.requested_listing?.title || "Barter conversation"}</h1>
            <p className="text-sm text-muted-foreground">Trade partner · {partnerId.slice(0, 8)} · {trade.status}</p>
          </div>
        </div>
        {trade.status === "pending" && isRecipient && (
          <div className="flex flex-wrap gap-2 rounded-lg border p-4">
            <p className="w-full text-sm">You have received a barter proposal. Accept it to open messaging.</p>
            <Button disabled={acting} onClick={() => handleTradeAction("accept")}>Accept proposal</Button>
            <Button disabled={acting} variant="outline" onClick={() => handleTradeAction("reject")}>Decline</Button>
          </div>
        )}
        {trade.status === "pending" && isProposer && <div className="rounded-lg border p-4 text-sm text-muted-foreground">Your proposal is awaiting the other person's response.</div>}
        {trade.status === "accepted" && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
            <p className="text-sm">Both parties must confirm the exchange before it is marked complete.</p>
            <Button variant="outline" disabled={acting} onClick={() => handleTradeAction("complete")}><CheckCircle2 className="mr-2 h-4 w-4" />Confirm exchange</Button>
          </div>
        )}
        <div className="min-h-[360px] space-y-3 rounded-lg border bg-white p-4 dark:bg-gray-950">
          {messages.length === 0 ? <p className="py-12 text-center text-sm text-muted-foreground">{trade.status === "accepted" ? "No messages yet. Start the conversation." : "Messages become available when the proposal is accepted."}</p> :
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.sender_id === user.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"}`}>
                  <p className="whitespace-pre-wrap break-words text-sm">{message.body}</p>
                  <p className={`mt-1 text-right text-[10px] ${message.sender_id === user.id ? "text-emerald-100" : "text-muted-foreground"}`}>{new Date(message.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
        </div>
        {trade.status === "accepted" && (
          <div className="flex items-end gap-2">
            <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." rows={2} maxLength={5000} />
            <Button onClick={handleSend} disabled={sending || !draft.trim()} aria-label="Send message"><Send className="h-4 w-4" /></Button>
          </div>
        )}
        {trade.status === "completed" && <p className="text-center text-sm text-emerald-700">This exchange has been confirmed by both parties.</p>}
      </div>
    </DashboardLayout>
  )
}
