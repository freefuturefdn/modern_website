import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimationProvider from "@/components/animation-provider"
import ScrollToTop from "@/components/scroll-to-top"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Free Future Foundation",
  description:
    "At Free Future Foundation, we empower Nigerian youth with the knowledge, skills, and resources to champion freedom.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* Add favicon */}
        <link rel="icon" href="favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <AnimationProvider>
            <Header />
            {children}
            <Footer />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}