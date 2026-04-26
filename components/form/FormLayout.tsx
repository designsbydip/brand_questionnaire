"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormStepper } from "./FormStepper";
import { FormNavigator } from "./FormNavigator";
import { getNextRoute, getPrevRoute, FORM_PAGES } from "@/lib/types";
import { useFormContext } from "@/context/FormContext";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface FormLayoutProps {
  children: ReactNode;
  currentRoute: string;
  onSaveFields: (data: Record<string, unknown>) => Promise<void>;
  handleSubmit: (handler: (data: Record<string, unknown>) => Promise<void>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  isValid: boolean;
}

export function FormLayout({ children, currentRoute, onSaveFields, handleSubmit, isValid }: FormLayoutProps) {
  const router = useRouter();
  const { state, markPageVisited } = useFormContext();
  const nextRoute = getNextRoute(currentRoute);
  const prevRoute = getPrevRoute(currentRoute);
  const isLastPage = currentRoute === FORM_PAGES[FORM_PAGES.length - 1].route;

  useEffect(() => {
    markPageVisited(currentRoute);
  }, [currentRoute, markPageVisited]);

  const onNext = handleSubmit(async (data) => {
    await onSaveFields(data);
    if (isLastPage) {
      router.push("/form/review");
    } else if (nextRoute) {
      router.push(`/form/${nextRoute}`);
    }
  });

  const onPrevious = () => {
    if (prevRoute) {
      router.push(`/form/${prevRoute}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="border-b border-border bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Gaudi Questionnaire</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {state.isSaving && (
              <span className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving…
              </span>
            )}
            {!state.isSaving && state.lastSaved && !state.saveError && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                Saved
              </span>
            )}
            {state.saveError && (
              <span className="flex items-center gap-1 text-red-500">
                <AlertCircle className="h-3 w-3" />
                Save error
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Stepper */}
        <div className="mb-10">
          <FormStepper currentRoute={currentRoute} />
        </div>

        {/* Form fields */}
        <div className="space-y-8">
          {children}
        </div>

        {/* Navigation */}
        <FormNavigator
          onPrevious={onPrevious}
          onNext={onNext as () => void}
          isPreviousDisabled={state.isSaving}
          isNextDisabled={!isValid || state.isSaving}
          isSaving={state.isSaving}
          nextLabel={isLastPage ? "Review Answers" : "Next"}
          previousLabel={prevRoute ? "Previous" : "Back to Home"}
        />
      </main>
    </div>
  );
}
