'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  className?: string
}

export default function Dropdown({ options, value, onChange, icon, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value) || options[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between pl-14 pr-8 py-5 rounded-full bg-black border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] focus:border-primary/50 outline-none transition-all cursor-pointer hover:border-white/20 group"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-700 group-hover:text-primary transition-colors">{icon}</span>}
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-700 transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 top-full left-0 w-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-primary/20"
          >
            <div className="py-3 px-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all relative group",
                    value === option.value 
                      ? "text-primary bg-primary/5" 
                      : "text-slate-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#D4AF37]"
                    />
                  )}
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-2xl transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
