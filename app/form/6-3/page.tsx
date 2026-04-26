"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part6Schema } from "@/lib/validation";

export default function Page63() {
  const { form, onSaveFields, isValid } = useFormPage(Part6Schema, "6-3");
  const { handleSubmit, watch, setValue } = form;

  const objections = watch("objections") || [
    { objection: "", counter: "" },
    { objection: "", counter: "" },
    { objection: "", counter: "" },
  ];

  return (
    <FormLayout currentRoute="6-3" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Objection Handling</h2>
        <p className="text-sm text-muted-foreground">What hesitations might a visitor have — and how does Gaudi address them?</p>
      </div>

      {objections.map((obj: { objection: string; counter: string }, i: number) => (
        <div key={i} className="space-y-3 p-5 border border-border rounded-xl">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Objection {i + 1}</p>
          <TextareaInput
            label="The objection or hesitation"
            name={`objection-${i}`}
            rows={2}
            value={obj.objection}
            onChange={(e) => {
              const next = [...objections];
              next[i] = { ...next[i], objection: e.target.value };
              setValue("objections", next);
            }}
            placeholder='e.g. "We already have engineers doing this manually"'
          />
          <TextareaInput
            label="Gaudi&apos;s counter"
            name={`counter-${i}`}
            rows={2}
            value={obj.counter}
            onChange={(e) => {
              const next = [...objections];
              next[i] = { ...next[i], counter: e.target.value };
              setValue("objections", next);
            }}
            placeholder="e.g. Yes — and now they can focus on the work that actually requires their expertise"
          />
        </div>
      ))}
    </FormLayout>
  );
}
