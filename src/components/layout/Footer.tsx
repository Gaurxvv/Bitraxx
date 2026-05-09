'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Globe, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  
  // Hide footer on reserve and status pages for focus-mode
  if (pathname === '/reserve' || pathname === '/status') return null

  return (
    <footer className="bg-[#0c0c0c] border-t border-primary/10 pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/logo.png" 
                alt="Bitraxx Logo" 
                width={350} 
                height={125} 
                className="h-20 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed font-light tracking-wide">
              The definitive institutional-grade platform for secure digital asset custody and multi-chain wealth management. Managed with precision, secured by sovereignty.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <div className="text-primary/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-2">Connect</div>
            <a href="mailto:concierge@bitraxx.io" className="text-white text-sm font-light hover:text-primary transition-colors duration-300">concierge@bitraxx.io</a>
          </div>
        </div>

        <div className="pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] text-slate-600 font-bold">
          <p>© 2026 BITRAXX SOVEREIGN WEALTH. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
