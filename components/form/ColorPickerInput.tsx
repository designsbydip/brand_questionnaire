"use client";

import { Label } from "@/components/ui/label";

interface ColorPickerInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: any;
  required?: boolean;
  hint?: string;
}

export function ColorPickerInput({
  label,
  name,
  value,
  onChange,
  error,
  required,
  hint,
}: ColorPickerInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="flex items-center gap-3">
        <input
          id={name}
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          aria-required={required}
          className="w-12 h-10 rounded-md border border-border cursor-pointer p-0.5 bg-white"
        />
        <div className="flex items-center gap-2 flex-1">
          <div
            className="w-6 h-6 rounded border border-border shrink-0"
            style={{ backgroundColor: value || "#000000" }}
          />
          <span className="text-sm font-mono text-muted-foreground">{value || "#000000"}</span>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
