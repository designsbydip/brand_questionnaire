"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FORM_PAGES, TOTAL_PAGES } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

interface FormStepperProps {
  currentRoute: string;
}

export function FormStepper({ currentRoute }: FormStepperProps) {
  const current = FORM_PAGES.find((p) => p.route === currentRoute);
  const currentNumber = current?.totalPageNumber ?? 1;
  const percentage = Math.round((currentNumber / TOTAL_PAGES) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-medium px-2 py-0.5">
            Part {current?.part ?? 1} of 15
          </Badge>
          <span className="text-xs text-muted-foreground">
            Step {currentNumber} of {TOTAL_PAGES}
          </span>
        </div>
        <span className="text-xs font-semibold text-foreground">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-1.5" />
      <div className="flex items-center gap-1.5 mt-3">
        <p className="text-sm font-semibold text-foreground">{current?.partTitle}</p>
        <span className="text-muted-foreground text-sm">—</span>
        <p className="text-sm text-muted-foreground">{current?.pageTitle}</p>
        {percentage === 100 && (
          <CheckCircle2 className="h-4 w-4 text-green-600 ml-1" />
        )}
      </div>
    </div>
  );
}
