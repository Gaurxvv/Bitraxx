'use client'

import { useEffect, useLayoutEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    // Prevent default scroll restoration
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      lerp: 0.08,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <>{children}</>
}
