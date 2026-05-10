'use client'

import { UserPlus, ShieldCheck, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Registry Entry',
    description: 'Submit your institutional credentials and desired allocation volume via our secure portal.',
    icon: UserPlus,
  },
  {
    title: 'Verification',
    description: 'Our compliance protocol executes a high-density audit to ensure registry integrity.',
    icon: ShieldCheck,
  },
  {
    title: 'Sovereign Release',
    description: 'Receive your unique cryptographic allocation ID and priority ledger placement.',
    icon: Award,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const HowItWorks = () => {
  return (
    <section className="py-40 bg-[#0c0c0c]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-32"
        >
          <motion.h2 variants={itemVariants} className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] mb-8">The Onboarding Protocol</motion.h2>
          <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-serif text-white mb-10">A Seamless Transition.</motion.h3>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative"
          >
            {/* Architectural Connecting Line */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1, transition: { duration: 1, ease: "circOut", delay: 0.5 } }
              }}
              className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10 origin-left" 
            />

            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-[#0c0c0c] border border-primary/30 flex items-center justify-center mb-10 relative group-hover:border-primary transition-colors duration-500">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0c0c0c] px-4 whitespace-nowrap">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Step 0{index + 1}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors duration-500" />
                </div>
                <h4 className="text-2xl font-serif text-white mb-6 tracking-wide group-hover:text-primary transition-colors duration-500">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] font-light tracking-wide">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
