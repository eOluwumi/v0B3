import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, MapPin, ShieldCheck, Repeat2, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] text-[#17251e] dark:bg-gray-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-[#e5ece6] bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-xl font-black tracking-tight text-[#123b2b] dark:text-white" aria-label="BarterNaija home">Barter<span className="text-[#0b9a63]">Naija</span></Link>
          <div className="flex items-center gap-4"><a href="https://b9tech.barternaija.com.ng" target="_blank" rel="noopener noreferrer" aria-label="Visit B9TECH CONSULTS"><Image src="/b9-logo.png" alt="B9TECH CONSULTS" width={104} height={34} className="h-8 w-auto object-contain" /></a><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#52665a] hover:text-[#087a50] dark:text-gray-300"><ArrowLeft className="h-4 w-4" /> Back to BarterNaija</Link><ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#cce8d7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#087a50] dark:border-emerald-900 dark:bg-gray-900 dark:text-emerald-300"><MapPin className="h-4 w-4" /> Built for our first communities</p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-[#123b2b] sm:text-5xl dark:text-white">About BarterNaija</h1>
          <p className="mt-5 text-lg leading-8 text-[#617267] dark:text-gray-300">A Nigerian community where people can exchange valuable things they own for valuable things they need—without turning the swap into a cash transaction.</p>
        </section>

        <Card className="mx-auto mt-12 max-w-4xl border-[#e4ece5] bg-white dark:border-gray-800 dark:bg-gray-900">
          <CardHeader><CardTitle className="text-2xl text-[#173d2c] dark:text-white">Why we are building it</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-base leading-8 text-[#65766b] dark:text-gray-300">
            <p>Good items can sit unused in one home while someone nearby is looking for exactly that kind of item. BarterNaija creates a place for those people to find one another and discuss a direct exchange.</p>
            <p>The idea is straightforward: list what you have, say what you would like in return, compare the items honestly and proceed only when both people agree. There are no cash top-ups or cash settlements through the platform.</p>
            <p>Our initial community focus is Lagos, Ibadan and Abeokuta. We are building around real local connections, clear listings and careful exchanges—not unsupported claims about scale or activity.</p>
          </CardContent>
        </Card>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="border-[#e4ece5] bg-white dark:border-gray-800 dark:bg-gray-900"><CardHeader><Users className="h-7 w-7 text-[#087a50]" /><CardTitle className="text-lg dark:text-white">Community first</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-[#65766b] dark:text-gray-300">A space to connect with people nearby and discuss exchanges respectfully.</CardContent></Card>
          <Card className="border-[#e4ece5] bg-white dark:border-gray-800 dark:bg-gray-900"><CardHeader><Repeat2 className="h-7 w-7 text-[#087a50]" /><CardTitle className="text-lg dark:text-white">Valuables for valuables</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-[#65766b] dark:text-gray-300">Cars, phones, electronics, fashion, furniture, equipment and other durable valuables—not food or everyday consumables.</CardContent></Card>
          <Card className="border-[#e4ece5] bg-white dark:border-gray-800 dark:bg-gray-900"><CardHeader><ShieldCheck className="h-7 w-7 text-[#087a50]" /><CardTitle className="text-lg dark:text-white">Careful exchanges</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-[#65766b] dark:text-gray-300">We encourage clear descriptions, item inspection and safe handover arrangements.</CardContent></Card>
        </section>

        <section className="mt-12 rounded-3xl bg-[#073f2d] p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-black sm:text-3xl">Have something worth exchanging?</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-emerald-100/80">Join the community and start by listing a valuable item you own.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup"><Button className="bg-white text-[#075239] hover:bg-emerald-50">Join BarterNaija <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="/how-it-works"><Button variant="outline" className="border-white text-white hover:bg-white/10">See how it works</Button></Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#e5ece6] py-6 text-center text-xs text-[#89968d] dark:border-gray-800"><span>A product by </span><a href="https://b9tech.barternaija.com.ng" target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-4 hover:underline">B9TECH CONSULTS</a></footer>
    </div>
  )
}
