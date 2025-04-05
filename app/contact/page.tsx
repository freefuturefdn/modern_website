"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  department: z.string({
    required_error: "Please select a department.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      department: "",
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
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong.",
        description: "Your message could not be sent. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions or want to get involved? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <SectionHeading
                title="Get in Touch"
                subtitle="We're here to answer your questions and help you get involved."
              />

              <div className="space-y-6">
                <AnimatedCard className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Our Location</h3>
                    <p className="text-muted-foreground">Lagos, Nigeria</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard className="flex items-start space-x-4" delay={0.1}>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-muted-foreground">+234 123 456 7890</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard className="flex items-start space-x-4" delay={0.2}>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">info@freefuturefoundation.org</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard className="flex items-start space-x-4" delay={0.3}>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                  </div>
                </AnimatedCard>
              </div>
            </div>

            <AnimatedCard direction="left" className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="volunteer">Volunteering</SelectItem>
                            <SelectItem value="partnership">Partnerships</SelectItem>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Message subject" {...field} />
                        </FormControl>
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
                          <Textarea placeholder="Your message" className="min-h-[120px]" {...field} />
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
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4">
          <SectionHeading title="Find Us" subtitle="Visit our office in Lagos, Nigeria" center />

          <div className="mt-12 h-[400px] rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full bg-ash-dark relative">
              {/* This would be replaced with an actual map in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-lg">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our organization"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">How can I volunteer with Free Future Foundation?</h3>
              <p className="text-muted-foreground">
                You can apply to volunteer through our website by visiting the Volunteer page. We have various
                opportunities available based on your skills and interests.
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <h3 className="text-xl font-bold mb-2">Does the foundation accept donations?</h3>
              <p className="text-muted-foreground">
                Yes, we accept donations to support our programs and initiatives. You can donate through our website or
                contact us directly for more information.
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.2}>
              <h3 className="text-xl font-bold mb-2">How can my organization partner with Free Future Foundation?</h3>
              <p className="text-muted-foreground">
                We welcome partnerships with organizations that share our vision. Please contact us through this form or
                email us at partnerships@freefuturefoundation.org.
              </p>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.3}>
              <h3 className="text-xl font-bold mb-2">What areas of Nigeria do you operate in?</h3>
              <p className="text-muted-foreground">
                While we are based in Lagos, our programs and initiatives reach across Nigeria. We are continuously
                expanding our reach to impact more communities.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  )
}

