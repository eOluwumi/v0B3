"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/components/supabase-provider"
import { useRouter } from "next/navigation"
import { ListFilter, MessageSquare, RefreshCw, Settings, LogOut, Menu, X, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: ListFilter,
    },
    {
      name: "My Listings",
      href: "/dashboard/listings",
      icon: ListFilter,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "Trades",
      href: "/dashboard/trades",
      icon: RefreshCw,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const informalNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: ListFilter,
    },
    {
      name: "My Items",
      href: "/dashboard/listings",
      icon: ListFilter,
    },
    {
      name: "My Gist",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      name: "My Trades",
      href: "/dashboard/trades",
      icon: RefreshCw,
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white dark:bg-gray-950">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/b3-logo.png" alt="B3 Logo" width={30} height={30} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">B3</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {informalNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  ? "bg-gray-100 dark:bg-gray-800 text-green-600 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div
        className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: mobileNavOpen ? 1 : 0, pointerEvents: mobileNavOpen ? "auto" : "none" }}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-950 transform transition-transform duration-300 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/b3-logo.png" alt="B3 Logo" width={30} height={30} />
              <span className="text-xl font-bold text-gray-900 dark:text-white">B3</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {informalNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    ? "bg-gray-100 dark:bg-gray-800 text-green-600 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
                onClick={() => setMobileNavOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white dark:bg-gray-950">
          <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/b3-logo.png" alt="B3 Logo" width={30} height={30} />
            <span className="font-bold text-gray-900 dark:text-white">B3</span>
          </Link>
          <div className="w-5" /> {/* Empty div for spacing */}
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
