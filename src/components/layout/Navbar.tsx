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

  if (pathname === '/reserve' || pathname === '/status') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-8 py-3">
      <div
        className={`mx-auto transition-all duration-700 ${scrolled
            ? 'max-w-5xl bg-[#0c0c0c]/80 backdrop-blur-2xl border border-primary/20 rounded-full py-1 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
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
            className={`${scrolled ? 'h-8 md:h-14' : 'h-10 md:h-20'} w-auto object-contain brightness-125 transition-all duration-500 group-hover:scale-[1.02]`}
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <Link
            href="/status"
            className="px-3 md:px-6 py-2 md:py-3 rounded-full border border-primary/40 text-primary font-bold text-[8px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary/5 transition-all duration-500"
          >
            Check Status
          </Link>
          <Link
            href="/reserve"
            className="px-4 md:px-10 py-2 md:py-3 rounded-full bg-primary text-black font-bold text-[8px] md:text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
          >
            Access Registry
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar