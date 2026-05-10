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
          <div style="background-color: #f8f9fa; padding: 40px 20px; font-family: 'Inter', -apple-system, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
              <div style="background-color: #000000; padding: 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;">BITRAXX</h1>
                <p style="color: #EAB308; margin: 10px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8;">Sovereign Wealth Management</p>
              </div>
              
              <div style="padding: 40px;">
                <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin-bottom: 24px;">Protocol Reservation Confirmed</h2>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
                  Greetings <strong>${formData.full_name}</strong>, <br /><br />
                  Your institutional reservation for the $BRX Protocol has been successfully synchronized with our registry. Your position is currently awaiting administrative audit.
                </p>
                
                <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #f3f4f6;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Authorization ID</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 700; text-align: right; font-family: monospace;">${booking_id}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Protocol Status</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #EAB308; font-weight: 700; text-align: right;">AWAITING AUDIT</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Commitment</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 700; text-align: right;">$${Number(formData.amount).toLocaleString()}</td>
                    </tr>
                  </table>
                </div>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/status?id=${booking_id}" 
                     style="display: inline-block; background-color: #000000; color: #EAB308; padding: 16px 32px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; border: 1px solid #EAB308;">
                    Monitor Protocol Status
                  </a>
                </div>
              </div>
              
              <div style="background-color: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #f3f4f6;">
                <p style="color: #9ca3af; font-size: 10px; margin: 0; line-height: 1.5;">
                  This is a sovereign communication. Confidentiality protocols applied. <br />
                  © 2026 Bitraxx Wealth Management. Institutional Grade Assets.
                </p>
              </div>
            </div>
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
