'use client'

import { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

const ChatWidget = () => {
  const script = process.env.NEXT_PUBLIC_CHAT_WIDGET_SCRIPT

  useEffect(() => {
    if (script && script.startsWith('http')) {
      const s = document.createElement('script')
      s.src = script
      s.async = true
      s.setAttribute('crossorigin','*')
      document.body.appendChild(s)
    }
  }, [script])

  if (!script) {
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

export default ChatWidget
