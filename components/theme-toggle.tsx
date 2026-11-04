"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isLight = resolvedTheme === "light"
  const label = mounted
    ? (isLight ? "Switch to dark theme" : "Switch to light theme")
    : "Theme selector loading"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      disabled={!mounted}
      className="h-9 w-9 shrink-0"
      aria-label={label}
      title={label}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle site theme</span>
    </Button>
  )
}
