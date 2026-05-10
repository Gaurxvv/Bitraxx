'use client'

import Script from 'next/script'
import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useCallback } from 'react'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const ChatWidget = () => {
  const script = process.env.NEXT_PUBLIC_CHAT_WIDGET_SCRIPT
  const pathname = usePathname()

  // Hide chat on specific pages
  const isHiddenPage = pathname === '/reserve' || pathname === '/status' || pathname?.startsWith('/admin')

  const handleWidgetVisibility = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
      try {
        if (isHiddenPage) {
          window.Tawk_API.hideWidget()
        } else {
          window.Tawk_API.showWidget()
        }
      } catch (e) {
        // Ignore errors if widget is not ready
      }
    }
  }, [isHiddenPage])

  useEffect(() => {
    handleWidgetVisibility()
    
    // Tawk.to sometimes takes a moment to be ready
    const timeout = setTimeout(handleWidgetVisibility, 1000)
    return () => clearTimeout(timeout)
  }, [pathname, isHiddenPage, handleWidgetVisibility])

  if (!script) {
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
     return null
  }

  return (
    <>
      {/* CSS Brute-force fallback to ensure widget is hidden immediately */}
      {isHiddenPage && (
        <style dangerouslySetInnerHTML={{ __html: `
          #tawk-chat-iframe-container, 
          .tawk-min-container, 
          .tawk-chat-window,
          [id^="tawk-"] { 
            display: none !important; 
            visibility: hidden !important; 
            pointer-events: none !important;
            opacity: 0 !important;
          }
        `}} />
      )}
      
      <Script id="tawk-setup" strategy="afterInteractive">
        {`
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_LoadStart = new Date();
        `}
      </Script>

      <Script
        id="tawk-main"
        src={script}
        strategy="afterInteractive"
        onLoad={handleWidgetVisibility}
      />
    </>
  )
}

export default ChatWidget

