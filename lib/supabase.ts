import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type SuccessStory = {
  id: number
  title: string
  content: string
  image_url: string
  created_at: string
}

export interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  image_url: string | null
  published_at: string
  category: string
  author: string | null
  slug: string
}

export interface Event {
  id: number
  title: string
  description: string
  location: string
  start_date: string
  end_date: string
  image_url: string | null
  registration_url: string | null
  is_featured: boolean
  max_attendees: number | null
  current_attendees: number
  status: 'upcoming' | 'past' | 'cancelled'
}

export type TeamMember = {
  id: number
  name: string
  position: string
  bio: string
  image_url: string
  social_links: {
    twitter?: string
    linkedin?: string
    facebook?: string
  }
  order: number
}

export type Partner = {
  id: number
  name: string
  description: string
  logo_url: string
  website_url: string
  partnership_type: string
}

export type Publication = {
  id: number
  title: string
  author: string
  summary: string
  content: string
  image_url: string
  published_at: string
  type: "book" | "article" | "journal"
  download_url?: string
}

export type ContactMessage = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: "new" | "read" | "responded"
}

export type VolunteerApplication = {
  id: number
  name: string
  email: string
  phone: string
  location: string
  interests: string[]
  experience: string
  availability: string
  created_at: string
  status: "pending" | "approved" | "rejected"
}

export type MediaHit = {
  id: number
  title: string
  outlet: string
  summary: string
  url: string
  published_at: string
  image_url: string
}

export type Podcast = {
  id: number
  title: string
  description: string
  host: string
  guests: string[]
  audio_url: string
  image_url: string
  published_at: string
  duration: string
}

export type GalleryItem = {
  id: number
  title: string
  description: string
  image_url: string
  event_id?: number
  created_at: string
  type: "image" | "video"
  video_url?: string
}

export type AnnualReport = {
  id: number
  year: number
  title: string
  summary: string
  file_url: string
  cover_image_url: string
  published_at: string
}

