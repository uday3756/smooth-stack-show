import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  DEFAULT_HERO_BG,
  DEFAULT_SHAPE,
  DEFAULT_THEME,
  HERO_BG_STORAGE_KEY,
  HERO_CUSTOM_IMAGE_STORAGE_KEY,
  HERO_CUSTOM_VIDEO_STORAGE_KEY,
  SHAPE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  isHeroBgId,
  isShapeId,
  isThemeId,
  type HeroBgId,
  type ShapeId,
  type ThemeId,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: ThemeId;
  shape: ShapeId;
  heroBg: HeroBgId;
  /** Data URL of a photo the visitor uploaded from their device, if any. */
  customHeroImage: string | null;
  /** Data URL of a video the visitor uploaded from their device, if any. */
  customHeroVideo: string | null;
  setTheme: (theme: ThemeId) => void;
  setShape: (shape: ShapeId) => void;
  setHeroBg: (heroBg: HeroBgId) => void;
  /** Returns false when the file was too large to persist across reloads. */
  setCustomHeroImage: (dataUrl: string | null) => boolean;
  /** Returns false when the file was too large to persist across reloads. */
  setCustomHeroVideo: (dataUrl: string | null) => boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function persist(key: string, value: string | null): boolean {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
    return true;
  } catch {
    // Quota exceeded (large video/image) — keep it in memory for this
    // session, but it won't survive a reload.
    return false;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [shape, setShapeState] = useState<ShapeId>(DEFAULT_SHAPE);
  const [heroBg, setHeroBgState] = useState<HeroBgId>(DEFAULT_HERO_BG);
  const [customHeroImage, setCustomHeroImageState] = useState<string | null>(null);
  const [customHeroVideo, setCustomHeroVideoState] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const storedShape = window.localStorage.getItem(SHAPE_STORAGE_KEY);
    const storedHeroBg = window.localStorage.getItem(HERO_BG_STORAGE_KEY);
    const storedCustomImage = window.localStorage.getItem(HERO_CUSTOM_IMAGE_STORAGE_KEY);
    const storedCustomVideo = window.localStorage.getItem(HERO_CUSTOM_VIDEO_STORAGE_KEY);
    if (isThemeId(storedTheme)) setThemeState(storedTheme);
    if (isShapeId(storedShape)) setShapeState(storedShape);
    if (isHeroBgId(storedHeroBg)) setHeroBgState(storedHeroBg);
    if (storedCustomImage) setCustomHeroImageState(storedCustomImage);
    if (storedCustomVideo) setCustomHeroVideoState(storedCustomVideo);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-shape", shape);
  }, [shape]);

  useEffect(() => {
    // "gradient" is a page-wide background: flag it so the content sections
    // become semi-transparent (see styles.css) and the fixed SiteBackground
    // shows through. Other modes (image/video) stay hero-local.
    if (heroBg === "gradient") {
      document.documentElement.setAttribute("data-page-bg", heroBg);
    } else {
      document.documentElement.removeAttribute("data-page-bg");
    }
  }, [heroBg]);

  const setTheme = (next: ThemeId) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  };

  const setShape = (next: ShapeId) => {
    setShapeState(next);
    window.localStorage.setItem(SHAPE_STORAGE_KEY, next);
  };

  const setHeroBg = (next: HeroBgId) => {
    setHeroBgState(next);
    window.localStorage.setItem(HERO_BG_STORAGE_KEY, next);
  };

  const setCustomHeroImage = (dataUrl: string | null) => {
    setCustomHeroImageState(dataUrl);
    return persist(HERO_CUSTOM_IMAGE_STORAGE_KEY, dataUrl);
  };

  const setCustomHeroVideo = (dataUrl: string | null) => {
    setCustomHeroVideoState(dataUrl);
    return persist(HERO_CUSTOM_VIDEO_STORAGE_KEY, dataUrl);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        shape,
        heroBg,
        customHeroImage,
        customHeroVideo,
        setTheme,
        setShape,
        setHeroBg,
        setCustomHeroImage,
        setCustomHeroVideo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
