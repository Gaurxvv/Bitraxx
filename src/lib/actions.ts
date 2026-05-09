'use server'

import { supabase } from './supabase'
import { BookingStatus } from './supabase'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function generateBookingId() {
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BRX-${yyyy}${mm}${dd}-${random}`
}

export async function createBooking(formData: {
  full_name: string
  email: string
  phone: string
  country: string
  amount: string
  notes?: string
}) {
  const booking_id = generateBookingId()

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        ...formData,
        booking_id,
        status: 'Pending' as BookingStatus,
      },
    ])
    .select()

  if (error) {
    console.error('Supabase Error:', error)
    return { success: false, error: error.message }
  }

  // Send Email (Optional/Background)
  if (resend) {
    try {
      await resend.emails.send({
        from: 'BRX Coin <noreply@brxcoin.com>',
        to: formData.email,
        subject: 'Your $BRX Booking Confirmation',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #EAB308;">Booking Confirmed!</h1>
            <p>Thank you for your interest in $BRX Coin, <strong>${formData.full_name}</strong>.</p>
            <p>Your unique Booking ID is: <strong style="font-size: 20px; color: #EAB308;">${booking_id}</strong></p>
            <p>Status: <strong>Pending Review</strong></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>You can check your status anytime at: <a href="${process.env.NEXT_PUBLIC_APP_URL}/status?id=${booking_id}">${process.env.NEXT_PUBLIC_APP_URL}/status</a></p>
            <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply.</p>
          </div>
        `,
      })
    } catch (err) {
      console.error('Email Error:', err)
    }
  }

  return { success: true, booking_id }
}

export async function checkBookingStatus(booking_id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_id', booking_id)
    .single()

  if (error) {
    return { success: false, error: 'Booking not found' }
  }

  return { success: true, booking: data }
}
