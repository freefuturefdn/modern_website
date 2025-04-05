import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Organization Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex flex-col items-center md:items-start">
              <Image src="/logo.png" alt="Free Future Foundation Logo" width={60} height={60} className="mb-2" />
              <h3 className="text-xl font-bold">Free Future Foundation</h3>
            </div>
            <p className="text-sm opacity-80">
              Empowering Nigerian youth with the knowledge, skills, and resources to champion freedom.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://facebook.com" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://youtube.com" className="hover:text-primary transition-colors">
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
                  <span className="text-sm">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">+234 123 456 7890</span>
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
              <li>
                <Link href="/engage" className="text-sm hover:text-primary transition-colors">
                  Engage With Us
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-sm hover:text-primary transition-colors">
                  Donate
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
              <li>
                <Link href="/resources/journals" className="text-sm hover:text-primary transition-colors">
                  Journals
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
              {/* <li>
                <Link href="/media-hits" className="text-sm hover:text-primary transition-colors">
                  Media Hits
                </Link>
              </li> */}
              <li>
                <Link href="/podcasts" className="text-sm hover:text-primary transition-colors">
                  Podcasts
                </Link>
              </li>
              <li>
                <Link href="/social" className="text-sm hover:text-primary transition-colors">
                  Social Channels
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
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 placeholder:text-white/50"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Free Future Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

