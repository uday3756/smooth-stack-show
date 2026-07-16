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

// Palette for the animated Gradient hero background — monochrome variations
// of each theme's single skin color so the gradient stays on-brand and the
// foreground text (contrast color) remains readable over every layer.
export const HERO_GRADIENT_COLORS: Record<ThemeId, string[]> = {
  default:      ["#5b3fd6", "#4e36bd", "#7a63e3", "#3d2a99"],
  sunset:       ["#f97316", "#e0630a", "#fb8434", "#c15208"],
  forest:       ["#059669", "#04835a", "#14a679", "#036a49"],
  midnight:     ["#4c1d95", "#3d177a", "#5b23ad", "#2e1160"],
  ocean:        ["#1c7293", "#155e7c", "#2183a8", "#0f4a63"],
  coral:        ["#f96167", "#e04a50", "#fa7379", "#c93b41"],
  berry:        ["#db2777", "#c01865", "#e63d87", "#9c1354"],
  cloud:        ["#3b82f6", "#2c6dd8", "#5091f7", "#1e5bb8"],
  noir:         ["#000000", "#0f0f0f", "#1a1a1a", "#050505"],
  snow:         ["#ffffff", "#f0f0f0", "#e2e2e2", "#f8f8f8"],
  obsidian:     ["#0a0a0a", "#141414", "#1c1c1c", "#050505"],
  neobrutalist: ["#ffe17c", "#f5d260", "#fff2c0", "#e5c247"],
};

export const DEFAULT_THEME: ThemeId = "snow";
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
