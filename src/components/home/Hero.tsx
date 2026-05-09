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

            <div className="flex flex-col items-center gap-12">
              <Link
                href="/reserve"
                className="group relative px-12 py-5 border border-primary/40 hover:border-primary transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-primary uppercase tracking-[0.2em] text-sm font-bold">
                  Reserve Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Subtle Hover Bloom */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              {/* Minimalist Countdown */}
              <div className="flex gap-4 sm:gap-8 md:gap-16 pt-10 md:pt-20 opacity-40 hover:opacity-100 transition-opacity duration-700">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center group">
                    <div className="text-2xl sm:text-4xl md:text-6xl font-light text-white mb-1 md:mb-2 tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-primary font-bold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
