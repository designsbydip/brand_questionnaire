"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface FormNavigatorProps {
  onNext?: () => void;
  onPrevious?: () => void;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  isSaving?: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

export function FormNavigator({
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousDisabled = false,
  isSaving = false,
  nextLabel = "Next",
  previousLabel = "Previous",
}: FormNavigatorProps) {
  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isPreviousDisabled || isSaving}
        className="h-10 px-5 text-sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {previousLabel}
      </Button>

      <Button
        type="submit"
        onClick={onNext}
        disabled={isNextDisabled || isSaving}
        className="h-10 px-5 text-sm bg-black text-white hover:bg-black/90"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
