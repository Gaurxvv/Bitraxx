'use client'

import Script from 'next/script'
import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

const ChatWidget = () => {
  const script = process.env.NEXT_PUBLIC_CHAT_WIDGET_SCRIPT
  const pathname = usePathname()

  // Hide chat on specific pages
  const isHiddenPage = !script || pathname === '/reserve' || pathname === '/status' || pathname?.startsWith('/admin')

  if (isHiddenPage && !script) {
     // If no script is configured and we are not on a hidden page, show the fallback button
     if (!(pathname === '/reserve' || pathname === '/status' || pathname?.startsWith('/admin'))) {
       return (
         <button 
           className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[100] gold-gradient"
           onClick={() => alert('Support Chat: Please configure NEXT_PUBLIC_CHAT_WIDGET_SCRIPT in your environment variables.')}
         >
           <MessageCircle className="w-6 h-6" />
         </button>
       )
     }
  }

  if (isHiddenPage) return null

  return (
    <Script
      id="tawk-to-script"
      src={script}
      strategy="lazyOnload"
      onLoad={() => {
        // Optional: Initialize Tawk.to if needed
      }}
    />
  )
}

export default ChatWidget

