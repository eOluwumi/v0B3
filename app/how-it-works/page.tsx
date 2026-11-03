import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Camera, Search, MessageCircle, Handshake, MapPin, ShieldCheck } from "lucide-react"

const steps = [
  { number: "01", title: "Create your account", description: "Sign up and set your location in Lagos, Ibadan or Abeokuta so you can connect with people within the launch area." },
  { number: "02", title: "List a valuable item", description: "Add clear photos, describe its condition honestly and state the kind of valuable item you want in return. Consumables are not accepted." },
  { number: "03", title: "Find a suitable match", description: "Browse available items, review the details and contact the owner when you see a potential exchange." },
  { number: "04", title: "Agree and exchange", description: "Discuss condition and relative value, agree on the exact item-for-item swap, then arrange a safe inspection and handover. BarterNaija does not settle swaps with cash." },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] text-[#17251e] dark:bg-gray-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-[#e5ece6] bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-black tracking-tight text-[#123b2b] dark:text-white" aria-label="BarterNaija home">
            Barter<span className="text-[#0b9a63]">Naija</span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#52665a] hover:text-[#087a50] dark:text-gray-300">
            <ArrowLeft className="h-4 w-4" /> Back to BarterNaija
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#cce8d7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#087a50] dark:border-emerald-900 dark:bg-gray-900 dark:text-emerald-300">
            <MapPin className="h-4 w-4" /> Lagos · Ibadan · Abeokuta
          </p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-[#123b2b] sm:text-5xl dark:text-white">How BarterNaija works</h1>
          <p className="mt-5 text-lg leading-8 text-[#617267] dark:text-gray-300">
            Exchange valuable items directly with other people. No cash top-ups or cash settlement—just an item-for-item agreement that both sides accept.
          </p>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = [Camera, Search, MessageCircle, Handshake][index]
            return (
              <Card key={step.number} className="border-[#e4ece5] bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6ed] text-[#087a50] dark:bg-emerald-950 dark:text-emerald-300"><Icon className="h-6 w-6" /></span>
                    <div>
                      <CardDescription className="font-bold tracking-widest text-[#0a9861]">STEP {step.number}</CardDescription>
                      <CardTitle className="mt-1 text-xl text-[#203e2d] dark:text-white">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent><p className="leading-7 text-[#65766b] dark:text-gray-300">{step.description}</p></CardContent>
              </Card>
            )
          })}
        </section>

        <section className="mt-10 grid gap-5 rounded-3xl bg-[#073f2d] p-7 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-200"><ShieldCheck className="h-5 w-5" /> Make every exchange carefully</div>
            <h2 className="mt-3 text-2xl font-black">Inspect first. Agree clearly. Meet safely.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-100/80">Check ownership and item condition, keep conversations clear, and choose a public, sensible handover location. Do not proceed if anything feels wrong.</p>
          </div>
          <Link href="/auth/signup"><Button className="bg-white text-[#075239] hover:bg-emerald-50">Join BarterNaija <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </section>
      </main>

      <footer className="border-t border-[#e5ece6] py-6 text-center text-xs text-[#89968d] dark:border-gray-800">
        <span>BarterNaija is a product by </span><a href="https://b9tech.barternaija.com.ng" target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-4 hover:underline">B9TECH CONSULTS</a>
      </footer>
    </div>
  )
}
