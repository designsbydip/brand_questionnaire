"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useFormContext } from "@/context/FormContext";
import { FORM_PAGES } from "@/lib/types";
import { ChevronDown, ChevronUp, Edit2, ArrowLeft, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export default function ReviewPage() {
  const router = useRouter();
  const { state, getCompletion } = useFormContext();
  const [openParts, setOpenParts] = useState<Set<number>>(new Set([1]));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completion = getCompletion();

  const togglePart = (part: number) => {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(part)) next.delete(part);
      else next.add(part);
      return next;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: state.data, status: "submitted" }),
      });
      const result = await res.json();
      if (result.success) {
        localStorage.removeItem("gaudi_form_data");
        router.push(`/form/success?id=${result.id}`);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group by part
  const partGroups = FORM_PAGES.reduce<Record<number, typeof FORM_PAGES>>((acc, page) => {
    if (!acc[page.part]) acc[page.part] = [];
    acc[page.part].push(page);
    return acc;
  }, {});

  const formatValue = (val: unknown): string => {
    if (val === null || val === undefined || val === "") return "Not answered";
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "Not answered";
    if (typeof val === "object") return JSON.stringify(val, null, 2);
    return String(val);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Review Your Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full" style={{ width: `${completion}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{completion}% complete</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Review Your Answers</h1>
          <p className="text-sm text-muted-foreground">Check everything looks right before submitting. You can edit any section.</p>
        </div>

        <div className="space-y-3 mb-10">
          {Object.entries(partGroups).map(([partStr, pages]) => {
            const part = parseInt(partStr);
            const partTitle = pages[0].partTitle;
            const isOpen = openParts.has(part);

            return (
              <Collapsible key={part} open={isOpen} onOpenChange={() => togglePart(part)}>
                <div className="border border-border rounded-xl overflow-hidden">
                  <CollapsibleTrigger className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground">Part {part}</span>
                      <span className="text-sm font-semibold text-foreground">{partTitle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/form/${pages[0].route}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </Link>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Separator />
                    <div className="p-5 space-y-3">
                      {Object.entries(state.data)
                        .filter(([, v]) => v !== null && v !== undefined)
                        .slice(0, 8)
                        .map(([key, value]) => (
                          <div key={key} className="grid grid-cols-5 gap-4 text-sm">
                            <dt className="text-xs text-muted-foreground col-span-2 capitalize leading-snug pt-0.5">
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </dt>
                            <dd className="text-sm text-foreground col-span-3 break-words">
                              {formatValue(value) === "Not answered"
                                ? <span className="text-muted-foreground italic text-xs">Not answered</span>
                                : formatValue(value)}
                            </dd>
                          </div>
                        ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Link
            href={`/form/${FORM_PAGES[FORM_PAGES.length - 1].route}`}
            className={cn(buttonVariants({ variant: "outline" }), "h-10 px-5 text-sm")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Last Page
          </Link>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-10 px-6 text-sm bg-black text-white hover:bg-black/90"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
            ) : (
              <><Send className="mr-2 h-4 w-4" /> Submit Questionnaire</>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
