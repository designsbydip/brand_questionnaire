"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part1Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page11Schema = Part1Schema.pick({
  originStory: true,
  ahaMoment: true,
  frustrationDescription: true,
});

export default function Page11() {
  const { form, onSaveFields, isValid } = useFormPage(Page11Schema, "1-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="1-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">How it all started</h2>
        <p className="text-sm text-muted-foreground">Every great company has an origin. Tell us yours.</p>
      </div>

      <Controller
        name="originStory"
        control={control}
        render={({ field }) => (
          <TextareaInput
            {...field}
            label="Why does Gaudi exist?"
            name="originStory"
            required
            rows={5}
            maxLength={500}
            error={errors.originStory?.message}
            hint="What gap did you see? What made you decide to build this instead of just talking about it?"
            placeholder="We started Gaudi because structural engineers were spending most of their week on calculations that software should handle..."
          />
        )}
      />

      <Controller
        name="ahaMoment"
        control={control}
        render={({ field }) => (
          <TextareaInput
            {...field}
            label="What was the moment you knew this had to exist?"
            name="ahaMoment"
            required
            rows={4}
            maxLength={300}
            error={errors.ahaMoment?.message}
            hint="The specific moment — a client conversation, a frustrating project, a lightbulb."
            placeholder="It clicked when I watched a senior engineer spend three days redoing a calculation that took the AI 4 minutes..."
          />
        )}
      />

      <Controller
        name="frustrationDescription"
        control={control}
        render={({ field }) => (
          <TextareaInput
            {...field}
            label="What were engineers putting up with before Gaudi?"
            name="frustrationDescription"
            required
            rows={4}
            maxLength={300}
            error={errors.frustrationDescription?.message}
            hint="The more specific, the better — this becomes the 'before' in our story."
            placeholder="Hours of repetitive manual work, version control nightmares, human error on high-stakes calculations..."
          />
        )}
      />
    </FormLayout>
  );
}
