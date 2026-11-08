"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, MapPin, ArrowUpRight, PackageOpen, RefreshCw } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"
import { ThemeToggle } from "@/components/theme-toggle"

type Listing = {
  id: string
  title: string
  description: string
  offering_category: string
  seeking_category: string
  location: string
  image_url: string | null
  created_at: string
  user_id: string
}

const launchCities = ["All locations", "Lagos", "Ibadan", "Abeokuta"]

export default function BrowsePage() {
  const { supabase, configured } = useSupabase()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [city, setCity] = useState("All locations")
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    async function loadListings() {
      setLoading(true)
      setError("")
      if (!configured) {
        setError("The marketplace database is not connected yet.")
        setLoading(false)
        return
      }
      const { data, error: queryError } = await supabase
        .from("listings")
        .select("id,title,description,offering_category,seeking_category,location,image_url,created_at,user_id")
        .eq("status", "active")
        .order("created_at", { ascending: false })
      if (!active) return
      if (queryError) setError(queryError.message)
      else setListings((data ?? []) as Listing[])
      setLoading(false)
    }
    loadListings()
    return () => { active = false }
  }, [supabase, configured])

  const filtered = useMemo(() => listings.filter((listing) => {
    const text = [listing.title, listing.description, listing.offering_category, listing.seeking_category]
      .join(" ").toLowerCase()
    const matchesQuery = text.includes(query.toLowerCase())
    const matchesCity = city === "All locations" || listing.location.toLowerCase().includes(city.toLowerCase())
    return matchesQuery && matchesCity
  }), [listings, query, city])

  return (
    <main className="min-h-screen bg-[#fbfcfa] text-[#17251e]">
      <header className="sticky top-0 z-30 border-b border-[#e5ece6] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-[#123b2b]">Barter<span className="text-[#0b9a63]">Naija</span></Link>
          <div className="flex items-center gap-3">
            <Link href="/how-it-works" className="hidden text-sm font-semibold text-[#43564b] sm:block">How it works</Link>
            <Link href="/auth/signin" className="text-sm font-bold text-[#244b38]">Log in</Link>
            <Link href="/auth/signup" className="rounded-full bg-[#087a50] px-4 py-2.5 text-sm font-bold text-white">Join</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="bg-[#073f2d] px-5 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Lagos · Ibadan · Abeokuta</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Find something worth swapping.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/85">Browse valuable items people are offering for a direct exchange. No cash top-ups. No cash settlement. Just value for value.</p>
          <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-[1fr_210px]">
            <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#173d2c]">
              <Search className="h-5 w-5 text-[#0a9861]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search phones, furniture, laptops..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
            </label>
            <select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-xl border border-white/20 bg-[#0b563d] px-4 py-3 text-sm font-semibold text-white outline-none">
              {launchCities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#173d2c]">Available items</h2>
            <p className="mt-1 text-sm text-[#64766b]">{loading ? "Checking the marketplace..." : `${filtered.length} active ${filtered.length === 1 ? "listing" : "listings"}`}</p>
          </div>
          <Link href="/dashboard/listings/new" className="inline-flex items-center gap-2 rounded-full border border-[#cbd9cf] bg-white px-4 py-2.5 text-sm font-bold text-[#214b36] hover:border-[#087a50]">
            List an item <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#e5ece6] bg-white py-20 text-[#64766b]"><RefreshCw className="mr-3 h-5 w-5 animate-spin" /> Loading listings</div>
        ) : error ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <p className="font-bold text-amber-950">Marketplace connection needs attention</p>
            <p className="mt-2 text-sm text-amber-900">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cbd9cf] bg-white px-6 py-16 text-center">
            <PackageOpen className="mx-auto h-10 w-10 text-[#0a9861]" />
            <h3 className="mt-4 text-xl font-extrabold text-[#173d2c]">No matching listings yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64766b]">There are no active listings matching this search. Be among the first to put a valuable item up for exchange.</p>
            <Link href="/auth/signup" className="mt-6 inline-flex rounded-full bg-[#087a50] px-5 py-3 text-sm font-bold text-white">Join BarterNaija</Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <article key={listing.id} className="overflow-hidden rounded-2xl border border-[#e5ece6] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[4/3] bg-[#eef4ef]">
                  {listing.image_url ? <img src={listing.image_url} alt={listing.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[#83a18d]"><PackageOpen className="h-12 w-12" /></div>}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#0a9861]"><span>{listing.offering_category}</span><span className="inline-flex items-center gap-1 text-[#718178]"><MapPin className="h-3.5 w-3.5" />{listing.location}</span></div>
                  <h3 className="mt-2 text-lg font-extrabold text-[#173d2c]">{listing.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#64766b]">{listing.description}</p>
                  <div className="mt-4 rounded-xl bg-[#f2f7f2] p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-[#718178]">Looking to swap for</p><p className="mt-1 text-sm font-semibold text-[#244b38]">{listing.seeking_category}</p></div>
                  <p className="mt-4 text-xs text-[#87958b]">Listed {new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(listing.created_at))}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
