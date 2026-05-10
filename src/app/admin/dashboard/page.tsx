import { getDashboardStats, getAllBookings, adminLogout } from '@/lib/admin-actions'
import BookingsTable from '@/components/admin/BookingsTable'
import { LayoutDashboard, Users, Clock, CheckCircle, XCircle, LogOut, ShieldCheck, Database } from 'lucide-react'
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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      <div className="container max-w-6xl mx-auto px-6 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-70">Sovereign Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif leading-none tracking-tight">
              Control <span className="italic opacity-60">Center</span>
            </h1>
            <div className="h-px w-24 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          
          <form action={handleLogout}>
            <button className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-500 shadow-xl">
              <LogOut className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              Terminate Session
            </button>
          </form>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
          {[
            { label: 'Total Registry', value: stats.total, icon: Users, color: 'from-blue-500/20 to-transparent', iconColor: 'text-blue-400' },
            { label: 'Awaiting Audit', value: stats.pending, icon: Clock, color: 'from-yellow-500/20 to-transparent', iconColor: 'text-yellow-400' },
            { label: 'Authorized Entries', value: stats.approved, icon: CheckCircle, color: 'from-green-500/20 to-transparent', iconColor: 'text-green-400' },
            { label: 'De-listed Protocol', value: stats.canceled, icon: XCircle, color: 'from-red-500/20 to-transparent', iconColor: 'text-red-400' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-[2rem] bg-black border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-700">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.iconColor}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-serif text-white mb-1.5 tracking-tighter tabular-nums">{stat.value}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 group-hover:text-slate-300 transition-colors">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-serif text-white italic gold-text-gradient">Registry Ledger</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-700">Real-time custody data synchronization protocol</p>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/5 to-transparent mb-2 hidden md:block" />
          </div>

          <BookingsTable initialBookings={bookings} />
        </div>
      </div>
    </div>
  )
}
