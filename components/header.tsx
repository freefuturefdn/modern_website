"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

type NavItem = {
  title: string
  href: string
  children?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About",
    href: "/about",
    children: [
      { title: "About Us", href: "/about" },
      { title: "Meet the Team", href: "/team" },
      { title: "Impact", href: "/impact" },
      { title: "Annual Reports", href: "/reports" },
    ],
  },
  {
    title: "Get Involved",
    href: "/get-involved",
    children: [
      { title: "Volunteer", href: "/volunteer" },
      { title: "Partner With Us", href: "/partner" },
      // { title: "Engage With Us", href: "/engage" },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    children: [
      { title: "Books", href: "/resources/books" },
      { title: "Articles", href: "/resources/articles" },
      // { title: "Journals", href: "/resources/journals" },
    ],
  },
  {
    title: "Media",
    href: "/media",
    children: [
      { title: "Newsroom", href: "/newsroom" },
      { title: "Blog", href: "/blog" },
      { title: "Media Hits", href: "/media-hits" },
      { title: "Podcasts", href: "/podcasts" },
      { title: "Social Channels", href: "/social" },
      { title: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Events",
    href: "/events",
    children: [
      { title: "Upcoming Events", href: "/events/upcoming" },
      { title: "Past Events", href: "/events/past" },
    ],
  },
  { title: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(title)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Free Future Foundation Logo" width={40} height={40} className="mr-2" />
            <span className="text-2l font-bold text-gradient">Free Future Foundation</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <div key={item.title} className="relative group">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.children ? (
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "text-primary"
                        : "text-foreground hover:text-primary transition-colors",
                    )}
                  >
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      pathname === item.href ? "text-primary" : "text-foreground hover:text-primary transition-colors",
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </motion.div>

              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2 text-sm",
                              pathname === child.href
                                ? "bg-ash-light text-primary"
                                : "text-foreground hover:bg-ash-light hover:text-primary",
                            )}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
          >
            <Button asChild className="ml-4">
              <Link href="/donate">Donate</Link>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.title}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className={cn(
                            "flex justify-between items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                            pathname === item.href || pathname.startsWith(`${item.href}/`)
                              ? "text-primary"
                              : "text-foreground",
                          )}
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              activeDropdown === item.title ? "rotate-180" : "",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mt-1 space-y-1 border-l-2 border-ash-light"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.title}
                                  href={child.href}
                                  className={cn(
                                    "block px-3 py-2 rounded-md text-sm",
                                    pathname === child.href ? "text-primary" : "text-foreground hover:text-primary",
                                  )}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm font-medium",
                          pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
                <Button asChild className="mt-4 w-full">
                  <Link href="/donate">Donate</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

