"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

interface Volunteer {
  id: number
  name: string
  location: string
  interests: string[]
}

const placeholderVolunteers: Volunteer[] = [
  {
    id: 1,
    name: "John Doe",
    location: "Lagos, Nigeria",
    interests: ["Education", "Events"],
  },
  {
    id: 2,
    name: "Jane Smith",
    location: "Abuja, Nigeria",
    interests: ["Advocacy", "Research"],
  },
  {
    id: 3,
    name: "Samuel Ade",
    location: "Ibadan, Nigeria",
    interests: ["Communications", "Fundraising"],
  },
  {
    id: 4,
    name: "Aisha Bello",
    location: "Kano, Nigeria",
    interests: ["Education", "Administration"],
  },
  {
    id: 5,
    name: "Chidi Okoro",
    location: "Enugu, Nigeria",
    interests: ["Events", "Advocacy"],
  },
  {
    id: 6,
    name: "Fatima Yusuf",
    location: "Port Harcourt, Nigeria",
    interests: ["Research", "Communications"],
  },
]

export default function VolunteersPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold">Our Volunteers</h1>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated individuals who are helping us empower Nigerian youth and advance the cause of freedom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Valued Volunteers"
            subtitle="The passionate individuals making our mission possible"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {placeholderVolunteers.map((volunteer, index) => (
              <AnimatedCard
                key={volunteer.id}
                delay={index * 0.1}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative aspect-square bg-primary/10 flex items-center justify-center">
                  <Image src="/logo.png" alt={volunteer.name} width={100} height={100} className="object-contain" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{volunteer.name}</h3>
                  <p className="text-muted-foreground font-medium mb-3">{volunteer.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.interests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
