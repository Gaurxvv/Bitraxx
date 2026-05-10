'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Booking, BookingStatus } from '@/lib/supabase'
import { updateBookingStatus } from '@/lib/admin-actions'
import { toast } from 'sonner'
import { Search, Filter, MoreHorizontal, ExternalLink, Trash2, Check, X, Clock } from 'lucide-react'

export default function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [updating, setUpdating] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const statusOptions = [
    { value: 'All', label: 'All Entries' },
    { value: 'Pending', label: 'Awaiting Audit' },
    { value: 'Approved', label: 'Authorized' },
    { value: 'Canceled', label: 'De-listed' },
  ]

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.booking_id.toLowerCase().includes(search.toLowerCase()) ||
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = async (id: string, newStatus: BookingStatus) => {
    setUpdating(id)
    const result = await updateBookingStatus(id, newStatus)
    if (result.success) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
      toast.success(`Status updated to ${newStatus}`)
    } else {
      toast.error(result.error || 'Failed to update status')
    }
    setUpdating(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">Approved</span>
      case 'Canceled':
        return <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">Canceled</span>
      default:
        return <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">Pending</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-700" />
          <input
            type="text"
            placeholder="SEARCH REGISTRY..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 rounded-full bg-black border border-white/10 text-white text-[9px] font-bold tracking-[0.2em] focus:border-primary/40 outline-none transition-all placeholder:text-slate-800"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-56">
            <div className="relative group">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between pl-12 pr-6 py-3.5 rounded-full bg-black border border-white/10 text-slate-400 text-[9px] font-bold uppercase tracking-[0.15em] hover:border-primary/40 hover:text-white transition-all cursor-pointer group-hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <Filter className={`w-3 h-3 transition-colors ${dropdownOpen ? 'text-primary' : 'text-slate-700'}`} />
                  <span>{statusOptions.find(o => o.value === statusFilter)?.label || 'All Entries'}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dropdownOpen ? 'bg-primary shadow-[0_0_10px_rgba(212,175,55,0.5)] scale-110' : 'bg-slate-800'}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[90]" 
                      onClick={() => setDropdownOpen(false)} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full mt-2 left-0 w-full z-[100] p-1 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5">
                        {statusOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            whileHover={{ x: 4 }}
                            onClick={() => {
                              setStatusFilter(option.value)
                              setDropdownOpen(false)
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                              statusFilter === option.value 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-slate-500 hover:bg-white/[0.05] hover:text-white'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              statusFilter === option.value ? 'bg-primary' : 'bg-slate-800'
                            }`} />
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.01] text-slate-600 text-[8px] uppercase tracking-[0.3em] font-black border-b border-white/5">
                <th className="px-6 py-6">Authorization ID</th>
                <th className="px-6 py-6">Entity Details</th>
                <th className="px-6 py-6">Commitment</th>
                <th className="px-6 py-6 text-center">Protocol Status</th>
                <th className="px-6 py-6">Audit Date</th>
                <th className="px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-white/90 font-bold tracking-[0.15em] text-[10px] font-mono">{booking.booking_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-white/90 font-bold text-xs tracking-tight">{booking.full_name}</span>
                      <span className="text-slate-600 text-[8px] font-bold uppercase tracking-wider">{booking.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-primary font-bold text-base tracking-tight">
                      {isNaN(Number(booking.amount)) ? `$${booking.amount}` : `$${Number(booking.amount).toLocaleString()}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {getStatusBadge(booking.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
                      {booking.created_at ? new Date(booking.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => booking.id && handleStatusUpdate(booking.id, 'Approved')}
                        disabled={updating === booking.id || booking.status === 'Approved'}
                        className="p-2.5 rounded-full bg-white/[0.02] text-slate-600 border border-white/5 hover:text-green-500 hover:bg-green-500/10 hover:border-green-500/20 transition-all disabled:opacity-5"
                        title="Authorize"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => booking.id && handleStatusUpdate(booking.id, 'Pending')}
                        disabled={updating === booking.id || booking.status === 'Pending'}
                        className="p-2.5 rounded-full bg-white/[0.02] text-slate-600 border border-white/5 hover:text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500/20 transition-all disabled:opacity-5"
                        title="Audit"
                      >
                        <Clock className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => booking.id && handleStatusUpdate(booking.id, 'Canceled')}
                        disabled={updating === booking.id || booking.status === 'Canceled'}
                        className="p-2.5 rounded-full bg-white/[0.02] text-slate-600 border border-white/5 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all disabled:opacity-5"
                        title="De-list"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-800 font-bold uppercase tracking-[0.3em] text-[9px]">
                    No registry records located in vault
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
