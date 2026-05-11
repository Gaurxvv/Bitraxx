'use client'

import { Download, Eye } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const intelligenceData = [
  { title: 'DEFLATIONARY MODEL', desc: 'Fixed supply with automated burn mechanism ensuring long-term scarcity.' },
  { title: 'SOVEREIGN CUSTODY', desc: 'Private key management protocol designed for total asset sovereignty.' },
  { title: 'OPERATIONAL UTILITY', desc: 'Full platform functionality active before token release — value from day zero.' },
  { title: 'AUDITED TRANSPARENCY', desc: 'Open-source logic verified for institutional-grade reliability and trust.' },
]

const TechnicalIntelligence = () => {
  return (
    <section className="py-24 md:py-48 bg-[#0c0c0c] relative overflow-hidden border-t border-white/5">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <Reveal delay={0} className="mb-6 block">
            <span className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.6em]">
              INSTITUTIONAL PROTOCOL
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-7xl lg:text-8xl font-serif text-white italic font-light tracking-tight">
              Technical Intelligence
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-16">
          {intelligenceData.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="p-8 md:p-10 bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 group rounded-none"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </div>
              <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed font-light tracking-wide">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
          <a
            href="/whitepaper.pdf"
            download
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/20 transition-all duration-500 group rounded-none"
          >
            <Download className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
            <span>Download Analysis</span>
          </a>
          
          <a
            href="/whitepaper.pdf"
            target="_blank"
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-primary text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 rounded-none shadow-[0_10px_40px_rgba(212,175,55,0.25)]"
          >
            <Eye className="w-4 h-4" />
            <span>Open Whitepaper</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default TechnicalIntelligence
