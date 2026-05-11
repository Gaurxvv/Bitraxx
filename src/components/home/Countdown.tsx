'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Countdown = () => {
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
    <section className="py-24 md:py-48 bg-[#0c0c0c] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.6em] mb-4 block">Official Deployment</span>
          <h2 className="text-3xl md:text-6xl font-serif text-white italic font-light tracking-tight">Countdown to Launch</h2>
        </motion.div>

        <div className="flex justify-center gap-4 sm:gap-16 md:gap-32 opacity-80 hover:opacity-100 transition-opacity duration-1000">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={item.label} className="flex items-center gap-4 sm:gap-16 md:gap-32">
              <div className="text-center group min-w-[60px] sm:min-w-0">
                <div className="text-4xl sm:text-8xl md:text-[11rem] font-serif font-extralight text-white mb-2 md:mb-8 tabular-nums tracking-tighter leading-none">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.6em] text-primary/60 font-bold group-hover:text-primary transition-colors">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countdown
