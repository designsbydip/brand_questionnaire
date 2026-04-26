"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part6Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const TRUST_OPTIONS = [
  { value: "client_logos", label: "Client logos" },
  { value: "project_count", label: "Number of projects completed" },
  { value: "accuracy_metrics", label: "Accuracy / error rate metrics" },
  { value: "time_saved", label: "Time saved statistics" },
  { value: "case_studies", label: "Case studies" },
  { value: "team_credentials", label: "Team credentials / bios" },
  { value: "akc_connection", label: "AKC Anuv association" },
  { value: "testimonials", label: "Client testimonials" },
  { value: "certifications", label: "Certifications / awards" },
];

export default function Page64() {
  const { form, onSaveFields, isValid } = useFormPage(Part6Schema, "6-4");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="6-4" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Trust Signals</h2>
        <p className="text-sm text-muted-foreground">What credibility markers should the website show?</p>
      </div>

      <Controller name="trustSignals" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="Select all available trust signals" name="trustSignals" required options={TRUST_OPTIONS} error={errors.trustSignals?.message} />
        )}
      />

      <Controller name="trustSignalsLocation" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="Where should these appear on the site?" name="trustSignalsLocation" required rows={3} error={errors.trustSignalsLocation?.message} placeholder="e.g. Client logos in the hero, metrics on the How It Works page, case studies on a dedicated page..." />
        )}
      />
    </FormLayout>
  );
}
