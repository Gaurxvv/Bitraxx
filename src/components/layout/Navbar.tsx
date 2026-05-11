'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname === '/reserve' || pathname === '/status' || pathname?.startsWith('/admin')) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-8 py-3">
      <div
        className={`mx-auto transition-all duration-700 ${scrolled
            ? 'max-w-5xl bg-[#0c0c0c]/80 backdrop-blur-2xl border border-primary/20 rounded-2xl py-1 px-4 md:px-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            : 'max-w-7xl bg-transparent py-3 px-6 rounded-none'
          } flex justify-between items-center`}
      >
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/logo.png"
            alt="Bitraxx Logo"
            width={350}
            height={125}
            priority
            className={`${scrolled ? 'h-5 md:h-9' : 'h-8 md:h-14'} w-auto object-contain brightness-125 transition-all duration-500 group-hover:scale-[1.02]`}
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/status"
            className="px-3 md:px-8 py-2 md:py-3 rounded-xl border border-primary/20 text-slate-400 hover:text-primary hover:border-primary/40 font-bold text-[8px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap"
          >
            <span className="hidden md:inline">Check Status</span>
            <span className="md:hidden">Status</span>
          </Link>
          <Link
            href="/reserve"
            className="px-4 md:px-10 py-2 md:py-3 rounded-xl bg-primary text-black font-bold text-[8px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-[0_10px_20px_rgba(212,175,55,0.15)] whitespace-nowrap gold-gradient"
          >
            <span className="hidden md:inline">Access Registry</span>
            <span className="md:hidden">Access</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar