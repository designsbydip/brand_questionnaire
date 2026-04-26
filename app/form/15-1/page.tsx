"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextareaInput } from "@/components/form/TextareaInput";
import { CheckboxInput } from "@/components/form/CheckboxInput";
import { TextInput } from "@/components/form/TextInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part15Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

const EXISTING_CONTENT_OPTIONS = [
  { value: "project_photos", label: "Project photos or renders" },
  { value: "case_study_documents", label: "Case study documents" },
  { value: "company_profile", label: "Company profile / pitch deck" },
  { value: "engineering_reports", label: "Engineering reports" },
  { value: "team_bios", label: "Team bios or CVs" },
  { value: "video_footage", label: "Video footage" },
  { value: "existing_website", label: "Existing website copy" },
  { value: "brand_guidelines", label: "Brand guidelines" },
];

const CONTENT_TO_CREATE_OPTIONS = [
  { value: "case_studies", label: "Case studies (need writing)" },
  { value: "technical_copy", label: "Technical capability copy" },
  { value: "careers_copy", label: "Careers page copy" },
  { value: "team_bios", label: "Team bios" },
  { value: "how_it_works", label: "How It Works content" },
  { value: "blog_posts", label: "Blog / thought leadership posts" },
];

export default function Page151() {
  const { form, onSaveFields, isValid } = useFormPage(Part15Schema, "15-1");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="15-1" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Final Thoughts</h2>
        <p className="text-sm text-muted-foreground">A few last questions before we wrap up. Almost there!</p>
      </div>

      <Controller name="existingContentAssets" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What content assets do you already have?" name="existingContentAssets" options={EXISTING_CONTENT_OPTIONS} />
        )}
      />

      <Controller name="contentStorageLocation" control={control}
        render={({ field }) => (
          <TextInput {...field} label="Where is existing content stored?" name="contentStorageLocation" error={errors.contentStorageLocation?.message} placeholder="e.g. Google Drive, Dropbox, email..." hint="Optional — so we know where to look" />
        )}
      />

      <Controller name="contentToCreate" control={control}
        render={({ field }) => (
          <CheckboxInput value={field.value || []} onChange={field.onChange} label="What content will we need to create from scratch?" name="contentToCreate" options={CONTENT_TO_CREATE_OPTIONS} />
        )}
      />

      <Controller name="competitorsReferences" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="Are there any competitor sites or references you like?" name="competitorsReferences" rows={3} error={errors.competitorsReferences?.message} placeholder="e.g. linear.app for its animations, stripe.com for its clarity..." hint="Optional — helpful but not required" />
        )}
      />

      <Controller name="otherNotes" control={control}
        render={({ field }) => (
          <TextareaInput {...field} label="Anything else we should know?" name="otherNotes" rows={4} error={errors.otherNotes?.message} placeholder="Any additional context, concerns, preferences, or thoughts..." hint="Optional — a catch-all for anything we might have missed" />
        )}
      />
    </FormLayout>
  );
}
