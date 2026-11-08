"use client"

import { FormEvent, useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare, RefreshCw, Send } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

type Trade = { id: string; proposer_id: string; recipient_id: string; offering_listing_id: string; requested_listing_id: string; status: string }
type Message = { id: string; trade_id: string; sender_id: string; recipient_id: string; body: string; created_at: string }

export default function TradeMessagesPage() {
  const params = useParams<{ tradeId: string }>()
  const tradeId = params.tradeId
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [trade, setTrade] = useState<Trade | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!user || !tradeId) return
    const tradeResult = await supabase.from("trades").select("*").eq("id", tradeId).single()
    if (tradeResult.error) {
      toast({ title: "Conversation unavailable", description: tradeResult.error.message, variant: "destructive" })
      setLoading(false)
      return
    }
    const currentTrade = tradeResult.data as Trade
    if (currentTrade.proposer_id !== user.id && currentTrade.recipient_id !== user.id) {
      toast({ title: "Access denied", description: "This conversation does not belong to your account.", variant: "destructive" })
      router.replace("/dashboard/messages")
      return
    }
    setTrade(currentTrade)
    const result = await supabase.from("messages").select("id,trade_id,sender_id,recipient_id,body,created_at").eq("trade_id", tradeId).order("created_at", { ascending: true })
    if (result.error) toast({ title: "Unable to load messages", description: result.error.message, variant: "destructive" })
    else setMessages((result.data ?? []) as Message[])
    setLoading(false)
  }, [supabase, user, tradeId, toast, router])

  useEffect(() => {
    if (!userLoading && !user) router.replace("/auth/signin")
    if (user) load()
  }, [user, userLoading, router, load])

  useEffect(() => {
    if (!tradeId) return
    const channel = supabase.channel(`trade-messages-${tradeId}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `trade_id=eq.${tradeId}` }, () => { load() }).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [supabase, tradeId, load])

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user || !trade || !draft.trim()) return
    const recipientId = trade.proposer_id === user.id ? trade.recipient_id : trade.proposer_id
    setSending(true)
    const { error } = await supabase.from("messages").insert({ trade_id: trade.id, sender_id: user.id, recipient_id: recipientId, body: draft.trim() })
    if (error) toast({ title: "Message not sent", description: error.message, variant: "destructive" })
    else { setDraft(""); await load() }
    setSending(false)
  }

  if (userLoading || loading) return <div className="flex min-h-screen items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin text-emerald-700" /></div>
  if (!user || !trade) return null

  return <DashboardLayout>
    <div className="mb-5 flex items-center gap-3"><Link href="/dashboard/messages"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link><div><h1 className="text-xl font-black">Swap conversation</h1><p className="text-xs text-muted-foreground">Keep all exchange discussions linked to this proposal.</p></div></div>
    <section className="flex min-h-[65vh] flex-col rounded-2xl border bg-card">
      <div className="flex items-center gap-3 border-b p-4"><div className="rounded-full bg-emerald-100 p-2 text-emerald-800"><MessageSquare className="h-5 w-5" /></div><div><p className="font-semibold">BarterNaija member</p><p className="text-xs capitalize text-muted-foreground">Proposal status: {trade.status}</p></div></div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.length === 0 ? <p className="py-12 text-center text-sm text-muted-foreground">No messages yet. Start the conversation with a clear, respectful note.</p> : messages.map((message) => <div key={message.id} className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${message.sender_id === user.id ? "bg-emerald-700 text-white" : "bg-muted"}`}><p className="whitespace-pre-wrap text-sm">{message.body}</p><time className={`mt-2 block text-[10px] ${message.sender_id === user.id ? "text-emerald-100" : "text-muted-foreground"}`}>{new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.created_at))}</time></div></div>)}</div>
      <form onSubmit={send} className="flex gap-2 border-t p-3"><Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message about the proposed exchange..." maxLength={5000} /><Button type="submit" disabled={sending || !draft.trim()}><Send className="mr-2 h-4 w-4" />{sending ? "Sending" : "Send"}</Button></form>
    </section>
  </DashboardLayout>
}
