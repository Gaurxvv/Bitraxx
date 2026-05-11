'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, X } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const VideoShowcase = () => {
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Use a simpler way to play/pause without an extra hook on the container
  const handleMouseEnter = () => {
    if (videoRef.current && !isOpen) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <section className="py-6 md:py-10 bg-[#0c0c0c] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Video Placeholder/Trigger */}
          <Reveal animation="reveal-scale" delay={100} className="relative aspect-video group cursor-pointer" threshold={0.2}>
            <div 
              className="absolute inset-0 border border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden group-hover:border-primary/40 transition-all duration-700"
              onClick={() => setIsOpen(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Video Preview (Muted, Controlled by Hover) */}
              <video 
                ref={videoRef}
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
              >
                <source src="/LaunchVideo.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary/30 flex items-center justify-center bg-[#0c0c0c]/60 backdrop-blur-xl group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/10 group-hover:opacity-0 transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  <Play className="w-4 h-4 md:w-6 md:h-6 text-primary fill-primary/20 ml-1" />
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-primary/40 group-hover:border-primary transition-colors duration-500" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-primary/40 group-hover:border-primary transition-colors duration-500" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-4xl aspect-video bg-black border border-primary/20 shadow-[0_0_100px_rgba(0,0,0,1)]">
            <button 
              className="absolute -top-12 right-0 text-white/60 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-bold"
              onClick={() => setIsOpen(false)}
            >
              CLOSE <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <video 
                controls 
                autoPlay 
                className="w-full h-full"
              >
                <source src="/LaunchVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default VideoShowcase
