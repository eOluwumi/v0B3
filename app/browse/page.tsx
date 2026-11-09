"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/components/supabase-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, ArrowRight, Loader2, PackageOpen } from "lucide-react"

type Listing = {
  id: string
  title: string
  description: string
  offering_category: string
  seeking_category: string
  location: string
  image_url: string | null
  created_at: string
}

const locations = ["All locations", "Lagos", "Ibadan", "Abeokuta"]

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("All locations")
  const [category, setCategory] = useState("All categories")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    supabase.from("listings")
      .select("id,title,description,offering_category,seeking_category,location,image_url,created_at")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setListings(data || [])
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  const categories = useMemo(() => ["All categories", ...Array.from(new Set(listings.map((item) => item.offering_category))).sort()], [listings])
  const filtered = useMemo(() => listings.filter((item) => {
    const term = search.trim().toLowerCase()
    const matchesSearch = !term || [item.title, item.description, item.offering_category, item.seeking_category].some((value) => value.toLowerCase().includes(term))
    return matchesSearch && (location === "All locations" || item.location === location) && (category === "All categories" || item.offering_category === category)
  }), [listings, search, location, category])

  return (
    <main className="min-h-screen bg-[#fbfcfa] text-[#17251e]">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-extrabold text-[#123b2b]">Barter<span className="text-[#0b9a63]">Naija</span></Link>
          <div className="flex items-center gap-2"><Link href="/auth/signin" className="text-sm font-semibold text-[#244b38]">Log in</Link><Link href="/auth/signup"><Button size="sm">Join BarterNaija</Button></Link></div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <Badge className="mb-3 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">Lagos · Ibadan · Abeokuta</Badge>
          <h1 className="text-3xl font-black tracking-tight text-[#123b2b] sm:text-4xl">Find something worth swapping.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#586b60]">Browse valuable items listed by members. Every exchange is agreed directly between the two parties—no cash top-ups or cash settlement.</p>
        </div>
        <div className="mb-7 grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[1fr_190px_210px]">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search items, descriptions or categories" className="pl-9" /></div>
          <select value={location} onChange={(event) => setLocation(event.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm">{locations.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm">{categories.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        {loading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-emerald-700" /></div> :
          error ? <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Could not load listings: {error}</div> :
          filtered.length === 0 ? (
            <div className="rounded-2xl border bg-white py-16 text-center">
              <PackageOpen className="mx-auto mb-3 h-10 w-10 text-emerald-700" />
              <h2 className="text-xl font-bold">No matching listings yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try another search or be the first to list an item.</p>
              <Link href="/auth/signup"><Button className="mt-5">List an item</Button></Link>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "listing" : "listings"} available</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="relative aspect-[4/3] bg-[#eef4ee]">
                      {item.image_url ? <Image src={item.image_url} alt={item.title} fill unoptimized className="object-cover" /> : <div className="flex h-full items-center justify-center text-emerald-800"><PackageOpen className="h-12 w-12" /></div>}
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between gap-2"><Badge variant="outline">{item.offering_category}</Badge><span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{item.location}</span></div>
                      <h2 className="text-lg font-bold text-[#173d2c]">{item.title}</h2>
                      <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#64766b]">{item.description}</p>
                      <div className="mt-4 rounded-lg bg-[#f4f8f4] p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-[#738579]">Looking for</p><p className="mt-1 text-sm font-semibold text-[#214b36]">{item.seeking_category}</p></div>
                      <Link href={`/dashboard/trades/new?listing=${item.id}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#087a50] px-4 py-3 text-sm font-bold text-white hover:bg-[#066642]">Propose an exchange <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
      </section>
    </main>
  )
}
