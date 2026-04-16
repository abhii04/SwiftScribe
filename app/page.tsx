import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ArrowRight, Mail, Zap, BookOpen, Layers, ShieldCheck, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#030304] text-white selection:bg-[#F7931A]/30 font-body relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-40"></div>
      <div className="bg-radial-blur bg-[#EA580C] top-[-10%] left-[-10%]"></div>
      <div className="bg-radial-blur bg-[#F7931A] bottom-[-10%] right-[-10%] opacity-5"></div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-math bg-black/40 backdrop-blur-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#F7931A]/30 bg-[#F7931A]/10 rounded-xl flex items-center justify-center shadow-gold-accent">
              <Layers className="w-5 h-5 text-[#F7931A]" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight hidden sm:inline-block">SwiftScribe</span>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <Link href="/dashboard">
                <Button className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 h-11 px-6 border-0">
                  Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/auth/login" className="font-mono text-sm tracking-widest uppercase hover:text-[#F7931A] text-[#94A3B8] transition-colors">
                  Log in
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 h-11 px-6 border-0">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F7931A]/30 bg-[#F7931A]/10 text-[#F7931A] font-mono text-xs uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-ping mr-1"></span>
              Network Online
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Manage Emails with<br />
              <span className="bg-gradient-to-r from-[#EA580C] to-[#F7931A] bg-clip-text text-transparent drop-shadow-lg">
                Superhuman Precision.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#94A3B8] mb-12 leading-relaxed max-w-xl">
              An AI-powered communications terminal engineered for mathematical accuracy. Auto-categorize, generate contextual drafts, and secure your inbox.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <Link href={user ? "/dashboard" : "/auth/sign-up"}>
                <Button size="lg" className="h-14 px-8 font-heading tracking-wider uppercase font-bold rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white shadow-bitcoin-primary hover:shadow-bitcoin-primary-hover hover:scale-105 transition-all duration-300 border-0">
                  {user ? "Initialize Dashboard" : "Start For Free"}
                </Button>
              </Link>
              <Link href="#how-it-works" className="font-mono text-sm tracking-widest uppercase hover:text-[#FFD600] text-white transition-colors border-b border-white/20 pb-1 hover:border-[#FFD600]">
                View Documentation
              </Link>
            </div>
          </div>

          {/* 3D Orb / Orbital Animation */}
          <div className="relative h-[400px] w-[400px] mx-auto md:h-[500px] md:w-[500px] flex items-center justify-center animate-float">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#EA580C]/30 animate-[spin_15s_linear_infinite]"></div>
            {/* Inner Ring */}
            <div className="absolute inset-10 rounded-full border border-[#F7931A]/40 animate-[spin_10s_linear_infinite_reverse]"></div>
            {/* Core Orb */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD600] to-[#EA580C] shadow-[0_0_80px_rgba(247,147,26,0.6)] flex items-center justify-center relative z-20 shadow-bitcoin-primary-hover">
               <Cpu className="w-12 h-12 text-[#030304]" />
            </div>

            {/* Bouncing Nodes */}
            <div className="absolute top-10 left-10 crypto-glass-block p-4 animate-bounce hover:scale-110 z-30 shadow-card-elevated" style={{ animationDuration: '4s' }}>
               <span className="font-mono text-[#F7931A] text-sm font-bold">128ms Response</span>
            </div>
            <div className="absolute bottom-20 right-0 crypto-glass-block p-4 animate-bounce hover:scale-110 z-30 shadow-card-elevated" style={{ animationDuration: '3s', animationDelay: '1s' }}>
               <span className="font-mono text-[#FFD600] text-sm font-bold">99.9% Accuracy</span>
            </div>
          </div>

        </div>

        {/* Features Grids */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32" id="how-it-works">
          <div className="crypto-glass-block group relative overflow-hidden text-center md:text-left border-math">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F7931A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F7931A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <Mail className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="w-12 h-12 bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg flex items-center justify-center mb-6 shadow-bitcoin-primary transition-all">
              <Zap className="w-6 h-6 text-[#F7931A]" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">Smart Verification</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Auto-categorize and route priority communications leveraging local AI algorithms with strict validation rules.
            </p>
          </div>
          <div className="crypto-glass-block group relative overflow-hidden text-center md:text-left border-math">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F7931A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F7931A] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <Layers className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="w-12 h-12 bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg flex items-center justify-center mb-6 shadow-bitcoin-primary transition-all">
              <Cpu className="w-6 h-6 text-[#F7931A]" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">Consensus Drafting</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Generate context-aware responses anchored by your knowledge base for 100% mathematical consistency in tone.
            </p>
          </div>
          <div className="crypto-glass-block group relative overflow-hidden text-center md:text-left border-math">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F7931A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F7931A] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="w-12 h-12 bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg flex items-center justify-center mb-6 shadow-bitcoin-primary transition-all">
              <ShieldCheck className="w-6 h-6 text-[#F7931A]" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">Cryptographic Security</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Protect your data utilizing row-level security and absolute void isolation strategies.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-math py-12 mt-20 text-center bg-[#0F1115]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-2">
             <Layers className="w-5 h-5 text-[#F7931A]" />
             <span className="font-heading font-bold text-xl tracking-tight">SwiftScribe</span>
           </div>
           <p className="font-mono text-[#94A3B8] text-xs uppercase tracking-widest">© 2026 SwiftScribe Technologies. Immutable.</p>
        </div>
      </footer>
    </div>
  )
}
