'use client'

import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Copy, ArrowLeft, Search } from 'lucide-react'
import { createBooking } from '@/lib/actions'
import { toast } from 'sonner'
import Link from 'next/link'
import { countries } from '@/lib/countries'

const formSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Valid phone number is required'),
  country: z.string().min(2, 'Country is required'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => {
      const num = parseFloat(val.replace(/,/g, ''));
      return !isNaN(num) && num >= 250 && num <= 12000;
    }, 'Allocation must be between $250 and $12,000'),
})

type FormData = z.infer<typeof formSchema>

export default function ReservePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const selectedCountry = watch('country')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.country-input-group')) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      const countryData = countries.find(c => c.name.toLowerCase() === selectedCountry.toLowerCase())
      if (countryData) {
        setValue('phone', countryData.dial_code + ' ')
      }
    }
  }, [selectedCountry, setValue])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await createBooking(data)
      if (result.success && result.booking_id) {
        setSubmittedId(result.booking_id)
        toast.success('Reservation submitted successfully!')
        reset()
      } else {
        toast.error(result.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to submit reservation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Booking ID copied to clipboard')
  }

  if (submittedId) {
    return (
      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full rounded-[2.5rem] p-12 text-center bg-black border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Reservation Successful!</h2>
          <p className="text-slate-500 mb-12 max-w-md mx-auto text-[10px] leading-relaxed uppercase tracking-[0.2em] font-medium">
            Your $BRX allocation has been reserved. Please save your Booking ID for status tracking.
          </p>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 mb-12 group relative">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4 relative z-10">Your Booking ID</p>
            <div className="flex items-center justify-center gap-4 relative z-10">
              <span className="text-2xl md:text-3xl font-mono font-bold text-primary tracking-wider">{submittedId}</span>
              <button
                onClick={() => copyToClipboard(submittedId)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/status?id=${submittedId}`}
              className="px-10 py-4 rounded-full bg-primary text-black font-bold uppercase tracking-widest text-[10px] gold-gradient hover:scale-105 transition-all shadow-xl"
            >
              Check Status
            </Link>
            <Link
              href="/"
              className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 pt-8 md:pt-12 pb-20">
      <Link href="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-primary mb-12 md:mb-16 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        HOME
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        <div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white mb-6 md:mb-10 leading-tight">
            Secure Your <br />
            <span className="italic gold-text-gradient">Sovereign Allocation</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 md:mb-16 leading-relaxed font-sans">
            Join the elite circle of $BRX holders. This reservation guarantees your position in Phase 1 of our global liquidity protocol.
          </p>

          <div className="space-y-8 md:space-y-12">
            <div className="flex gap-6 md:gap-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white text-base md:text-lg font-bold mb-1 md:mb-2">Institutional Priority</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Direct access to the core liquidity pool with zero intermediary slippage.</p>
              </div>
            </div>
            <div className="flex gap-6 md:gap-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white text-base md:text-lg font-bold mb-1 md:mb-2">Sovereign Yield</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Early participants are whitelisted for exclusive governance-tier staking rewards.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] p-8 md:p-12 bg-black border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Entity / Full Name</label>
                <input
                  {...register('full_name')}
                  placeholder="Identity Name"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white text-base focus:border-primary outline-none transition-all placeholder:text-slate-700 font-sans"
                />
                {errors.full_name && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-1">{errors.full_name.message}</p>}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Secure Email</label>
                <input
                  {...register('email')}
                  placeholder="name@domain.com"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white text-base focus:border-primary outline-none transition-all placeholder:text-slate-700 font-sans"
                />
                {errors.email && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Legal Jurisdiction</label>
                <div className="relative country-input-group">
                  <input
                    {...register('country')}
                    placeholder="Search Country"
                    autoComplete="off"
                    onChange={(e) => {
                      register('country').onChange(e)
                      setCountrySearch(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white text-base focus:border-primary outline-none transition-all placeholder:text-slate-700 font-sans"
                  />

                  <AnimatePresence>
                    {showSuggestions && countrySearch.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-50 left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl no-scrollbar"
                      >
                        {countries
                          .filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                          .map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setValue('country', c.name)
                                setCountrySearch(c.name)
                                setShowSuggestions(false)
                              }}
                              className="w-full px-6 py-4 text-left text-sm text-slate-400 hover:text-primary hover:bg-white/[0.03] transition-all border-b border-white/5 last:border-0 flex items-center justify-between group"
                            >
                              <span className="font-medium tracking-wide">{c.name}</span>
                              <span className="text-[10px] text-slate-600 group-hover:text-primary/50 font-mono">{c.dial_code}</span>
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.country && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-1">{errors.country.message}</p>}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Contact Number</label>
                <input
                  {...register('phone')}
                  placeholder="+ International"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white text-base focus:border-primary outline-none transition-all placeholder:text-slate-700 font-sans"
                />
                {errors.phone && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Requested Allocation (USD)</label>
              <div className="relative">
                <input
                  {...register('amount')}
                  placeholder="250 - 12,000"
                  type="text"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white text-base focus:border-primary outline-none transition-all placeholder:text-slate-700 font-sans"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-600 tracking-widest">
                  MIN $250 / MAX $12,000
                </div>
              </div>
              {errors.amount && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-1">{errors.amount.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 rounded-full bg-primary text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all gold-gradient shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 mt-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Securing Data...
                </>
              ) : (
                'Finalize Reservation'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
