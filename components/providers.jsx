"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { FavoritesProvider } from "./favorites-provider"

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </NextThemesProvider>
    </SessionProvider>
  )
}
