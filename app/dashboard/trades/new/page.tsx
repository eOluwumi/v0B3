"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

type Listing = {
  id: string
  title: string
  description: string
  offering_category: string
  image_url: string | null
  user_id: string
  location: string
}

export default function NewTradePage() {
  const { supabase, user, loading: authLoading } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [myListings, setMyListings] = useState<Listing[]>([])
  const [otherListings, setOtherListings] = useState<Listing[]>([])
  const [myListingId, setMyListingId] = useState("")
  const [requestedListingId, setRequestedListingId] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) router.replace("/auth/signin")
  }, [authLoading, user, router])

  useEffect(() => {
    if (!user) return
    let active = true
    const load = async () => {
      setLoading(true)
      const [mine, others] = await Promise.all([
        supabase.from("listings")
          .select("id,title,description,offering_category,image_url,user_id,location")
          .eq("user_id", user.id).eq("status", "active").order("created_at", { ascending: false }),
        supabase.from("listings")
          .select("id,title,description,offering_category,image_url,user_id,location")
          .neq("user_id", user.id).eq("status", "active").order("created_at", { ascending: false }),
      ])
      if (!active) return
      if (mine.error || others.error) {
        toast({ title: "Could not load listings", description: mine.error?.message || others.error?.message, variant: "destructive" })
      } else {
        setMyListings(mine.data || [])
        setOtherListings(others.data || [])
        const preselected = new URLSearchParams(window.location.search).get("listing")
        if (preselected && (others.data || []).some((item) => item.id === preselected)) setRequestedListingId(preselected)
      }
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [supabase, user, toast])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user || !myListingId || !requestedListingId) {
      toast({ title: "Choose both items", description: "Select one of your active listings and one item from another member.", variant: "destructive" })
      return
    }
    const offered = myListings.find((item) => item.id === myListingId)
    const requested = otherListings.find((item) => item.id === requestedListingId)
    if (!offered || !requested) return

    setSubmitting(true)
    const { data, error } = await supabase.from("trades").insert({
      proposer_id: user.id,
      recipient_id: requested.user_id,
      offering_listing_id: offered.id,
      requested_listing_id: requested.id,
    }).select("id").single()
    setSubmitting(false)

    if (error) {
      toast({ title: "Proposal not sent", description: error.message, variant: "destructive" })
      return
    }
    toast({ title: "Barter proposal sent", description: "The listing owner can now accept or decline your proposal." })
    router.push("/dashboard/trades")
  }

  if (authLoading || loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>
  if (!user) return null

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/dashboard/trades"><Button variant="ghost" size="icon" aria-label="Back to trades"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div><h1 className="text-2xl font-bold">Propose a barter</h1><p className="text-sm text-muted-foreground">A direct item-for-item exchange. No cash top-ups.</p></div>
        </div>
        <Card>
          <CardHeader><CardTitle>Choose the two listings</CardTitle><CardDescription>Your proposal will be sent to the owner of the item you want.</CardDescription></CardHeader>
          <CardContent>
            {myListings.length === 0 ? (
              <div className="rounded-lg border p-5 text-center">
                <p className="font-medium">You need an active listing first.</p>
                <p className="mt-1 text-sm text-muted-foreground">List a valuable item before proposing an exchange.</p>
                <Link href="/dashboard/listings/new"><Button className="mt-4">Create a listing</Button></Link>
              </div>
            ) : otherListings.length === 0 ? (
              <div className="rounded-lg border p-5 text-center">
                <p className="font-medium">No other active listings yet.</p>
                <p className="mt-1 text-sm text-muted-foreground">Check back when other members list items for exchange.</p>
                <Link href="/dashboard/listings"><Button variant="outline" className="mt-4">View your listings</Button></Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="my-listing">What are you offering?</Label>
                  <select id="my-listing" required value={myListingId} onChange={(e) => setMyListingId(e.target.value)} className="h-11 w-full rounded-md border bg-background px-3 text-sm">
                    <option value="">Select one of your active listings</option>
                    {myListings.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.location}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requested-listing">What would you like in exchange?</Label>
                  <select id="requested-listing" required value={requestedListingId} onChange={(e) => setRequestedListingId(e.target.value)} className="h-11 w-full rounded-md border bg-background px-3 text-sm">
                    <option value="">Select another member's active listing</option>
                    {otherListings.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.location}</option>)}
                  </select>
                </div>
                {requestedListingId && (
                  <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                    Your proposal will go to the owner of "{otherListings.find((item) => item.id === requestedListingId)?.title}".
                  </div>
                )}
                <Button type="submit" disabled={submitting || !myListingId || !requestedListingId} className="w-full">
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending proposal...</> : "Send barter proposal"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
