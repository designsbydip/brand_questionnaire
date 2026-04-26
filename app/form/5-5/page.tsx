"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { useFormPage } from "@/hooks/useFormPage";
import { Part5Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const PAGES = ["Homepage", "About / How It Works", "Capabilities", "Careers", "Case Studies"];

export default function Page55() {
  const { form, onSaveFields, isValid } = useFormPage(Part5Schema, "5-5");
  const { control, handleSubmit, watch, setValue } = form;

  const contentDepth = watch("contentDepth") || PAGES.map((p) => ({ page: p, depth: "medium" as const, wordCount: "" }));

  return (
    <FormLayout currentRoute="5-5" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Content Depth</h2>
        <p className="text-sm text-muted-foreground">For each page, how much content depth do you want?</p>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span>Page</span>
          <span>Depth</span>
          <span>Approx. word count</span>
        </div>
        {PAGES.map((page, i) => (
          <div key={page} className="grid grid-cols-3 gap-3 px-4 py-3 border-t border-border items-center">
            <span className="text-xs text-foreground">{page}</span>
            <select
              className="text-xs border border-border rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-black"
              value={contentDepth[i]?.depth || "medium"}
              onChange={(e) => {
                const next = [...contentDepth];
                next[i] = { ...next[i], page, depth: e.target.value as "light" | "medium" | "deep" };
                setValue("contentDepth", next);
              }}
            >
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="deep">Deep</option>
            </select>
            <input
              className="text-xs border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="e.g. 500 words"
              value={contentDepth[i]?.wordCount || ""}
              onChange={(e) => {
                const next = [...contentDepth];
                next[i] = { ...next[i], page, wordCount: e.target.value };
                setValue("contentDepth", next);
              }}
            />
          </div>
        ))}
      </div>
    </FormLayout>
  );
}
