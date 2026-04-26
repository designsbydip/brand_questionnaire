"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Label } from "@/components/ui/label";
import { GripVertical } from "lucide-react";

interface SortableItem {
  id: string;
  label: string;
}

interface SortableRankInputProps {
  label: string;
  items: SortableItem[];
  value: string[]; // ordered list of ids
  onChange: (value: string[]) => void;
  error?: any;
  required?: boolean;
  hint?: string;
}

function SortableRow({ id, label, rank }: { id: string; label: string; rank: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-white border border-border rounded-lg px-3 py-2.5 select-none"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing focus:outline-none"
        aria-label={`Drag to reorder ${label}`}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="text-xs font-medium text-muted-foreground w-5 shrink-0">{rank}</span>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );
}

export function SortableRankInput({
  label,
  items,
  value,
  onChange,
  error,
  required,
  hint,
}: SortableRankInputProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Build ordered list from value (ids) mapping to items
  const orderedIds = value.length > 0 ? value : items.map((i) => i.id);
  const orderedItems = orderedIds
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean) as SortableItem[];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = orderedIds.indexOf(String(active.id));
      const newIndex = orderedIds.indexOf(String(over.id));
      onChange(arrayMove(orderedIds, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-1.5">
            {orderedItems.map((item, i) => (
              <SortableRow key={item.id} id={item.id} label={item.label} rank={i + 1} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <p className="text-xs text-muted-foreground">Drag to reorder by priority (1 = highest)</p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
