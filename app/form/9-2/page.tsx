"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { DynamicInput } from "@/components/form/DynamicInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part9Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

export default function Page92() {
  const { form, onSaveFields, isValid } = useFormPage(Part9Schema, "9-2");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="9-2" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Career Messaging</h2>
        <p className="text-sm text-muted-foreground">Define the unique value Gaudi offers as an employer.</p>
      </div>

      <Controller name="candidateQuestions" control={control}
        render={({ field }) => (
          <DynamicInput
            value={field.value || ["", "", ""]}
            onChange={field.onChange}
            label="What 3 questions should the careers page answer for a candidate?"
            name="candidateQuestions"
            itemLabel="Question"
            minItems={3}
            maxItems={3}
            placeholder="e.g. What does day-to-day work look like?"
            error={errors.candidateQuestions?.message}
          />
        )}
      />

      <Controller name="careerUniqueSelling" control={control}
        render={({ field }) => (
          <DynamicInput
            value={field.value || ["", "", ""]}
            onChange={field.onChange}
            label="What 3 unique selling points make Gaudi a great place to work?"
            name="careerUniqueSelling"
            itemLabel="Point"
            minItems={3}
            maxItems={3}
            placeholder="e.g. You work on genuinely novel technology"
            error={errors.careerUniqueSelling?.message}
          />
        )}
      />

      <Controller name="careerProblemsToSolve" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="What interesting problems will they solve?" name="careerProblemsToSolve" required rows={3} error={errors.careerProblemsToSolve?.message} placeholder="e.g. Teaching AI to interpret structural engineering drawings..." />
        )}
      />

      <Controller name="careerGrowth" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="What does career growth look like at Gaudi?" name="careerGrowth" required rows={3} error={errors.careerGrowth?.message} placeholder="e.g. Engineers move from building tools to leading product lines..." />
        )}
      />
    </FormLayout>
  );
}
