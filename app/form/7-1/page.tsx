"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { RadioInput } from "@/components/form/RadioInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part7Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const TRANSPARENCY_OPTIONS = [
  { value: "full_transparency", label: "Full transparency", description: "Explain exactly what AI does and how" },
  { value: "outcome_focused", label: "Outcome-focused", description: "Lead with results, mention AI as the method" },
  { value: "tool_agnostic", label: "Tool-agnostic", description: "Focus on automation without labelling it 'AI'" },
];

const PROPRIETARY_OPTIONS = [
  { value: "proprietary", label: "Proprietary", description: "Gaudi has built its own unique systems" },
  { value: "open_source", label: "Open-source based", description: "Built on open-source foundations with customisation" },
  { value: "hybrid", label: "Hybrid", description: "Mix of proprietary and open-source tools" },
];

const FRAMING_OPTIONS = [
  { value: "human_led_ai_powered", label: "Human-led, AI-powered", description: "Engineers are in charge; AI amplifies them" },
  { value: "ai_first", label: "AI-first", description: "AI is the core; humans guide the output" },
  { value: "partnership", label: "Partnership model", description: "Equal collaboration between human and AI" },
  { value: "augmentation", label: "Augmentation", description: "AI extends what engineers can do" },
];

export default function Page71() {
  const { form, onSaveFields, isValid } = useFormPage(Part7Schema, "7-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="7-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Technical Positioning</h2>
        <p className="text-sm text-muted-foreground">How should Gaudi communicate about its technology stack?</p>
      </div>

      <Controller name="aiTransparencyLevel" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="How transparent should we be about AI?" name="aiTransparencyLevel" required options={TRANSPARENCY_OPTIONS} error={errors.aiTransparencyLevel?.message} />
        )}
      />

      <Controller name="proprietaryVsOpen" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="Is Gaudi's tech proprietary or open-source?" name="proprietaryVsOpen" required options={PROPRIETARY_OPTIONS} error={errors.proprietaryVsOpen?.message} />
        )}
      />

      <Controller name="humanAiFraming" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="How should we frame the human + AI relationship?" name="humanAiFraming" required options={FRAMING_OPTIONS} error={errors.humanAiFraming?.message} />
        )}
      />
    </FormLayout>
  );
}
