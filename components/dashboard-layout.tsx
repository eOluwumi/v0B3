"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/components/supabase-provider"
import { ListFilter, MessageSquare, RefreshCw, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps { children: React.ReactNode }

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: ListFilter },
  { name: "My Items", href: "/dashboard/listings", icon: ListFilter },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "My Trades", href: "/dashboard/trades", icon: RefreshCw },
]

function B9BrandLink({ compact = false }: { compact?: boolean }) {
  return (
    <a href="https://b9tech.barternaija.com.ng" target="_blank" rel="noopener noreferrer" aria-label="Visit B9TECH CONSULTS" className="inline-flex items-center">
      <Image src="/b9-logo.png" alt="B9TECH CONSULTS" width={compact ? 104 : 120} height={40} className={compact ? "h-8 w-auto object-contain" : "h-10 w-auto object-contain"} />
    </a>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { supabase } = useSupabase()
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const nav = (mobile = false) => (
    <nav className="flex-1 space-y-1 p-4" aria-label="Dashboard navigation">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} onClick={() => mobile && setMobileNavOpen(false)}
          className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
              ? "bg-gray-100 font-medium text-green-700 dark:bg-gray-800 dark:text-green-300"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800")}>
          <item.icon className="h-4 w-4" />{item.name}
        </Link>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-gray-900">
      <aside className="hidden w-64 flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950 md:flex">
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-800">
          <Link href="/" aria-label="BarterNaija home" className="text-lg font-black text-[#123b2b] dark:text-white">Barter<span className="text-emerald-600">Naija</span></Link>
          <div className="flex items-center gap-2"><ThemeToggle /><B9BrandLink compact /></div>
        </div>
        {nav()}
        <div className="border-t p-4 dark:border-gray-800">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {mobileNavOpen && <button type="button" aria-label="Close navigation overlay" className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileNavOpen(false)} />}
      <div className={cn("fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-white transition-transform dark:border-gray-800 dark:bg-gray-950 md:hidden", mobileNavOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-800">
          <Link href="/" onClick={() => setMobileNavOpen(false)} className="text-lg font-black text-[#123b2b] dark:text-white">Barter<span className="text-emerald-600">Naija</span></Link>
          <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}><X className="h-5 w-5" /></Button>
        </div>
        {nav(true)}
        <div className="border-t p-4 dark:border-gray-800"><Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button></div>
      </div>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b bg-white p-4 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMobileNavOpen(true)}><Menu className="h-5 w-5" /></Button>
          <Link href="/" className="font-bold text-[#123b2b] dark:text-white">Barter<span className="text-emerald-600">Naija</span></Link>
          <div className="flex items-center gap-1"><ThemeToggle /><B9BrandLink compact /></div>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
