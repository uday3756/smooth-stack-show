export type ThemeId =
  | "default"
  | "sunset"
  | "forest"
  | "midnight"
  | "ocean"
  | "coral"
  | "berry"
  | "cloud"
  | "noir"
  | "snow"
  | "obsidian"
  | "neobrutalist";
export type ShapeId = "straight" | "wave" | "curve" | "angle";
export type HeroBgId = "default" | "image" | "video" | "gradient";

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  swatch: string;
}

export interface ShapeDefinition {
  id: ShapeId;
  label: string;
}

export interface HeroBgDefinition {
  id: HeroBgId;
  label: string;
}

export const THEMES: ThemeDefinition[] = [
  { id: "default", label: "Violet", swatch: "#5b3fd6" },
  { id: "sunset", label: "Sunset", swatch: "#f97316" },
  { id: "forest", label: "Forest", swatch: "#059669" },
  { id: "ocean", label: "Ocean", swatch: "#1C7293" },
  { id: "coral", label: "Coral", swatch: "#F96167" },
  { id: "berry", label: "Berry", swatch: "#db2777" },
  { id: "cloud", label: "Cloud", swatch: "#3B82F6" },
  { id: "midnight", label: "Midnight", swatch: "#7c3aed" },
  { id: "noir", label: "Black", swatch: "#000000" },
  { id: "snow", label: "White", swatch: "#ffffff" },
  { id: "obsidian", label: "Obsidian", swatch: "#ccff00" },
  { id: "neobrutalist", label: "NeoBrutalist", swatch: "#ffe17c" },
];

export const SHAPES: ShapeDefinition[] = [
  { id: "straight", label: "Straight" },
  { id: "wave", label: "Wave" },
  { id: "curve", label: "Curve" },
  { id: "angle", label: "Angle" },
];

export const HERO_BACKGROUNDS: HeroBgDefinition[] = [
  { id: "default", label: "Default" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "gradient", label: "Gradient" },
];

// Palette used by the animated "Gradient" hero background, per theme, so the
// gradient always matches the header/footer colors. Kept in JS (not read from
// CSS vars at runtime) so it is correct on first paint and never lags a theme
// change. Order: base color first, then wave layers.
export const HERO_GRADIENT_COLORS: Record<ThemeId, string[]> = {
  default: ["#5b3fd6", "#7c5cf0", "#22c55e", "#5b3fd6"],
  sunset: ["#f97316", "#f43f5e", "#facc15", "#f97316"],
  forest: ["#059669", "#0d9488", "#84cc16", "#059669"],
  midnight: ["#7c3aed", "#6366f1", "#f472b6", "#7c3aed"],
  ocean: ["#1c7293", "#065a82", "#21295c", "#1c7293"],
  coral: ["#f96167", "#2f3c7e", "#f9a825", "#f96167"],
  berry: ["#db2777", "#a21caf", "#f472b6", "#db2777"],
  cloud: ["#3b82f6", "#1e3a5f", "#f59e0b", "#3b82f6"],
  noir: ["#3f3f46", "#71717a", "#a1a1aa", "#52525b"],
  snow: ["#0a0a0a", "#3f3f46", "#52525b", "#18181b"],
  obsidian: ["#0a0a0a", "#ccff00", "#10b981", "#0a0a0a"],
  neobrutalist: ["#ffe17c", "#171e19", "#ffffff", "#ffe17c"],
};

export const DEFAULT_THEME: ThemeId = "default";
export const DEFAULT_SHAPE: ShapeId = "straight";
export const DEFAULT_HERO_BG: HeroBgId = "image";

export const THEME_STORAGE_KEY = "omnifyhome:theme";
export const SHAPE_STORAGE_KEY = "omnifyhome:shape";
export const HERO_BG_STORAGE_KEY = "omnifyhome:hero-bg";
// Data-URL of a photo/video the visitor uploaded from their own device.
// Stored per-browser only — there is no backend to share it with other visitors.
export const HERO_CUSTOM_IMAGE_STORAGE_KEY = "omnifyhome:hero-bg-custom-image";
export const HERO_CUSTOM_VIDEO_STORAGE_KEY = "omnifyhome:hero-bg-custom-video";

export function isThemeId(value: string | null): value is ThemeId {
  return !!value && THEMES.some((theme) => theme.id === value);
}

export function isShapeId(value: string | null): value is ShapeId {
  return !!value && SHAPES.some((shape) => shape.id === value);
}

export function isHeroBgId(value: string | null): value is HeroBgId {
  return !!value && HERO_BACKGROUNDS.some((bg) => bg.id === value);
}
