'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, Loader2, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { adminLogin } from '@/lib/admin-actions'
import { toast } from 'sonner'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await adminLogin(formData)

    if (result.success) {
      toast.success('Access Authorized')
      router.push('/admin/dashboard')
    } else {
      toast.error(result.error || 'Authorization Failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 md:top-12 md:left-12"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          HOME
        </Link>
      </motion.div>

      <div className="w-full max-w-lg">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-[3rem] p-10 md:p-14 bg-black border border-white/5 shadow-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">Management</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">Secure Protocol Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 ml-1">Identity</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 group-focus-within:text-primary transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@bitraxx.io"
                  className="w-full pl-8 py-3.5 bg-transparent border-b border-white/5 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-slate-800 font-sans"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 group-focus-within:text-primary transition-colors" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-8 pr-10 py-3.5 bg-transparent border-b border-white/5 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-slate-800 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-700 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-full bg-primary text-black font-black text-[10px] uppercase tracking-[0.4em] hover:scale-[1.01] active:scale-[0.99] transition-all gold-gradient shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authorizing...
                </>
              ) : (
                <>
                  Authorize Entry
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
