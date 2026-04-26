"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { SliderInput } from "@/components/form/SliderInput";
import { TextInput } from "@/components/form/TextInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part3Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

export default function Page32() {
  const { form, onSaveFields, isValid } = useFormPage(Part3Schema, "3-2");
  const { control, handleSubmit, formState: { errors }, watch } = form;

  return (
    <FormLayout currentRoute="3-2" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Find the right tone</h2>
        <p className="text-sm text-muted-foreground">Dial in how Gaudi sounds. No wrong answers — trust your instincts.</p>
      </div>

      <div className="space-y-6 p-5 bg-muted/30 rounded-xl border border-border">
        <p className="text-sm font-medium text-foreground">Tone Sliders</p>
        {([
          { name: "toneCasualToProfessional", left: "Casual", right: "Professional" },
          { name: "tonePlayfulToSerious", left: "Playful", right: "Serious" },
          { name: "toneBoldToUnderstated", left: "Bold", right: "Understated" },
          { name: "toneStartupToEnterprise", left: "Startup", right: "Enterprise" },
        ] as const).map(({ name, left, right }) => (
          <Controller key={name} name={name} control={control}
            render={({ field }) => (
              <SliderInput
                label={`${left} ↔ ${right}`}
                name={name}
                leftLabel={left}
                rightLabel={right}
                value={field.value || 4}
                onChange={field.onChange}
                error={errors[name]?.message}
              />
            )}
          />
        ))}
      </div>

      <Controller name="companiesAdmired" control={control}
        render={({ field }) => (
          <TextInput {...field} label="What companies do you admire the brand voice of?" name="companiesAdmired" required error={errors.companiesAdmired?.message} placeholder="e.g. Linear, Stripe, Figma" hint="Separate multiple with commas" />
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Controller name="analogyCar" control={control}
          render={({ field }) => (
            <TextInput {...field} label="If Gaudi were a car, it would be…" name="analogyCar" required error={errors.analogyCar?.message} placeholder="e.g. Tesla Model S" />
          )}
        />
        <Controller name="analogyPerson" control={control}
          render={({ field }) => (
            <TextInput {...field} label="If Gaudi were a person, it would be…" name="analogyPerson" required error={errors.analogyPerson?.message} placeholder="e.g. Elon Musk" />
          )}
        />
        <Controller name="analogyBuilding" control={control}
          render={({ field }) => (
            <TextInput {...field} label="If Gaudi were a building, it would be…" name="analogyBuilding" required error={errors.analogyBuilding?.message} placeholder="e.g. The Shard" />
          )}
        />
      </div>
    </FormLayout>
  );
}
