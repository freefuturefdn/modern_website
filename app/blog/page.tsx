"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

type BlogPost = {
  id: number
  title: string
  author: string
  excerpt: string
  content: string
  image_url: string
  published_at: string
  category: string
  tags: string[]
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Empowering Nigerian Youth Through Economic Education",
            author: "Kelechi Nwannunu",
            excerpt:
              "How understanding economic principles can help young Nigerians create better futures for themselves and their communities.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-03-15",
            category: "Economic Freedom",
            tags: ["education", "youth", "economics"],
          },
          {
            id: 2,
            title: "The Power of Youth Advocacy in Policy Reform",
            author: "Amara Okafor",
            excerpt:
              "Young advocates are making a significant impact on policy reform in Nigeria. Here's how they're doing it.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-03-05",
            category: "Advocacy",
            tags: ["policy", "advocacy", "youth"],
          },
          {
            id: 3,
            title: "Building Leadership Skills for Community Change",
            author: "Emmanuel Adeyemi",
            excerpt:
              "Practical strategies for developing the leadership capabilities needed to drive positive change in your community.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-20",
            category: "Leadership",
            tags: ["leadership", "community", "skills"],
          },
          {
            id: 4,
            title: "The Role of Property Rights in Economic Development",
            author: "Ngozi Eze",
            excerpt: "How secure property rights contribute to economic growth and prosperity in Nigeria and beyond.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-10",
            category: "Economic Freedom",
            tags: ["property rights", "economics", "development"],
          },
          {
            id: 5,
            title: "Digital Tools for Freedom Advocates",
            author: "Oluwaseun Adeleke",
            excerpt:
              "Leveraging technology and digital platforms to advance the cause of freedom and individual rights.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-25",
            category: "Technology",
            tags: ["digital", "advocacy", "tools"],
          },
          {
            id: 6,
            title: "Youth Entrepreneurship: Breaking Down Barriers",
            author: "Chioma Nwosu",
            excerpt:
              "Strategies for young entrepreneurs to overcome challenges and build successful businesses in Nigeria.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-15",
            category: "Entrepreneurship",
            tags: ["business", "youth", "entrepreneurship"],
          },
          {
            id: 7,
            title: "The Importance of Civic Education for Freedom",
            author: "Adebayo Ogunlesi",
            excerpt:
              "Why understanding civic rights and responsibilities is essential for advancing freedom in Nigeria.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-05",
            category: "Education",
            tags: ["civic education", "freedom", "democracy"],
          },
          {
            id: 8,
            title: "Community Organizing for Economic Liberty",
            author: "Folake Adeyemi",
            excerpt:
              "How grassroots organizing can promote economic freedom and entrepreneurship in local communities.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-12-20",
            category: "Advocacy",
            tags: ["community", "organizing", "economics"],
          },
        ]

        setBlogPosts(data)
        setFilteredPosts(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  useEffect(() => {
    // Filter and sort blog posts based on search query, category, and sort order
    let filtered = [...blogPosts]

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((post) => post.category === categoryFilter)
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    } else if (sortOrder === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredPosts(filtered)
  }, [searchQuery, categoryFilter, sortOrder, blogPosts])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const categories = [
    "all",
    "Economic Freedom",
    "Advocacy",
    "Leadership",
    "Technology",
    "Entrepreneurship",
    "Education",
  ]

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
            <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights, stories, and perspectives on freedom, youth empowerment, and Nigeria's future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Featured Posts" subtitle="Our most impactful and popular articles" />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-ash rounded-t-lg" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-ash rounded w-3/4" />
                    <div className="h-4 bg-ash rounded w-1/2" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {blogPosts.slice(0, 2).map((post, index) => (
                <AnimatedCard
                  key={post.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-64">
                    <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{formatDate(post.published_at)}</p>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{post.author}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 bg-ash-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
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

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="All Posts" subtitle="Browse our complete collection of articles" />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {filteredPosts.map((post, index) => (
                <AnimatedCard
                  key={post.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{formatDate(post.published_at)}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-sm text-primary mb-2">By {post.author}</p>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                No blog posts match your search criteria. Please try a different search term or category.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                  setSortOrder("newest")
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
            subtitle="Subscribe to our newsletter for the latest blog posts and updates"
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

