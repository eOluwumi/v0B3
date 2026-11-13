import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { B3VideoSection } from "@/components/b3-video-section"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  ChevronRight,
  Laptop,
  MapPin,
  Package,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  Repeat2,
} from "lucide-react"

const categories = [
  { name: "Phones & gadgets", detail: "Phones, laptops and accessories", icon: Smartphone, tone: "green" },
  { name: "Fashion", detail: "Clothing, shoes and accessories", icon: Shirt, tone: "clay" },
  { name: "Home & living", detail: "Furniture, appliances and more", icon: Sofa, tone: "gold" },
  { name: "Vehicles", detail: "Cars, bikes and auto essentials", icon: CarFront, tone: "blue" },
  { name: "Equipment & collectibles", detail: "Tools, instruments and specialist gear", icon: Package, tone: "green" },
  { name: "Other valuables", detail: "Quality items ready for a new owner", icon: BriefcaseBusiness, tone: "clay" },
]

const locations = ["Lagos", "Ibadan", "Abeokuta"]

const steps = [
  { number: "01", title: "Put up what you have", description: "Add clear photos, describe the condition honestly and say what kind of item you would like in return." },
  { number: "02", title: "Find what you need", description: "Browse valuables listed by people in your launch cities and spot an exchange worth discussing." },
  { number: "03", title: "Talk it through", description: "Message the owner, compare condition and agree on a fair item-for-item swap. No cash top-ups." },
  { number: "04", title: "Make the exchange", description: "Inspect the items, agree on a safe handover and confirm when both sides are satisfied." },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf5] text-[#17251e]">
      <div className="bg-[#073f2d] px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-[#f7f3e8] sm:text-sm">
        Good things deserve a second home. Join the B3 Revolution.
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e8e9df] bg-[#fffefa]/95 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="B3: Bring Back Barter home">
            <Image src="/b3-logo.png" alt="B3" width={42} height={42} className="h-10 w-10 rounded-xl object-contain" />
            <span className="flex flex-col leading-tight"><span className="text-[21px] font-black tracking-tight text-[#123b2b]">B3</span><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0b9a63]">Bring Back Barter</span></span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <Link href="/browse" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">Explore items</Link>
            <Link href="/#categories" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">Categories</Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">How it works</Link>
            <Link href="/about" className="text-sm font-semibold text-[#43564b] transition hover:text-[#087a50]">Our story</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/auth/signin" className="hidden rounded-full px-4 py-2.5 text-sm font-bold text-[#244b38] transition hover:bg-[#f0f3e9] sm:inline-flex">Log in</Link>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 rounded-full bg-[#087a50] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#066642] sm:px-5">
              Join the community <ArrowUpRight className="h-4 w-4" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#f4f1e7]">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 12% 18%, rgba(203,151,83,.18), transparent 24%), radial-gradient(circle at 82% 70%, rgba(8,122,80,.13), transparent 28%)" }} />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1fr_0.94fr] md:pb-24 md:pt-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8d8c6] bg-[#fffefa]/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#087a50] shadow-sm">
              <MapPin className="h-3.5 w-3.5" /> Lagos · Ibadan · Abeokuta
            </div>
            <h1 className="text-[2.85rem] font-black leading-[1.04] tracking-[-0.055em] text-[#123b2b] sm:text-6xl lg:text-[4.55rem]">
              That thing you have? It could be <span className="text-[#0a9861]">someone else’s next favourite.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#58675d] sm:text-lg">
              The spare phone in your drawer. The chair you’re ready to replace. The gadget you no longer use.
              Put it up for exchange and find something you actually need—with people in your city.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/browse" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#087a50] px-7 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(8,122,80,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066642]">
                See what’s up for exchange <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/auth/signup" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#c8cbbb] bg-[#fffefa] px-7 text-sm font-extrabold text-[#214b36] transition hover:border-[#087a50] hover:bg-white">
                Put an item up
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[#647267]">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#0a9861]" /> No cash top-ups</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#0a9861]" /> Agree item for item</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#0a9861]" /> You decide what’s fair</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#d9b46e]/40 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-[#9ac8a4]/50 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#073f2d] p-5 shadow-[0_30px_80px_rgba(18,59,43,0.22)] sm:p-7">
              <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.11]" viewBox="0 0 480 520" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="adire-weave" width="42" height="42" patternUnits="userSpaceOnUse">
                    <path d="M21 2 L40 21 L21 40 L2 21 Z M21 11 L30 21 L21 31 L12 21 Z" fill="none" stroke="#f4d58b" strokeWidth="1.2" />
                    <circle cx="21" cy="21" r="2" fill="#f4d58b" />
                  </pattern>
                </defs>
                <rect width="480" height="520" fill="url(#adire-weave)" />
              </svg>
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b9d9c2]">The B3 idea</p>
                    <p className="mt-1 text-xl font-black text-white sm:text-2xl">One good thing for another.</p>
                  </div>
                  <span className="rounded-full border border-[#d6bd79]/40 bg-[#d6bd79]/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#f3d995]">No cash swap</span>
                </div>

                <div className="relative grid grid-cols-2 gap-3 py-6 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[#f5f2e8] p-3.5 text-[#203e2d] sm:p-4">
                    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-[#dce8d9] sm:h-40">
                      <div className="absolute -left-5 -top-8 h-24 w-24 rounded-full bg-[#b8d2b8]" />
                      <Laptop className="relative h-[76px] w-[76px] text-[#276747]" strokeWidth={1.25} />
                      <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#276747]">Offer</span>
                    </div>
                    <p className="mt-3 text-sm font-black">Your laptop</p>
                    <p className="mt-1 text-[11px] font-medium text-[#718176]">Still in good shape</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#f7f0df] p-3.5 text-[#453a27] sm:p-4">
                    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-[#ead9b6] sm:h-40">
                      <div className="absolute -right-5 -top-8 h-24 w-24 rounded-full bg-[#d8bd87]" />
                      <Smartphone className="relative h-[76px] w-[76px] text-[#8a6530]" strokeWidth={1.25} />
                      <span className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#8a6530]">Looking for</span>
                    </div>
                    <p className="mt-3 text-sm font-black">A newer phone</p>
                    <p className="mt-1 text-[11px] font-medium text-[#8c806b]">What you need</p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#073f2d] bg-[#d6bd79] text-[#173d2c] shadow-lg">
                    <Repeat2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d6bd79] text-[#173d2c]"><BadgeCheck className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold">A fair exchange, agreed by both sides.</p>
                    <p className="mt-1 text-xs text-[#d4e6d8]">Discuss the details. Inspect the items. Make the swap safely.</p>
                  </div>
                </div>
                <p className="mt-3 text-center text-[10px] font-medium text-[#b9d9c2]">Illustrative example—not a live listing.</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-[#e8e1cf] bg-[#fffefa] px-4 py-3 shadow-xl sm:block">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#8a8069]">Our first communities</p>
              <p className="mt-1 text-sm font-black text-[#173d2c]">Lagos · Ibadan · Abeokuta</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e9df] bg-[#fffefa] py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row lg:px-8">
          <p className="text-sm font-extrabold text-[#52665a]">Starting close to home.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {locations.map((location, index) => (
              <span key={location} className="inline-flex items-center gap-2 rounded-full border border-[#e5e5d8] bg-[#fbfaf5] px-4 py-2 text-xs font-bold text-[#52665a]">
                <span className={index === 0 ? "h-2 w-2 rounded-full bg-[#087a50]" : index === 1 ? "h-2 w-2 rounded-full bg-[#c58b45]" : "h-2 w-2 rounded-full bg-[#607f9b]"} />
                {location}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0a9861]">Plenty to exchange</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#153c2b] sm:text-4xl">What have you got in mind?</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#65766b]">Browse durable, useful items—from everyday gadgets to furniture and vehicles. Good condition and honest descriptions matter.</p>
          </div>
          <Link href="/browse" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#087a50] hover:text-[#064e37]">Explore the marketplace <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ name, detail, icon: Icon, tone }) => (
            <Link key={name} href="/browse" className="group flex min-h-[154px] items-center gap-5 rounded-2xl border border-[#e8e8de] bg-[#fffefa] p-5 shadow-[0_4px_18px_rgba(20,55,34,0.03)] transition hover:-translate-y-1 hover:border-[#b9ddc5] hover:shadow-[0_16px_34px_rgba(20,55,34,0.08)]">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                tone === "green" ? "bg-[#eaf6ed] text-[#087a50]" : tone === "clay" ? "bg-[#f8ece4] text-[#a75f3f]" : tone === "gold" ? "bg-[#f4f0df] text-[#94753c]" : "bg-[#eaf0f2] text-[#527487]"
              }`}>
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
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#d6bd79]">Straightforward, by design</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">No need to sell before you can get what you need.</h2>
            <p className="mt-5 leading-8 text-emerald-100/80">Find someone whose needs meet yours. Have a proper conversation, agree on the items and arrange the exchange yourselves. B3 is here to make that connection easier.</p>
            <Link href="/how-it-works" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f4e7c6] px-6 py-3.5 text-sm font-extrabold text-[#075239] transition hover:bg-white">See how it works <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            {steps.map((step) => (
              <div key={step.number} className="border-t border-emerald-700/80 pt-5">
                <span className="text-sm font-black tracking-[0.14em] text-[#d6bd79]">{step.number}</span>
                <h3 className="mt-3 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-emerald-100/75">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <B3VideoSection />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-3 lg:px-8">
        <div className="rounded-2xl border border-[#e4eadf] bg-[#eef5e9] p-7">
          <ShieldCheck className="h-8 w-8 text-[#087a50]" />
          <h3 className="mt-5 text-lg font-extrabold text-[#193e2c]">Take your time. Check well.</h3>
          <p className="mt-2 text-sm leading-7 text-[#66786c]">Inspect the item, ask questions, agree on value and choose a sensible exchange arrangement. Never rush a deal.</p>
          <Link href="/how-it-works#safety" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#087a50]">Read our safety tips <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="rounded-2xl border border-[#eee5d5] bg-[#f7f0e3] p-7">
          <Package className="h-8 w-8 text-[#987b3f]" />
          <h3 className="mt-5 text-lg font-extrabold text-[#403a2b]">Valuables, not consumables.</h3>
          <p className="mt-2 text-sm leading-7 text-[#77705f]">List useful, durable items you own. Food and everyday consumables are not part of this marketplace.</p>
        </div>
        <div className="rounded-2xl border border-[#e1e8eb] bg-[#edf2f3] p-7">
          <CheckCircle2 className="h-8 w-8 text-[#466b7a]" />
          <h3 className="mt-5 text-lg font-extrabold text-[#263f50]">You stay in control.</h3>
          <p className="mt-2 text-sm leading-7 text-[#687985]">No one sets the value of your item for you. Discuss the terms and proceed only when both people agree.</p>
        </div>
      </section>

      <section className="px-5 pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#e8f1e5] px-6 py-14 text-center sm:px-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fffefa] text-[#087a50] shadow-sm"><Sparkles className="h-6 w-6" /></div>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight text-[#153c2b] sm:text-4xl">That item you’re not using might be just what someone needs.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5d7464]">Give it another purpose. Find a fair swap. Keep good things moving.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#087a50] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#066642]">Join the B3 Revolution <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/browse" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#b9d8c0] bg-[#fffefa] px-7 py-3.5 text-sm font-extrabold text-[#214b36] transition hover:border-[#087a50]">Browse items</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e5e7dc] bg-[#fffefa]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="B3: Bring Back Barter home">
              <Image src="/b3-logo.png" alt="B3" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="flex flex-col leading-tight">
                <strong className="text-xl font-black tracking-tight text-[#123b2b]">B3</strong>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b9a63]">Bring Back Barter</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-semibold leading-6 text-[#315c43]">Barter is back & better. Join the B3 Revolution.</p>
            <p className="mt-2 max-w-xs text-sm leading-7 text-[#718176]">A community for cashless exchanges of valuable items across Lagos, Ibadan and Abeokuta.</p>
            <p className="mt-5 text-xs font-semibold text-[#89968d]">Proudly built in Nigeria.</p>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#203e2d]">Marketplace</h3>
            <div className="mt-4 space-y-3 text-sm text-[#718176]">
              <Link className="block hover:text-[#087a50]" href="/browse">Explore items</Link>
              <Link className="block hover:text-[#087a50]" href="/#categories">Categories</Link>
              <Link className="block hover:text-[#087a50]" href="/auth/signup">List an item</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#203e2d]">Learn more</h3>
            <div className="mt-4 space-y-3 text-sm text-[#718176]">
              <Link className="block hover:text-[#087a50]" href="/how-it-works">How it works</Link>
              <Link className="block hover:text-[#087a50]" href="/about">About B3</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#203e2d]">Your safety</h3>
            <div className="mt-4 space-y-3 text-sm text-[#718176]">
              <Link className="block hover:text-[#087a50]" href="/how-it-works#safety">Safety tips</Link>
              <span className="block">Inspect before you exchange</span>
              <span className="block">Agree clearly. Meet safely.</span>
            </div>
          </div>
        </div>
        <div className="border-t border-[#edf1ed]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#89968d] sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>© {new Date().getFullYear()} B3: Bring Back Barter. All rights reserved.</span>
            <span>A product of <a href="https://b9tech.barternaija.com.ng" target="_blank" rel="noopener noreferrer" className="font-bold text-[#315c43] underline-offset-4 hover:underline">B9 TECH CONSULT LTD</a>.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
