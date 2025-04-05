"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { MediaHit } from "@/lib/supabase"

export default function MediaHitsPage() {
  const [mediaHits, setMediaHits] = useState<MediaHit[]>([])
  const [filteredHits, setFilteredHits] = useState<MediaHit[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    async function fetchMediaHits() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Free Future Foundation Launches Youth Leadership Program",
            outlet: "Nigerian Tribune",
            summary:
              "Coverage of our new program aimed at equipping 500 young Nigerians with leadership skills by the end of 2024.",
            url: "https://example.com/news/1",
            published_at: "2024-03-05",
            image_url: "/placeholder.svg?height=400&width=600",
          },
          {
            id: 2,
            title: "Economic Freedom Index Shows Challenges for Nigerian Youth",
            outlet: "Business Day",
            summary:
              "Our research on economic freedom in Nigeria was featured in this in-depth analysis of challenges facing young entrepreneurs.",
            url: "https://example.com/news/2",
            published_at: "2024-02-15",
            image_url: "/placeholder.svg?height=400&width=600",
          },
          {
            id: 3,
            title: "Interview: Kelechi Nwannunu on Youth Empowerment",
            outlet: "Channels TV",
            summary:
              "Our founder discussed the importance of empowering Nigerian youth with knowledge about freedom and individual rights.",
            url: "https://example.com/news/3",
            published_at: "2024-01-20",
            image_url: "/placeholder.svg?height=400&width=600",
          },
          {
            id: 4,
            title: "Free Future Foundation Partners with Global Liberty Institute",
            outlet: "The Guardian Nigeria",
            summary:
              "Coverage of our new international partnership aimed at enhancing our advocacy efforts in Nigeria.",
            url: "https://example.com/news/4",
            published_at: "2024-01-10",
            image_url: "/placeholder.svg?height=400&width=600",
          },
          {
            id: 5,
            title: "Economic Freedom Workshop Draws Hundreds in Lagos",
            outlet: "Punch Newspapers",
            summary:
              "Our recent workshop on economic liberty and entrepreneurship attracted over 200 participants from across Nigeria.",
            url: "https://example.com/news/5",
            published_at: "2023-12-05",
            image_url: "/placeholder.svg?height=400&width=600",
          },
          {
            id: 6,
            title: "Opinion: Why Nigerian Youth Need Economic Education",
            outlet: "Premium Times",
            summary:
              "An opinion piece by our Research Director on the importance of economic education for Nigerian youth.",
            url: "https://example.com/news/6",
            published_at: "2023-11-15",
            image_url: "/placeholder.svg?height=400&width=600",
          },
        ]

        setMediaHits(data)
        setFilteredHits(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching media hits:", error)
        setLoading(false)
      }
    }

    fetchMediaHits()
  }, [])

  useEffect(() => {
    // Filter and sort media hits based on search query and sort order
    let filtered = [...mediaHits]

    if (searchQuery) {
      filtered = filtered.filter(
        (hit) =>
          hit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hit.outlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hit.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    } else if (sortOrder === "outlet") {
      filtered.sort((a, b) => a.outlet.localeCompare(b.outlet))
    }

    setFilteredHits(filtered)
  }, [searchQuery, sortOrder, mediaHits])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-ash-light">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">Media Coverage</h1>
            <p className="text-lg text-muted-foreground">Free Future Foundation in the news and media.</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search media coverage..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="outlet">Media Outlet (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Media Hits Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-ash rounded-t-lg" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-ash rounded w-3/4" />
                    <div className="h-4 bg-ash rounded w-1/2" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredHits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHits.map((hit, index) => (
                <AnimatedCard
                  key={hit.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image src={hit.image_url || "/placeholder.svg"} alt={hit.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(hit.published_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{hit.title}</h3>
                    <p className="text-primary font-medium mb-3">{hit.outlet}</p>
                    <p className="text-muted-foreground mb-4">{hit.summary}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={hit.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Read Full Article
                      </Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No media coverage found</h3>
              <p className="text-muted-foreground mb-4">
                No media hits match your search criteria. Please try a different search term.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSortOrder("newest")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading title="Press Contact" subtitle="For media inquiries and interview requests" center />

          <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
            <p className="text-muted-foreground mb-6">
              If you're a journalist or media representative interested in covering our work or interviewing our team,
              please contact our Communications Manager:
            </p>
            <div className="space-y-2">
              <p className="font-bold">Ngozi Eze</p>
              <p>Communications Manager</p>
              <p>Email: ngozi.eze@freefuturefoundation.org</p>
              <p>Phone: +234 123 456 7890</p>
            </div>
            <Button className="mt-6" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

