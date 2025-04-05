"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, ArrowRight, BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { Publication } from "@/lib/supabase"

export default function JournalsPage() {
  const [journals, setJournals] = useState<Publication[]>([])
  const [filteredJournals, setFilteredJournals] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    async function fetchJournals() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Journal of Economic Freedom and Development",
            author: "Free Future Foundation Research Team",
            summary:
              "A peer-reviewed journal exploring the relationship between economic freedom and development in Nigeria and beyond.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-03-01",
            type: "journal" as const,
            download_url: "#",
          },
          {
            id: 2,
            title: "Youth Leadership Review",
            author: "Free Future Foundation Research Team",
            summary: "Academic research on youth leadership development and its impact on community transformation.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-15",
            type: "journal" as const,
            download_url: "#",
          },
          {
            id: 3,
            title: "Policy Reform Journal",
            author: "Free Future Foundation Research Team",
            summary: "Analysis of policy reforms needed to advance freedom and prosperity in Nigeria.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-11-30",
            type: "journal" as const,
            download_url: "#",
          },
          {
            id: 4,
            title: "Journal of Individual Rights",
            author: "Free Future Foundation Research Team",
            summary:
              "Research on the protection and advancement of individual rights in Nigeria's legal and social context.",
            content: "",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-09-15",
            type: "journal" as const,
            download_url: "#",
          },
        ]

        setJournals(data)
        setFilteredJournals(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching journals:", error)
        setLoading(false)
      }
    }

    fetchJournals()
  }, [])

  useEffect(() => {
    // Filter and sort journals based on search query and sort order
    let filtered = [...journals]

    if (searchQuery) {
      filtered = filtered.filter(
        (journal) =>
          journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          journal.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          journal.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    } else if (sortOrder === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredJournals(filtered)
  }, [searchQuery, sortOrder, journals])

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
            <h1 className="text-4xl md:text-5xl font-bold">Academic Journals</h1>
            <p className="text-lg text-muted-foreground">
              Access our peer-reviewed journals featuring in-depth research on freedom, development, and policy.
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
                placeholder="Search journals by title or keywords..."
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Journals Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
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
          ) : filteredJournals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredJournals.map((journal, index) => (
                <AnimatedCard
                  key={journal.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image
                      src={journal.image_url || "/placeholder.svg"}
                      alt={journal.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(journal.published_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{journal.title}</h3>
                    <p className="text-primary font-medium mb-3">By {journal.author}</p>
                    <p className="text-muted-foreground mb-4">{journal.summary}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/resources/journals/${journal.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" /> Read More
                        </Link>
                      </Button>
                      {journal.download_url && (
                        <Button size="sm" asChild>
                          <Link href={journal.download_url} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No journals found</h3>
              <p className="text-muted-foreground mb-4">
                No journals match your search criteria. Please try a different search term.
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
            subtitle="Discover our books, articles, and other educational materials"
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
              <h3 className="text-xl font-bold mb-2">Articles</h3>
              <p className="text-muted-foreground mb-4">
                Read our collection of articles on freedom, youth empowerment, and economic development.
              </p>
              <Button asChild>
                <Link href="/resources/articles">
                  Browse Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  )
}

