"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  name: string;
  error?: any;
  hint?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, name, error, hint, required, className, ...props }, ref) => {
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
          type="date"
          ref={ref}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
          {...props}
        />
        {error && (
          <p id={`${name}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";
