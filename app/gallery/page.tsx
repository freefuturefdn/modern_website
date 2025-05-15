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
import MediaPopup from "@/components/media-popup"
import { supabase } from "@/lib/supabase"

interface GalleryItem {
  id: number
  title: string
  description: string
  image_url: string
  video_url?: string
  type: 'image' | 'video'
  event_id?: number
  created_at: string
  status: 'draft' | 'published' | 'archived'
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; title: string; type: 'image' | 'video' } | null>(null)

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })

        if (error) throw error

        setGalleryItems(data || [])
        setFilteredItems(data || [])
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
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[21/9] bg-ash rounded-lg" />
                  <div className="mt-2 h-4 bg-ash rounded w-3/4" />
                  <div className="mt-1 h-3 bg-ash rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedMedia({
                    url: item.type === 'video' ? item.video_url! : item.image_url,
                    title: item.title,
                    type: item.type
                  })}
                >
                  <AnimatedCard delay={index * 0.05}>
                    <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        priority={index < 2}
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="bg-white bg-opacity-80 rounded-full p-3">
                            <Play className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{formatDate(item.created_at)}</p>
                      <p className="text-muted-foreground mt-2">{item.description}</p>
                    </div>
                  </AnimatedCard>
                </div>
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

      {/* Media Popup */}
      <MediaPopup
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        mediaUrl={selectedMedia?.url || ''}
        title={selectedMedia?.title || ''}
        type={selectedMedia?.type || 'image'}
      />

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

