'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react'
import { adminLogin } from '@/lib/admin-actions'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await adminLogin(formData)

    if (result.success) {
      toast.success('Logged in successfully')
      router.push('/admin/dashboard')
    } else {
      toast.error(result.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-32 flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-card max-w-md w-full rounded-[3rem] p-12 md:p-16 border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-primary/50" />
          </div>
          <h1 className="text-4xl font-serif text-white mb-3">Management</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Secure Administrative Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Identity</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800" />
              <input
                name="email"
                type="email"
                required
                placeholder="admin@bitraxx.io"
                className="w-full pl-8 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-primary outline-none transition-all placeholder:text-slate-900 font-sans"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-8 py-4 bg-transparent border-b border-white/10 text-white text-lg focus:border-primary outline-none transition-all placeholder:text-slate-900 font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all gold-gradient shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <>
                Authorize Entry
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
