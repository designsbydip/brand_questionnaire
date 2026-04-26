"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { DynamicInput } from "@/components/form/DynamicInput";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { RadioInput } from "@/components/form/RadioInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part13Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const VOICE_TONE_OPTIONS = [
  { value: "confident", label: "Confident" },
  { value: "direct", label: "Direct" },
  { value: "precise", label: "Precise" },
  { value: "warm", label: "Warm" },
  { value: "inspiring", label: "Inspiring" },
  { value: "educational", label: "Educational" },
  { value: "visionary", label: "Visionary" },
  { value: "pragmatic", label: "Pragmatic" },
];

const SENTENCE_OPTIONS = [
  { value: "short", label: "Short sentences", description: "Punchy, direct, clear" },
  { value: "long", label: "Longer sentences", description: "More nuanced, detailed explanations" },
  { value: "mixed", label: "Mixed", description: "Varies by context" },
];

const JARGON_OPTIONS = [
  { value: "freely", label: "Use freely", description: "We're talking to engineers who know the language" },
  { value: "sparingly", label: "Use sparingly", description: "Some technical terms, explained in plain language" },
  { value: "avoid", label: "Avoid", description: "Plain language always — accessible to non-engineers" },
];

export default function Page131() {
  const { form, onSaveFields, isValid } = useFormPage(Part13Schema, "13-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="13-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Messaging & Copy</h2>
        <p className="text-sm text-muted-foreground">Define the voice, tone, and key messages for Gaudi&apos;s website copy.</p>
      </div>

      <div className="space-y-4">
        {([
          { name: "message1Complete" as const, label: "Key Message 1 — complete the sentence", placeholder: "Gaudi exists to..." },
          { name: "message2Complete" as const, label: "Key Message 2 — complete the sentence", placeholder: "What makes us different is..." },
          { name: "message3Complete" as const, label: "Key Message 3 — complete the sentence", placeholder: "If there&apos;s one thing visitors should remember, it&apos;s..." },
        ]).map(({ name, label, placeholder }) => (
          <Controller key={name} name={name} control={control}
            render={({ field }) => (
              <TextareaInput {...field} label={label} name={name} required rows={3} error={errors[name]?.message} placeholder={placeholder} />
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Controller name="wordsRight" control={control}
          render={({ field }) => (
            <DynamicInput value={field.value || ["", "", "", "", ""]} onChange={field.onChange} label="5 words that feel right for Gaudi" name="wordsRight" itemLabel="Word" minItems={5} maxItems={5} placeholder="e.g. Precise" error={errors.wordsRight?.message} />
          )}
        />
        <Controller name="wordsAvoid" control={control}
          render={({ field }) => (
            <DynamicInput value={field.value || ["", "", "", "", ""]} onChange={field.onChange} label="5 words to avoid" name="wordsAvoid" itemLabel="Word" minItems={5} maxItems={5} placeholder="e.g. Revolutionary" error={errors.wordsAvoid?.message} />
          )}
        />
      </div>

      <Controller name="voiceToneAttributes" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="Voice and tone attributes" name="voiceToneAttributes" required options={VOICE_TONE_OPTIONS} error={errors.voiceToneAttributes?.message} />
        )}
      />

      <Controller name="sentenceStructure" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="Sentence structure preference" name="sentenceStructure" required options={SENTENCE_OPTIONS} error={errors.sentenceStructure?.message} />
        )}
      />

      <Controller name="jargonLevel" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="Technical jargon level" name="jargonLevel" required options={JARGON_OPTIONS} error={errors.jargonLevel?.message} />
        )}
      />
    </FormLayout>
  );
}
