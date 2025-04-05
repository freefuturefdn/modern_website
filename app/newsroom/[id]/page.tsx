"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

interface ArticleData {
  id: string
  title: string
  content: string
  image_url: string
  author: string
  published_at: string
  category: string
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<ArticleData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setArticle(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching article:', error)
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.id])

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

  if (!article) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="text-2xl font-bold">Article not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Article Header */}
      <section className="py-12 bg-ash-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(article.published_at)}
              </div>
              <div>By {article.author}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="prose prose-lg max-w-none">
              {article.content}
            </div>
            
            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-4">
                <span className="font-medium">Share this article:</span>
                <Button variant="ghost" size="sm">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button variant="ghost" size="sm">
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

