"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Calendar, Play, Pause, Volume2, Star, Medal, Flame, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Apple, Spotify, Rss } from "@/components/icons"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import { supabase } from "@/lib/supabase"

// Updated categories to match FFF's mission
const CATEGORIES = {
  FREEDOM: { 
    label: "Economic Liberty", 
    icon: Star, 
    color: "bg-[hsl(var(--chart-1))]",
    description: "Exploring free market principles and economic empowerment"
  },
  LEADERSHIP: { 
    label: "Youth Leadership", 
    icon: Medal, 
    color: "bg-[hsl(var(--chart-2))]",
    description: "Developing tomorrow's freedom advocates"
  },
  ADVOCACY: { 
    label: "Policy Reform", 
    icon: Flame, 
    color: "bg-[hsl(var(--chart-3))]",
    description: "Fighting for individual rights and limited government"
  },
  GLOBAL: { 
    label: "Global Liberty", 
    icon: Globe, 
    color: "bg-[hsl(var(--chart-4))]",
    description: "Connecting with freedom movements worldwide"
  }
}

interface Podcast {
  id: number;
  title: string;
  description: string;
  episode_number: number;
  category: keyof typeof CATEGORIES;
  image_url: string;
  audio_url: string;
  duration: string;
  host: string;
  guests: string[];
  published_at: string;
  featured: boolean;
  listen_count: number;
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [emailSubscription, setEmailSubscription] = useState('')

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const { data, error } = await supabase
          .from('podcasts')
          .select('*')
          .order('episode_number', { ascending: false });

        if (error) throw error;
        setPodcasts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setLoading(false);
      }
    }

    fetchPodcasts()
  }, [])

  const featuredPodcast = podcasts.find(p => p.featured)

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
            <h1 className="text-4xl md:text-5xl font-bold">Voice of Freedom</h1>
            <p className="text-lg text-muted-foreground">
              Join us in exploring ideas that shape Nigeria's future through liberty, 
              entrepreneurship, and youth empowerment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Episode */}
      {featuredPodcast && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Featured Episode" 
              subtitle="Listen to our latest conversation about freedom"
              center 
            />
            
            <AnimatedCard className="mt-12 bg-white rounded-lg overflow-hidden shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-video md:aspect-square">
                  <Image
                    src={featuredPodcast.image_url}
                    alt={featuredPodcast.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
                  <Badge 
                    className={`absolute top-4 left-4 ${CATEGORIES[featuredPodcast.category].color} text-white`}
                  >
                    Featured Episode
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{featuredPodcast.title}</h3>
                  <p className="text-muted-foreground mb-4">{featuredPodcast.description}</p>
                  <div className="flex items-center gap-4 mb-6">
                    <Button size="lg" className="w-full">
                      <Play className="mr-2 h-5 w-5" />
                      Listen Now
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      )}

      {/* Latest Episodes */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Latest Episodes" 
            subtitle="Join the conversation for a free future"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {podcasts.map((podcast, index) => (
              <AnimatedCard
                key={podcast.id}
                delay={index * 0.1}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                {/* ... existing podcast card content ... */}
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Never Miss an Episode"
            subtitle="Subscribe to our newsletter for updates on new episodes and freedom-focused content"
            center
          />
          
          <div className="max-w-md mx-auto mt-8">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={emailSubscription}
                onChange={(e) => setEmailSubscription(e.target.value)}
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Platforms */}
      <section className="py-20 bg-footer text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Listen on Your Favorite Platform
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <Apple className="mr-2 h-5 w-5" />
              Apple Podcasts
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <Spotify className="mr-2 h-5 w-5" />
              Spotify
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <Rss className="mr-2 h-5 w-5" />
              RSS Feed
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}