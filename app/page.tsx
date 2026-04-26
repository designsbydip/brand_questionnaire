import Link from "next/link";
import { ArrowRight, Clock, Shield, RotateCcw, ChevronRight, FileText, Target, Users, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { StartQuestionnaireButton } from "@/components/StartButton";
import AnoAI from "@/components/AnoAI";

const PARTS = [
  { number: 1, title: "Story Foundation", icon: "📖" },
  { number: 2, title: "Value Prop & Messaging", icon: "💬" },
  { number: 3, title: "Brand Personality", icon: "✨" },
  { number: 4, title: "Narrative Direction", icon: "🧭" },
  { number: 5, title: "Information Architecture", icon: "🏗️" },
  { number: 6, title: "Conversion Strategy", icon: "🎯" },
  { number: 7, title: "Technical Positioning", icon: "⚙️" },
  { number: 8, title: "Proof & Credibility", icon: "📊" },
  { number: 9, title: "Target Audience", icon: "👥" },
  { number: 10, title: "Visual Direction", icon: "🎨" },
  { number: 11, title: "AKC Relationship", icon: "🔗" },
  { number: 12, title: "Success Metrics", icon: "📈" },
  { number: 13, title: "Messaging & Copy", icon: "✍️" },
  { number: 14, title: "Rapid-Fire", icon: "⚡" },
  { number: 15, title: "Open-Ended", icon: "💭" },
];

export default function HomePage() {
  return (
    <div className="dark min-h-screen bg-black text-white selection:bg-white/20">
      {/* Header */}
      <header className="absolute top-0 w-full z-20">
        <div className="w-[90%] mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center">
            {/* Styled like "ThePortals" in the screenshot */}
            <span className="text-2xl font-serif tracking-tight text-white/90">GaudiProject</span>
          </div>
          
          <div className="flex items-center">
            <Link 
              href="/admin/login" 
              className="bg-zinc-800/80 hover:bg-zinc-700 text-white text-sm font-mono uppercase font-medium px-4 py-2 rounded-[10px] border border-zinc-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all flex items-center justify-center"
            >
              Agency Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        
        {/* Animated Background — absolute, covers full hero */}
        <AnoAI />

        <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-20 w-full max-w-[960px]">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-400/60" />
            <span className="text-indigo-400/80 text-xs">✦</span>
            <span className="text-indigo-200/80 text-xs font-mono tracking-[0.2em] uppercase">Brand Strategy Questionnaire</span>
            <span className="text-indigo-400/80 text-xs">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-400/60" />
          </div>
          <h1 className="text-6xl md:text-[110px] font-serif tracking-tight bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent mb-6 leading-[1.1]">
            Tell us your <em>story.</em><br className="hidden sm:block" />
            We&apos;ll <em>design</em> around it.
          </h1>
          
          <p className="text-zinc-400 text-[20px] font-mono mb-10 mx-auto leading-relaxed font-light tracking-wide">
            Answer a few questions about your brand, your audience, and what you want your website to say. We&apos;ll take it from there.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <StartQuestionnaireButton 
              className="bg-gradient-to-b from-[#F4F4F4] to-white text-[#393939] border-2 border-white shadow-[0_0_0_2px_#E7E7E7,0_4px_7px_-5px_rgba(0,0,0,0.12)] rounded-[10px] h-12 px-10 font-mono uppercase font-medium transition-all hover:opacity-90 text-base"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
