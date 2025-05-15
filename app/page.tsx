"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Users, BookOpen, Award, Calendar, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { SuccessStory, NewsItem, Event } from "@/lib/supabase"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch latest news
        const { data: newsData, error: newsError } = await supabase
          .from('news')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3)

        if (newsError) throw newsError
        setLatestNews(newsData)

        // Fetch upcoming events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString())
          .order('start_date', { ascending: true })
          .limit(2)

        if (eventsError) throw eventsError
        setUpcomingEvents(eventsData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 hero-gradient">
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-a from-primary/70 to-secondary/70" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Empowering Nigerian Youth for a <span className="text-gradient">Free Future</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Through education, advocacy, and public campaigns, we aim to cultivate a generation that drives positive
                change and shapes a brighter future for Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/volunteer">Get Involved</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/sign/website-images/Ms.%20Ruth%20at%20Activism%20101.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9Ncy4gUnV0aCBhdCBBY3RpdmlzbSAxMDEuanBnIiwiaWF0IjoxNzQzNTgzNjUzLCJleHAiOjMzNTE5MTk2NTN9.fysuDRjtZfb560H63FuwaD6Kjn9YP-B6thnZkffpWkM"
                  alt="Free Future Foundation, a picture from the company's event"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-secondary p-6 rounded-lg shadow-lg max-w-xs"
              >
                <p className="font-bold text-lg">Founded in 2024</p>
                <p className="text-muted-foreground">by Kelechi Nwannunu</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedCard className="bg-secondary/70 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/20 text-primary p-2 rounded-full mr-3">
                  <Users className="h-6 w-6" />
                </span>
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                At Free Future Foundation, we empower Nigerian youth with the knowledge, skill, and resources to
                champion freedom. Though education, advocacy, and public campaigns, we aim to cultivate a generation
                that drives positive change and shapes a brighter future for Nigeria.
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-8 rounded-lg shadow-md" delay={0.2}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-secondary/20 text-secondary p-2 rounded-full mr-3">
                  <BookOpen className="h-6 w-6" />
                </span>
                Our Vision
              </h2>
              <p className="text-muted-foreground">
                To create a prosperous and free Nigeria where every individual is empowered to realize their full
                potential through economic freedom and individual rights.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Meet Our Founder" subtitle="The visionary behind Free Future Foundation" center />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <AnimatedCard direction="right">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/sign/website-images/founder.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9mb3VuZGVyLmpwZyIsImlhdCI6MTc0Mzg0NTU3MSwiZXhwIjozMzUyMTgxNTcxfQ.J-SEdbMDup1tGi0JdsQZVOSdC9IglWSYCxiZ8sm1y34"
                  alt="Kelechi Nwannunu - Founder of Free Future Foundation"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedCard>

            <AnimatedCard direction="left" delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Kelechi Nwannunu</h3>
                <p className="text-xl text-primary font-medium">Chief Executive Officer/Director of Programs.</p>
                <p className="text-muted-foreground">
                  Kelechi Lawrence Nwannunu is the founder and CEO of Free Futuer Foundation, a libertarian 
                  organization in Nigeria. With five years of active involvement in the libertarian movement, 
                  he has served as National Coordinator for Students For Liberty and graduated from various 
                  libertarian educational programs. 
                </p>
                <p className="text-muted-foreground">
                  Kelechi, a History graduate from the University of Nigeria, Nsukka, is known for his 
                  public speaking, team management, and event hosting skills. As a serial entrepreneur 
                  and committed libertarian, he leads the Free Future Foundation in its mission to promote 
                  freedom and positive change in Nigeria. 
                </p>
                <Button asChild>
                  <Link href="/team">
                    Meet Our Full Team <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading title="Latest News" subtitle="Stay updated with our activities and impact" />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {latestNews.map((news, index) => (
                <AnimatedCard
                  key={news.id}
                  delay={index * 0.1}
                  className="bg-secondary/70 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
                    <Image src={news.image_url || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {news.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{formatDate(news.published_at)}</p>
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
          )}

          <div className="mt-12">
            <Button asChild>
              <Link href="/newsroom">View All News</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Upcoming Events" subtitle="Join us in our mission to empower Nigerian youth" />

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-ash rounded-t-lg" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-ash rounded w-3/4" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-full" />
                    <div className="h-4 bg-ash rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {upcomingEvents.map((event, index) => (
                <AnimatedCard
                  key={event.id}
                  delay={index * 0.1}
                  className="bg-secondary/70 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-64">
                    <Image
                      src={event.image_url || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <p className="text-sm font-medium">
                        {formatDate(event.start_date)}
                        {event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{event.location}</p>
                      <Button asChild>
                        <Link href={event.registration_url}>
                          Register <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          )}

          <div className="mt-12">
            <Button asChild>
              <Link href="/events/upcoming">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Join Our Mission"
            subtitle="Together, we can build a free and prosperous Nigeria"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <AnimatedCard className="bg-secondary/70 p-8 rounded-lg shadow-md text-center">
              <div className="mx-auto bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-muted-foreground mb-4">
                Join our team of dedicated volunteers and make a direct impact in your community.
              </p>
              <Button variant="outline" asChild>
                <Link href="/volunteer">Learn More</Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-8 rounded-lg shadow-md text-center" delay={0.1}>
              <div className="mx-auto bg-secondary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Partner</h3>
              <p className="text-muted-foreground mb-4">
                Collaborate with us to amplify our impact and reach more Nigerian youth.
              </p>
              <Button variant="outline" asChild>
                <Link href="/partner">Learn More</Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-8 rounded-lg shadow-md text-center" delay={0.2}>
              <div className="mx-auto bg-ash/40 p-4 rounded-full w-16 h-16 flex items-center enter mb-4">
                <Calendar className="h-8 w-8 text-ash-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">Attend</h3>
              <p className="text-muted-foreground mb-4">
                Participate in our events and programs to learn and connect with like-minded individuals.
              </p>
              <Button variant="outline" asChild>
                <Link href="/events/upcoming">Learn More</Link>
              </Button>
            </AnimatedCard>
          </div>

          <div className="mt-12">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}