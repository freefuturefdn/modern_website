"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Heart, Users, BookOpen, Award, CreditCard, ArrowRight, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import SectionHeading from "@/components/section-heading"
import AnimatedCard from "@/components/animated-card"
import { supabase } from "@/lib/supabase"

const QOREPAY_URLS = {
  naira: "https://gate.qorepay.com/l/fpyGY-wwwfreefuturefoundationorg/",
  usd: "https://gate.qorepay.com/l/6a0f26c3-fb04-44a6-86af-99e0a4e7b7cd/"
}

const formSchema = z.object({
  currency: z.enum(["naira", "usd"], {
    required_error: "Please select a currency.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function DonatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: 'naira',
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {

      // Store donation details in Supabase
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            name: values.name,
            email: values.email,
            phone: values.phone || null,
            message: values.message || null,
            payment_status: 'pending',
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        throw error
      }

      // Show success toast
      toast({
        title: "Thank you for your support!",
        description: "Redirecting you to our secure payment page...",
      })

      // Add delay before redirect
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect to appropriate Paystack payment page
      const paymentUrl = QOREPAY_URLS[values.currency]
      window.location.href = paymentUrl

    } catch (error: any) {
      console.error("Error details:", error)

      // Try to show a more helpful error message
      let errorMessage = "An unexpected error occurred"
      if (error?.message) {
        errorMessage = error.message
      } else if (typeof error === "object" && error !== null) {
        errorMessage = JSON.stringify(error)
      }

      toast({
        title: "Something went wrong",
        description: errorMessage,
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
            <h1 className="text-4xl md:text-5xl font-bold">Support Our Mission</h1>
            <p className="text-lg text-muted-foreground">
              Your donation helps us empower Nigerian youth with the knowledge, skills, and resources to champion
              freedom.
            </p>
            <Button size="lg" asChild>
              <a href="#donate-form">Donate Now</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donate-form" className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Make a Donation"
            subtitle="Your support helps us create a free and prosperous Nigeria"
            center
          />

          <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select Currency</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="naira" id="naira" />
                            <label htmlFor="naira" className="text-sm font-medium">
                              Naira (₦)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="usd" id="usd" />
                            <label htmlFor="usd" className="text-sm font-medium">
                              US Dollar ($)
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
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
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
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
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share why you're supporting our mission"
                          className="min-h-[80px]"
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
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Complete Donation <CreditCard className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Your donation is secure and encrypted.</p>
                  <p className="mt-1">Free Future Foundation is a registered non-profit organization.</p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Other Ways to Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Other Ways to Support" subtitle="Beyond financial contributions" center />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer Your Time</h3>
              <p className="text-muted-foreground mb-4">
                Join our team of dedicated volunteers and contribute your skills and time to our mission.
              </p>
              <Button variant="outline" asChild>
                <Link href="/volunteer">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedCard>

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.2}>
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Corporate Partnership</h3>
              <p className="text-muted-foreground mb-4">
                Explore how your organization can partner with us to create greater impact.
              </p>
              <Button variant="outline" asChild>
                <Link href="/partner">
                  Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-ash-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl font-bold text-primary mb-6">"</div>
            <p className="text-xl italic mb-6">
              The support from donors like you has enabled us to reach thousands of Nigerian youth with our programs.
              Every contribution, no matter the size, helps us advance our mission of empowering young people to
              champion freedom and create positive change.
            </p>
            <div className="flex items-center justify-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Kelechi Nwannunu"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">Kelechi Nwannunu</h3>
                <p className="text-sm text-muted-foreground">Founder & Executive Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

