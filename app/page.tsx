import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Laptop,
  Package,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
} from "lucide-react"

const categories = [
  { name: "Phones & gadgets", detail: "Phones, laptops and accessories", icon: Smartphone },
  { name: "Fashion", detail: "Clothing, shoes and accessories", icon: Shirt },
  { name: "Home & living", detail: "Furniture, appliances and more", icon: Sofa },
  { name: "Vehicles", detail: "Cars, bikes and auto essentials", icon: CarFront },
  { name: "Collectibles & equipment", detail: "Specialist gear, instruments and collectibles", icon: Package },
  { name: "Other valuables", detail: "Quality items ready for a new owner", icon: BriefcaseBusiness },
]

const locations = ["Lagos", "Ibadan", "Abeokuta"]

const steps = [
  { number: "01", title: "List what you have", description: "Add clear photos, a straight description and what you would like in exchange." },
  { number: "02", title: "Find what you need", description: "Browse listings and discover valuable items people are ready to exchange." },
  { number: "03", title: "Agree on the swap", description: "Chat, compare value and agree on a direct item-for-item exchange. No cash settlement." },
  { number: "04", title: "Exchange with care", description: "Confirm the condition, agree on a safe meeting or delivery plan, and complete your exchange." },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfcfa] text-[#17251e]">
      <div className="bg-[#073f2d] px-4 py-2 text-center text-xs font-medium tracking-wide text-emerald-50 sm:text-sm">
        Made for everyday Nigerians. Find value in what you already have.
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e5ece6] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="BarterNaija home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087a50] text-lg font-black tracking-tight text-white">B</span>
            <span className="text-[21px] font-extrabold tracking-tight text-[#123b2b]">Barter<span className="text-[#0b9a63]">Naija</span></span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <Link href="/browse" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">Explore items</Link>
            <Link href="/categories" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">Categories</Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">How it works</Link>
            <Link href="/about" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">About</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/auth/signin" className="hidden rounded-full px-4 py-2.5 text-sm font-bold text-[#244b38] transition hover:bg-[#f0f6f1] sm:inline-flex">Log in</Link>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 rounded-full bg-[#087a50] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#066642] sm:px-5">
              Join BarterNaija <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_18%,rgba(16,185,129,0.12),transparent_34%),linear-gradient(180deg,#f4faf5_0%,#fbfcfa_88%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.03fr_0.97fr] md:pb-28 md:pt-24 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cce8d7] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#087a50] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10a66b]" />
              The Nigerian way to exchange value
            </div>
            <h1 className="text-[2.8rem] font-black leading-[1.06] tracking-[-0.055em] text-[#123b2b] sm:text-6xl lg:text-[4.45rem]">
              What you have can get you <span className="text-[#0a9861]">what you need.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#586b60] sm:text-lg">
              That phone you no longer use? The furniture you want to change? The skill you can offer?
              Put it to work. Swap valuable items with people in Lagos, Ibadan and Abeokuta on BarterNaija. No cash. Just a fair exchange.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/browse" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#087a50] px-7 text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,122,80,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066642]">
                Explore what’s available <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/auth/signup" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#cbd9cf] bg-white px-7 text-sm font-bold text-[#214b36] transition hover:border-[#087a50] hover:bg-[#f5faf6]">
                List an item
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#64766b]">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#0a9861]" /> No need to sell first</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#0a9861]" /> Agree on fair value</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#bcebd0] blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#d8efb8] blur-3xl" />
            <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-[0_30px_90px_rgba(22,70,44,0.13)] sm:p-6">
              <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9a8f]">A community built around exchange</p>
                  <p className="mt-1 text-lg font-extrabold text-[#173d2c]">Swap what you have</p>
                </div>
                <span className="rounded-full bg-[#e8f7ed] px-3 py-1.5 text-xs font-bold text-[#087a50]">Naija to Naija</span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-5">
                <div className="rounded-2xl bg-[#f2f6f1] p-4">
                  <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-[#d9e8dd] to-[#b7d3c0]">
                    <Laptop className="h-16 w-16 text-[#276747]" strokeWidth={1.3} />
                  </div>
                  <p className="mt-3 text-sm font-extrabold text-[#203e2d]">Your laptop</p>
                  <p className="mt-1 text-xs text-[#718176]">Good condition</p>
                  <span className="mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#36704d]">What you offer</span>
                </div>
                <div className="rounded-2xl bg-[#f8f5ec] p-4">
                  <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-[#f2e6c9] to-[#e3c990]">
                    <Smartphone className="h-16 w-16 text-[#8a6530]" strokeWidth={1.3} />
                  </div>
                  <p className="mt-3 text-sm font-extrabold text-[#453a27]">A newer phone</p>
                  <p className="mt-1 text-xs text-[#8c806b]">What you want</p>
                  <span className="mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#8a6530]">What you need</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#073f2d] p-4 text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15"><ArrowUpRight className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">A straight-up value exchange.</p>
                  <p className="mt-1 text-xs text-emerald-100">No cash. Just valuables exchanged by agreement.</p>
                </div>
                <span className="text-xl font-black text-[#a8e7bf]">⇄</span>
              </div>
              <p className="mt-3 text-center text-[10px] text-[#91a096]">Illustrative example — not a live listing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9eee9] bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row lg:px-8">
          <p className="text-sm font-bold text-[#52665a]">Starting in Southwest Nigeria.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {locations.map((location) => <span key={location} className="rounded-full border border-[#e5ece6] bg-[#fbfcfa] px-3 py-1.5 text-xs font-semibold text-[#65766b]">{location}</span>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0a9861]">Find your next exchange</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#153c2b] sm:text-4xl">What are you looking to swap?</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#65766b]">From cars and electronics to furniture and fashion, discover valuables people are ready to exchange.</p>
          </div>
          <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-bold text-[#087a50] hover:text-[#064e37]">See all categories <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ name, detail, icon: Icon }, index) => (
            <Link key={name} href="/categories" className="group flex min-h-[154px] items-center gap-5 rounded-2xl border border-[#e7eee8] bg-white p-5 shadow-[0_4px_18px_rgba(20,55,34,0.03)] transition hover:-translate-y-1 hover:border-[#b9ddc5] hover:shadow-[0_16px_34px_rgba(20,55,34,0.08)]">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${index % 2 === 0 ? "bg-[#eaf6ed] text-[#087a50]" : "bg-[#f4f2e8] text-[#8b7440]"}`}>
                <Icon className="h-7 w-7" strokeWidth={1.7} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-extrabold text-[#203e2d]">{name}</span>
                <span className="mt-1 block text-sm leading-6 text-[#78877d]">{detail}</span>
              </span>
              <ChevronRight className="h-5 w-5 text-[#9aaba0] transition group-hover:translate-x-1 group-hover:text-[#087a50]" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#073f2d] py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="max-w-lg">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9ce2b8]">Simple by design</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">A good exchange starts with a conversation.</h2>
            <p className="mt-5 leading-8 text-emerald-100/80">BarterNaija gives you a place to discover options and discuss an exchange. You decide what works, what is fair and how to complete it.</p>
            <Link href="/how-it-works" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#075239] transition hover:bg-[#e8f7ed]">See how it works <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            {steps.map((step) => (
              <div key={step.number} className="border-t border-emerald-700/80 pt-5">
                <span className="text-sm font-black tracking-[0.14em] text-[#8fdbad]">{step.number}</span>
                <h3 className="mt-3 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-emerald-100/75">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-3 lg:px-8">
        <div className="rounded-2xl bg-[#eef7ef] p-7">
          <ShieldCheck className="h-8 w-8 text-[#087a50]" />
          <h3 className="mt-5 text-lg font-extrabold text-[#193e2c]">Trade with your eyes open</h3>
          <p className="mt-2 text-sm leading-7 text-[#66786c]">Check item condition, ask questions, agree on value and choose a sensible exchange arrangement. Never rush a deal.</p>
          <Link href="/safety" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#087a50]">Safety tips <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-2xl bg-[#f7f4eb] p-7">
          <Wrench className="h-8 w-8 text-[#987b3f]" />
          <h3 className="mt-5 text-lg font-extrabold text-[#403a2b]">Valuables, not consumables</h3>
          <p className="mt-2 text-sm leading-7 text-[#77705f]">List quality items you own and discover valuable things others are ready to exchange. Food and everyday consumables are not part of the marketplace.</p>
        </div>
        <div className="rounded-2xl bg-[#f0f4f7] p-7">
          <CircleHelp className="h-8 w-8 text-[#46647a]" />
          <h3 className="mt-5 text-lg font-extrabold text-[#263f50]">You stay in control</h3>
          <p className="mt-2 text-sm leading-7 text-[#687985]">No one decides the value of your item for you. Discuss the terms and proceed only when both parties agree.</p>
        </div>
      </section>

      <section className="px-5 pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#e7f5e9] px-6 py-14 text-center sm:px-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#087a50] shadow-sm"><Sparkles className="h-6 w-6" /></div>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight text-[#153c2b] sm:text-4xl">That thing you have could be exactly what someone needs.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5d7464]">Put it out there. Discover possibilities. Make an exchange that works for you.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#087a50] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#066642]">Get started <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/browse" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#b9d8c0] bg-white px-7 py-3.5 text-sm font-extrabold text-[#214b36] transition hover:border-[#087a50]">Browse the marketplace</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e5ece6] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087a50] font-black text-white">B</span>
              <span className="text-xl font-extrabold tracking-tight text-[#123b2b]">Barter<span className="text-[#0b9a63]">Naija</span></span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#718176]">A community for cashless exchanges of valuable items across Lagos, Ibadan and Abeokuta.</p>
            <p className="mt-5 text-xs font-semibold text-[#89968d]">Proudly built in Nigeria 🇳🇬</p>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#203e2d]">Marketplace</h3>
            <div className="mt-4 space-y-3 text-sm text-[#718176]">
              <Link className="block hover:text-[#087a50]" href="/browse">Explore items</Link>
              <Link className="block hover:text-[#087a50]" href="/categories">Categories</Link>
              <Link className="block hover:text-[#087a50]" href="/auth/signup">List an item</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#203e2d]">Learn more</h3>
            <div className="mt-4 space-y-3 text-sm text-[#718176]">
              <Link className="block hover:text-[#087a50]" href="/how-it-works">How it works</Link>
              <Link className="block hover:text-[#087a50]" href="/about">About BarterNaija</Link>
              <Link className="block hover:text-[#087a50]" href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#203e2d]">Your safety</h3>
            <div className="mt-4 space-y-3 text-sm text-[#718176]">
              <Link className="block hover:text-[#087a50]" href="/safety">Safety tips</Link>
              <Link className="block hover:text-[#087a50]" href="/privacy">Privacy</Link>
              <Link className="block hover:text-[#087a50]" href="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#edf1ed]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#89968d] sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>© {new Date().getFullYear()} BarterNaija. All rights reserved.</span>
            <span>A B9TECH CONSULTS product.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
