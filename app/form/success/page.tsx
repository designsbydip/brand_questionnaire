import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { id } = await searchParams;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">
          Thank you — we&apos;ve got everything!
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Your responses have been securely saved. We&apos;ll use your insights to guide every design and development decision for the Gaudi website.
        </p>

        {id && (
          <div className="bg-muted/50 rounded-xl border border-border p-4 mb-8">
            <p className="text-xs text-muted-foreground mb-1.5">Your reference ID</p>
            <p className="font-mono text-sm text-foreground font-medium">{id}</p>
            <p className="text-xs text-muted-foreground mt-1.5">Keep this handy in case you need to reference your submission.</p>
          </div>
        )}

        <div className="text-left space-y-3 mb-10">
          {[
            "Our team will review your responses within 1–2 business days.",
            "We'll use your answers to inform every design direction and decision.",
            "You'll receive a project kickoff meeting invitation soon.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-foreground">{step}</p>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className={cn(buttonVariants(), "bg-black text-white hover:bg-black/90 h-10 px-6 text-sm")}
        >
          Back to Home
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
