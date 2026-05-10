'use client'
import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useCallback, useRef, useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const ChatWidget = () => {
  const scriptUrl = process.env.NEXT_PUBLIC_CHAT_WIDGET_SCRIPT
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  // Hide chat on specific pages
  const isHiddenPage = pathname === '/reserve' || pathname === '/status' || pathname?.startsWith('/admin')

  const handleWidgetVisibility = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API && isReady) {
      try {
        if (typeof window.Tawk_API.hideWidget === 'function' && typeof window.Tawk_API.showWidget === 'function') {
          if (isHiddenPage) {
            window.Tawk_API.hideWidget()
          } else {
            window.Tawk_API.showWidget()
          }
        }
      } catch (e) {
        console.warn('Tawk.to visibility toggle failed:', e)
      }
    }
  }, [isHiddenPage, isReady])

  useEffect(() => {
    handleWidgetVisibility()
  }, [pathname, handleWidgetVisibility])

  if (!scriptUrl) {
    if (!isHiddenPage) {
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
      <Script
        id="tawk-script"
        src={scriptUrl}
        strategy="lazyOnload"
        onReady={() => {
          setIsReady(true);
          handleWidgetVisibility();
        }}
      />
      
      {/* CSS Brute-force fallback to ensure widget is hidden immediately even before JS loads */}
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
    </>
  )
}

export default ChatWidget

