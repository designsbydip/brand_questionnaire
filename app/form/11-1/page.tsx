"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { RadioInput } from "@/components/form/RadioInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part11Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const CLARITY_OPTIONS = [
  { value: "prominently_featured", label: "Prominently feature AKC Anuv", description: "Make the relationship a key part of Gaudi's story" },
  { value: "subtle_mention", label: "Subtle mention", description: "Reference AKC Anuv but let Gaudi stand independently" },
  { value: "separate_identity", label: "Fully separate identity", description: "Gaudi stands completely on its own" },
];

const CREDIBILITY_OPTIONS = [
  { value: "strong_credibility", label: "It adds strong credibility", description: "The AKC Anuv brand helps Gaudi be trusted faster" },
  { value: "slight_distraction", label: "It may be a slight distraction", description: "Different audiences — better to let Gaudi stand alone" },
  { value: "neutral", label: "Neutral", description: "Neither strongly helps nor hurts" },
];

export default function Page111() {
  const { form, onSaveFields, isValid } = useFormPage(Part11Schema, "11-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="11-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">AKC Anuv Relationship</h2>
        <p className="text-sm text-muted-foreground">Define how Gaudi&apos;s relationship with AKC Anuv should be communicated.</p>
      </div>

      <Controller name="ackRelationshipClarity" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="How should Gaudi reference its relationship with AKC Anuv?" name="ackRelationshipClarity" required options={CLARITY_OPTIONS} error={errors.ackRelationshipClarity?.message} />
        )}
      />

      <Controller name="ackCredibilityVsDistraction" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="Does the AKC Anuv association add credibility or distraction?" name="ackCredibilityVsDistraction" required options={CREDIBILITY_OPTIONS} error={errors.ackCredibilityVsDistraction?.message} />
        )}
      />
    </FormLayout>
  );
}
