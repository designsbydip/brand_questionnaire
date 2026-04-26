"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { TextInput } from "@/components/form/TextInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { RadioInput } from "@/components/form/RadioInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part9Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const EXPERIENCE_OPTIONS = [
  { value: "junior", label: "Junior (0–2 years)" },
  { value: "mid", label: "Mid-level (2–5 years)" },
  { value: "senior", label: "Senior (5+ years)" },
  { value: "all_levels", label: "All levels" },
];

const MOTIVATION_OPTIONS = [
  { value: "cutting_edge_tech", label: "Working with cutting-edge technology" },
  { value: "career_growth", label: "Fast career growth" },
  { value: "impact", label: "Making a real impact" },
  { value: "learning", label: "Continuous learning" },
  { value: "team_culture", label: "Great team culture" },
  { value: "remote_flexibility", label: "Remote / flexibility" },
  { value: "compensation", label: "Competitive compensation" },
];

export default function Page91() {
  const { form, onSaveFields, isValid } = useFormPage(Part9Schema, "9-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="9-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Candidate Profile</h2>
        <p className="text-sm text-muted-foreground">Help us understand who you want to attract to Gaudi.</p>
      </div>

      <Controller name="candidateExperienceLevel" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="What experience level are you primarily targeting?" name="candidateExperienceLevel" required options={EXPERIENCE_OPTIONS} error={errors.candidateExperienceLevel?.message} />
        )}
      />

      <Controller name="candidateTechnicalSkills" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="What technical skills are required?" name="candidateTechnicalSkills" required rows={3} error={errors.candidateTechnicalSkills?.message} placeholder="e.g. Structural engineering degree, Python scripting, BIM experience..." />
        )}
      />

      <Controller name="candidateNiceToHave" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="Nice-to-haves?" name="candidateNiceToHave" required rows={3} error={errors.candidateNiceToHave?.message} placeholder="e.g. Experience with automation tools, interest in AI..." />
        )}
      />

      <Controller name="candidateCultureFit" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="What cultural fit qualities matter most?" name="candidateCultureFit" required rows={3} error={errors.candidateCultureFit?.message} placeholder="e.g. Self-starter, comfortable with ambiguity, excited by technology..." />
        )}
      />

      <Controller name="candidateMotivations" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What motivates your ideal candidate?" name="candidateMotivations" required options={MOTIVATION_OPTIONS} error={errors.candidateMotivations?.message} />
        )}
      />
    </FormLayout>
  );
}
