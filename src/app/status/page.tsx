'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Loader2, CheckCircle, Clock, XCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { checkBookingStatus } from '@/lib/actions'
import { Booking } from '@/lib/supabase'
import { toast } from 'sonner'
import Link from 'next/link'

function StatusContent() {
  const searchParams = useSearchParams()
  const [bookingId, setBookingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setBookingId(id)
      handleSearch(id)
    }
  }, [searchParams])

  const handleSearch = async (idToSearch?: string) => {
    const id = idToSearch || bookingId
    if (!id) {
      toast.error('Please enter a Booking ID')
      return
    }

    setLoading(true)
    setSearched(true)
    try {
      const result = await checkBookingStatus(id)
      if (result.success && result.booking) {
        setBooking(result.booking)
      } else {
        setBooking(null)
        toast.error('Booking not found')
      }
    } catch (error) {
      toast.error('Failed to fetch booking status')
    } finally {
      setLoading(false)
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'Approved':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          title: 'Booking Approved',
          message: 'Your booking has been approved. You will receive further instructions via email.',
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
        }
      case 'Canceled':
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          title: 'Booking Canceled',
          message: 'Your booking was canceled due to data issues or verification failure.',
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
        }
      default:
        return {
          icon: <Clock className="w-12 h-12 text-yellow-500" />,
          title: 'Booking Pending',
          message: 'Your booking is under review. Please check back later.',
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
        }
    }
  }

  return (
    <div className="container mx-auto px-6 pt-4 pb-12">
      <Link href="/" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Return to Home
      </Link>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight">
            Track Your <br />
            <span className="italic gold-text-gradient">Sovereign Position</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed font-sans px-4">
            Enter your unique authorization key to verify the current status of your institutional $BRX reservation.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
          <div className="relative">
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value.toUpperCase())}
              placeholder="AUTHENTICATION KEY"
              className="w-full px-10 py-6 rounded-full bg-black border border-white/10 text-white text-lg font-bold tracking-[0.4em] placeholder:text-slate-700 focus:border-primary/40 outline-none transition-all shadow-2xl font-mono"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-8 rounded-full bg-primary text-black font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-xl disabled:opacity-50 gold-gradient"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
              Verify
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary/30 animate-spin mb-6" />
            <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">Accessing Vault Records...</p>
          </div>
        ) : booking ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 p-10 md:p-12 rounded-[2.5rem] bg-black border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full ${getStatusDisplay(booking.status).bg} flex items-center justify-center mb-10 border border-white/5`}>
                {getStatusDisplay(booking.status).icon}
              </div>
              <h2 className={`text-4xl font-serif mb-6 ${getStatusDisplay(booking.status).color}`}>
                {getStatusDisplay(booking.status).title}
              </h2>
              <p className="text-slate-400 text-lg mb-16 max-w-md mx-auto leading-relaxed font-sans">
                {getStatusDisplay(booking.status).message}
              </p>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-12 text-left border-t border-white/5 pt-16">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-3">Authorization ID</label>
                  <p className="text-white font-bold tracking-widest">{booking.booking_id}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-3">Entity Name</label>
                  <p className="text-white font-bold">{booking.full_name}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-3">Timestamp</label>
                  <p className="text-white font-bold font-sans">
                    {booking.created_at ? new Date(booking.created_at).toLocaleString() : 'UNAVAILABLE'}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 block mb-3">Committed Amount</label>
                  <p className="text-primary font-bold text-xl">{booking.amount}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
              <Search className="w-8 h-8 text-slate-800" />
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Record Not Located</h3>
            <p className="text-slate-600 font-sans">Please verify your authorization key and attempt re-entry.</p>
          </motion.div>
        )}

        {!searched && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            {[
              { icon: <Clock className="w-6 h-6 text-primary" />, label: 'Review Cycle', desc: 'Standard verification protocol' },
              { icon: <CheckCircle className="w-6 h-6 text-primary" />, label: 'Authorized', desc: 'Allocation secured in vault' },
              { icon: <XCircle className="w-6 h-6 text-primary" />, label: 'De-listed', desc: 'Protocol exit or expiration' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all duration-500 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-2">{item.label}</span>
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function StatusPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-6 py-24 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    }>
      <StatusContent />
    </Suspense>
  )
}
