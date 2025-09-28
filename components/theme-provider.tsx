"use client"

// Light-only ThemeProvider: formerly wrapped next-themes. Now it simply renders children.
// This prevents dark mode or system preference switching. Remove any next-themes usage elsewhere.
import * as React from "react"

export interface LightOnlyThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: LightOnlyThemeProviderProps) {
  // Ensure document element never gains a 'dark' class (in case of persisted class from cache)
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark")
      // Optionally enforce a data attribute if components relied on it
      document.documentElement.setAttribute("data-theme", "light")
    }
  }, [])

  return <>{children}</>
}
