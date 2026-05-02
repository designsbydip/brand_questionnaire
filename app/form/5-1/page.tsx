"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { SortableRankInput } from "@/components/form/SortableRankInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part5Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page51Schema = Part5Schema.pick({
  pageHierarchy: true,
});

const PAGE_ITEMS = [
  { id: "homepage", label: "Homepage" },
  { id: "about_how_it_works", label: "About / How It Works" },
  { id: "capabilities", label: "Capabilities / Features" },
  { id: "case_studies", label: "Case Studies" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog / Insights" },
  { id: "pricing", label: "Pricing (if applicable)" },
];

export default function Page51() {
  const { form, onSaveFields, isValid } = useFormPage(Page51Schema, "5-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="5-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Page Hierarchy</h2>
        <p className="text-sm text-muted-foreground">Rank the site pages by importance to your goals.</p>
      </div>

      <Controller name="pageHierarchy" control={control}
        render={({ field }) => (
          <SortableRankInput
            label="Rank pages by importance (drag to reorder)"
            items={PAGE_ITEMS}
            value={field.value || PAGE_ITEMS.map((i) => i.id)}
            onChange={field.onChange}
            required
            hint="1 = most important to your business goals"
            error={errors.pageHierarchy?.message}
          />
        )}
      />
    </FormLayout>
  );
}
