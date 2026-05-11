'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'
import BlurText from '@/components/ui/BlurText'
import dynamic from 'next/dynamic'

const Threads = dynamic(() => import('@/components/ui/Threads'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0c0c0c]" />
})

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-32 md:pt-28 pb-20 overflow-hidden bg-[#0c0c0c]">
      {/* Architectural Accents */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] opacity-30 animate-pulse-slow pointer-events-none" />
        
        {/* Threads Background */}
        <div className="absolute top-[10vh] md:top-[35vh] left-0 right-0 h-[70vh] md:h-[80vh] opacity-40 md:opacity-60 pointer-events-none">
          <Threads
            amplitude={isMobile ? 0.25 : 0.3}
            distance={isMobile ? 0.12 : 0.25}
            enableMouseInteraction={!isMobile}
            lineCount={isMobile ? 15 : 40}
            color={[1.0, 0.8, 0.2]}
          />
        </div>

        {/* Dynamic Vertical Lines - Desktop Only for Performance */}
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          
          {/* Scanning Effect */}
          <motion.div 
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-[15%] w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px]"
          />
          <motion.div 
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 3 }}
            className="absolute right-[15%] w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px]"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {/* Minimal Badge */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
              }}
              className="inline-flex items-center gap-3 mb-8 md:mb-10 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md transition-all duration-700"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-primary">Sovereignty Protocol</span>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-col items-center mb-8 md:mb-10"
            >
              <BlurText
                text="Powering the Next"
                delay={100}
                className="text-4xl sm:text-6xl md:text-9xl font-serif text-white leading-[1.1] tracking-tight justify-center"
              />
              <BlurText
                text="Generation."
                delay={100}
                className="text-4xl sm:text-6xl md:text-9xl font-serif italic font-light opacity-80 text-white leading-[1.1] tracking-tight justify-center"
              />
            </motion.div>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any } }
              }}
              className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-sans font-light tracking-wide px-6"
            >
              A fully operational crypto platform before token launch — built with real utility from day one. 
              Engineered for the modern custodian who values absolute discretion.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any } }
              }}
              className="flex flex-col items-center gap-6 md:gap-8 mb-16 md:mb-24"
            >
              <Link
                href="/reserve"
                className="group relative px-12 md:px-16 py-5 md:py-6 bg-primary text-black hover:bg-white transition-all duration-700 overflow-hidden rounded-sm w-auto min-w-[280px] text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">
                  Reserve Institutional Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Dedicated Documentation & Investor Intel Section */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="pt-12 md:pt-24 border-t border-white/5 w-full max-w-4xl px-4 md:px-0"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
                  }}
                  className="text-center mb-8 md:mb-10"
                >
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block">Institutional Protocol</span>
                  <h2 className="text-xl md:text-3xl font-serif text-white italic opacity-90">Technical Intelligence</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
                  {[
                    { title: 'Deflationary Model', desc: 'Fixed supply with automated burn mechanism ensuring long-term scarcity.' },
                    { title: 'Sovereign Custody', desc: 'Private key management protocol designed for total asset sovereignty.' },
                    { title: 'Operational Utility', desc: 'Full platform functionality active before token release — value from day zero.' },
                    { title: 'Audited Transparency', desc: 'Open-source logic verified for institutional-grade reliability and trust.' },
                  ].map((point, i) => (
                    <motion.div 
                      key={i} 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
                      }}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-2">{point.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-light">{point.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
                  }}
                  className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row"
                >
                  <a
                    href="/whitepaper.pdf"
                    download
                    className="flex-1 w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-700 shadow-2xl"
                  >
                    <svg className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 group-hover:text-white transition-colors">Download Analysis</span>
                  </a>
                  
                  <a
                    href="/whitepaper.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    type="application/pdf"
                    className="flex-1 w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-5 bg-primary text-black rounded-full hover:bg-white transition-all duration-700 shadow-[0_0_30px_rgba(234,179,8,0.15)]"
                  >
                    <svg className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Open Whitepaper</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

              {/* Minimalist Countdown */}
              <div className="flex justify-center gap-3 sm:gap-10 md:gap-20 pt-20 md:pt-40 opacity-70 hover:opacity-100 transition-opacity duration-1000">
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
