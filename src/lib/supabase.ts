import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client that bypasses RLS (Server-side only)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type BookingStatus = 'Pending' | 'Approved' | 'Canceled'

export interface Booking {
  id?: string
  booking_id: string
  full_name: string
  email: string
  phone: string
  country: string
  amount: string
  notes?: string
  status: BookingStatus
  created_at?: string
  updated_at?: string
}
