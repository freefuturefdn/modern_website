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
  title: "Free Future Foundation - Empowering Nigerian Youth",
  description:
    "At Free Future Foundation, we empower Nigerian youth with the knowledge, skills, and resources to champion freedom. Through education, advocacy, and public campaigns, we aim to cultivate a generation that drives positive change and shapes a brighter future for Nigeria.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ScrollToTop />
          <AnimationProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'