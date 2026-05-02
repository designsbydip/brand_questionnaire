"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextInput } from "@/components/form/TextInput";
import { RadioInput } from "@/components/form/RadioInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part2Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page21Schema = Part2Schema.pick({
  valuePropAudience: true,
  valuePropOutcome: true,
  valuePropMethod: true,
  valuePropFraming: true,
});

const FRAMING_OPTIONS = [
  { value: "engineer_first", label: "Engineering-first", description: "Lead with technical precision and capability" },
  { value: "outcome_first", label: "Outcome-first", description: "Lead with business results and client impact" },
  { value: "mission_first", label: "Mission-first", description: "Lead with the vision of transforming structural engineering" },
  { value: "human_first", label: "Human-first", description: "Lead with the people — engineers freed to do their best work" },
];

export default function Page21() {
  const { form, onSaveFields, isValid } = useFormPage(Page21Schema, "2-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="2-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">What Gaudi actually does for people</h2>
        <p className="text-sm text-muted-foreground">Help us nail the pitch — who you help, what changes for them, and how Gaudi makes it happen.</p>
      </div>

      <Controller name="valuePropAudience" control={control}
        render={({ field }) => (
          <TextInput {...field} label="Who specifically is Gaudi for?" name="valuePropAudience" required error={errors.valuePropAudience?.message} placeholder="e.g. Structural engineering firms who handle repetitive design calculations" hint="Think: who is your primary customer?" />
        )}
      />

      <Controller name="valuePropOutcome" control={control}
        render={({ field }) => (
          <TextInput {...field} label="What is the primary outcome Gaudi delivers?" name="valuePropOutcome" required error={errors.valuePropOutcome?.message} placeholder="e.g. 10x faster structural analysis with near-zero human error" />
        )}
      />

      <Controller name="valuePropMethod" control={control}
        render={({ field }) => (
          <TextInput {...field} label="How does Gaudi deliver this? (the method)" name="valuePropMethod" required error={errors.valuePropMethod?.message} placeholder="e.g. Through AI-powered automation of repetitive engineering workflows" />
        )}
      />

      <Controller name="valuePropFraming" control={control}
        render={({ field }) => (
          <RadioInput {...field} label="How should we frame Gaudi's story?" name="valuePropFraming" required options={FRAMING_OPTIONS} error={errors.valuePropFraming?.message} />
        )}
      />
    </FormLayout>
  );
}
