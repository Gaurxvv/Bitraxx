'use client'

import { useReveal } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface RevealProps {
  children?: React.ReactNode
  className?: string
  animation?: 'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-scale'
  delay?: number
  threshold?: number
}

export function Reveal({ 
  children, 
  className, 
  animation = 'reveal', 
  delay = 0,
  threshold = 0.1
}: RevealProps) {
  const { ref, isVisible } = useReveal(threshold)

  return (
    <div 
      ref={ref} 
      className={cn(animation, isVisible ? 'active' : '', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
