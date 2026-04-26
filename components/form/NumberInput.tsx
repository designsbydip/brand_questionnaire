"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  name: string;
  error?: any;
  hint?: string;
  suffix?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, name, error, hint, suffix, required, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        <div className="relative">
          <Input
            id={name}
            name={name}
            type="number"
            ref={ref}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={cn(suffix && "pr-12", error && "border-red-500 focus-visible:ring-red-500", className)}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <p id={`${name}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
