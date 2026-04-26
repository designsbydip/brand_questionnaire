"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { TextInput } from "@/components/form/TextInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { useFormPage } from "@/hooks/useFormPage";
import { Part6Schema } from "@/lib/validation";
import { Controller } from "react-hook-form";

export default function Page62() {
  const { form, onSaveFields, isValid } = useFormPage(Part6Schema, "6-2");
  const { control, handleSubmit, formState: { errors } } = form;

  return (
    <FormLayout currentRoute="6-2" onSaveFields={onSaveFields} handleSubmit={handleSubmit as never} isValid={isValid}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">CTA Messaging</h2>
        <p className="text-sm text-muted-foreground">Write the call-to-action copy for key sections of the site.</p>
      </div>

      <div className="space-y-6 p-5 border border-border rounded-xl">
        <p className="text-sm font-semibold text-foreground">Careers CTAs</p>
        <Controller name="ctaCareersButton" control={control}
          render={({ field }) => (
            <TextInput {...field} label="Button text" name="ctaCareersButton" required error={errors.ctaCareersButton?.message} placeholder="e.g. View Open Roles" />
          )}
        />
        <Controller name="ctaCareersSupporting" control={control}
          render={({ field }) => (
            <TextareaInput {...field} label="Supporting line below the button" name="ctaCareersSupporting" required rows={2} error={errors.ctaCareersSupporting?.message} placeholder="e.g. Join a team building the future of structural engineering" />
          )}
        />
      </div>

      <div className="space-y-6 p-5 border border-border rounded-xl">
        <p className="text-sm font-semibold text-foreground">Contact CTAs</p>
        <Controller name="ctaContactButton" control={control}
          render={({ field }) => (
            <TextInput {...field} label="Button text" name="ctaContactButton" required error={errors.ctaContactButton?.message} placeholder="e.g. Get in Touch" />
          )}
        />
        <Controller name="ctaContactSupporting" control={control}
          render={({ field }) => (
            <TextareaInput {...field} label="Supporting line below the button" name="ctaContactSupporting" required rows={2} error={errors.ctaContactSupporting?.message} placeholder="e.g. Whether you have a project in mind or just want to learn more" />
          )}
        />
      </div>
    </FormLayout>
  );
}
