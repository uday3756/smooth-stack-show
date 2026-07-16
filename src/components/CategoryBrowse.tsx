import { motion } from "motion/react";
import { CATEGORIES } from "@/data/services";
import { cn } from "@/lib/utils";

interface CategoryBrowseProps {
  activeCategory: string;
  onSelect: (id: string) => void;
}

/**
 * Per-category accent. Only used on colored surfaces (the gradient icon chip,
 * the hover glow, and the active fill) so text can stay theme-aware and
 * readable on every theme. Full class strings so Tailwind's scanner keeps them.
 */
const ACCENTS: Record<string, { chip: string; glow: string; active: string }> = {
  enrollments: {
    chip: "from-cyan-400 to-emerald-500",
    glow: "hover:shadow-cyan-500/40",
    active: "from-cyan-500 to-emerald-600",
  },
  camps: {
    chip: "from-rose-400 to-pink-600",
    glow: "hover:shadow-pink-500/40",
    active: "from-rose-500 to-pink-600",
  },
  parties: {
    chip: "from-amber-400 to-orange-500",
    glow: "hover:shadow-amber-500/40",
    active: "from-amber-500 to-orange-600",
  },
  products: {
    chip: "from-violet-400 to-purple-600",
    glow: "hover:shadow-violet-500/40",
    active: "from-violet-500 to-purple-600",
  },
};

const FALLBACK = {
  chip: "from-primary to-secondary",
  glow: "hover:shadow-primary/40",
  active: "from-primary to-secondary",
};

export function CategoryBrowse({ activeCategory, onSelect }: CategoryBrowseProps) {
  return (
    <section className="page-surface bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-background sm:text-3xl">
          Browse by Category
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-background/70">
          Pick a category to filter what's on offer.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category.id;
            const a = ACCENTS[category.id] ?? FALLBACK;
            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => onSelect(isActive ? "all" : category.id)}
                aria-pressed={isActive}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "group relative flex flex-col items-center gap-3 rounded-2xl border p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-2xl",
                  a.glow,
                  isActive
                    ? cn("border-transparent bg-gradient-to-br text-white shadow-xl", a.active)
                    : "border-border bg-surface text-foreground hover:border-transparent",
                )}
              >
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-inner transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                    isActive ? "bg-white/20" : cn("bg-gradient-to-br", a.chip),
                  )}
                >
                  {category.icon}
                </span>
                <span className="text-base font-bold tracking-tight">{category.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    isActive ? "bg-white/20 text-white" : "bg-foreground/5 text-muted",
                  )}
                >
                  {category.count} service{category.count === 1 ? "" : "s"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
