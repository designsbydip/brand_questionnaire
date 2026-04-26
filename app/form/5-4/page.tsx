"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextInput } from "@/components/form/TextInput";
import { DynamicInput } from "@/components/form/DynamicInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part5Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

export default function Page54() {
  const { form, onSaveFields, isValid } = useFormPage(Part5Schema, "5-4");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="5-4" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Navigation & CTAs</h2>
        <p className="text-sm text-muted-foreground">Define your site navigation and call-to-action copy.</p>
      </div>

      <Controller name="navItems" control={control}
        render={({ field }) => (
          <DynamicInput value={field.value || [""]} onChange={field.onChange} label="What should the main navigation links be?" name="navItems" itemLabel="Nav item" minItems={4} maxItems={6} placeholder="e.g. How It Works" hint="4–6 items" error={errors.navItems?.message} />
        )}
      />

      <div className="grid grid-cols-1 gap-4">
        <Controller name="ctaHeader" control={control}
          render={({ field }) => (
            <TextInput {...field} label="Header CTA button text" name="ctaHeader" required error={errors.ctaHeader?.message} placeholder="e.g. Get in Touch" />
          )}
        />
        <Controller name="ctaHero" control={control}
          render={({ field }) => (
            <TextInput {...field} label="Hero CTA button text" name="ctaHero" required error={errors.ctaHero?.message} placeholder="e.g. See How It Works" />
          )}
        />
        <Controller name="ctaFooter" control={control}
          render={({ field }) => (
            <TextInput {...field} label="Footer CTA button text" name="ctaFooter" required error={errors.ctaFooter?.message} placeholder="e.g. Start a Project" />
          )}
        />
      </div>
    </FormLayout>
  );
}
