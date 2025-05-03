"use client" // Add this directive at the top of the file

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(false) // State for popup visibility
  const { toast } = useToast()

  async function handleSubscribe(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Insert email into the newsletter_subscribers table
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }])

      if (error) {
        throw error
      }

      // Show success popup
      setIsPopupVisible(true)

      // Clear the email input
      setEmail("")
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-footer text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Organization Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex flex-col items-center md:items-start">
              <Image src="/logo-white.png" alt="Free Future Foundation Logo" width={60} height={60} className="mb-2" />
              <h3 className="text-xl font-bold">Free Future Foundation</h3>
            </div>
            <p className="text-sm opacity-80">
              Empowering Nigerian youth with the knowledge, skills, and resources to champion freedom.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com/freefuturefdn" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100093109492720" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/free_tribers?igsh=aTBjdGh2M2ZvcTU1" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com/company/freeff" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://youtube.com/@freefuturefdn" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="mt-6 space-y-2">
              <h4 className="text-lg font-bold">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Port-Harcourt, Nigeria</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">+234 702 697 3674</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">info@freefuturefoundation.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: About Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm hover:text-primary transition-colors">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-sm hover:text-primary transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-sm hover:text-primary transition-colors">
                  Annual Reports
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold pt-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/volunteer" className="text-sm hover:text-primary transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-sm hover:text-primary transition-colors">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/books" className="text-sm hover:text-primary transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/resources/articles" className="text-sm hover:text-primary transition-colors">
                  Articles
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold pt-4">Media</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/newsroom" className="text-sm hover:text-primary transition-colors">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/social" className="text-sm hover:text-primary transition-colors">
                  Social Channels
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="text-sm hover:text-primary transition-colors">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Events & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Events</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events/upcoming" className="text-sm hover:text-primary transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/events/past" className="text-sm hover:text-primary transition-colors">
                  Past Events
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-bold pt-4">Newsletter</h3>
            <p className="text-sm opacity-80">Subscribe to our newsletter for updates on our activities and events.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 placeholder:text-white/50"
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Success Popup */}
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Subscription Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for subscribing to our newsletter. Stay tuned for updates!
              </p>
              <Button onClick={() => setIsPopupVisible(false)}>Close</Button>
            </div>
          </div>
        )}

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Free Future Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

