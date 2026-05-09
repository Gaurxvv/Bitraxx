'use client'

import { useState } from 'react'
import { Booking, BookingStatus } from '@/lib/supabase'
import { updateBookingStatus } from '@/lib/admin-actions'
import { toast } from 'sonner'
import { Search, Filter, MoreHorizontal, ExternalLink, Trash2, Check, X, Clock } from 'lucide-react'

export default function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [updating, setUpdating] = useState<string | null>(null)

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
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
          <input
            type="text"
            placeholder="SEARCH REGISTRY..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-8 py-5 rounded-full bg-slate-950 border border-white/5 text-white text-xs font-bold tracking-[0.2em] focus:border-primary/30 outline-none transition-all placeholder:text-slate-900"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-8 py-5 rounded-full bg-slate-950 border border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] focus:border-primary/30 outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="All">Filter Status: All</option>
            <option value="Pending">Status: Pending</option>
            <option value="Approved">Status: Approved</option>
            <option value="Canceled">Status: Canceled</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/5">
                <th className="px-10 py-8">Authorization ID</th>
                <th className="px-10 py-8">Entity</th>
                <th className="px-10 py-8">Commitment</th>
                <th className="px-10 py-8">Status</th>
                <th className="px-10 py-8">Verified Date</th>
                <th className="px-10 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-10 py-10">
                    <span className="text-white font-bold tracking-[0.1em] text-xs">{booking.booking_id}</span>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-bold text-sm">{booking.full_name}</span>
                      <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{booking.email}</span>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <span className="text-primary font-bold text-lg">{booking.amount}</span>
                  </td>
                  <td className="px-10 py-10">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-10 py-10">
                    <span className="text-slate-500 text-xs font-medium font-sans">
                      {booking.created_at ? new Date(booking.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                    </span>
                  </td>
                  <td className="px-10 py-10 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => booking.id && handleStatusUpdate(booking.id, 'Approved')}
                        disabled={updating === booking.id || booking.status === 'Approved'}
                        className="p-3 rounded-full bg-green-500/5 text-green-500 border border-green-500/10 hover:bg-green-500/20 transition-all disabled:opacity-20"
                        title="Authorize"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => booking.id && handleStatusUpdate(booking.id, 'Pending')}
                        disabled={updating === booking.id || booking.status === 'Pending'}
                        className="p-3 rounded-full bg-yellow-500/5 text-yellow-500 border border-yellow-500/10 hover:bg-yellow-500/20 transition-all disabled:opacity-20"
                        title="Audit"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => booking.id && handleStatusUpdate(booking.id, 'Canceled')}
                        disabled={updating === booking.id || booking.status === 'Canceled'}
                        className="p-3 rounded-full bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500/20 transition-all disabled:opacity-20"
                        title="De-list"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-10 py-32 text-center text-slate-800 font-bold uppercase tracking-[0.3em] text-[10px]">
                    No registry entries located
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
