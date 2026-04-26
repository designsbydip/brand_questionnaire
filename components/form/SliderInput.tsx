"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderInputProps {
  label: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
  error?: any;
  required?: boolean;
}

export function SliderInput({
  label,
  name,
  min = 1,
  max = 7,
  step = 1,
  leftLabel,
  rightLabel,
  value,
  onChange,
  error,
  required,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground w-20 text-right shrink-0">{leftLabel}</span>
        <div className="flex-1">
          <Slider
            id={name}
            min={min}
            max={max}
            step={step}
            value={[value]}
            onValueChange={(vals: number | readonly number[]) => onChange(Array.isArray(vals) ? vals[0] : vals)}
            aria-label={label}
          />
        </div>
        <span className="text-xs text-muted-foreground w-20 shrink-0">{rightLabel}</span>
      </div>
      <div className="flex justify-center">
        <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded text-foreground">
          {value} / {max}
        </span>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
