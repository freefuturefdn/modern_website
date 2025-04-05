"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CheckCircle, Users, Calendar, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  location: z.string().min(2, {
    message: "Please enter your location.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one area of interest.",
  }),
  experience: z.string().min(10, {
    message: "Please provide some information about your experience.",
  }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

type FormValues = z.infer<typeof formSchema>

const interestOptions = [
  { id: "education", label: "Education Programs" },
  { id: "advocacy", label: "Advocacy Campaigns" },
  { id: "events", label: "Event Organization" },
  { id: "research", label: "Research & Policy" },
  { id: "communications", label: "Communications & Media" },
  { id: "fundraising", label: "Fundraising" },
  { id: "administration", label: "Administrative Support" },
]

export default function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      interests: [],
      experience: "",
      availability: "",
      agreeToTerms: false,
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
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong.",
        description: "Your application could not be submitted. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      title: "Make a Difference",
      description: "Directly contribute to empowering Nigerian youth and advancing freedom.",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Develop Skills",
      description: "Gain valuable experience and develop professional skills in various areas.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Flexible Commitment",
      description: "Choose from various volunteer opportunities that fit your schedule and interests.",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Join a Community",
      description: "Connect with like-minded individuals passionate about creating positive change.",
      icon: <MapPin className="h-6 w-6" />,
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
              <h1 className="text-4xl md:text-5xl font-bold">Become a Volunteer</h1>
              <p className="text-lg text-muted-foreground">
                Join our team of dedicated volunteers and help us empower Nigerian youth to champion freedom and create
                positive change.
              </p>
              <Button size="lg" asChild>
                <a href="#apply">Apply Now</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Volunteers working together"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Volunteer With Us?"
            subtitle="The benefits of joining our volunteer program"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {benefits.map((benefit, index) => (
              <AnimatedCard
                key={benefit.title}
                delay={index * 0.1}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Volunteer Opportunities"
            subtitle="Find the perfect role that matches your skills and interests"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Education Programs</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Facilitate workshops on economic freedom and individual rights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Develop educational materials and resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Mentor youth in leadership and advocacy skills</span>
                </li>
              </ul>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <h3 className="text-xl font-bold mb-4">Advocacy Campaigns</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Organize community outreach and awareness campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Engage with policymakers and stakeholders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Support grassroots mobilization efforts</span>
                </li>
              </ul>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.2}>
              <h3 className="text-xl font-bold mb-4">Events & Programs</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Help plan and execute workshops, conferences, and seminars</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Coordinate logistics and participant engagement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Document events through photography and reporting</span>
                </li>
              </ul>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.3}>
              <h3 className="text-xl font-bold mb-4">Communications & Media</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Create content for social media and website</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Develop newsletters and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Support media relations and public outreach</span>
                </li>
              </ul>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Apply to Volunteer" subtitle="Join our team and make a difference" center />

          <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                          <Input placeholder="Your email address" {...field} />
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
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Areas of Interest</FormLabel>
                        <FormDescription>Select all areas you're interested in volunteering.</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {interestOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.id])
                                          : field.onChange(field.value?.filter((value) => value !== option.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relevant Experience</FormLabel>
                      <FormDescription>
                        Tell us about any relevant skills, experience, or qualifications you have.
                      </FormDescription>
                      <FormControl>
                        <Textarea placeholder="Your experience" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="evenings">Evenings</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the terms and conditions</FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            privacy policy
                          </Link>
                          .
                        </FormDescription>
                      </div>
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
                      Submit Application <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Volunteer Testimonials"
            subtitle="Hear from our volunteers about their experiences"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Volunteer" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">Adebayo Ogunlesi</h3>
                  <p className="text-sm text-muted-foreground">Volunteer since 2024</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Volunteering with Free Future Foundation has been an incredible experience. I've developed new skills,
                made meaningful connections, and most importantly, contributed to positive change in my community."
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Volunteer" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">Ngozi Emenike</h3>
                  <p className="text-sm text-muted-foreground">Volunteer since 2024</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "As a volunteer, I've had the opportunity to work on impactful projects that align with my passion for
                freedom and youth empowerment. The team is supportive, and the work is truly rewarding."
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.2}>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Volunteer" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">Chinedu Okoro</h3>
                  <p className="text-sm text-muted-foreground">Volunteer since 2024</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Volunteering here has given me a platform to contribute to Nigeria's future. I've helped organize
                events and workshops that have directly impacted young people's understanding of freedom and their
                rights."
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  )
}

