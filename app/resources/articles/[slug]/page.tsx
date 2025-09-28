"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Article {
  id: number
  title: string
  slug: string
  author: string
  published_at: string
  first_image_url: string
  second_image_url: string
  first_content: string
  second_content: string
  summary: string
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", params.slug)
          .single()

        if (error) throw error
        setArticle(data)
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-ash rounded w-3/4" />
          <div className="h-96 bg-ash rounded" />
          <div className="space-y-4">
            <div className="h-4 bg-ash rounded w-full" />
            <div className="h-4 bg-ash rounded w-full" />
            <div className="h-4 bg-ash rounded w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Button asChild>
          <Link href="/resources/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/resources/articles">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <span>By {article.author}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="relative h-[400px] mb-8">
            <Image
              src={article.first_image_url}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="mb-8">
            {article.first_content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative h-[400px] mb-8">
            <Image
              src={article.second_image_url}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div>
            {article.second_content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
} 