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
    <div className="min-h-screen relative overflow-hidden bg-[#0c0c0c]">
      {/* Institutional Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 pt-8 md:pt-12 pb-20 relative z-10">
      <Link href="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-primary mb-12 md:mb-16 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        HOME
      </Link>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 opacity-40">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Verification Portal</span>
            <div className="w-8 h-[1px] bg-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
            Track Your <br />
            <span className="italic font-light opacity-80 gold-text-gradient">Sovereign Position</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed font-sans font-light tracking-wide px-4">
            Enter your unique institutional authorization key to verify the real-time status of your $BRX allocation.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-2xl mx-auto group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value.toUpperCase())}
              placeholder="AUTHENTICATION KEY"
              className="w-full px-8 py-8 md:py-10 bg-transparent text-white text-lg md:text-2xl font-light tracking-[0.4em] placeholder:text-slate-800 placeholder:text-sm focus:outline-none transition-all font-mono"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-8 py-4 bg-primary text-black font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-white transition-all duration-500 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
              <span>Verify</span>
            </button>
          </div>
        </motion.div>

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            {[
              { icon: <Clock className="w-5 h-5 text-primary" />, label: 'Review Cycle', desc: 'Sovereign Verification' },
              { icon: <CheckCircle className="w-5 h-5 text-primary" />, label: 'Authorized', desc: 'Allocation Secured' },
              { icon: <XCircle className="w-5 h-5 text-primary" />, label: 'De-listed', desc: 'Protocol Exit' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group p-8 border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30" />
                
                <div className="relative z-10 flex flex-col items-start text-left">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mb-2">{item.label}</span>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
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
