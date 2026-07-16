"use client";
import { GradientWave } from "@/components/ui/gradient-wave";
import { useTheme } from "@/components/ThemeProvider";
import { HERO_GRADIENT_COLORS, type ThemeId } from "@/lib/theme";

/**
 * Page-wide animated background. Rendered as a fixed layer behind the whole
 * site (all sections + footer). Only active when the "Gradient" background is
 * selected in the 🎨 panel; the content sections become semi-transparent (see
 * the `[data-page-bg]` rules in styles.css) so this shows through everywhere
 * while keeping text readable.
 */
export function SiteBackground() {
  const { heroBg, theme } = useTheme();
  if (heroBg !== "gradient") return null;

  const colors = HERO_GRADIENT_COLORS[theme as ThemeId] ?? HERO_GRADIENT_COLORS.default;

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <GradientWave colors={colors} />
    </div>
  );
}
