import type { ShapeId } from "@/lib/theme";

const PATHS: Record<Exclude<ShapeId, "straight">, string> = {
  wave: "M0,32 C300,96 900,-16 1200,40 L1200,120 L0,120 Z",
  curve: "M0,0 Q600,120 1200,0 L1200,120 L0,120 Z",
  angle: "M0,0 L1200,90 L1200,120 L0,120 Z",
};

interface SectionDividerProps {
  shape: ShapeId;
  fill: string;
  flip?: boolean;
  className?: string;
}

export function SectionDivider({
  shape,
  fill,
  flip = false,
  className = "",
}: SectionDividerProps) {
  if (shape === "straight") {
    return (
      <div
        aria-hidden
        className={`h-px w-full ${className}`}
        style={{ background: "var(--color-border)" }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-16"
      >
        <path d={PATHS[shape]} fill={fill} />
      </svg>
    </div>
  );
}
