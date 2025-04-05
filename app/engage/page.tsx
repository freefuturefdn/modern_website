"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Share2, MessageSquare, Heart, BookOpen, Users } from "lucide-react"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import { Input } from "@/components/ui/input"

export default function EngagePage() {
  const engagementWays = [
    {
      title: "Follow Us on Social Media",
      description:
        "Stay updated with our latest news, events, and resources by following us on social media platforms.",
      icon: <Share2 className="h-6 w-6" />,
      link: "/social",
      linkText: "Connect with Us",
    },
    {
      title: "Join the Conversation",
      description:
        "Participate in discussions about freedom, youth empowerment, and Nigeria's future on our blog and social channels.",
      icon: <MessageSquare className="h-6 w-6" />,
      link: "/blog",
      linkText: "Visit Our Blog",
    },
    {
      title: "Attend Our Events",
      description: "Join our workshops, seminars, and conferences to learn, network, and contribute to the movement.",
      icon: <Users className="h-6 w-6" />,
      link: "/events/upcoming",
      linkText: "Upcoming Events",
    },
    {
      title: "Share Our Resources",
      description: "Help spread knowledge about freedom and individual rights by sharing our educational resources.",
      icon: <BookOpen className="h-6 w-6" />,
      link: "/resources",
      linkText: "Explore Resources",
    },
    {
      title: "Donate",
      description:
        "Support our mission financially to help us reach more Nigerian youth with our programs and initiatives.",
      icon: <Heart className="h-6 w-6" />,
      link: "/donate",
      linkText: "Make a Donation",
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
            <h1 className="text-4xl md:text-5xl font-bold">Engage With Us</h1>
            <p className="text-lg text-muted-foreground">
              Join the movement for freedom and youth empowerment in Nigeria. There are many ways to get involved and
              make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Engage Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Ways to Engage" subtitle="How you can participate in our mission" center />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {engagementWays.map((way, index) => (
              <AnimatedCard key={way.title} delay={index * 0.1} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <div className="text-primary">{way.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{way.title}</h3>
                <p className="text-muted-foreground mb-4">{way.description}</p>
                <Button variant="outline" asChild>
                  <Link href={way.link}>
                    {way.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading title="Connect With Us" subtitle="Follow us on social media to stay updated" center />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#1DA1F2]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Twitter className="h-8 w-8 text-[#1DA1F2]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Twitter</h3>
              <p className="text-muted-foreground mb-4">Follow us for the latest updates and join the conversation.</p>
              <Button variant="outline" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Follow @FreeFFNigeria
                </Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md text-center" delay={0.1}>
              <div className="bg-[#4267B2]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Facebook className="h-8 w-8 text-[#4267B2]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Facebook</h3>
              <p className="text-muted-foreground mb-4">Like our page for events, stories, and community updates.</p>
              <Button variant="outline" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Like Our Page
                </Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md text-center" delay={0.2}>
              <div className="bg-[#E1306C]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Instagram className="h-8 w-8 text-[#E1306C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="text-muted-foreground mb-4">See photos and videos from our programs and events.</p>
              <Button variant="outline" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Follow Us
                </Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md text-center" delay={0.3}>
              <div className="bg-[#FF0000]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Youtube className="h-8 w-8 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold mb-2">YouTube</h3>
              <p className="text-muted-foreground mb-4">
                Watch videos of our events, interviews, and educational content.
              </p>
              <Button variant="outline" asChild>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Subscribe
                </Link>
              </Button>
            </AnimatedCard>
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/social">
                View All Social Channels <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedCard direction="right">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground">
                  Stay informed about our activities, events, and impact. Our newsletter provides regular updates on our
                  programs and opportunities to get involved.
                </p>
                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input type="email" placeholder="Your email address" className="flex-grow" />
                    <Button type="submit">Subscribe</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
                </form>
              </div>
            </AnimatedCard>

            <AnimatedCard direction="left" delay={0.2}>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/placeholder.svg?height=400&width=600" alt="Newsletter" fill className="object-cover" />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Ready to Make a Difference?"
            subtitle="Join us in our mission to empower Nigerian youth"
            center
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/donate">Make a Donation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

