"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import { createClient } from "@supabase/supabase-js"

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

export default function NewsroomPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("published_at", { ascending: false })

        if (error) throw error
        setNewsItems(data || [])
        setFilteredNews(data || [])
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    // Filter news based on search query and category
    let filtered = [...newsItems]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query)
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter)
    }

    setFilteredNews(filtered)
  }, [searchQuery, categoryFilter, newsItems])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const categories = ["all", "Programs", "Research", "Partnerships", "Events"]

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
            <h1 className="text-4xl md:text-5xl font-bold">Newsroom</h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest news, announcements, and updates from Free Future Foundation.
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
                placeholder="Search news by title, content, or author..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-ash rounded-t-lg" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-ash rounded w-3/4" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <AnimatedCard
                  key={news.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image src={news.image_url} alt={news.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {news.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(news.published_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                    <p className="text-muted-foreground mb-4">{news.summary}</p>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/newsroom/${news.id}`}>
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                No news items match your search criteria. Please try a different search term or category.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-primary/70">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Stay Updated"
            subtitle="Subscribe to our newsletter for the latest news and updates"
            center
          />

          <div className="max-w-md mx-auto mt-8">
            <form className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Your email address" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

