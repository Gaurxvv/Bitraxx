'use client'

import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useCallback, useRef } from 'react'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
    Tawk_IsLoaded?: boolean;
  }
}

const ChatWidget = () => {
  const scriptUrl = process.env.NEXT_PUBLIC_CHAT_WIDGET_SCRIPT
  const pathname = usePathname()
  const isInitialized = useRef(false)

  // Hide chat on specific pages
  const isHiddenPage = pathname === '/reserve' || pathname === '/status' || pathname?.startsWith('/admin')

  const handleWidgetVisibility = useCallback(() => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      try {
        // Only call hide/show if the API is actually available
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
  }, [isHiddenPage])

  useEffect(() => {
    // 1. Initial Load Logic
    if (!isInitialized.current && scriptUrl && typeof window !== 'undefined') {
      if (!window.Tawk_IsLoaded) {
        window.Tawk_API = window.Tawk_API || {}
        window.Tawk_LoadStart = new Date()

        const s1 = document.createElement("script")
        const s0 = document.getElementsByTagName("script")[0]
        s1.async = true
        s1.src = scriptUrl
        s1.charset = 'UTF-8'
        s1.setAttribute('crossorigin', '*')
        s1.id = 'tawk-script'
        s0.parentNode?.insertBefore(s1, s0)
        
        window.Tawk_IsLoaded = true
        
        s1.onload = () => {
          handleWidgetVisibility()
        }
      }
      isInitialized.current = true
    }

    // 2. Visibility Sync
    handleWidgetVisibility()
    
    // Retry visibility check after a short delay to account for Tawk.to's slow ready state
    const timeout = setTimeout(handleWidgetVisibility, 2000)
    return () => clearTimeout(timeout)
  }, [pathname, isHiddenPage, handleWidgetVisibility, scriptUrl])

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

