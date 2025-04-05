"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { Publication } from "@/lib/supabase"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Publication[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    async function fetchArticles() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "The Importance of Economic Freedom for Nigerian Youth",
            author: "Kelechi Nwannunu",
            summary:
              "This article explores how economic freedom empowers young Nigerians to pursue their dreams and contribute to national development.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-03-10",
            type: "article" as const,
          },
          {
            id: 2,
            title: "Building Leadership Skills in Young Advocates",
            author: "Amara Okafor",
            summary:
              "Practical strategies for developing the leadership capabilities needed to advocate effectively for freedom and positive change.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-25",
            type: "article" as const,
          },
          {
            id: 3,
            title: "Property Rights and Prosperity: Lessons for Nigeria",
            author: "Emmanuel Adeyemi",
            summary:
              "An examination of the relationship between secure property rights and economic development, with implications for Nigeria.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-05",
            type: "article" as const,
          },
          {
            id: 4,
            title: "Digital Advocacy: Leveraging Technology for Freedom",
            author: "Ngozi Eze",
            summary:
              "How Nigerian youth can use digital tools and platforms to advocate for freedom and individual rights.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-20",
            type: "article" as const,
          },
          {
            id: 5,
            title: "Community Organizing for Economic Liberty",
            author: "Oluwaseun Adeleke",
            summary:
              "Strategies for grassroots organizing to promote economic freedom and entrepreneurship in local communities.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-05",
            type: "article" as const,
          },
          {
            id: 6,
            title: "Education Reform: Empowering the Next Generation",
            author: "Chioma Nwosu",
            summary:
              "An analysis of education reforms needed to better prepare Nigerian youth for leadership and economic participation.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-12-15",
            type: "article" as const,
          },
          {
            id: 7,
            title: "The Role of Civil Society in Advancing Freedom",
            author: "Adebayo Ogunlesi",
            summary:
              "How civil society organizations can effectively promote freedom and individual rights in Nigeria.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-11-30",
            type: "article" as const,
          },
          {
            id: 8,
            title: "Youth Entrepreneurship: Challenges and Opportunities",
            author: "Folake Adeyemi",
            summary:
              "An exploration of the barriers facing young entrepreneurs in Nigeria and strategies for overcoming them.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-11-10",
            type: "article" as const,
          },
        ]

        setArticles(data)
        setFilteredArticles(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching articles:", error)
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    // Filter and sort articles based on search query and sort order
    let filtered = [...articles]

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    } else if (sortOrder === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === "author") {
      filtered.sort((a, b) => a.author.localeCompare(b.author))
    }

    setFilteredArticles(filtered)
  }, [searchQuery, sortOrder, articles])

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
            <h1 className="text-4xl md:text-5xl font-bold">Articles</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of articles on freedom, leadership, and youth empowerment.
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
                placeholder="Search articles by title, author, or keywords..."
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
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="author">Author (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
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
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <AnimatedCard
                  key={article.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image_url || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(article.published_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{article.title}</h3>
                    <p className="text-primary font-medium mb-3">By {article.author}</p>
                    <p className="text-muted-foreground mb-4">{article.summary}</p>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/resources/articles/${article.id}`}>
                        Read Full Article <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                No articles match your search criteria. Please try a different search term.
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

      {/* Resources Navigation Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Explore More Resources"
            subtitle="Discover our books, journals, and other educational materials"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Books</h3>
              <p className="text-muted-foreground mb-4">
                Explore our collection of books on freedom, leadership, and youth empowerment.
              </p>
              <Button asChild>
                <Link href="/resources/books">
                  Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <h3 className="text-xl font-bold mb-2">Journals</h3>
              <p className="text-muted-foreground mb-4">
                Access our academic journals featuring in-depth research and analysis.
              </p>
              <Button asChild>
                <Link href="/resources/journals">
                  Browse Journals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  )
}

