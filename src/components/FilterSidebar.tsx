import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SERVICE_SECTIONS, TRAINERS } from "@/data/services";

const SERVICE_OPTIONS = SERVICE_SECTIONS.map((section) => ({
  value: section.id,
  label: section.heading,
}));

export interface FilterSelection {
  sections: string[];
  trainers: string[];
}

interface FilterSidebarProps {
  /** Currently applied selection, used to seed the draft when it changes. */
  applied: FilterSelection;
  onApply: (selection: FilterSelection) => void;
  onClear: () => void;
  className?: string;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function FilterSidebar({
  applied,
  onApply,
  onClear,
  className,
}: FilterSidebarProps) {
  const [draftSections, setDraftSections] = useState<string[]>(applied.sections);
  const [draftTrainers, setDraftTrainers] = useState<string[]>(applied.trainers);

  const handleClear = () => {
    setDraftSections([]);
    setDraftTrainers([]);
    onClear();
  };

  const handleApply = () => {
    onApply({ sections: draftSections, trainers: draftTrainers });
  };

  const dirty =
    draftSections.length !== applied.sections.length ||
    draftTrainers.length !== applied.trainers.length ||
    draftSections.some((s) => !applied.sections.includes(s)) ||
    draftTrainers.some((t) => !applied.trainers.includes(t));

  return (
    <aside
      className={`flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm ${className ?? ""}`}
    >
      <div className="flex items-center justify-between px-5 pb-4 pt-5">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          Filters
        </h3>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:bg-primary/10 hover:text-foreground"
        >
          Clear Filters
        </button>
      </div>

      <div className="border-t border-border px-5 py-4">
        <h4 className="mb-3 text-sm font-bold text-foreground">Services</h4>
        <ul className="space-y-2.5">
          {SERVICE_OPTIONS.map((option) => {
            const id = `svc-${option.value}`;
            return (
              <li key={option.value} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={draftSections.includes(option.value)}
                  onCheckedChange={() =>
                    setDraftSections((prev) => toggle(prev, option.value))
                  }
                />
                <label
                  htmlFor={id}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {option.label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border px-5 py-4">
        <h4 className="mb-3 text-sm font-bold text-foreground">Trainer</h4>
        <ul className="space-y-2.5">
          {TRAINERS.map((trainer) => {
            const id = `trn-${trainer}`;
            return (
              <li key={trainer} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={draftTrainers.includes(trainer)}
                  onCheckedChange={() =>
                    setDraftTrainers((prev) => toggle(prev, trainer))
                  }
                />
                <label
                  htmlFor={id}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {trainer}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={handleApply}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.01] hover:bg-primary/90"
        >
          Apply{dirty ? " •" : ""}
        </button>
      </div>
    </aside>
  );
}
