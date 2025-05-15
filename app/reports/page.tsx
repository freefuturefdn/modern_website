"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, FileText, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { AnnualReport } from "@/lib/supabase"

export default function AnnualReportsPage() {
  const [reports, setReports] = useState<AnnualReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            year: 2024,
            title: "Annual Impact Report 2024",
            summary:
              "Our inaugural annual report highlights the foundation's establishment and initial programs focused on youth empowerment and economic freedom education.",
            file_url: "#",
            cover_image_url: "/logo.png",
            published_at: "2024-03-15",
          },
        ]

        setReports(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching reports:", error)
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

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
            <h1 className="text-4xl md:text-5xl font-bold">Annual Reports</h1>
            <p className="text-lg text-muted-foreground">
              Detailed documentation of our impact, activities, and financial information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Reports" subtitle="Transparency and accountability in our work" center />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-ash rounded-t-lg" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-ash rounded w-3/4" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {reports.map((report, index) => (
                <AnimatedCard
                  key={report.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-64">
                    <Image
                      src={report.cover_image_url || "/placeholder.svg"}
                      alt={report.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{formatDate(report.published_at)}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                    <p className="text-muted-foreground mb-4">{report.summary}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/reports/#`}> {/* ${report.id}`}> */}
                          <FileText className="mr-2 h-4 w-4" /> View
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={report.file_url} rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No reports available yet</h3>
              <p className="text-muted-foreground mb-4">
                Our annual reports will be published here as they become available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Financial Transparency Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedCard direction="right">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Commitment to Transparency</h2>
                <p className="text-muted-foreground">
                  At Free Future Foundation, we believe in full transparency about our operations, finances, and impact.
                  Our annual reports provide detailed information about:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Program activities and achievements</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Financial statements and allocation of resources</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Impact metrics and evaluation results</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Future plans and strategic direction</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  We are committed to responsible stewardship of our resources and to maximizing our impact in
                  empowering Nigerian youth.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard direction="left" delay={0.2}>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/logo-white.png"
                  alt="Financial transparency"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary/70">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Questions About Our Reports?"
            subtitle="We're happy to provide additional information"
            center
          />

          <div className="mt-8">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

