"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin, ArrowUpRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import { supabase } from "@/lib/supabase"

interface Event {
  id: number
  title: string
  description: string
  location: string
  start_date: string
  end_date: string
  image_url: string
  registration_url: string | null
  is_featured: boolean
  max_attendees: number
  current_attendees: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  category: string
  resources: {
    title: string
    type: string
    url: string
  }[]
}

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState("soonest")
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'upcoming')
          .gte('start_date', new Date().toISOString())
          .order('start_date', { ascending: true })

        if (error) throw error

        setEvents(data || [])
        setFilteredEvents(data || [])

        // Set featured event
        const featured = data?.find((event) => event.is_featured)
        if (featured) {
          setFeaturedEvent(featured)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    // Filter and sort events based on search query, location filter, and sort order
    let filtered = [...events]

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (locationFilter.length > 0) {
      filtered = filtered.filter((event) => locationFilter.some((location) => event.location.includes(location)))
    }

    if (sortOrder === "soonest") {
      filtered.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    } else if (sortOrder === "latest") {
      filtered.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
    } else if (sortOrder === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredEvents(filtered)
  }, [searchQuery, locationFilter, sortOrder, events])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const locations = [...new Set(events.map((event) => event.location))]

  const handleLocationFilterChange = (location: string) => {
    setLocationFilter((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location)
      } else {
        return [...prev, location]
      }
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
            <h1 className="text-4xl md:text-5xl font-bold">Upcoming Events</h1>
            <p className="text-lg text-muted-foreground">
              Join us for workshops, seminars, and conferences to learn, network, and contribute to the movement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeading title="Featured Event" subtitle="Don't miss our flagship event" />

            <AnimatedCard className="bg-white rounded-lg overflow-hidden shadow-md mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredEvent.image_url || "/placeholder.svg"}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <p className="text-sm font-medium">
                      {formatDate(featuredEvent.start_date)}
                      {featuredEvent.start_date !== featuredEvent.end_date &&
                        ` - ${formatDate(featuredEvent.end_date)}`}
                    </p>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredEvent.title}</h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                    <p className="text-sm text-muted-foreground">{featuredEvent.location}</p>
                  </div>
                  <p className="text-muted-foreground mb-6">{featuredEvent.description}</p>
                  {featuredEvent.registration_url && (
                  <Button asChild>
                    <Link href={featuredEvent.registration_url}>
                      Register Now <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  )}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-10 bg-ash-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Events</SheetTitle>
                    <SheetDescription>Narrow down events based on your preferences</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="location">
                        <AccordionTrigger>Location</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {locations.map((location) => (
                              <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`location-${location}`}
                                  checked={locationFilter.includes(location)}
                                  onCheckedChange={() => handleLocationFilterChange(location)}
                                />
                                <label
                                  htmlFor={`location-${location}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => setLocationFilter([])}>
                      Clear Filters
                    </Button>
                    <Button onClick={() => document.querySelector("[data-radix-collection-item]")?.click()}>
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soonest">Soonest First</SelectItem>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
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
                    <div className="h-10 bg-ash rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <AnimatedCard
                  key={event.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48">
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
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
                    <div className="flex items-center justify-between">
                      {event.registration_url && (
                      <Button asChild>
                        <Link href={event.registration_url}>
                          Register <ArrowUpRight className="ml-1 h-4 w-4" />
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
              <h3 className="text-xl font-bold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                No events match your search criteria. Please try a different search term or filter.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setLocationFilter([])
                  setSortOrder("soonest")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Looking for Past Events?"
            subtitle="Browse our archive of previous events and access resources"
            center
          />

          <div className="mt-8">
            <Button asChild>
              <Link href="/events/past">View Past Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Host an Event Section */}
      <section className="py-20 bg-primary/70">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedCard direction="right">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/logo-white.png" 
                  alt="Host an event" 
                  fill
                  className="object-contain" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedCard>

            <AnimatedCard direction="left" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Host an Event With Us</h2>
                <p className="text-muted-foreground">
                  Interested in hosting a Free Future Foundation event in your community? We partner with local
                  organizations, schools, and community groups to bring our programs to more Nigerian youth.
                </p>
                <p className="text-primary-foreground">
                  Whether you want to organize a workshop, seminar, or town hall, we can provide resources,
                  speakers, and support to make your event a success.
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us to Learn More</Link>
                </Button>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  )
}

