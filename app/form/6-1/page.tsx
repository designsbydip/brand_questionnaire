"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { SortableRankInput } from "@/components/form/SortableRankInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part6Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page61Schema = Part6Schema.pick({
  conversionGoals: true,
});

const GOAL_ITEMS = [
  { id: "careers_applications", label: "Drive careers page applications" },
  { id: "contact_inquiries", label: "Generate client contact inquiries" },
  { id: "brand_awareness", label: "Build brand awareness" },
  { id: "demo_requests", label: "Generate demo requests" },
  { id: "case_study_downloads", label: "Drive case study downloads" },
  { id: "newsletter_signups", label: "Newsletter / waitlist signups" },
];

export default function Page61() {
  const { form, onSaveFields, isValid } = useFormPage(Page61Schema, "6-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="6-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Conversion Goals</h2>
        <p className="text-sm text-muted-foreground">Rank what matters most — what should the website actually convert visitors into?</p>
      </div>

      <Controller name="conversionGoals" control={control}
        render={({ field }) => (
          <SortableRankInput
            label="Rank by priority (drag to reorder)"
            items={GOAL_ITEMS}
            value={field.value || GOAL_ITEMS.map((i) => i.id)}
            onChange={field.onChange}
            required
            error={errors.conversionGoals?.message}
          />
        )}
      />
    </FormLayout>
  );
}
