import type React from "react"
import { ListingsProvider } from "@/components/listings-provider"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <ListingsProvider>{children}</ListingsProvider>
}
