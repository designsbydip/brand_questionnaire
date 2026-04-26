"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { RadioInput } from "@/components/form/RadioInput";
import { SortableRankInput } from "@/components/form/SortableRankInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part4Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const DEPTH_OPTIONS = [
  { value: "subtle", label: "Subtle", description: "Light storytelling — facts and capabilities lead, narrative supports" },
  { value: "deep", label: "Deep", description: "Full narrative — the founding story, mission, and journey are central" },
  { value: "between", label: "Somewhere in between", description: "Balance of storytelling and capability-led messaging" },
];

const HERO_OPTIONS = [
  { value: "what_gaudi_does", label: "What Gaudi does", description: "Clear, direct statement of capabilities" },
  { value: "bold_vision", label: "Bold vision statement", description: "A big-picture statement about the future of engineering" },
  { value: "automation_stats", label: "Automation stats", description: "Lead with impressive numbers" },
  { value: "powerful_visual", label: "Powerful visual", description: "Let a striking animation or visual do the talking" },
];

const SECTION_ITEMS = [
  { id: "what_gaudi_does", label: "What Gaudi does" },
  { id: "problem_we_solve", label: "The problem we solve" },
  { id: "how_it_works", label: "How it works" },
  { id: "automation_stats", label: "Automation stats" },
  { id: "example_outputs", label: "Example outputs" },
  { id: "team_talent", label: "Team / talent focus" },
  { id: "vision_future", label: "Vision / future" },
  { id: "connection_akc", label: "Connection to AKC Anuv" },
];

export default function Page41() {
  const { form, onSaveFields, isValid } = useFormPage(Part4Schema, "4-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="4-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">How do you want the site to tell your story?</h2>
        <p className="text-sm text-muted-foreground">Set the narrative direction — what leads, what supports, what visitors feel first.</p>
      </div>

      <Controller name="storytellingDepth" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="How deep should the storytelling go?" name="storytellingDepth" required options={DEPTH_OPTIONS} error={errors.storytellingDepth?.message} />
        )}
      />

      <Controller name="sectionPriority" control={control}
        render={({ field }) => (
          <SortableRankInput
            label="Rank these website sections by priority (drag to reorder)"
            items={SECTION_ITEMS}
            value={field.value || SECTION_ITEMS.map((i) => i.id)}
            onChange={field.onChange}
            required
            hint="Drag to set priority — most important section at the top"
            error={errors.sectionPriority?.message}
          />
        )}
      />

      <Controller name="heroFocus" control={control}
        render={({ field }) => (
          <RadioInput value={field.value || ""} onChange={field.onChange} label="What should the hero section focus on?" name="heroFocus" required options={HERO_OPTIONS} error={errors.heroFocus?.message} />
        )}
      />
    </FormLayout>
  );
}
