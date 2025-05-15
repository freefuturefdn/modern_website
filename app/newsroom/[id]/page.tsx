"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface NewsItem {
  id: number
  title: string
  slug: string
  author: string
  summary: string
  content: string
  image_url: string
  published_at: string
  category: string
}

export default function NewsPage({ params }: { params: { id: string } }) {
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    // Set the share URL when the component mounts
    setShareUrl(window.location.href)
  }, [])

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", params.id)
          .single()

        if (error) throw error
        setNews(data)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [params.id])

  const handleShare = async (platform: string) => {
    if (!news) return

    const shareData = {
      title: news.title,
      text: news.summary,
      url: shareUrl,
    }

    // Try to use the Web Share API first
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        toast.success("Shared successfully!")
      } catch (error) {
        console.error("Error sharing:", error)
        // Fallback to direct sharing if Web Share API fails
        shareOnPlatform(platform)
      }
    } else {
      // Fallback to direct sharing if Web Share API is not available
      shareOnPlatform(platform)
    }
  }

  const shareOnPlatform = (platform: string) => {
    if (!news) return

    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(news.title)
    const encodedSummary = encodeURIComponent(news.summary)

    let platformShareUrl = ""

    switch (platform) {
      case "facebook":
        platformShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        platformShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=FreeFutureFdn`
        break
      case "linkedin":
        platformShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
    }

    if (platformShareUrl) {
      window.open(platformShareUrl, "_blank", "width=600,height=400")
      toast.success(`Shared on ${platform}!`)
    }
  }

  if (loading) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-ash rounded w-3/4 mb-4" />
            <div className="h-4 bg-ash rounded w-1/4 mb-8" />
            <div className="aspect-video bg-ash rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-ash rounded w-full" />
              <div className="h-4 bg-ash rounded w-full" />
              <div className="h-4 bg-ash rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="text-2xl font-bold">News not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* News Header */}
      <section className="py-12 bg-ash-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(news.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div>By {news.author}</div>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                {news.category}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="prose prose-lg max-w-none">
              {news.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-4">
                <span className="font-medium">Share this article:</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleShare("facebook")}
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="hover:bg-sky-50 hover:text-sky-600"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleShare("linkedin")}
                  className="hover:bg-blue-50 hover:text-blue-700"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

