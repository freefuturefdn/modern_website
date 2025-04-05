"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Twitter, Facebook, Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

export default function SocialChannelsPage() {
  const socialChannels = [
    {
      name: "Twitter",
      handle: "@freefuturefdn",
      url: "https://x.com/freefuturefdn",
      icon: <Twitter className="h-8 w-8 text-[#1DA1F2]" />,
      color: "#1DA1F2",
      description:
        "Follow us for the latest updates, news, and join the conversation about freedom and youth empowerment.",
      followers: "0.2K+",
    },
    {
      name: "Facebook",
      handle: "Free Future Foundation",
      url: "https://www.facebook.com/profile.php?id=100093109492720",
      icon: <Facebook className="h-8 w-8 text-[#4267B2]" />,
      color: "#4267B2",
      description: "Like our page for events, stories, and community updates about our work across Nigeria.",
      followers: "0.7K+",
    },
    {
      name: "Instagram",
      handle: "@free_tribers",
      url: "https://www.instagram.com/free_tribers?igsh=aTBjdGh2M2ZvcTU1",
      icon: <Instagram className="h-8 w-8 text-[#E1306C]" />,
      color: "#E1306C",
      description: "See photos and videos from our programs, events, and the impact we're making across Nigeria.",
      followers: "0.5K+",
    },
    {
      name: "LinkedIn",
      handle: "Free Future Foundation",
      url: "https://linkedin.com/company/freeff",
      icon: <Linkedin className="h-8 w-8 text-[#0077B5]" />,
      color: "#0077B5",
      description:
        "Connect with us professionally and stay updated on our research, partnerships, and career opportunities.",
      followers: "0.4K+",
    },
    {
      name: "YouTube",
      handle: "Free Future Foundation",
      url: "https://youtube.com/@freetribers?si=v02GQWqoIrvbUYP4",
      icon: <Youtube className="h-8 w-8 text-[#FF0000]" />,
      color: "#FF0000",
      description:
        "Watch videos of our events, interviews, educational content, and impact stories from across Nigeria.",
      followers: "0.3K+",
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
            <h1 className="text-4xl md:text-5xl font-bold">Connect With Us</h1>
            <p className="text-lg text-muted-foreground">
              Follow us on social media to stay updated on our activities, events, and impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Channels Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {socialChannels.map((channel, index) => (
              <div key={channel.name} className="border-b pb-16 last:border-b-0 last:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <AnimatedCard direction={index % 2 === 0 ? "right" : "left"} className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div
                        className={`bg-${channel.name.toLowerCase()}-100 bg-opacity-20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                        style={{ backgroundColor: `${channel.color}10` }}
                      >
                        {channel.icon}
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">{channel.name}</h3>
                      <p className="text-primary font-medium text-center mb-4">{channel.handle}</p>
                      <p className="text-muted-foreground text-center mb-4">{channel.description}</p>
                      <p className="text-center mb-6">{channel.followers} followers</p>
                      <Button className="w-full" asChild>
                        <Link href={channel.url} target="_blank" rel="noopener noreferrer">
                          Follow Us on {channel.name}
                        </Link>
                      </Button>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Guidelines Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading title="Social Media Guidelines" subtitle="How to engage with us on social media" center />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">How to Support Our Mission</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Follow and like our social media accounts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Share our content with your network</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Engage with our posts through comments and discussions</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Use our hashtags in relevant posts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tag us in content related to freedom and youth empowerment</span>
                </li>
              </ul>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <h3 className="text-xl font-bold mb-4">Our Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#FreeFutureFoundation</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#FreeTribers</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#Empowerment</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#Activism</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#FreedomAdvocates</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#Leadership</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#YouthLeaders</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">#FutureChangemakers</span>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Have Questions?"
            subtitle="Contact our communications team for social media inquiries"
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

