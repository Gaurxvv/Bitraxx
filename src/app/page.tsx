import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BackgroundLines from "@/components/layout/BackgroundLines";
import TargetCursor from "@/components/ui/TargetCursor";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-[#0c0c0c] relative">
      <BackgroundLines />
      <Hero />
      
      <Features />
      <HowItWorks />

      {/* Cinematic CTA Section */}
      <section className="py-40 relative overflow-hidden bg-[#0c0c0c]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto py-20 border border-primary/20 bg-primary/[0.01] relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />

            <h2 className="text-4xl md:text-7xl font-serif text-white mb-10 leading-tight">
              Secure Your <br />
              <span className="font-light italic opacity-80">Allocation.</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl mb-16 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
              The window for private allocation is closing. Institutional registries are now being finalized.
            </p>
            <Link
              href="/reserve"
              className="cursor-target inline-flex items-center gap-4 px-14 py-6 border border-primary/60 hover:border-primary transition-all duration-500 group"
            >
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
                Enter The Registry
              </span>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
      <TargetCursor />
    </div>
  );
}
