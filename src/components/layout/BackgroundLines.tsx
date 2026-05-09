'use client'

import React from 'react'

const BackgroundLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Left Vertical Line */}
      <div className="absolute left-[10%] md:left-[15%] top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-30" />
      
      {/* Right Vertical Line */}
      <div className="absolute right-[10%] md:right-[15%] top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-30" />

      {/* Subtle Grid / Technical Details */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:100px_100px] opacity-[0.03]" />
    </div>
  )
}

export default BackgroundLines
