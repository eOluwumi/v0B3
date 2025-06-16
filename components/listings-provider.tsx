"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface ListingsContextType {
  refreshTrigger: number
  triggerRefresh: () => void
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export function ListingsProvider({ children }: { children: React.ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1)
  }, [])

  return <ListingsContext.Provider value={{ refreshTrigger, triggerRefresh }}>{children}</ListingsContext.Provider>
}

export function useListingsRefresh() {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error("useListingsRefresh must be used within a ListingsProvider")
  }
  return context
}
