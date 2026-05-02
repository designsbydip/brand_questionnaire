"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextInput } from "@/components/form/TextInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { NumberInput } from "@/components/form/NumberInput";
import { RadioInput } from "@/components/form/RadioInput";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { DynamicInput } from "@/components/form/DynamicInput";
import { Button } from "@/components/ui/button";
import { useFormPage } from "@/hooks/useFormPage";
import { Part9Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

const Page93Schema = Part9Schema.pick({
  officeLocation: true,
  remotePolicy: true,
  careerTeamSize: true,
  careerVibe: true,
  careerPerks: true,
  openRoles: true,
  noOpeningsHandling: true,
});

const REMOTE_OPTIONS = [
  { value: "Full Remote", label: "Full Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
];

const NO_OPENINGS_OPTIONS = [
  { value: "join_talent_pool", label: "Join a talent pool / register interest" },
  { value: "follow_linkedin", label: "Follow Gaudi on LinkedIn" },
  { value: "check_back", label: "Check back later" },
  { value: "reach_out_direct", label: "Reach out directly" },
];

export default function Page93() {
  const { form, onSaveFields, isValid } = useFormPage(Page93Schema, "9-3");
  const { control, handleSubmit, formState: { errors }, watch, setValue } = form;

  const openRoles = watch("openRoles") || [{ role: "", level: "", skills: "" }];

  return (
    <FormLayout currentRoute="9-3" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Open Roles & Logistics</h2>
        <p className="text-sm text-muted-foreground">List current openings and working conditions.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller name="officeLocation" control={control}
          render={({ field }) => <TextInput {...field} label="Office location" name="officeLocation" required error={errors.officeLocation?.message} placeholder="e.g. Dubai, UAE" />}
        />
        <Controller name="remotePolicy" control={control}
          render={({ field }) => (
            <RadioInput value={field.value || ""} onChange={field.onChange} label="Remote policy" name="remotePolicy" required options={REMOTE_OPTIONS} error={errors.remotePolicy?.message} />
          )}
        />
        <Controller name="careerTeamSize" control={control}
          render={({ field }) => <NumberInput {...field} label="Current team size" name="careerTeamSize" required min={1} error={errors.careerTeamSize?.message} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Controller name="careerVibe" control={control}
          render={({ field }) => <TextInput {...field} label="Team vibe in one sentence" name="careerVibe" required error={errors.careerVibe?.message} placeholder="e.g. Fast, focused engineers who love what they build" />}
        />
        <Controller name="careerPerks" control={control}
          render={({ field }) => <TextareaInput {...field} label="Key perks and benefits" name="careerPerks" required rows={3} error={errors.careerPerks?.message} placeholder="e.g. Flexible hours, learning budget, equity..." />}
        />
      </div>

      {/* Open roles */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Current Open Roles</p>
        {openRoles.map((role: { role: string; level: string; skills: string }, i: number) => (
          <div key={i} className="grid grid-cols-3 gap-3 p-4 border border-border rounded-lg items-start">
            <input className="text-xs border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-black" placeholder="Role title" value={role.role} onChange={(e) => { const n = [...openRoles]; n[i] = { ...n[i], role: e.target.value }; setValue("openRoles", n); }} />
            <input className="text-xs border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-black" placeholder="Level" value={role.level} onChange={(e) => { const n = [...openRoles]; n[i] = { ...n[i], level: e.target.value }; setValue("openRoles", n); }} />
            <div className="flex gap-2">
              <input className="text-xs border border-border rounded px-2 py-1.5 flex-1 focus:outline-none focus:ring-1 focus:ring-black" placeholder="Key skills" value={role.skills} onChange={(e) => { const n = [...openRoles]; n[i] = { ...n[i], skills: e.target.value }; setValue("openRoles", n); }} />
              <Button type="button" variant="ghost" size="icon" onClick={() => setValue("openRoles", openRoles.filter((_: unknown, idx: number) => idx !== i))} className="h-8 w-8 text-muted-foreground hover:text-red-500 shrink-0">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => setValue("openRoles", [...openRoles, { role: "", level: "", skills: "" }])} className="text-xs h-8">
          <Plus className="h-3 w-3 mr-1" /> Add Role
        </Button>
      </div>

      <Controller name="noOpeningsHandling" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="If there are no openings, what should visitors do?" name="noOpeningsHandling" required options={NO_OPENINGS_OPTIONS} error={errors.noOpeningsHandling?.message} />
        )}
      />
    </FormLayout>
  );
}
