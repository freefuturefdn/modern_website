"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { GalleryItem } from "@/lib/supabase"

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Economic Freedom Summit 2024",
            description:
              "Highlights from our annual summit featuring speakers from around the world discussing economic liberty.",
            image_url: "/placeholder.svg?height=600&width=800",
            event_id: 1,
            created_at: "2024-05-17",
            type: "image" as const,
          },
          {
            id: 2,
            title: "Youth Leadership Workshop in Abuja",
            description: "A hands-on workshop teaching advocacy skills to young Nigerians passionate about freedom.",
            image_url: "/placeholder.svg?height=600&width=800",
            event_id: 2,
            created_at: "2024-04-10",
            type: "image" as const,
          },
          {
            id: 3,
            title: "Community Outreach in Lagos",
            description:
              "Our team engaging with local communities to spread awareness about economic freedom and individual rights.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2024-03-25",
            type: "image" as const,
          },
          {
            id: 4,
            title: "Interview with Kelechi Nwannunu",
            description:
              "Our founder discusses the importance of empowering Nigerian youth with knowledge about freedom and individual rights.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2024-03-10",
            type: "video" as const,
            video_url: "#",
          },
          {
            id: 5,
            title: "Economic Freedom Workshop",
            description:
              "Young entrepreneurs learning about market principles and economic liberty at our workshop in Lagos.",
            image_url: "/placeholder.svg?height=600&width=800",
            event_id: 5,
            created_at: "2024-02-20",
            type: "image" as const,
          },
          {
            id: 6,
            title: "Partnership Announcement Ceremony",
            description:
              "Celebrating our new partnership with the Global Liberty Institute to enhance our advocacy efforts in Nigeria.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2024-02-05",
            type: "image" as const,
          },
          {
            id: 7,
            title: "Youth Advocacy Network Meeting",
            description: "Representatives from all 36 states gathered to coordinate nationwide advocacy efforts.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2024-01-15",
            type: "image" as const,
          },
          {
            id: 8,
            title: "Highlights from Economic Freedom Summit 2023",
            description:
              "A recap of our successful summit featuring discussions on economic liberty and policy reform.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2023-12-10",
            type: "video" as const,
            video_url: "#",
          },
          {
            id: 9,
            title: "Volunteer Training Session",
            description:
              "Our dedicated volunteers participating in a training session to enhance their skills and knowledge.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2023-11-20",
            type: "image" as const,
          },
          {
            id: 10,
            title: "Research Team at Work",
            description:
              "Behind the scenes with our research team as they analyze data for our Economic Freedom Index.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2023-11-05",
            type: "image" as const,
          },
          {
            id: 11,
            title: "Community Impact Project",
            description:
              "Our team working with local communities to implement economic freedom principles in practice.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2023-10-15",
            type: "image" as const,
          },
          {
            id: 12,
            title: "Youth Leadership Program Graduation",
            description: "Celebrating the achievements of the first cohort of our Youth Leadership Program.",
            image_url: "/placeholder.svg?height=600&width=800",
            created_at: "2023-09-30",
            type: "video" as const,
            video_url: "#",
          },
        ]

        setGalleryItems(data)
        setFilteredItems(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching gallery items:", error)
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  useEffect(() => {
    // Filter gallery items based on search query and type filter
    let filtered = [...galleryItems]

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === typeFilter)
    }

    setFilteredItems(filtered)
  }, [searchQuery, typeFilter, galleryItems])

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
            <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
            <p className="text-lg text-muted-foreground">
              Photos and videos from our events, programs, and activities across Nigeria.
            </p>
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
                placeholder="Search gallery..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Media</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-ash rounded-lg" />
                  <div className="mt-2 h-4 bg-ash rounded w-3/4" />
                  <div className="mt-1 h-3 bg-ash rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <AnimatedCard
                  key={item.id}
                  delay={index * 0.05}
                  className="cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="bg-white bg-opacity-80 rounded-full p-3">
                          <Play className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No gallery items found</h3>
              <p className="text-muted-foreground mb-4">
                No items match your search criteria. Please try a different search term or filter.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setTypeFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Media Item Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedItem.title}</DialogTitle>
              <DialogDescription>{formatDate(selectedItem.created_at)}</DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {selectedItem.type === "image" ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={selectedItem.image_url || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <div className="text-white">Video player would be here</div>
                </div>
              )}

              <p className="mt-4 text-muted-foreground">{selectedItem.description}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Submit Content Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Share Your Experience"
            subtitle="Have photos or videos from our events? Share them with us!"
            center
          />

          <div className="mt-8">
            <Button asChild>
              <Link href="/contact">Submit Your Content</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

