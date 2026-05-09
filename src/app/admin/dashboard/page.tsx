import { getDashboardStats, getAllBookings, adminLogout } from '@/lib/admin-actions'
import BookingsTable from '@/components/admin/BookingsTable'
import { LayoutDashboard, Users, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()
  const bookings = await getAllBookings()

  const handleLogout = async () => {
    'use server'
    await adminLogout()
    redirect('/admin/login')
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
        <div>
          <h1 className="text-5xl font-serif text-white mb-3">Sovereign Control</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Administrative Reservation Protocol</p>
        </div>
        
        <form action={handleLogout}>
          <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">
            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Terminate Session
          </button>
        </form>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
        {[
          { label: 'Total Reservations', value: stats.total, icon: Users, color: 'text-primary' },
          { label: 'Awaiting Audit', value: stats.pending, icon: Clock, color: 'text-yellow-500' },
          { label: 'Authorized Assets', value: stats.approved, icon: CheckCircle, color: 'text-green-500' },
          { label: 'De-listed Entries', value: stats.canceled, icon: XCircle, color: 'text-red-500' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex justify-between items-start mb-10">
              <div className={`p-4 rounded-full bg-white/5 border border-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-serif text-white mb-2">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-serif text-white mb-2 italic gold-text-gradient">Registry Ledger</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">Real-time custody data synchronization</p>
      </div>

      <BookingsTable initialBookings={bookings} />
    </div>
  )
}
