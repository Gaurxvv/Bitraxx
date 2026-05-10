'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2026-05-15T00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-40 pb-20 overflow-hidden bg-[#0c0c0c]">
      {/* Architectural Accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-primary/10 rounded-full blur-[250px] opacity-40 animate-pulse-slow" />
        
        {/* Dynamic Vertical Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          
          {/* Scanning Effect */}
          <motion.div 
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-[15%] w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px]"
          />
          <motion.div 
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute right-[15%] w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px]"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 mb-8 md:mb-12 opacity-60">
              <div className="w-6 md:w-8 h-[1px] bg-primary/50" />
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Sovereignty Protocol</span>
              <div className="w-6 md:w-8 h-[1px] bg-primary/50" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif text-white mb-8 md:mb-12 leading-[1.1] tracking-tight">
              Powering the Next <br className="hidden sm:block" />
              <span className="italic font-light opacity-80">Generation.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed font-sans font-light tracking-wide">
              A fully operational crypto platform before token launch — built with real utility from day one. 
              Engineered for the modern custodian who values absolute discretion.
            </p>

            <div className="flex flex-col items-center gap-8 mb-16">
              <Link
                href="/reserve"
                className="group relative px-16 py-6 bg-primary text-black hover:bg-white transition-all duration-700 overflow-hidden rounded-sm w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-xs font-bold">
                  Reserve Institutional Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-4">
                <a
                  href="/whitepaper.pdf"
                  download
                  className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-300 hover:text-primary transition-all duration-500"
                >
                  <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Whitepaper
                </a>
                
                <div className="w-[1px] h-4 bg-white/20 hidden sm:block" />

                <a
                  href="/whitepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-300 hover:text-primary transition-all duration-500"
                >
                  <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Protocol
                </a>
              </div>
            </div>

              {/* Minimalist Countdown */}
              <div className="flex justify-center gap-3 sm:gap-10 md:gap-20 pt-12 md:pt-24 opacity-70 hover:opacity-100 transition-opacity duration-1000">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center group min-w-[60px] sm:min-w-0">
                    <div className="text-5xl sm:text-6xl md:text-8xl font-extralight text-white mb-2 md:mb-4 tabular-nums tracking-tighter">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-primary/70 font-bold group-hover:text-primary transition-colors">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
