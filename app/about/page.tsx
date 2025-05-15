"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, BookOpen, Target, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

export default function AboutPage() {
  const values = [
    {
      title: "Professionalism",
      description: "Maintaining high standards of integrity, excellence, and accountability in all activies.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Liberty",
      description: "Upholding individual freedoms and advocating for policies that promote human flourishing.",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Innovation",
      description:
        "Encouragin creative and practical solutions to advance the freedom movement.",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Collaboration",
      description: "Building strong networks and partnerships to amplify impact.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Empowerment",
      description: "Equipping young people with knowledge and tools to drive positive change.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Impact Driven",
      description: "Focusing on meaningful and sustarnable change in society.",
      icon: <Target className="h-6 w-6" />,
    },
  ]
  

  const milestones = [
    {
      year: "2024",
      title: "Foundation Established",
      description: "Free Future Foundation was founded by Kelechi Nwannunu with a vision to empower Nigerian youth.",
    },
    {
      year: "2024",
      title: "First Youth Leadership Program",
      description: "Launched our flagship program, Activism 101, to develop the next generation of freedom advocates.",
    },
    {
      year: "2024",
      title: "Her Voice Her Impact",
      description: "Given voice to the real catalyst of change.",
    },
    {
      year: "2025",
      title: "Monthly town hall meetings",
      description: "Discussing the freer future initiave, in a detailed conversation led by best of brains.",
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold">About Free Future Foundation</h1>
              <p className="text-lg text-muted-foreground">
                At the Free Future Foundation, founded in 2024 by a team of young freedom-minded Africans, we are 
                committed to igniting a passion for liberty and empowring communities to shape their future. As a think 
                tank dedicated to promoting awareness about the impact of public policies on everyday life, we strive 
                to create a society where individeals can thrive in a free, prosperous, and just envrironment. Through 
                out research, education, and advocacy efforts, we aim to educate and engage a knowlegeable community capable 
                influencing and changing public policies. Guided by our core values of liberty and professionalism, we seek 
                to build a brighter future for all, wher individual rights are respected, and opportunities abound. Join us 
                in our mission to create a freer, more prosperous world, where everyone can reach their full potential.
              </p>
              <Button asChild>
                <Link href="/team">
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/sign/website-images/about-us.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9hYm91dC11cy5qcGciLCJpYXQiOjE3NDM4NTE2NDMsImV4cCI6MzM1MjE4NzY0M30.HtUb4ckNrOgIC4PqcvXk7R6AfGtF15rh4HRByJjrHwk"
                  alt="Free Future Foundation team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedCard className="bg-primary/70 p-8 rounded-lg">
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

            <AnimatedCard className="bg-secondary/70 p-8 rounded-lg" delay={0.2}>
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

      {/* Our Values Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Core Values" subtitle="The principles that guide our work" center />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => (
              <AnimatedCard key={value.title} delay={index * 0.1} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <div className="text-primary">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Journey" subtitle="Key milestones in our history" />

          <div className="relative mt-12">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-ash-light transform md:translate-x-[-0.5px]" />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.title} className="relative">
                  <AnimatedCard
                    direction={index % 2 === 0 ? "right" : "left"}
                    className={`md:w-1/2 ${index % 2 === 0 ? "md:ml-auto" : ""} bg-white p-6 rounded-lg shadow-md relative`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute top-6 left-0 md:left-auto md:right-auto md:translate-y-0 transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 md:top-1/2 w-4 h-4 rounded-full bg-primary" />

                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </AnimatedCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Join Our Mission"
            subtitle="Be part of the movement for a free and prosperous Nigeria"
            center
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

