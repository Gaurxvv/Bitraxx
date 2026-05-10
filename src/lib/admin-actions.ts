'use server'

import { supabase, supabaseAdmin } from './supabase'
import { BookingStatus } from './supabase'
import { cookies } from 'next/headers'

export async function adminLogin(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = (formData.get('password') as string)?.trim()

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD?.trim()

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return { success: true }
  }

  return { success: false, error: 'Invalid credentials' }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

export async function getDashboardStats() {
  const { data: bookings, error } = await supabaseAdmin
    .from('bookings')
    .select('status')

  if (error) return { total: 0, pending: 0, approved: 0, canceled: 0 }

  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    canceled: bookings.filter((b) => b.status === 'Canceled').length,
  }
}

export async function getAllBookings() {
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

import fs from 'fs/promises'
import path from 'path'

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function uploadWhitepaper(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) return { success: false, error: 'No file provided' }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Path to public/whitepaper.pdf
    const filePath = path.join(process.cwd(), 'public', 'whitepaper.pdf')
    await fs.writeFile(filePath, buffer)
    
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
