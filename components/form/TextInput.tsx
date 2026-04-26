"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: any;
  hint?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, name, error, hint, required, maxLength, className, ...props }, ref) => {
    const value = String(props.value ?? "");
    return (
      <div className="space-y-1.5">
        <Label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        <Input
          id={name}
          name={name}
          ref={ref}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          maxLength={maxLength}
          className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
          {...props}
        />
        <div className="flex justify-between">
          {error && (
            <p id={`${name}-error`} className="text-xs text-red-500">
              {error}
            </p>
          )}
          {maxLength && (
            <p className="text-xs text-muted-foreground ml-auto">
              {value.length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
