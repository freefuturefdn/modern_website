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

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Please select or enter an amount.",
  }),
  customAmount: z.string().optional(),
  donationType: z.enum(["one-time", "monthly"], {
    required_error: "Please select a donation type.",
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
  const [selectedAmount, setSelectedAmount] = useState<string>("50")
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "50",
      customAmount: "",
      donationType: "one-time",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const watchAmount = form.watch("amount")

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value)
    form.setValue("amount", value)
    if (value !== "custom") {
      form.setValue("customAmount", "")
    }
  }

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would integrate with a payment processor
      // For now, we'll just simulate a successful submission

      console.log("Form values:", values)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Thank you for your donation!",
        description: "Your support helps us empower Nigerian youth.",
      })

      form.reset()
      setSelectedAmount("50")
    } catch (error) {
      console.error("Error processing donation:", error)
      toast({
        title: "Something went wrong.",
        description: "Your donation could not be processed. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const impactItems = [
    {
      amount: "₦5,000",
      description: "Provides educational materials for one youth participant",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      amount: "₦20,000",
      description: "Sponsors one youth to attend a leadership workshop",
      icon: <Users className="h-6 w-6" />,
    },
    {
      amount: "₦50,000",
      description: "Funds a community outreach event reaching 100+ people",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      amount: "₦100,000+",
      description: "Supports a full youth leadership training program",
      icon: <Award className="h-6 w-6" />,
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

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Your Impact" subtitle="How your donation makes a difference" center />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {impactItems.map((item, index) => (
              <AnimatedCard
                key={item.amount}
                delay={index * 0.1}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <div className="text-primary">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.amount}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </AnimatedCard>
            ))}
          </div>
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
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Select Amount</h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["20", "50", "100", "200"].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={selectedAmount === amount ? "default" : "outline"}
                        className="w-full"
                        onClick={() => handleAmountChange(amount)}
                      >
                        ₦{amount}
                      </Button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="custom-amount"
                      checked={selectedAmount === "custom"}
                      onChange={() => handleAmountChange("custom")}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="custom-amount" className="text-sm font-medium">
                      Custom Amount
                    </label>
                    <Input
                      placeholder="Enter amount"
                      disabled={selectedAmount !== "custom"}
                      className="max-w-[200px]"
                      {...form.register("customAmount")}
                      onChange={(e) => {
                        form.setValue("customAmount", e.target.value)
                      }}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="donationType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Donation Frequency</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-time" id="one-time" />
                            <label htmlFor="one-time" className="text-sm font-medium">
                              One-time
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <label htmlFor="monthly" className="text-sm font-medium">
                              Monthly
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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

            <AnimatedCard className="bg-white p-6 rounded-lg shadow-md" delay={0.1}>
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Spread Awareness</h3>
              <p className="text-muted-foreground mb-4">
                Share our mission and resources with your network to help us reach more Nigerian youth.
              </p>
              <Button variant="outline" asChild>
                <Link href="/resources">
                  Access Resources <ArrowRight className="ml-2 h-4 w-4" />
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

