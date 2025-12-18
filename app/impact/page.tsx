"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, BookOpen, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

export default function ImpactPage() {
  const impactStats = [
    {
      number: "2,000+",
      label: "Youth Reached",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "4+",
      label: "Countries",
      icon: <Target className="h-6 w-6" />,
    },
    {
      number: "4+",
      label: "Programs",
      icon: <BookOpen className="h-6 w-6" />,
    },
    /* {
      number: "20+",
      label: "Policy Reforms Influenced",
      icon: <TrendingUp className="h-6 w-6" />,
    }, */
  ]

  const impactAreas = [
    {
      title: "Activism 101 Workshops",
      description:
        "Activism 101 Workshops are foundational training sessions designed to equip emerging changemakers with the knowledge, tools, and confidence to engage in impactful civic action. These workshops provide a practical introduction to activism, covering essential topics such as the history and principles of social movements, strategic advocacy, grassroots organizing, policy influence, and the ethical responsibilities of an activist. Through interactive discussions, real-world case studies, and hands-on activities, participants learn how to craft compelling messages, mobilize communities, use digital tools effectively, and drive social change through nonviolent means. Whether you're just starting or seeking to sharpen your skills, Activism 101 offers a safe, empowering space to explore your voice, connect with like-minded individuals, and begin your journey as a principled and effective advocate for a freer, more just society.",
      image: "https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/sign/website-images/activism101.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9hY3RpdmlzbTEwMS5qcGciLCJpYXQiOjE3NDM4NTI2MDQsImV4cCI6MzM1MjE4ODYwNH0.Cpgr4VeQbKkA410bvTy08u8RDzxAIUU8Abz5D_jziig",
    },
    {
      title: "Her Voice, Her Impact Workshops",
      description:
        "Her Voice, Her Impact Workshops are empowering sessions designed to amplify the voices of young women and equip them with the skills and confidence to become leaders, advocates, and changemakers in their communities. These workshops focus on personal development, leadership training, civic education, and strategic communication, helping participants understand their rights, express their ideas with clarity, and influence public discourse and policy. Through storytelling, mentorship, and interactive learning, the workshops create a safe and supportive space where women can share experiences, build networks, and develop actionable plans for social impact. Her Voice, Her Impact is more than a workshop, it’s a movement to foster agency, resilience, and purpose in the next generation of women leaders committed to shaping a freer, more inclusive society.",
      image: "./hvhi.jpg",
    },
    {
      title: "The Townhall",
      description:
        "The Townhall is a campus-based civic engagement forum that brings together students, faculty, and young leaders to discuss critical social, economic, and political issues affecting their communities and future. Designed as a space for open dialogue and constructive debate, it empowers students to voice their concerns, share ideas, and engage directly with local changemakers and experts. By fostering civic awareness, critical thinking, and collective problem-solving, The Town Hall encourages a culture of active citizenship on campus, where students don’t just learn about society but actively participate in shaping it. Each session is a call to action, sparking meaningful conversations that can lead to real change, right from the heart of the university.",
      image: "townhall.png",
    },
    {
      title: "The Liberty Leadership Academy",
      description:
        "The Liberty Leadership Academy, a 12 week intensive program of the Free Future Foundation, equips 20 high-potential young leaders with the intellectual fondations, practical skill, and professional tools to champion liberty and good governance in Africa.",
      image: "lla2.jpeg",
    },
  ]

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
            <h1 className="text-4xl md:text-5xl font-bold">Our Impact</h1>
            <p className="text-lg text-muted-foreground">
              Measuring our progress in empowering African youths and advancing freedom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Impact at a Glance" subtitle="Key metrics from our work across Africa" center />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {impactStats.map((stat, index) => (
              <AnimatedCard
                key={stat.label}
                delay={index * 0.1}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <div className="text-primary">{stat.icon}</div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading title="Areas of Impact" subtitle="How we're making a difference across Africa" />

          <div className="space-y-16 mt-12">
            {impactAreas.map((area, index) => (
              <div
                key={area.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <AnimatedCard
                  direction={index % 2 === 0 ? "right" : "left"}
                  className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
                >
                  <Image src={area.image || "/placeholder.svg"} alt={area.title} fill className="object-cover" />
                </AnimatedCard>

                <AnimatedCard direction={index % 2 === 0 ? "left" : "right"} delay={0.2} className="space-y-4">
                  <h3 className="text-2xl font-bold">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Impact Stories"
            subtitle="Hear from those who have benefited from our programs"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <AnimatedCard className="bg-secondary/70 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="./colored-logo.png" 
                    alt="Nasir Nasir" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">Nasir Nasir</h3>
                  <p className="text-sm text-muted-foreground">Veterinarian</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                ". . . an incredible journey of learning and exploring the values of freedom, liberty, and equality. 
                Thought this work is slightly outside my usual professional focus, the experience has been deeply enriching."
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-6 rounded-lg shadow-md" delay={0.1}>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="./colored-logo.png" 
                    alt="Olapeju Junaid" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">Olapeju Junaid</h3>
                  <p className="text-sm text-muted-foreground">Legal Researcher and attendee at Activism 101</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The workshop exceeded expectations, igniting a fire within me to champion positive impact. 
                I'm glad to have been in the workshop. "
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-6 rounded-lg shadow-md" delay={0.2}>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="./colored-logo.png" 
                    alt="Oluwabukunmi Adekunle" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">Oluwabukunmi Adekunle</h3>
                  <p className="text-sm text-muted-foreground">Email Copywriter and Law Student</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "I particularly found the speakers enlightening, as their sessions offered clarity on a lot of issues
                ranging from activism to policy making and civic governance. "
              </p>
            </AnimatedCard>
          </div>
{/*
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/success-stories">
                Read More Success Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
*/}
        </div>
      </section>
{/*
      // Annual Reports Section 
      <section className="py-20 bg-primary/70">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Annual Reports"
            subtitle="Detailed documentation of our impact and activities"
            center
          />

          <p className="max-w-3xl mx-auto text-muted-foreground mb-8">
            Our annual reports provide comprehensive information about our programs, impact, finances, and future plans.
            They demonstrate our commitment to transparency and accountability.
          </p>

          <Button asChild>
            <Link href="/reports">
              View Annual Reports <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      */}
    </div>
  )
}

