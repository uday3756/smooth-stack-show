import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { SITE } from "@/data/nav";
import { CATEGORIES, SERVICE_SECTIONS } from "@/data/services";

export const Route = createFileRoute("/")({
  component: Home,
});

// Take the first 9 services across all categories for the 3x3 grid.
const GRID_SERVICES = SERVICE_SECTIONS.flatMap((s) =>
  s.services.map((svc) => ({ ...svc, sectionId: s.id })),
).slice(0, 9);

function priceLabel(svc: (typeof GRID_SERVICES)[number]): string {
  if (svc.type === "enrollment") return `${svc.trialPrice} · ${svc.trialLength}`;
  if (svc.type === "camp") return `${svc.priceMin} – ${svc.priceMax} / ${svc.unit}`;
  return `from ${svc.fromPrice}`;
}

function Home() {
  return (
    <ThemeProvider>
      <div className="relative bg-background text-foreground">
        {/* ---------------- PANEL 1: HERO (100vh, fills screen) ---------------- */}
        <section className="stack-panel z-[1] flex items-center justify-center px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted">
              Welcome to
            </p>
            <h1 className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
              [{SITE.name}]
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
              The road to fitness starts from here. Find the perfect class, camp, or party for your family.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
              >
                Book Now <span aria-hidden>→</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-alt"
              >
                Explore services
              </a>
            </div>
            <div className="mt-16 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted">
              <span>Scroll</span>
              <span aria-hidden className="h-8 w-px animate-pulse bg-foreground/40" />
            </div>
          </div>
        </section>

        {/* ---------------- PANEL 2: CATEGORIES + OUR SERVICES 3x3 ---------------- */}
        <section
          id="services"
          className="stack-panel z-[2] flex items-center justify-center overflow-hidden px-6 py-16"
        >
          <div className="mx-auto w-full max-w-6xl">
            {/* Categories row */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map((c) => (
                <span
                  key={c.id}
                  className="stack-card inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  <span aria-hidden>{c.icon}</span>
                  {c.label}
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    {c.count}
                  </span>
                </span>
              ))}
            </div>

            <div className="mb-8 text-center">
              <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Our Services
              </h2>
              <p className="mt-3 text-sm text-muted sm:text-base">
                Nine ways to move, play, and celebrate.
              </p>
            </div>

            {/* 3x3 grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {GRID_SERVICES.map((svc) => (
                <article
                  key={svc.id}
                  className="stack-card flex flex-col justify-between p-6"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {svc.type}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{priceLabel(svc)}</p>
                  </div>
                  <button
                    type="button"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
                  >
                    Book <span aria-hidden>→</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PANEL 3: FOOTER ---------------- */}
        <footer className="stack-panel z-[3] flex flex-col items-center justify-center px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Get in touch
            </p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
              Let&apos;s move together.
            </h2>
            <p className="mt-5 text-base text-muted">
              {SITE.name} · Walnut Creek, CA
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:hello@example.com"
                className="stack-card rounded-full px-6 py-3 text-sm font-semibold"
              >
                hello@example.com
              </a>
              <a
                href="tel:+15555555555"
                className="stack-card rounded-full px-6 py-3 text-sm font-semibold"
              >
                +1 (555) 555-5555
              </a>
            </div>
            <p className="mt-16 text-xs text-muted">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>
        </footer>

        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
