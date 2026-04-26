"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextInput } from "@/components/form/TextInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part14Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const RAPID_FIRE = [
  { name: "gaudiOneWord" as const, label: "Describe Gaudi in one word", placeholder: "e.g. Precision" },
  { name: "visitorFeeling" as const, label: "How should a visitor feel when they first land on the site?", placeholder: "e.g. Impressed and intrigued" },
  { name: "firstThought" as const, label: "What&apos;s the first thought you want them to have?", placeholder: "e.g. \"This is the future of engineering\"" },
  { name: "misconception" as const, label: "What&apos;s the biggest misconception about Gaudi you want to dispel?", placeholder: "e.g. That AI will replace engineers" },
  { name: "mostExciting" as const, label: "What&apos;s most exciting about Gaudi right now?", placeholder: "e.g. The speed at which we keep shipping new capabilities" },
  { name: "superpower" as const, label: "Gaudi&apos;s superpower in one sentence", placeholder: "e.g. We turn weeks of engineering work into hours" },
  { name: "fiveYearVision" as const, label: "Where will Gaudi be in 5 years?", placeholder: "e.g. The standard automation layer for every structural firm in the region" },
  { name: "techcrunchHeadline" as const, label: "Write the TechCrunch headline about Gaudi", placeholder: "e.g. Gaudi raises $X to automate 90% of structural engineering calculations" },
];

export default function Page141() {
  const { form, onSaveFields, isValid } = useFormPage(Part14Schema, "14-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="14-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Rapid-Fire</h2>
        <p className="text-sm text-muted-foreground">Quick impressions — answer instinctively, don&apos;t overthink these.</p>
      </div>

      <div className="space-y-5">
        {RAPID_FIRE.map(({ name, label, placeholder }) => (
          <Controller key={name} name={name} control={control}
            render={({ field }) => (
              <TextInput {...field} label={label} name={name} required error={errors[name]?.message as string | undefined} placeholder={placeholder} />
            )}
          />
        ))}
      </div>
    </FormLayout>
  );
}
