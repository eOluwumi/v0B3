import type React from "react"
import { ListingsProvider } from "@/components/listings-provider"
import { DashboardAuthGuard } from "@/components/dashboard-auth-guard"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardAuthGuard><ListingsProvider>{children}</ListingsProvider></DashboardAuthGuard>
}
