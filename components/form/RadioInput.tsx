"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioInputProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: any;
  required?: boolean;
  hint?: string;
}

export function RadioInput({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
  hint,
}: RadioInputProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </legend>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-start gap-2.5">
            <RadioGroupItem
              value={opt.value}
              id={`${name}-${opt.value}`}
              className="mt-0.5"
            />
            <Label
              htmlFor={`${name}-${opt.value}`}
              className="cursor-pointer leading-snug"
            >
              <span className="text-sm text-foreground font-normal">{opt.label}</span>
              {opt.description && (
                <span className="block text-xs text-muted-foreground mt-0.5">{opt.description}</span>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </fieldset>
  );
}
