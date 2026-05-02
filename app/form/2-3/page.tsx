"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part2Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const Page23Schema = Part2Schema.pick({
  metricsData: true,
  impactEngineers: true,
  impactCompany: true,
  impactClients: true,
  caseStudyExample: true,
});

const METRICS = [
  "Project timeline reduction",
  "Team capacity increase",
  "Calculation time saved",
  "Error rate reduction",
  "Engineer focus improvement",
  "Other",
];

export default function Page23() {
  const { form, onSaveFields, isValid } = useFormPage(Page23Schema, "2-3");
  const { control, handleSubmit, formState: { errors }, watch, setValue } = form;

  const metricsData = watch("metricsData") || METRICS.map((m) => ({ metric: m, before: "", after: "", improvement: "" }));

  return (
    <FormLayout currentRoute="2-3" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Show the before & after</h2>
        <p className="text-sm text-muted-foreground">The numbers that prove Gaudi works. Rough estimates are fine — just be honest.</p>
      </div>

      {/* Metrics table */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Before / After Metrics</p>
        <p className="text-xs text-muted-foreground">Fill in what you know — leave blank if unsure</p>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-0 bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
            <span>Metric</span>
            <span>Before</span>
            <span>After</span>
            <span>Improvement</span>
          </div>
          {METRICS.map((metric, i) => (
            <div key={metric} className="grid grid-cols-4 gap-2 px-4 py-3 border-t border-border items-center">
              <span className="text-xs text-foreground">{metric}</span>
              <input
                className="text-xs border border-border rounded px-2 py-1.5 w-full focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. 5 days"
                value={metricsData[i]?.before || ""}
                onChange={(e) => {
                  const next = [...metricsData];
                  next[i] = { ...next[i], metric, before: e.target.value };
                  setValue("metricsData", next);
                }}
              />
              <input
                className="text-xs border border-border rounded px-2 py-1.5 w-full focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. 4 hours"
                value={metricsData[i]?.after || ""}
                onChange={(e) => {
                  const next = [...metricsData];
                  next[i] = { ...next[i], metric, after: e.target.value };
                  setValue("metricsData", next);
                }}
              />
              <input
                className="text-xs border border-border rounded px-2 py-1.5 w-full focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. 90%"
                value={metricsData[i]?.improvement || ""}
                onChange={(e) => {
                  const next = [...metricsData];
                  next[i] = { ...next[i], metric, improvement: e.target.value };
                  setValue("metricsData", next);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Controller name="impactEngineers" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="How does this impact individual engineers?" name="impactEngineers" required rows={3} error={errors.impactEngineers?.message} placeholder="Engineers can now focus on..." />
        )}
      />

      <Controller name="impactCompany" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="How does it impact the company?" name="impactCompany" required rows={3} error={errors.impactCompany?.message} placeholder="The firm can take on more projects without..." />
        )}
      />

      <Controller name="impactClients" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="How does it impact clients?" name="impactClients" required rows={3} error={errors.impactClients?.message} placeholder="Clients receive deliverables faster with..." />
        )}
      />

      <Controller name="caseStudyExample" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="Share a concrete example or mini case study" name="caseStudyExample" required rows={4} error={errors.caseStudyExample?.message} placeholder="For Project X, Gaudi reduced calculation time from 3 days to 2 hours..." />
        )}
      />
    </FormLayout>
  );
}
