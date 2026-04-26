"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { DynamicInput } from "@/components/form/DynamicInput";
import { NumberInput } from "@/components/form/NumberInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part12Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const VISITOR_ACTION_OPTIONS = [
  { value: "apply_for_role", label: "Apply for a role" },
  { value: "contact_enquiry", label: "Submit a contact enquiry" },
  { value: "download_case_study", label: "Download a case study" },
  { value: "watch_demo", label: "Watch a demo or video" },
  { value: "explore_capabilities", label: "Explore the capabilities page" },
  { value: "refer_someone", label: "Refer someone else to the site" },
];

export default function Page121() {
  const { form, onSaveFields, isValid } = useFormPage(Part12Schema, "12-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="12-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Success Metrics</h2>
        <p className="text-sm text-muted-foreground">Define what success looks like — both in behaviour and benchmarks.</p>
      </div>

      <Controller name="successVisitorActions" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What actions do you want visitors to take?" name="successVisitorActions" required options={VISITOR_ACTION_OPTIONS} error={errors.successVisitorActions?.message} />
        )}
      />

      <Controller name="primaryConversionGoals" control={control}
        render={({ field }) => (
          <DynamicInput
            value={field.value || ["", "", ""]}
            onChange={field.onChange}
            label="What are your 3 primary conversion goals?"
            name="primaryConversionGoals"
            itemLabel="Goal"
            minItems={3}
            maxItems={3}
            placeholder="e.g. 10 qualified applications per month"
            error={errors.primaryConversionGoals?.message}
          />
        )}
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Benchmark Targets</p>
        <p className="text-xs text-muted-foreground">Estimate what success looks like — leave blank if unsure</p>
        <div className="grid grid-cols-2 gap-4">
          <Controller name="benchmarkCareerVisit" control={control}
            render={({ field }) => <NumberInput {...field} label="Career page visit rate" name="benchmarkCareerVisit" min={0} max={100} suffix="%" error={errors.benchmarkCareerVisit?.message} />}
          />
          <Controller name="benchmarkApplicationRate" control={control}
            render={({ field }) => <NumberInput {...field} label="Application conversion rate" name="benchmarkApplicationRate" min={0} max={100} suffix="%" error={errors.benchmarkApplicationRate?.message} />}
          />
          <Controller name="benchmarkTimeOnSite" control={control}
            render={({ field }) => <NumberInput {...field} label="Avg. time on site" name="benchmarkTimeOnSite" min={0} suffix="sec" error={errors.benchmarkTimeOnSite?.message} />}
          />
          <Controller name="benchmarkPagesPerSession" control={control}
            render={({ field }) => <NumberInput {...field} label="Pages per session" name="benchmarkPagesPerSession" min={0} error={errors.benchmarkPagesPerSession?.message} />}
          />
          <Controller name="benchmarkBounceRate" control={control}
            render={({ field }) => <NumberInput {...field} label="Bounce rate target" name="benchmarkBounceRate" min={0} max={100} suffix="%" error={errors.benchmarkBounceRate?.message} />}
          />
        </div>
      </div>
    </FormLayout>
  );
}
