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
      label: "Youth Empowered",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "4",
      label: "States Reached",
      icon: <Target className="h-6 w-6" />,
    },
    {
      number: "10+",
      label: "Educational Programs",
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
      image: "https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/sign/website-images/her%20voice%20her%20impact%20flyer.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9oZXIgdm9pY2UgaGVyIGltcGFjdCBmbHllci5qcGciLCJpYXQiOjE3NDM4NTMyNzYsImV4cCI6MzM1MjE4OTI3Nn0.-5IJwwwOys3U4VIJt3RrIeMosqN_4Ct3MPd7n8gL7Ws",
    },
    {
      title: "The Townhall",
      description:
        "The Townhall is a campus-based civic engagement forum that brings together students, faculty, and young leaders to discuss critical social, economic, and political issues affecting their communities and future. Designed as a space for open dialogue and constructive debate, it empowers students to voice their concerns, share ideas, and engage directly with local changemakers and experts. By fostering civic awareness, critical thinking, and collective problem-solving, The Town Hall encourages a culture of active citizenship on campus, where students don’t just learn about society but actively participate in shaping it. Each session is a call to action, sparking meaningful conversations that can lead to real change, right from the heart of the university.",
      image: "https://images.unsplash.com/photo-1573879404555-3f82d0582798?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The Vanguard Fellowship",
      description:
        "The Vanguard Fellowship is a flagship program of the Free Future Foundation designed to empower young Nigerians through a structured two-phase experience in activism and civic engagement. The 14-week virtual pre-fellowship equips participants with foundational knowledge in civic awareness, economic freedom, and advocacy strategies. Top performers then advance to a 2-day in-person intensive, where they refine their skills, collaborate on projects, and receive certification. More than just a training, the fellowship emphasizes practical application, mentorship, and long-term support, ensuring participants become effective advocates for liberty, human rights, free markets, and limited government. The Vanguard Fellowship stands out for its merit-based structure, strong mentorship, and commitment to building a sustained community of liberty-minded changemakers across Nigeria.",
      image: "https://images.unsplash.com/photo-1573879404555-3f82d0582798?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
              Measuring our progress in empowering Nigerian youth and advancing freedom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Impact at a Glance" subtitle="Key metrics from our work across Nigeria" center />

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
          <SectionHeading title="Areas of Impact" subtitle="How we're making a difference across Nigeria" />

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
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80" 
                    alt="Chioma Okonkwo" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">Chioma Okonkwo</h3>
                  <p className="text-sm text-muted-foreground">Youth Leadership Program</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The leadership training I received from Free Future Foundation transformed my life. I now lead a
                community initiative that has improved educational access for over 200 children in my area."
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-6 rounded-lg shadow-md" delay={0.1}>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
                    alt="Emeka Adeyemi" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">Emeka Adeyemi</h3>
                  <p className="text-sm text-muted-foreground">Economic Freedom Workshop</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Thanks to the knowledge I gained about entrepreneurship and market principles, I was able to start my
                own business that now employs 15 people in my community."
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-secondary/70 p-6 rounded-lg shadow-md" delay={0.2}>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80" 
                    alt="Amina Ibrahim" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold">Amina Ibrahim</h3>
                  <p className="text-sm text-muted-foreground">Policy Advocacy Program</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Being part of the advocacy network gave me the skills and confidence to engage with local officials.
                Our group successfully advocated for policy changes that have made it easier for young people to start
                businesses."
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

      {/* Annual Reports Section */}
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
    </div>
  )
}

