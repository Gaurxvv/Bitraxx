import { Shield, Zap, Globe, Wallet, Database, Lock } from 'lucide-react'

const features = [
  {
    index: '01',
    title: 'BitRaxx Shield™',
    description: 'Proprietary trade protection protocol covering up to 40% of eligible losses—setting a new benchmark for capital security.',
    icon: Shield,
  },
  {
    index: '02',
    title: 'Precision Execution',
    description: 'High-throughput matching engine processing 1M+ orders per second with sub-millisecond latency.',
    icon: Zap,
  },
  {
    index: '03',
    title: 'Multi-Chain Core',
    description: 'Sovereign cross-chain infrastructure supporting Ethereum, BNB, TRON, Solana, and emerging L2 protocols.',
    icon: Globe,
  },
  {
    index: '04',
    title: 'Unified Custody',
    description: 'Consolidated asset management interface providing a singular vantage point for multi-chain digital wealth.',
    icon: Wallet,
  },
  {
    index: '05',
    title: 'Live Ecosystem',
    description: 'A platform-first architecture. Our infrastructure was fully operational before tokenization, ensuring immediate utility.',
    icon: Database,
  },
  {
    index: '06',
    title: 'Fortress Security',
    description: 'Enterprise-grade encryption with AI-driven threat detection and multi-layer wallet segregation.',
    icon: Lock,
  },
]

const Features = () => {
  return (
    <section className="py-20 md:py-40 bg-[#0c0c0c] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-32 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white leading-tight text-left">
              Institutional Power. <br />
              <span className="italic font-light opacity-80 text-primary">Retail Simplicity.</span>
            </h3>
          </div>
        </div>

        <div className="space-y-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group border-t border-primary/10 py-12 md:py-24 hover:bg-primary/[0.01] transition-all duration-700"
            >
              <div className="flex flex-col md:flex-row items-start gap-8 md:gap-24">
                <div className="flex items-center gap-6 md:gap-8 md:w-1/3">
                  <span className="text-3xl md:text-6xl font-serif text-primary/70 group-hover:text-primary/90 transition-colors duration-700 font-light tabular-nums">
                    {feature.index}
                  </span>
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-primary/40 group-hover:border-primary transition-colors duration-500">
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary/90 group-hover:text-primary" />
                  </div>
                </div>
                
                <div className="md:w-2/3 max-w-2xl">
                  <h4 className="text-xl md:text-4xl font-serif text-white mb-4 md:mb-8 tracking-wide group-hover:text-primary transition-colors duration-500">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-light tracking-wide">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-primary/10" />
        </div>
      </div>
    </section>
  )
}

export default Features
