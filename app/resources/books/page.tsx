"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, Search, BookOpen, Calendar, ArrowRight, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import { supabase } from "@/lib/supabase"

interface Book {
  name: string;
  id: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    size: number;
    mimetype: string;
    [key: string]: any;
  };
  updated_at?: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)

  useEffect(() => {
    async function fetchBooks() {
      try {
        console.log("Fetching books from storage...");
        const { data, error } = await supabase.storage
          .from('books')
          .list();

        if (error) {
          console.error("Error fetching books:", error);
          throw error;
        }
        
        console.log("Books data:", data);
        const pdfFiles = data
          .filter(file => file.metadata?.mimetype === 'application/pdf')
          .map(file => ({
            ...file,
            metadata: {
              size: file.metadata?.size || 0,
              mimetype: file.metadata?.mimetype || 'application/pdf',
              ...file.metadata
            }
          })) as Book[];
        
        setBooks(pdfFiles);
        setFilteredBooks(pdfFiles);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchBooks:", error);
        setLoading(false);
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
          book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else if (sortOrder === "title") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredBooks(filtered)
  }, [searchQuery, sortOrder, books])

  const handleRead = async (book: Book) => {
    setSelectedBook(book);
    setShowDisclaimer(true);
  }

  const handleDownload = async (book: Book) => {
    setSelectedBook(book);
    setShowDisclaimer(true);
  }

  const confirmAction = async (action: 'read' | 'download') => {
    if (!selectedBook?.name) return;

    try {
      console.log("Attempting to access book:", selectedBook.name);
      const { data, error } = await supabase.storage
        .from('books')
        .download(selectedBook.name);

      if (error) {
        console.error("Storage error:", error);
        throw error;
      }

      console.log("Successfully retrieved book data");
      if (action === 'download') {
        // Create a blob URL and trigger download
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedBook.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Create a blob URL for viewing
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
        setShowPdfViewer(true);
      }
    } catch (error) {
      console.error('Error accessing book:', error);
    }

    setShowDisclaimer(false);
    setSelectedBook(null);
  }

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
                placeholder="Search books by title..."
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
                  <div className="relative h-64 bg-ash flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(book.created_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{book.name.replace('.pdf', '')}</h3>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleRead(book)}>
                        <BookOpen className="mr-2 h-4 w-4" /> Read
                      </Button>
                      <Button size="sm" onClick={() => handleDownload(book)}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
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

      {/* Disclaimer Dialog */}
      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Important Notice
            </DialogTitle>
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This material is protected by copyright. Reproduction, distribution, or any other use of this material
                without explicit written permission from the Free Future Foundation is strictly prohibited.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Some of the books in our collection are sourced from International Economic Affairs. These materials
                are provided for educational purposes only.
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                By accessing this material, you agree to use it solely for personal, non-commercial purposes.
              </p>
            </div>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowDisclaimer(false)}>
              Cancel
            </Button>
            {selectedBook && (
              <>
                <Button onClick={() => confirmAction('read')}>
                  I Agree & Read Online
                </Button>
                <Button onClick={() => confirmAction('download')}>
                  I Agree & Download
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Dialog */}
      <Dialog open={showPdfViewer} onOpenChange={setShowPdfViewer}>
        <DialogContent className="max-w-6xl h-[90vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedBook?.name.replace('.pdf', '')}</h2>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setShowPdfViewer(false);
                  if (pdfUrl) {
                    window.URL.revokeObjectURL(pdfUrl);
                    setPdfUrl(null);
                  }
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                className="flex-1 w-full border-0"
                title={selectedBook?.name}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

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
          </div>
        </div>
      </section>
    </div>
  )
}

