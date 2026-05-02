"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { DateInput } from "@/components/form/DateInput";
import { NumberInput } from "@/components/form/NumberInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part1Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page12Schema = Part1Schema.pick({
  gaudiStartDate: true,
  automation6MonthsAgo: true,
  currentAutomation: true,
  targetAutomation12Months: true,
});

export default function Page12() {
  const { form, onSaveFields, isValid } = useFormPage(Page12Schema, "1-2");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="1-2" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">The numbers</h2>
        <p className="text-sm text-muted-foreground">A few data points to anchor your growth story on the site.</p>
      </div>

      <Controller
        name="gaudiStartDate"
        control={control}
        render={({ field }) => (
          <DateInput
            {...field}
            label="When did Gaudi start?"
            name="gaudiStartDate"
            required
            error={errors.gaudiStartDate?.message}
            hint="Approximate is fine — even just a month and year."
          />
        )}
      />

      <Controller
        name="automation6MonthsAgo"
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            label="6 months ago, what % of your workflow was automated?"
            name="automation6MonthsAgo"
            required
            min={0}
            max={100}
            suffix="%"
            error={errors.automation6MonthsAgo?.message}
            placeholder="e.g. 20"
          />
        )}
      />

      <Controller
        name="currentAutomation"
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            label="Where are you today?"
            name="currentAutomation"
            required
            min={0}
            max={100}
            suffix="%"
            error={errors.currentAutomation?.message}
            placeholder="e.g. 65"
          />
        )}
      />

      <Controller
        name="targetAutomation12Months"
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            label="Where do you want to be in 12 months?"
            name="targetAutomation12Months"
            required
            min={0}
            max={100}
            suffix="%"
            error={errors.targetAutomation12Months?.message}
            placeholder="e.g. 90"
          />
        )}
      />
    </FormLayout>
  );
}
