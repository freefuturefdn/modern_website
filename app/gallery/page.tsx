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
import { supabase } from "@/lib/supabase"

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const { data, error } = await supabase
          .storage
          .from('website-images')
          .list('gallery', {
            sortBy: { column: 'created_at', order: 'desc' },
            limit: 100
          })

        if (error) throw error

        if (!data || data.length === 0) {
          setLoading(false)
          return
        }

        const items: GalleryItem[] = data.map((item, index) => {
          const { data: urlData } = supabase.storage
            .from('website-images')
            .getPublicUrl(`gallery/${item.name}`)

          return {
            id: index + 1,
            title: item.metadata?.title || item.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
            description: item.metadata?.description || '',
            image_url: urlData.publicUrl,
            created_at: item.created_at || new Date().toISOString(),
            type: item.metadata?.type || (item.name.match(/\.(mp4|mov|avi)$/i) ? 'video' : 'image'),
            event_id: item.metadata?.event_id ? Number(item.metadata.event_id) : undefined,
            video_url: item.metadata?.type === 'video' ? urlData.publicUrl : undefined
          }
        })

        setGalleryItems(items)
        setFilteredItems(items)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching gallery items:", error)
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  useEffect(() => {
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

  return (
    <div className="pt-16">
      {/* Disclaimer Dialog */}
      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Important Notice</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              Please note that all images in this gallery are the property of Free Future Foundation and are protected by copyright.
            </p>
            <p className="text-muted-foreground">
              You may not use, download, or reproduce any images from this gallery without written permission from Free Future Foundation.
            </p>
            <p className="text-muted-foreground">
              To request permission, please send an email to{" "}
              <a href="mailto:info@freefuturefoundation.org" className="text-primary hover:underline">
                info@freefuturefoundation.org
              </a>
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setShowDisclaimer(false)}>
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <AnimatedCard
                    delay={index * 0.05}
                    className="h-full"
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

      {/* Media Item Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-4xl bg-white">
            <DialogHeader>
              <DialogTitle>{selectedItem.title}</DialogTitle>
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

