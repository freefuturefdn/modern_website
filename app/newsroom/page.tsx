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
import type { NewsItem } from "@/lib/supabase"

export default function NewsroomPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    async function fetchNews() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Free Future Foundation Launches New Youth Leadership Program",
            summary: "Our new program aims to equip 500 young Nigerians with leadership skills by the end of 2024.",
            content:
              "The Free Future Foundation is proud to announce the launch of our new Youth Leadership Program, designed to empower the next generation of Nigerian leaders. This comprehensive program will provide participants with the knowledge, skills, and resources they need to become effective advocates for freedom and positive change in their communities.\n\nThe program will include workshops on public speaking, community organizing, policy analysis, and digital advocacy. Participants will also have the opportunity to network with established leaders and receive mentorship from experts in various fields.\n\nOur goal is to train 500 young Nigerians by the end of 2024, creating a network of empowered youth who can drive positive change across the country.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-03-01",
            category: "Programs",
          },
          {
            id: 2,
            title: "Economic Freedom Index Shows Decline in Nigeria",
            summary: "Our latest research highlights the challenges facing entrepreneurs and suggests policy reforms.",
            content:
              "The Free Future Foundation has released its annual Economic Freedom Index for Nigeria, revealing a concerning decline in economic liberty across the country. The report analyzes various factors affecting economic freedom, including regulatory barriers, property rights protection, and market access.\n\nAccording to our findings, entrepreneurs in Nigeria continue to face significant challenges, including complex regulatory requirements, limited access to capital, and inconsistent enforcement of property rights. These barriers not only hinder individual success but also limit overall economic growth and prosperity.\n\nThe report includes specific policy recommendations aimed at improving the business environment and expanding economic opportunities for all Nigerians. These include streamlining business registration processes, strengthening property rights protections, and reducing trade barriers.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-20",
            category: "Research",
          },
          {
            id: 3,
            title: "Partnership Announced with Global Liberty Institute",
            summary: "This collaboration will bring international expertise to our advocacy efforts in Nigeria.",
            content:
              "The Free Future Foundation is excited to announce a new partnership with the Global Liberty Institute, an international organization dedicated to advancing freedom and prosperity worldwide. This collaboration will enhance our advocacy efforts in Nigeria by bringing international expertise and resources to our programs.\n\nThrough this partnership, we will develop joint research projects, exchange best practices, and collaborate on educational initiatives. The Global Liberty Institute will also provide training opportunities for our staff and volunteers, helping us build our capacity to create positive change.\n\nThis partnership represents an important step in our mission to empower Nigerian youth and advance the cause of freedom in our country. By working together with like-minded organizations around the world, we can amplify our impact and create more opportunities for Nigerians to thrive.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-05",
            category: "Partnerships",
          },
          {
            id: 4,
            title: "Free Future Foundation Hosts Successful Economic Freedom Workshop",
            summary:
              "Over 100 young entrepreneurs participated in our recent workshop on economic liberty and entrepreneurship.",
            content:
              "The Free Future Foundation recently hosted a successful Economic Freedom Workshop in Lagos, bringing together over 100 young entrepreneurs from across Nigeria. The two-day event focused on the principles of economic liberty and practical strategies for overcoming barriers to entrepreneurship.\n\nParticipants engaged in interactive sessions on topics such as market analysis, business planning, and advocacy for policy reform. They also had the opportunity to network with established entrepreneurs and receive personalized feedback on their business ideas.\n\nThe workshop featured keynote speeches from prominent business leaders and policy experts, who shared insights on navigating Nigeria's business environment and driving positive change. Participants left with actionable plans for advancing their entrepreneurial goals and advocating for economic freedom in their communities.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-25",
            category: "Events",
          },
          {
            id: 5,
            title: "New Research Report: The State of Individual Rights in Nigeria",
            summary:
              "Our comprehensive study examines the current status of individual rights and freedoms across Nigeria.",
            content:
              "The Free Future Foundation has published a new research report titled 'The State of Individual Rights in Nigeria,' providing a comprehensive analysis of civil liberties and personal freedoms across the country. The report examines various aspects of individual rights, including freedom of expression, association, and economic liberty.\n\nBased on extensive data collection and analysis, the report identifies both progress and challenges in protecting individual rights in Nigeria. It highlights regional variations in rights protection and identifies specific areas where reform is needed.\n\nThe report concludes with a series of recommendations for policymakers, civil society organizations, and citizens. These recommendations aim to strengthen the protection of individual rights and create a society where all Nigerians can exercise their freedoms and pursue their goals without undue interference.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-10",
            category: "Research",
          },
          {
            id: 6,
            title: "Free Future Foundation Expands Youth Advocacy Network",
            summary: "Our advocacy network now includes representatives from all 36 states in Nigeria.",
            content:
              "The Free Future Foundation is proud to announce the expansion of our Youth Advocacy Network to include representatives from all 36 states in Nigeria. This milestone represents a significant step in our mission to empower young Nigerians to champion freedom and create positive change across the country.\n\nThe Youth Advocacy Network connects young leaders who are passionate about advancing freedom and individual rights in their communities. Members receive training, resources, and support to conduct local advocacy campaigns and educational initiatives.\n\nWith representatives in every state, we can now better coordinate nationwide advocacy efforts and ensure that the voices of young Nigerians are heard in policy discussions at all levels of government. This expanded network will also facilitate the sharing of best practices and success stories across different regions of the country.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-12-15",
            category: "Programs",
          },
        ]

        setNewsItems(data)
        setFilteredNews(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching news:", error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    // Filter news based on search query and category
    let filtered = [...newsItems]

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()),
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
                placeholder="Search news..."
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
                    <Image src={news.image_url || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
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
      <section className="py-20 bg-primary/10">
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

