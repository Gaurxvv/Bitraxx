'use client'

import { useState, useEffect } from 'react'
import { Reveal } from '@/components/ui/Reveal'

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
    <section className="pt-8 pb-10 md:pb-24 bg-[#0c0c0c] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-12 md:mb-20">
          <span className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.6em] mb-4 block">Official Deployment</span>
          <h2 className="text-3xl md:text-6xl font-serif text-white italic font-light tracking-tight">Countdown to Launch</h2>
        </Reveal>

        <div className="flex flex-row justify-center gap-1.5 sm:gap-12 md:gap-20 opacity-80 hover:opacity-100 transition-opacity duration-1000">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={item.label} className="flex items-center">
              <Reveal delay={idx * 100} className="text-center group">
                <div className="relative mb-2 md:mb-12 group">
                  {/* Perfect Gold Square Outline - Solid #FFD700 */}
                  <div className="absolute inset-0 border-[1.5px] md:border-[3px] border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.1)]" />
                  
                  {/* Architectural Corner Accents - Solid Gold */}
                  <div className="absolute -top-[1px] -left-[1px] w-2 h-2 md:w-6 md:h-6 border-t-[1.5px] md:border-t-4 border-l-[1.5px] md:border-l-4 border-[#FFD700] z-20" />
                  <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 md:w-6 md:h-6 border-b-[1.5px] md:border-b-4 border-r-[1.5px] md:border-r-4 border-[#FFD700] z-20" />
                  
                  <div className="flex items-center justify-center w-[72px] h-[72px] sm:w-[150px] sm:h-[150px] md:w-[220px] md:h-[220px] bg-white/[0.03] backdrop-blur-sm z-10">
                    <div className="text-xl sm:text-7xl md:text-[8rem] font-serif font-extralight text-white tabular-nums tracking-tighter leading-none">
                      {String(item.value).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                <div className="text-[8px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.6em] text-primary/60 font-bold group-hover:text-primary transition-colors">
                  {item.label}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countdown
