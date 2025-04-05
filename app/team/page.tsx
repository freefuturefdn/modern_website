"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import type { TeamMember } from "@/lib/supabase"
import { supabase } from "@/lib/supabase"

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order_position', { ascending: true });

        if (error) throw error;
        setTeamMembers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setLoading(false);
      }
    }

    fetchTeamMembers()
  }, [])

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
            <h1 className="text-4xl md:text-5xl font-bold">Meet Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Our dedicated team of professionals is committed to empowering Nigerian youth and advancing the cause of
              freedom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Team" 
            subtitle="The dedicated professionals making our mission possible" 
            center 
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-ash rounded-t-lg" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {teamMembers.map((member, index) => (
                <AnimatedCard
                  key={member.id}
                  delay={index * 0.1}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={member.image_url || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      {member.social_links.twitter && (
                        <Link
                          href={member.social_links.twitter}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </Link>
                      )}
                      {member.social_links.linkedin && (
                        <Link
                          href={member.social_links.linkedin}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      )}
                      {member.social_links.facebook && (
                        <Link
                          href={member.social_links.facebook}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Facebook className="h-5 w-5" />
                          <span className="sr-only">Facebook</span>
                        </Link>
                      )}
                      <Link
                        href={`mailto:${member.name.toLowerCase().replace(" ", ".")}@freefuturefoundation.org`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading title="Join Our Team" subtitle="Be part of our mission to empower Nigerian youth" center />

          <div className="max-w-2xl mx-auto mt-8">
            <p className="text-muted-foreground mb-6">
              We're always looking for passionate individuals who share our vision of a free and prosperous Nigeria. If
              you're interested in joining our team, check out our current openings or send us your resume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button size="lg" asChild>
                <Link href="/careers">View Openings</Link>
              </Button> */}
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

