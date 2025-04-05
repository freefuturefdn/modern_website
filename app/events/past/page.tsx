"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin, Download, ExternalLink, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

type PastEvent = {
  id: number
  title: string
  description: string
  location: string
  date: string
  image_url: string
  resources: {
    title: string
    type: "slides" | "video" | "report" | "photos"
    url: string
  }[]
  category: string
}

export default function PastEventsPage() {
  const [events, setEvents] = useState<PastEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<PastEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState<string[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState("latest")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  useEffect(() => {
    async function fetchEvents() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use placeholder data

        const data = [
          {
            id: 1,
            title: "Economic Freedom Summit 2023",
            description:
              "Our annual summit featuring speakers from around the world discussing economic liberty and policy reform.",
            location: "Lagos, Nigeria",
            date: "2023-05-15",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Summit Presentations",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Event Photos",
                type: "photos" as const,
                url: "#",
              },
              {
                title: "Summary Report",
                type: "report" as const,
                url: "#",
              },
            ],
            category: "Conference",
          },
          {
            id: 2,
            title: "Youth Leadership Workshop",
            description: "A hands-on workshop teaching advocacy skills to young Nigerians passionate about freedom.",
            location: "Abuja, Nigeria",
            date: "2023-04-10",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Workshop Materials",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Event Photos",
                type: "photos" as const,
                url: "#",
              },
            ],
            category: "Workshop",
          },
          {
            id: 3,
            title: "Economic Freedom Bootcamp",
            description:
              "An intensive two-day bootcamp focused on entrepreneurship, market principles, and economic liberty.",
            location: "Port Harcourt, Nigeria",
            date: "2023-03-05",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Bootcamp Materials",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Event Video",
                type: "video" as const,
                url: "#",
              },
            ],
            category: "Bootcamp",
          },
          {
            id: 4,
            title: "Digital Advocacy Training",
            description:
              "A workshop on leveraging digital tools and platforms for effective advocacy in the modern age.",
            location: "Ibadan, Nigeria",
            date: "2023-02-20",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Training Materials",
                type: "slides" as const,
                url: "#",
              },
            ],
            category: "Workshop",
          },
          {
            id: 5,
            title: "Property Rights Symposium",
            description:
              "A symposium examining the crucial role of property rights in creating economic prosperity and opportunity.",
            location: "Lagos, Nigeria",
            date: "2023-01-12",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Symposium Presentations",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Event Report",
                type: "report" as const,
                url: "#",
              },
            ],
            category: "Symposium",
          },
          {
            id: 6,
            title: "Community Organizers Workshop",
            description:
              "A practical workshop for grassroots organizers focused on promoting economic freedom and entrepreneurship in local communities.",
            location: "Kano, Nigeria",
            date: "2022-12-05",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Workshop Materials",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Event Photos",
                type: "photos" as const,
                url: "#",
              },
            ],
            category: "Workshop",
          },
          {
            id: 7,
            title: "Economic Policy Forum",
            description:
              "A forum discussing policy reforms needed to advance economic freedom and prosperity in Nigeria.",
            location: "Abuja, Nigeria",
            date: "2022-11-15",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Forum Presentations",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Policy Recommendations",
                type: "report" as const,
                url: "#",
              },
            ],
            category: "Forum",
          },
          {
            id: 8,
            title: "Youth Entrepreneurship Summit",
            description: "A summit focused on empowering young entrepreneurs with knowledge, skills, and resources.",
            location: "Lagos, Nigeria",
            date: "2022-10-20",
            image_url: "/placeholder.svg?height=400&width=600",
            resources: [
              {
                title: "Summit Materials",
                type: "slides" as const,
                url: "#",
              },
              {
                title: "Event Video",
                type: "video" as const,
                url: "#",
              },
            ],
            category: "Summit",
          },
        ]

        setEvents(data)
        setFilteredEvents(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    // Filter and sort events based on search query, location filter, category filter, and sort order
    let filtered = [...events]

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (locationFilter.length > 0) {
      filtered = filtered.filter((event) => locationFilter.some((location) => event.location.includes(location)))
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((event) => categoryFilter.includes(event.category))
    }

    if (sortOrder === "latest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sortOrder === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredEvents(filtered)
  }, [searchQuery, locationFilter, categoryFilter, sortOrder, events])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const locations = [...new Set(events.map((event) => event.location))]
  const categories = [...new Set(events.map((event) => event.category))]

  const handleLocationFilterChange = (location: string) => {
    setLocationFilter((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location)
      } else {
        return [...prev, location]
      }
    })
  }

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "slides":
        return <Download className="h-4 w-4" />
      case "video":
        return <ExternalLink className="h-4 w-4" />
      case "report":
        return <Download className="h-4 w-4" />
      case "photos":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
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
            <h1 className="text-4xl md:text-5xl font-bold">Past Events</h1>
            <p className="text-lg text-muted-foreground">
              Browse our previous events and access resources, presentations, and reports.
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
                placeholder="Search past events..."
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
                    <Accordion type="multiple" className="w-full">
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
                      <AccordionItem value="category">
                        <AccordionTrigger>Category</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`category-${category}`}
                                  checked={categoryFilter.includes(category)}
                                  onCheckedChange={() => handleCategoryFilterChange(category)}
                                />
                                <label
                                  htmlFor={`category-${category}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLocationFilter([])
                        setCategoryFilter([])
                      }}
                    >
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
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="w-10 h-8 p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="w-10 h-8 p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ) : (
              <div className="animate-pulse">
                <div className="h-10 bg-ash rounded w-full mb-4" />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 bg-ash rounded w-full mb-2" />
                ))}
              </div>
            )
          ) : filteredEvents.length > 0 ? (
            viewMode === "grid" ? (
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
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {event.category}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <p className="text-sm font-medium">{formatDate(event.date)}</p>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center mb-4">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>

                      {event.resources.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Resources:</p>
                          <div className="flex flex-wrap gap-2">
                            {event.resources.map((resource, i) => (
                              <Button key={i} variant="outline" size="sm" asChild>
                                <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                                  {getResourceIcon(resource.type)}
                                  <span className="ml-1">{resource.title}</span>
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Resources</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{formatDate(event.date)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {event.resources.map((resource, i) => (
                              <Button key={i} variant="outline" size="sm" asChild>
                                <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                                  {getResourceIcon(resource.type)}
                                  <span className="sr-only">{resource.title}</span>
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
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
                  setCategoryFilter([])
                  setSortOrder("latest")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Looking for Upcoming Events?"
            subtitle="Check out our calendar of upcoming workshops, seminars, and conferences"
            center
          />

          <div className="mt-8">
            <Button asChild>
              <Link href="/events/upcoming">View Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Request Materials Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Need Materials from a Past Event?"
            subtitle="Contact us to request resources from events not listed here"
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

