'use client'

import { useEffect, useRef, useState } from 'react'

export function useReveal(threshold = 0.1, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [threshold, rootMargin])

  return { ref, isVisible, className: isVisible ? 'active' : '' }
}
