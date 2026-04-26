"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface DynamicInputProps {
  label: string;
  name: string;
  itemLabel?: string;
  value: string[];
  onChange: (value: string[]) => void;
  minItems?: number;
  maxItems?: number;
  placeholder?: string;
  error?: any;
  required?: boolean;
  hint?: string;
}

export function DynamicInput({
  label,
  name,
  itemLabel = "Item",
  value,
  onChange,
  minItems = 1,
  maxItems = 10,
  placeholder = "Enter value…",
  error,
  required,
  hint,
}: DynamicInputProps) {
  const items = value.length > 0 ? value : [""];

  const update = (index: number, newVal: string) => {
    const next = [...items];
    next[index] = newVal;
    onChange(next);
  };

  const add = () => {
    if (items.length < maxItems) {
      onChange([...items, ""]);
    }
  };

  const remove = (index: number) => {
    if (items.length > minItems) {
      onChange(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-5 shrink-0 text-right">{i + 1}.</span>
            <Input
              id={`${name}-${i}`}
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`${itemLabel} ${i + 1}`}
              className="flex-1"
              aria-label={`${label} ${i + 1}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(i)}
              disabled={items.length <= minItems}
              className="shrink-0 h-9 w-9 text-muted-foreground hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      {items.length < maxItems && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          className="mt-1 text-xs h-8"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add {itemLabel}
        </Button>
      )}
      <p className="text-xs text-muted-foreground">
        {items.length} of {maxItems} {itemLabel.toLowerCase()}s
      </p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
