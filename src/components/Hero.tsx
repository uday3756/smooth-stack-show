import { useState } from "react";
import { SITE } from "@/data/nav";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useTheme } from "@/components/ThemeProvider";
import type { HeroBgId } from "@/lib/theme";
import heroPhoto from "@/assets/intro/1.jpg.asset.json";

/**
 * Sources for the Hero background. The mode (default / image / video) is
 * chosen live from the theme customizer (the 🎨 panel → "Hero background"),
 * which also lets a visitor upload their own photo/video from their device
 * (saved to their browser only — see ThemeProvider).
 *
 * These are the fallbacks used when nothing has been uploaded:
 * PHOTO: swap the import above (`2.jpg.asset.json` … `6.jpg.asset.json`) to
 *        use a different gym photo, or point at any uploaded asset's `url`.
 * VIDEO: drop a file in `public/` (served at "/<filename>") and set
 *        HERO_VIDEO_SRC below, or point it at an uploaded asset url. Until a
 *        real video exists the "Video" option falls back to the brand color.
 */
const HERO_IMAGE_SRC = heroPhoto.url;
const HERO_VIDEO_SRC = "/hero-video.mp4";

type HeroBackground =
  | { type: "color" }
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

function resolveBackground(
  mode: HeroBgId,
  customImage: string | null,
  customVideo: string | null,
): HeroBackground {
  switch (mode) {
    case "image":
      return { type: "image", src: customImage ?? HERO_IMAGE_SRC };
    case "video":
      return {
        type: "video",
        src: customVideo ?? HERO_VIDEO_SRC,
        poster: customImage ?? HERO_IMAGE_SRC,
      };
    // "gradient" is a page-wide background handled by <SiteBackground/>; the
    // hero itself stays transparent (washed) so the page gradient shows through.
    default:
      return { type: "color" };
  }
}

function HeroBackgroundLayer({ background }: { background: HeroBackground }) {
  // If the media fails to load, fall back to the solid brand color rather
  // than showing a broken/empty hero.
  const [failed, setFailed] = useState(false);

  if (background.type === "color" || failed) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {background.type === "image" ? (
        <img
          src={background.src}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          src={background.src}
          poster={background.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          onError={() => setFailed(true)}
        />
      )}
      {/* Gradient scrim: lets the photo/video show through while keeping the
          headline and button readable. */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/45 to-foreground/70" />
    </div>
  );
}

export function Hero() {
  const { heroBg, customHeroImage, customHeroVideo } = useTheme();
  const background = resolveBackground(heroBg, customHeroImage, customHeroVideo);

  const words = [
    { text: "Welcome" },
    { text: "to" },
    { text: SITE.name, className: "text-primary" },
  ];
  return (
    <section className="page-surface relative isolate border-b border-border bg-foreground text-background">
      {/* key forces the failed-state to reset when the mode or source changes */}
      <HeroBackgroundLayer
        key={`${heroBg}:${background.type === "color" ? "" : background.src}`}
        background={background}
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-28">
        <p className="text-sm opacity-80 sm:text-base">The road to fitness starts from here</p>
        <TypewriterEffectSmooth
          words={words}
          className="font-display [&_span]:!text-background [&_span]:font-display"
        />
        <p className="mx-auto mt-2 max-w-xl text-base opacity-80">
          Find the perfect class, camp, or party for your family.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
          >
            Book Now
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
