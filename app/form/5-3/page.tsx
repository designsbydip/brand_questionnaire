"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part5Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const JOURNEYS = [
  { key: "journeyJobCandidate" as const, title: "Job Candidate Journey", desc: "Someone looking for a role at Gaudi" },
  { key: "journeyAckSite" as const, title: "AKC Anuv Site Visitor", desc: "Someone coming from the AKC website" },
  { key: "journeyCompetitor" as const, title: "Competitor Site Visitor", desc: "Someone who's just evaluated a competitor" },
];

export default function Page53() {
  const { form, onSaveFields, isValid } = useFormPage(Part5Schema, "5-3");
  const { control, handleSubmit, formState: { errors }, watch, setValue } = form;

  return (
    <FormLayout currentRoute="5-3" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">User Journeys</h2>
        <p className="text-sm text-muted-foreground">Map 3 key visitor types through the website.</p>
      </div>

      {JOURNEYS.map(({ key, title, desc }) => {
        const journey = watch(key) || { landsOn: "", needsToSee: "", convertsAt: "" };
        return (
          <div key={key} className="space-y-3 p-5 border border-border rounded-xl">
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            {(["landsOn", "needsToSee", "convertsAt"] as const).map((field, fi) => (
              <TextareaInput
                key={field}
                label={fi === 0 ? "They land on…" : fi === 1 ? "They need to see…" : "They convert at…"}
                name={`${key}.${field}`}
                rows={2}
                value={journey[field]}
                onChange={(e) => setValue(key, { ...journey, [field]: e.target.value })}
                placeholder={fi === 0 ? "e.g. The Careers page" : fi === 1 ? "e.g. Culture section and team bios" : "e.g. Apply button on a specific role"}
              />
            ))}
          </div>
        );
      })}
    </FormLayout>
  );
}
