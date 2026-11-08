"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, RefreshCw, PackageOpen } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

type Listing = { id: string; title: string; description: string; offering_category: string; seeking_category: string; location: string; image_url: string | null; user_id: string }

export default function NewTradePage() {
  const { supabase, user, loading: userLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [mine, setMine] = useState<Listing[]>([])
  const [available, setAvailable] = useState<Listing[]>([])
  const [offeringId, setOfferingId] = useState("")
  const [requestedId, setRequestedId] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!userLoading && !user) router.replace("/auth/signin")
    if (!user) return
    let active = true
    async function load() {
      setLoading(true)
      const [mineResult, availableResult] = await Promise.all([
        supabase.from("listings").select("id,title,description,offering_category,seeking_category,location,image_url,user_id").eq("user_id", user!.id).eq("status", "active").order("created_at", { ascending: false }),
        supabase.from("listings").select("id,title,description,offering_category,seeking_category,location,image_url,user_id").eq("status", "active").neq("user_id", user!.id).order("created_at", { ascending: false }),
      ])
      if (!active) return
      if (mineResult.error || availableResult.error) setError(mineResult.error?.message || availableResult.error?.message || "Unable to load listings.")
      else {
        setMine((mineResult.data ?? []) as Listing[])
        setAvailable((availableResult.data ?? []) as Listing[])
      }
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [user, userLoading, router, supabase])

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user || !offeringId || !requestedId) return
    const requested = available.find((item) => item.id === requestedId)
    if (!requested) return
    setSubmitting(true)
    const { data, error: tradeError } = await supabase.from("trades").insert({
      proposer_id: user.id,
      recipient_id: requested.user_id,
      offering_listing_id: offeringId,
      requested_listing_id: requested.id,
      status: "pending",
    }).select("id").single()
    if (tradeError) {
      toast({ title: "Trade proposal not sent", description: tradeError.message, variant: "destructive" })
      setSubmitting(false)
      return
    }
    if (message.trim()) {
      const { error: messageError } = await supabase.from("messages").insert({
        trade_id: data.id,
        sender_id: user.id,
        recipient_id: requested.user_id,
        body: message.trim(),
      })
      if (messageError) toast({ title: "Proposal sent; message not delivered", description: messageError.message, variant: "destructive" })
    }
    toast({ title: "Proposal sent", description: "Your item-for-item swap proposal is now in the other member's trades." })
    router.push("/dashboard/trades")
    setSubmitting(false)
  }

  if (userLoading || loading) return <div className="flex min-h-screen items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin text-emerald-700" /></div>
  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/dashboard/trades"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div><h1 className="text-2xl font-black">Propose a swap</h1><p className="text-sm text-muted-foreground">A direct exchange: one valuable item for another. No cash settlement.</p></div>
      </div>
      {error ? <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p> : null}
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>What are you offering?</CardTitle><CardDescription>Choose one of your active listings.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {mine.length === 0 ? <div className="py-6 text-center"><PackageOpen className="mx-auto h-8 w-8 text-emerald-700" /><p className="mt-2 text-sm text-muted-foreground">You need an active listing before proposing a swap.</p><Link href="/dashboard/listings/new"><Button className="mt-4">Create a listing</Button></Link></div> : mine.map((item) => <label key={item.id} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${offeringId === item.id ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "border-border"}`}><input type="radio" name="offering" value={item.id} checked={offeringId === item.id} onChange={() => setOfferingId(item.id)} className="mt-1 accent-emerald-700" /><span className="min-w-0"><span className="block font-semibold">{item.title}</span><span className="text-xs text-muted-foreground">{item.offering_category} · {item.location}</span></span></label>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>What would you like in return?</CardTitle><CardDescription>Choose an active listing from another member.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {available.length === 0 ? <p className="py-6 text-center text-sm text-muted-foreground">No other active listings are available yet.</p> : available.map((item) => <label key={item.id} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${requestedId === item.id ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "border-border"}`}><input type="radio" name="requested" value={item.id} checked={requestedId === item.id} onChange={() => setRequestedId(item.id)} className="mt-1 accent-emerald-700" /><span className="min-w-0"><span className="block font-semibold">{item.title}</span><span className="text-xs text-muted-foreground">{item.offering_category} · {item.location}</span><span className="mt-1 block text-xs text-muted-foreground">Seeking: {item.seeking_category}</span></span></label>)}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Add a note (optional)</CardTitle><CardDescription>Introduce your offer and suggest any details worth discussing.</CardDescription></CardHeader>
          <CardContent><textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={2000} rows={3} placeholder="Hello, I'm interested in your item. Here's why I think this could be a fair swap..." className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600" /></CardContent>
          <CardContent className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground">Both parties must agree. BarterNaija does not facilitate cash top-ups or cash settlement.</p><Button type="submit" disabled={submitting || !offeringId || !requestedId || mine.length === 0 || available.length === 0}>{submitting ? "Sending proposal..." : "Send swap proposal"}</Button></CardContent>
        </Card>
      </form>
    </DashboardLayout>
  )
}
