"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { RadioInput } from "@/components/form/RadioInput";
import { SliderInput } from "@/components/form/SliderInput";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { ColorPickerInput } from "@/components/form/ColorPickerInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part10Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const HERO_ANIMATION_OPTIONS = [
  { value: "structural_lines", label: "Structural engineering lines animating in", description: "Blueprint-style lines building the structure" },
  { value: "data_flow", label: "Data flowing into a model", description: "Abstract data particles forming a structure" },
  { value: "before_after", label: "Before/after transformation", description: "Side-by-side showing manual vs automated" },
  { value: "minimal_motion", label: "Minimal motion / static", description: "Clean, professional — no heavy animation" },
];

const COLOR_TEMP_OPTIONS = [
  { value: "cool", label: "Cool", description: "Blues, greys, crisp whites — technical feel" },
  { value: "warm", label: "Warm", description: "Warmer neutrals — more human and approachable" },
  { value: "neutral", label: "Neutral", description: "Pure black/white/grey — timeless and precise" },
];

const IMAGERY_OPTIONS = [
  { value: "engineering_drawings", label: "Engineering drawings / blueprints" },
  { value: "real_team_photos", label: "Real team photos" },
  { value: "abstract_data_viz", label: "Abstract data visualisation" },
  { value: "output_examples", label: "Example outputs from Gaudi" },
  { value: "office_environment", label: "Office / work environment" },
  { value: "people_at_work", label: "Engineers at work" },
];

export default function Page101() {
  const { form, onSaveFields, isValid } = useFormPage(Part10Schema, "10-1");
  const { control, handleSubmit, formState: { errors }, watch } = form;

  return (
    <FormLayout currentRoute="10-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Visual Direction</h2>
        <p className="text-sm text-muted-foreground">Set the visual personality and aesthetic direction for the website.</p>
      </div>

      <Controller name="heroAnimationStyle" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="What style of hero animation feels right?" name="heroAnimationStyle" required options={HERO_ANIMATION_OPTIONS} error={errors.heroAnimationStyle?.message} />
        )}
      />

      <Controller name="colorTemperature" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="What colour temperature fits Gaudi?" name="colorTemperature" required options={COLOR_TEMP_OPTIONS} error={errors.colorTemperature?.message} />
        )}
      />

      <Controller name="primaryAccentColor" control={control}
        render={({ field }) => (
          <ColorPickerInput value={field.value || "#000000"} onChange={field.onChange} label="Pick a primary accent colour for Gaudi" name="primaryAccentColor" required error={errors.primaryAccentColor?.message} hint="This will be used for CTAs, highlights, and key UI elements" />
        )}
      />

      <Controller name="visualEnergy" control={control}
        render={({ field }) => (
          <SliderInput value={field.value || 4} onChange={field.onChange} label="Visual energy level" name="visualEnergy" leftLabel="Calm" rightLabel="Dynamic" error={errors.visualEnergy?.message} />
        )}
      />

      <Controller name="imageryStyles" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What imagery styles work for Gaudi?" name="imageryStyles" required options={IMAGERY_OPTIONS} error={errors.imageryStyles?.message} />
        )}
      />
    </FormLayout>
  );
}
