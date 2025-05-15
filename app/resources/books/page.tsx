"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, Search, BookOpen, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { Publication } from "@/lib/supabase"

export default function BooksPage() {
  const [books, setBooks] = useState<Publication[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    async function fetchBooks() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Economic Freedom: A Guide for Nigerian Youth",
            author: "Kelechi Nwannunu",
            summary:
              "A comprehensive guide to understanding economic freedom and its importance for Nigeria's development.",
            content: "",
            image_url: "/logo.png?height=400&width=300",
            published_at: "2024-02-15",
            type: "book" as const,
            download_url: "#",
          },
          {
            id: 2,
            title: "Youth Leadership in the 21st Century",
            author: "Amara Okafor",
            summary: "Explores the challenges and opportunities for young leaders in Nigeria's evolving landscape.",
            content: "",
            image_url: "/logo.png?height=400&width=300",
            published_at: "2024-01-10",
            type: "book" as const,
            download_url: "#",
          },
          {
            id: 3,
            title: "Freedom and Prosperity: Nigeria's Path Forward",
            author: "Emmanuel Adeyemi",
            summary: "An analysis of policy reforms needed to advance freedom and prosperity in Nigeria.",
            content: "",
            image_url: "/logo.png?height=400&width=300",
            published_at: "2023-12-05",
            type: "book" as const,
            download_url: "#",
          },
          {
            id: 4,
            title: "Advocacy Handbook for Nigerian Youth",
            author: "Ngozi Eze",
            summary: "A practical guide to effective advocacy for young Nigerians seeking to create positive change.",
            content: "",
            image_url: "/logo.png?height=400&width=300",
            published_at: "2023-11-20",
            type: "book" as const,
            download_url: "#",
          },
          {
            id: 5,
            title: "Individual Rights and Responsibilities",
            author: "Oluwaseun Adeleke",
            summary: "Explores the balance between individual rights and civic responsibilities in a free society.",
            content: "",
            image_url: "/logo.png?height=400&width=300",
            published_at: "2023-10-15",
            type: "book" as const,
            download_url: "#",
          },
          {
            id: 6,
            title: "Entrepreneurship and Market Freedom",
            author: "Chioma Nwosu",
            summary: "A guide to understanding and navigating market principles for aspiring entrepreneurs.",
            content: "",
            image_url: "/logo.png?height=400&width=300",
            published_at: "2023-09-01",
            type: "book" as const,
            download_url: "#",
          },
        ]

        setBooks(data)
        setFilteredBooks(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching books:", error)
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    // Filter and sort books based on search query and sort order
    let filtered = [...books]

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.summary.toLowerCase().includes(searchQuery.toLowerCase()),
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

    setFilteredBooks(filtered)
  }, [searchQuery, sortOrder, books])

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
            <h1 className="text-4xl md:text-5xl font-bold">Books</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of books on freedom, leadership, and youth empowerment.
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
                placeholder="Search books by title, author, or keywords..."
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

      {/* Books Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book, index) => (
                <AnimatedCard
                  key={book.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-64">
                    <Image src={book.image_url || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(book.published_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{book.title}</h3>
                    <p className="text-primary font-medium mb-3">By {book.author}</p>
                    <p className="text-muted-foreground mb-4">{book.summary}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/resources/books/${book.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" /> Read More
                        </Link>
                      </Button>
                      {book.download_url && (
                        <Button size="sm" asChild>
                          <Link href={book.download_url} target="_blank" rel="noopener noreferrer">
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
              <h3 className="text-xl font-bold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                No books match your search criteria. Please try a different search term.
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
            subtitle="Discover our articles, journals, and other educational materials"
            center
          />

          <div className="text-center grid grid-cols-1 md:grid-cols-1 gap-8 mt-12 max-w-4xl mx-auto">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" >
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

            {/*<AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <h3 className="text-xl font-bold mb-2">Journals</h3>
              <p className="text-muted-foreground mb-4">
                Explore our academic journals featuring in-depth research and analysis.
              </p>
              <Button asChild>
                <Link href="/resources/journals">
                  Browse Journals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedCard> */}
          </div>
        </div>
      </section>
    </div>
  )
}

