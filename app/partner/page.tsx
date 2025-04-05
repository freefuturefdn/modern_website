"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Handshake, Building, Users, Globe, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  organizationType: z.string({
    required_error: "Please select an organization type.",
  }),
  partnershipType: z.string({
    required_error: "Please select a partnership type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

const partners = [
  {
    id: 1,
    name: "Students For Liberty",
    image: "https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/public/website-images/sfl-logo.png",
    alt: "Students For Liberty Logo"
  },
  {
    id: 2,
    name: "Atlas Network",
    image: "https://xjvcrbtgesdtudmvtlau.supabase.co/storage/v1/object/sign/website-images/Ms.%20Ruth%20at%20Activism%20101.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9Ncy4gUnV0aCBhdCBBY3RpdmlzbSAxMDEuanBnIiwiaWF0IjoxNzQzNTgzNjUzLCJleHAiOjMzNTE5MTk2NTN9.fysuDRjtZfb560H63FuwaD6Kjn9YP-B6thnZkffpWkM",
    alt: "Atlas Network Logo"
  },
  // Add more partners as needed
]

export default function PartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      contactName: "",
      email: "",
      phone: "",
      organizationType: "",
      partnershipType: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would be an actual Supabase insert
      // For now, we'll just simulate a successful submission

      console.log("Form values:", values)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Partnership inquiry submitted!",
        description: "We'll review your information and get back to you soon.",
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong.",
        description: "Your inquiry could not be submitted. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const partnershipTypes = [
    {
      title: "Program Partnerships",
      description:
        "Collaborate on educational programs, workshops, and training initiatives to empower Nigerian youth.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Corporate Partnerships",
      description:
        "Support our mission through financial contributions, in-kind donations, or employee volunteer programs.",
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: "Research Partnerships",
      description:
        "Collaborate on research projects related to economic freedom, youth empowerment, and policy reform.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Strategic Alliances",
      description: "Join forces to advocate for policy changes and create broader impact through coordinated efforts.",
      icon: <Handshake className="h-6 w-6" />,
    },
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
              <h1 className="text-4xl md:text-5xl font-bold">Partner With Us</h1>
              <p className="text-lg text-muted-foreground">
                Join forces with Free Future Foundation to create greater impact in empowering Nigerian youth and
                advancing freedom.
              </p>
              <Button size="lg" asChild>
                <a href="#partner-form">Become a Partner</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/partner.jpg?height=400&width=600"
                  alt="Partnership handshake"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Partnership Opportunities"
            subtitle="Ways to collaborate with Free Future Foundation"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {partnershipTypes.map((type, index) => (
              <AnimatedCard key={type.title} delay={index * 0.1} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <div className="text-primary">{type.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Partners"
            subtitle="Organizations we collaborate with to advance our mission"
            center
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
            {partners.map((partner) => (
              <AnimatedCard
                key={partner.id}
                delay={partner.id * 0.1}
                className="bg-white p-20 rounded-lg shadow-md flex items-center justify-center"
              >
                <div className="relative h-12 w-full flex items-center ">
                  <Image
                    src={partner.image}
                    alt={partner.alt}
                    fill
                    className="object-contain p-3"
                    unoptimized
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {partner.name}
                </p>
              </AnimatedCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/partners">View All Partners</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedCard direction="right">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Partnership benefits"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedCard>

            <AnimatedCard direction="left" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Benefits of Partnership</h2>
                <p className="text-muted-foreground">
                  Partnering with Free Future Foundation offers numerous benefits for organizations that share our
                  vision of a free and prosperous Nigeria.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                      <Handshake className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Expanded Impact</h3>
                      <p className="text-muted-foreground">
                        Reach more communities and create greater positive change through collaborative efforts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Access to Networks</h3>
                      <p className="text-muted-foreground">
                        Connect with our extensive network of youth leaders, policymakers, and community stakeholders.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Enhanced Visibility</h3>
                      <p className="text-muted-foreground">
                        Gain recognition through our communications channels and events.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-0.5">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Shared Resources</h3>
                      <p className="text-muted-foreground">
                        Leverage combined expertise, resources, and capabilities to achieve common goals.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section id="partner-form" className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Become a Partner"
            subtitle="Fill out the form below to start the conversation"
            center
          />

          <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your organization's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select organization type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                            <SelectItem value="corporate">Corporate/Business</SelectItem>
                            <SelectItem value="government">Government Agency</SelectItem>
                            <SelectItem value="academic">Academic Institution</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="partnershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partnership Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select partnership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="program">Program Partnership</SelectItem>
                          <SelectItem value="corporate">Corporate Partnership</SelectItem>
                          <SelectItem value="research">Research Partnership</SelectItem>
                          <SelectItem value="strategic">Strategic Alliance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your organization and how you'd like to partner with us"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit Partnership Inquiry <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  )
}

