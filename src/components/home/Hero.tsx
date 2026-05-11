'use client'

import { useState, useEffect } from 'react'
import React from "react"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import LightPillar from '../ui/LightPillar'

const Hero = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const active = mounted ? 'active' : ''

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-28 pb-24 md:pb-40 overflow-hidden bg-[#0c0c0c]">
      {/* Architectural Accents */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] opacity-30 animate-pulse-slow pointer-events-none" />
        

        {/* Dynamic Vertical Lines - Desktop Only for Performance */}
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          
          {/* Scanning Effect */}
          <div className="absolute left-[15%] w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px] animate-scan" />
          <div className="absolute right-[15%] w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent blur-[2px] animate-scan [animation-delay:3s]" />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[100vh] z-0 overflow-hidden pointer-events-none opacity-50 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        <LightPillar
          topColor="#D4AF37"
          bottomColor="#D4AF37"
          intensity={0.6}
          rotationSpeed={0.2}
          glowAmount={0.003}
          pillarWidth={2.0}
          pillarHeight={0.3}
          noiseIntensity={0.3}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className={cn("reveal-scale", active)}>
            {/* Minimal Badge */}
            <div className={cn("inline-flex items-center gap-3 mb-8 md:mb-10 px-5 py-2 rounded-none border border-primary/20 bg-primary/5 backdrop-blur-md transition-all duration-700 reveal delay-100", active)}>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-primary">Sovereignty Protocol</span>
            </div>

            <h1 className={cn("text-4xl sm:text-6xl md:text-9xl font-serif text-white leading-[1.1] tracking-tight text-center mb-8 md:mb-12 reveal delay-200", active)}>
              Powering the Next <br />
              <span className="italic font-light opacity-80">Generation.</span>
            </h1>

            <p className={cn("text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-sans font-light tracking-wide px-6 reveal delay-300", active)}>
              A fully operational crypto platform before token launch — built with real utility from day one. 
              Engineered for the modern custodian who values absolute discretion.
            </p>

            <div className={cn("flex flex-col items-center gap-6 md:gap-8 reveal delay-400", active)}>
              <Link
                href="/reserve"
                className="group relative px-12 md:px-16 py-5 md:py-6 bg-primary text-black hover:bg-white transition-all duration-700 overflow-hidden rounded-none w-auto min-w-[280px] text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">
                  Reserve Institutional Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
