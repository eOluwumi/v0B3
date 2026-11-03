import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/components/supabase-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BarterNaija — A smarter way to exchange value",
  description: "Swap goods and services with people across Nigeria. Your stuff has value—put it to work on BarterNaija.",
  applicationName: "BarterNaija",
  metadataBase: new URL("https://barternaija.com.ng"),
  openGraph: {
    title: "BarterNaija — A smarter way to exchange value",
    description: "Discover a practical way to exchange goods and services across Nigeria.",
    url: "https://barternaija.com.ng",
    siteName: "BarterNaija",
    locale: "en_NG",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
