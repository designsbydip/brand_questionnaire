"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { DynamicInput } from "@/components/form/DynamicInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part2Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page22Schema = Part2Schema.pick({
  capabilities: true,
  aiHandles: true,
  humansHandle: true,
  outputTypes: true,
});

const OUTPUT_OPTIONS = [
  { value: "drawings", label: "Structural drawings / blueprints" },
  { value: "calculations", label: "Engineering calculations" },
  { value: "reports", label: "Analysis reports" },
  { value: "models", label: "3D/BIM models" },
  { value: "specifications", label: "Technical specifications" },
  { value: "all", label: "All of the above" },
];

export default function Page22() {
  const { form, onSaveFields, isValid } = useFormPage(Page22Schema, "2-2");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="2-2" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">What Gaudi can do</h2>
        <p className="text-sm text-muted-foreground">What does the AI handle? What do your engineers produce? Let&apos;s be specific.</p>
      </div>

      <Controller name="capabilities" control={control}
        render={({ field }) => (
          <DynamicInput value={field.value || []} onChange={field.onChange} label="What are Gaudi's 5 core capabilities?" name="capabilities" itemLabel="Capability" minItems={3} maxItems={5} placeholder="e.g. Automated load calculations" error={errors.capabilities?.message} hint="List the most important things Gaudi can do" />
        )}
      />

      <Controller name="aiHandles" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="What does AI handle?" name="aiHandles" required rows={3} error={errors.aiHandles?.message} placeholder="e.g. Repetitive calculation loops, data entry, pattern recognition across past projects..." />
        )}
      />

      <Controller name="humansHandle" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="What do humans handle?" name="humansHandle" required rows={3} error={errors.humansHandle?.message} placeholder="e.g. Creative problem solving, client relationships, engineering judgment calls..." />
        )}
      />

      <Controller name="outputTypes" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What types of outputs does Gaudi produce?" name="outputTypes" required options={OUTPUT_OPTIONS} error={errors.outputTypes?.message} />
        )}
      />
    </FormLayout>
  );
}
