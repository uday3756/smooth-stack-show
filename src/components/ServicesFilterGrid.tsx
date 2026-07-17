import { useMemo, useState } from "react";
import { SERVICE_SECTIONS } from "@/data/services";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ServiceCard } from "./ServiceCard";
import { FilterSidebar, type FilterSelection } from "./FilterSidebar";

const FILTERS = [
  { value: "all", label: "All" },
  ...SERVICE_SECTIONS.map((section) => ({
    value: section.id,
    label: section.heading.replace(" & Events", ""),
  })),
];

const ITEMS = SERVICE_SECTIONS.flatMap((section) =>
  section.services.map((service) => ({ service, sectionId: section.id })),
);

type SortId = "featured" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { value: SortId; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name (A–Z)" },
];

const EMPTY_SELECTION: FilterSelection = { sections: [], trainers: [] };

function priceOf(service: (typeof ITEMS)[number]["service"]): number {
  const raw =
    service.type === "enrollment"
      ? service.trialPrice
      : service.type === "camp"
        ? service.priceMin
        : service.fromPrice;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

interface ServicesFilterGridProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export function ServicesFilterGrid({
  filter,
  onFilterChange,
}: ServicesFilterGridProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");
  const [applied, setApplied] = useState<FilterSelection>(EMPTY_SELECTION);

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = ITEMS.filter(({ service, sectionId }) => {
      if (q && !service.title.toLowerCase().includes(q)) return false;
      if (filter !== "all" && sectionId !== filter) return false;
      if (applied.sections.length > 0 && !applied.sections.includes(sectionId))
        return false;
      if (
        applied.trainers.length > 0 &&
        !applied.trainers.includes(service.trainer)
      )
        return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === "price-asc")
      sorted.sort((a, b) => priceOf(a.service) - priceOf(b.service));
    else if (sort === "price-desc")
      sorted.sort((a, b) => priceOf(b.service) - priceOf(a.service));
    else if (sort === "name")
      sorted.sort((a, b) => a.service.title.localeCompare(b.service.title));
    return sorted;
  }, [query, sort, filter, applied]);

  const activeCount = applied.sections.length + applied.trainers.length;

  return (
    <div>
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => value && onFilterChange(value)}
          className="flex-wrap rounded-lg border border-border bg-surface p-1"
        >
          {FILTERS.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className="px-4 font-medium text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md hover:bg-primary/10 hover:text-foreground transition-colors"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
        <FilterSidebar
          className="lg:sticky lg:top-24 lg:w-64 lg:shrink-0"
          applied={applied}
          onApply={setApplied}
          onClear={() => setApplied(EMPTY_SELECTION)}
        />

        <div className="min-w-0 flex-1">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search services</span>
              <span
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden
              >
                🔍
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services…"
                className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </label>
            <label className="sm:w-56">
              <span className="sr-only">Sort services</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {activeCount > 0 && (
            <p className="mt-4 text-sm text-muted">
              Showing {visibleItems.length}{" "}
              {visibleItems.length === 1 ? "result" : "results"} for{" "}
              {activeCount} active {activeCount === 1 ? "filter" : "filters"}.
            </p>
          )}

          <FlipReveal
            keys={[
              filter,
              query,
              sort,
              applied.sections.join(","),
              applied.trainers.join(","),
            ]}
            showClass="flex"
            hideClass="hidden"
            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {visibleItems.map(({ service, sectionId }) => (
              <FlipRevealItem
                key={service.id}
                flipKey={sectionId}
                className="w-full"
              >
                <ServiceCard service={service} />
              </FlipRevealItem>
            ))}
          </FlipReveal>

          {visibleItems.length === 0 && (
            <p className="mt-10 text-center text-sm text-muted">
              No services match your filters. Try clearing some or searching
              differently.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
