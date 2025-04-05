"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NewsItem } from "@/lib/supabase"

export default function NewsArticlePage() {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : params.id[0]
  
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data
        
        const allArticles = [
          {
            id: 1,
            title: "Free Future Foundation Launches New Youth Leadership Program",
            summary: "Our new program aims to equip 500 young Nigerians with leadership skills by the end of 2024.",
            content: "The Free Future Foundation is proud to announce the launch of our new Youth Leadership Program, designed to empower the next generation of Nigerian leaders. This comprehensive program will provide participants with the knowledge, skills, and resources they need to become effective advocates for freedom and positive change in their communities.\n\nThe program will include workshops on public speaking, community organizing, policy analysis, and digital advocacy. Participants will also have the opportunity to network with established leaders and receive mentorship from experts in various fields.\n\nOur goal is to train 500 young Nigerians by the end of 2024, creating a network of empowered youth who can drive positive change across the country.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-03-01",
            category: "Programs"
          },
          {
            id: 2,
            title: "Economic Freedom Index Shows Decline in Nigeria",
            summary: "Our latest research highlights the challenges facing entrepreneurs and suggests policy reforms.",
            content: "The Free Future Foundation has released its annual Economic Freedom Index for Nigeria, revealing a concerning decline in economic liberty across the country. The report analyzes various factors affecting economic freedom, including regulatory barriers, property rights protection, and market access.\n\nAccording to our findings, entrepreneurs in Nigeria continue to face significant challenges, including complex regulatory requirements, limited access to capital, and inconsistent enforcement of property rights. These barriers not only hinder individual success but also limit overall economic growth and prosperity.\n\nThe report includes specific policy recommendations aimed at improving the business environment and expanding economic opportunities for all Nigerians. These include streamlining business registration processes, strengthening property rights protections, and reducing trade barriers.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-20",
            category: "Research"
          },
          {
            id: 3,
            title: "Partnership Announced with Global Liberty Institute",
            summary: "This collaboration will bring international expertise to our advocacy efforts in Nigeria.",
            content: "The Free Future Foundation is excited to announce a new partnership with the Global Liberty Institute, an international organization dedicated to advancing freedom and prosperity worldwide. This collaboration will enhance our advocacy efforts in Nigeria by bringing international expertise and resources to our programs.\n\nThrough this partnership, we will develop joint research projects, exchange best practices, and collaborate on educational initiatives. The Global Liberty Institute will also provide training opportunities for our staff and volunteers, helping us build our capacity to create positive change.\n\nThis partnership represents an important step in our mission to empower Nigerian youth and advance the cause of freedom in our country. By working together with like-minded organizations around the world, we can amplify our impact and create more opportunities for Nigerians to thrive.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-02-05",
            category: "Partnerships"
          },
          {
            id: 4,
            title: "Free Future Foundation Hosts Successful Economic Freedom Workshop",
            summary: "Over 100 young entrepreneurs participated in our recent workshop on economic liberty and entrepreneurship.",
            content: "The Free Future Foundation recently hosted a successful Economic Freedom Workshop in Lagos, bringing together over 100 young entrepreneurs from across Nigeria. The two-day event focused on the principles of economic liberty and practical strategies for overcoming barriers to entrepreneurship.\n\nParticipants engaged in interactive sessions on topics such as market analysis, business planning, and advocacy for policy reform. They also had the opportunity to network with established entrepreneurs and receive personalized feedback on their business ideas.\n\nThe workshop featured keynote speeches from prominent business leaders and policy experts, who shared insights on navigating Nigeria's business environment and driving positive change. Participants left with actionable plans for advancing their entrepreneurial goals and advocating for economic freedom in their communities.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-25",
            category: "Events"
          },
          {
            id: 5,
            title: "New Research Report: The State of Individual Rights in Nigeria",
            summary: "Our comprehensive study examines the current status of individual rights and freedoms across Nigeria.",
            content: "The Free Future Foundation has published a new research report titled 'The State of Individual Rights in Nigeria,' providing a comprehensive analysis of civil liberties and personal freedoms across the country. The report examines various aspects of individual rights, including freedom of expression, association, and economic liberty.\n\nBased on extensive data collection and analysis, the report identifies both progress and challenges in protecting individual rights in Nigeria. It highlights regional variations in rights protection and identifies specific areas where reform is needed.\n\nThe report concludes with a series of recommendations for policymakers, civil society organizations, and citizens. These recommendations aim to strengthen the protection of individual rights and create a society where all Nigerians can exercise their freedoms and pursue their goals without undue interference.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2024-01-10",
            category: "Research"
          },
          {
            id: 6,
            title: "Free Future Foundation Expands Youth Advocacy Network",
            summary: "Our advocacy network now includes representatives from all 36 states in Nigeria.",
            content: "The Free Future Foundation is proud to announce the expansion of our Youth Advocacy Network to include representatives from all 36 states in Nigeria. This milestone represents a significant step in our mission to empower young Nigerians to champion freedom and create positive change across the country.\n\nThe Youth Advocacy Network connects young leaders who are passionate about advancing freedom and individual rights in their communities. Members receive training, resources, and support to conduct local advocacy campaigns and educational initiatives.\n\nWith representatives in every state, we can now better coordinate nationwide advocacy efforts and ensure that the voices of young Nigerians are heard in policy discussions at all levels of government. This expanded network will also facilitate the sharing of best practices and success stories across different regions of the country.",
            image_url: "/placeholder.svg?height=400&width=600",
            published_at: "2023-12-15",
            category: "Programs"
          }
        ]
        
        const currentArticle = allArticles.find(article => article.id === Number.parseInt(id))
        
        if (currentArticle) {
          setArticle(currentArticle)
          
          // Get related articles (same category, excluding current)
          const related = allArticles
            .filter(article => article.category === currentArticle.category && article.id !== currentArticle.id)
            .slice(0, 3)
          
          setRelatedArticles(related)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching article:', error)
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-ash rounded w-3/4" />
            <div className="h-48 bg-ash rounded" />
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
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/newsroom">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Newsroom
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Article Header */}
      <section className="py-12 bg-ash-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/newsroom" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Newsroom
            </Link>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {article.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(article.published_at)}
              </span>
              
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                {article.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Share Section */}
            <div className="border-t border-b py-6 my-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-bold">Share this article:</p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Share on Facebook">
                      <Facebook className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Share on Twitter">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Share on LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0

