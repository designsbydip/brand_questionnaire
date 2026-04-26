"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { NumberInput } from "@/components/form/NumberInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part8Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const ASSET_OPTIONS = [
  { value: "sample_reports", label: "Sample engineering reports" },
  { value: "accuracy_metrics", label: "Accuracy metrics data" },
  { value: "blueprints", label: "Blueprints / drawings created by Gaudi" },
  { value: "case_studies", label: "Written case studies" },
  { value: "client_testimonials", label: "Client testimonials" },
  { value: "demo_video", label: "Demo video / walkthrough" },
  { value: "before_after_data", label: "Before/after comparison data" },
  { value: "team_photos", label: "Team photos" },
  { value: "none", label: "None yet — need to create these" },
];

export default function Page81() {
  const { form, onSaveFields, isValid } = useFormPage(Part8Schema, "8-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="8-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Proof & Credibility</h2>
        <p className="text-sm text-muted-foreground">Share the evidence that backs up Gaudi&apos;s claims.</p>
      </div>

      <Controller name="availableAssets" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What proof assets do you currently have?" name="availableAssets" required options={ASSET_OPTIONS} error={errors.availableAssets?.message} />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller name="projectsAutomated" control={control}
          render={({ field }) => <NumberInput {...field} label="Projects automated" name="projectsAutomated" required min={0} error={errors.projectsAutomated?.message} placeholder="e.g. 150" />}
        />
        <Controller name="hoursSavedPerProject" control={control}
          render={({ field }) => <NumberInput {...field} label="Hours saved per project" name="hoursSavedPerProject" required min={0} suffix="hrs" error={errors.hoursSavedPerProject?.message} placeholder="e.g. 12" />}
        />
        <Controller name="accuracyImprovement" control={control}
          render={({ field }) => <NumberInput {...field} label="Accuracy improvement" name="accuracyImprovement" required min={0} max={100} suffix="%" error={errors.accuracyImprovement?.message} placeholder="e.g. 95" />}
        />
        <Controller name="currentAutomationPercent" control={control}
          render={({ field }) => <NumberInput {...field} label="Current automation %" name="currentAutomationPercent" required min={0} max={100} suffix="%" error={errors.currentAutomationPercent?.message} placeholder="e.g. 70" />}
        />
        <Controller name="targetAutomationPercent" control={control}
          render={({ field }) => <NumberInput {...field} label="Target automation %" name="targetAutomationPercent" required min={0} max={100} suffix="%" error={errors.targetAutomationPercent?.message} placeholder="e.g. 90" />}
        />
        <Controller name="teamSize" control={control}
          render={({ field }) => <NumberInput {...field} label="Team size" name="teamSize" required min={1} error={errors.teamSize?.message} placeholder="e.g. 8" />}
        />
      </div>
    </FormLayout>
  );
}
