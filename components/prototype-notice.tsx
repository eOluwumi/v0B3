"use client"

import { Info } from "lucide-react"

export function PrototypeNotice() {
  return (
    <div
      role="status"
      className="flex items-start justify-center gap-2 border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-950 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Prototype preview: some listings, activity figures, conversations and trade actions may be illustrative or simulated. Do not rely on this site to complete real exchanges or payments.
      </span>
    </div>
  )
}
