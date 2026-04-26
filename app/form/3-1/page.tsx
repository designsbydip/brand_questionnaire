"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part3Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const VIBE_OPTIONS = [
  { value: "bold_ambitious", label: "Bold & ambitious" },
  { value: "precise_technical", label: "Precise & technical" },
  { value: "innovative_cutting_edge", label: "Innovative & cutting-edge" },
  { value: "reliable_trustworthy", label: "Reliable & trustworthy" },
  { value: "playful_experimental", label: "Playful & experimental" },
  { value: "serious_professional", label: "Serious & professional" },
  { value: "fast_moving_agile", label: "Fast-moving & agile" },
  { value: "thoughtful_deliberate", label: "Thoughtful & deliberate" },
  { value: "futuristic", label: "Futuristic" },
  { value: "grounded_practical", label: "Grounded & practical" },
];

export default function Page31() {
  const { form, onSaveFields, isValid } = useFormPage(Part3Schema, "3-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="3-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">If Gaudi were a person, how would they show up?</h2>
        <p className="text-sm text-muted-foreground">Pick the traits that feel most true. Don&apos;t overthink it.</p>
      </div>

      <Controller name="vibeAttributes" control={control}
        render={({ field }) => (
          <CheckboxInput
            value={field.value || []}
            onChange={field.onChange}
            label="Select attributes that describe Gaudi's personality"
            name="vibeAttributes"
            required
            options={VIBE_OPTIONS}
            error={errors.vibeAttributes?.message}
            hint="Choose at least 3 that feel most authentic to Gaudi"
          />
        )}
      />
    </FormLayout>
  );
}
