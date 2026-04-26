"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxInputProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: any;
  required?: boolean;
  hint?: string;
}

export function CheckboxInput({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
  hint,
}: CheckboxInputProps) {
  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </legend>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="space-y-2">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2.5">
            <Checkbox
              id={`${name}-${opt.value}`}
              checked={value.includes(opt.value)}
              onCheckedChange={() => toggle(opt.value)}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            <Label
              htmlFor={`${name}-${opt.value}`}
              className="text-sm text-foreground font-normal cursor-pointer"
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </fieldset>
  );
}
