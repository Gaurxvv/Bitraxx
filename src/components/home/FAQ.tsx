'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What is BRX?',
    answer: 'BRX is the native utility token powering the BitRaxx ecosystem, designed for trading rewards, staking, fee discounts, governance, and platform utilities.',
  },
  {
    question: 'Is the BitRaxx platform already live?',
    answer: 'Yes. BitRaxx follows a platform-first approach, meaning the trading infrastructure is operational before the BRX token launch.',
  },
  {
    question: 'Which blockchains are supported?',
    answer: 'BitRaxx supports Ethereum, BNB Chain, TRON, Solana, and future Layer-2 integrations.',
  },
  {
    question: 'What makes BitRaxx different from other exchanges?',
    answer: 'BitRaxx combines institutional-grade performance, integrated trade protection, multi-chain support, and real utility inside a live ecosystem.',
  },
  {
    question: 'How does the booking system work?',
    answer: 'Users can reserve BRX through the platform, receive a unique Booking ID, and track reservation status directly from the website.',
  },
  {
    question: 'Is BRX used for staking?',
    answer: 'Yes. BRX supports flexible and fixed staking programs with ecosystem-driven rewards and utility incentives.',
  },
  {
    question: 'What security measures protect users?',
    answer: 'The platform uses multi-layer encryption, AI-powered threat detection, wallet segregation, multi-signature authentication, and reserve backing systems.',
  },
  {
    question: 'When does the ICO begin?',
    answer: 'ICO Phase 1 officially begins on May 15, 2026.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-40 bg-[#0c0c0c] border-t border-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] mb-8">Registry Inquiries</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-white">Frequently Audited.</h3>
          </div>

          <div className="space-y-0 border-t border-primary/10">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="border-b border-primary/10 overflow-hidden"
              >
                <button
                  className="w-full py-10 flex justify-between items-center text-left hover:bg-primary/[0.01] transition-all duration-500 group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className={`text-xl md:text-2xl font-serif tracking-wide transition-colors duration-500 ${openIndex === index ? 'text-primary' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 flex items-center justify-center border border-primary/20 group-hover:border-primary transition-colors duration-500 rounded-none">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary/40 group-hover:text-primary" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-10 text-slate-500 text-base leading-relaxed font-light tracking-wide max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
