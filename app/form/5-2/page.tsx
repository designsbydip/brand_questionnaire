"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { useFormPage } from "@/hooks/useFormPage";
import { Part5Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const HOMEPAGE_SECTIONS = [
  "Hero / above the fold", "What Gaudi does", "The problem we solve",
  "How it works", "Automation stats", "Example outputs", "Team/talent focus",
  "Vision/future", "Case study highlight", "Client logos/trust signals",
  "Careers CTA", "Contact CTA", "AKC Anuv connection", "Blog/insights",
  "Demo/product video",
];

export default function Page52() {
  const { form, onSaveFields, isValid } = useFormPage(Part5Schema, "5-2");
  const { control, handleSubmit, formState: { errors }, watch, setValue } = form;

  const sections = watch("homepageSections") ||
    HOMEPAGE_SECTIONS.map((s) => ({ section: s, choice: "maybe" as const }));

  return (
    <FormLayout currentRoute="5-2" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Homepage Sections</h2>
        <p className="text-sm text-muted-foreground">For each section, decide whether to include, maybe include, or skip it.</p>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-0 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span className="col-span-2">Section</span>
          <span className="text-center">Include</span>
          <span className="text-center">Maybe</span>
        </div>
        {HOMEPAGE_SECTIONS.map((section, i) => (
          <div key={section} className="grid grid-cols-4 gap-0 px-4 py-3 border-t border-border items-center">
            <span className="text-xs text-foreground col-span-2">{section}</span>
            {(["include", "maybe", "skip"] as const).map((choice) => (
              <label key={choice} className="flex items-center justify-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name={`section-${i}`}
                  value={choice}
                  checked={sections[i]?.choice === choice}
                  onChange={() => {
                    const next = [...sections];
                    next[i] = { section, choice };
                    setValue("homepageSections", next);
                  }}
                  className="w-3.5 h-3.5"
                />
                <span className="text-xs capitalize text-muted-foreground">{choice}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </FormLayout>
  );
}
