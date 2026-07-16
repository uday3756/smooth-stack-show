"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, FOOTER_LINKS } from "@/data/nav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; display: inline-block; }
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 10%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 10%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(circle at 50% 50%,
    color-mix(in oklch, var(--primary) 25%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 20%, transparent) 40%,
    transparent 70%);
}
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 18%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 22%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 70%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

type MagneticProps = React.HTMLAttributes<HTMLElement> & {
  as?: "button" | "a";
  href?: string;
};

const MagneticButton = React.forwardRef<HTMLElement, MagneticProps>(
  ({ className, children, as = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };
        const onLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        };
      }, el);
      return () => ctx.revert();
    }, []);

    const setRef = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    if (as === "a") {
      return (
        <a
          ref={setRef as React.Ref<HTMLAnchorElement>}
          className={cn("cursor-pointer inline-block", className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        ref={setRef as React.Ref<HTMLButtonElement>}
        className={cn("cursor-pointer inline-block", className)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MARQUEE_ITEMS = [
  "Move Together",
  "Family First",
  "Every Age, Every Stage",
  "Book a Free Trial",
  "Community Over Competition",
];

const MarqueeStrip = () => (
  <div className="flex shrink-0 items-center gap-10 pr-10 text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
    {MARQUEE_ITEMS.map((item, i) => (
      <span key={i} className="flex items-center gap-10">
        <span>{item}</span>
        <span aria-hidden className="text-primary">✦</span>
      </span>
    ))}
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const giantTextRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: 80, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
      const targets = [headingRef.current, linksRef.current].filter(Boolean) as Element[];
      if (targets.length) {
        gsap.fromTo(
          targets,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const giantWord = (SITE.name || "MOVE").replace(/\s+/g, "").toUpperCase().slice(0, 8) || "MOVE";

  return (
    <>
      <style>{STYLES}</style>
      <footer
        ref={wrapperRef}
        className="page-surface-light cinematic-footer-wrapper relative overflow-hidden bg-background text-foreground"
      >
        {/* Backgrounds */}
        <div className="pointer-events-none absolute inset-0 footer-bg-grid" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 footer-aurora animate-footer-breathe" />

        {/* Giant word */}
        <div
          ref={giantTextRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-4vw] flex justify-center select-none"
        >
          <span className="footer-giant-bg-text">{giantWord}</span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-10 sm:px-10">
          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <span className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Let's stay in touch
            </span>
            <h2
              ref={headingRef}
              className="footer-text-glow mt-6 max-w-3xl text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
            >
              Let's move <br className="hidden sm:block" />
              together.
            </h2>

            <MagneticButton
              as="a"
              href="#services"
              className="footer-glass-pill mt-10 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground"
            >
              Explore Services →
            </MagneticButton>
          </div>

          {/* Marquee */}
          <div className="relative mt-20 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-footer-scroll-marquee">
              <MarqueeStrip />
              <MarqueeStrip />
              <MarqueeStrip />
            </div>
          </div>

          {/* Links grid */}
          <div
            ref={linksRef}
            className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <a href="/" className="flex items-center gap-2.5 font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  {SITE.initials?.trim() || "M"}
                </span>
                <span className="text-base">{SITE.name}</span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                A community-first space where every family moves, plays and grows.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Explore
              </p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Visit
              </p>
              <p className="mt-4 text-sm text-foreground">{SITE.fullAddress}</p>
              <p className="mt-2 text-sm text-muted">{SITE.timezone}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                Contact
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 block text-sm text-foreground hover:text-primary"
              >
                {SITE.email}
              </a>
              <MagneticButton
                onClick={scrollToTop}
                className="footer-glass-pill mt-6 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowUp className="h-3.5 w-3.5" /> Back to top
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
            <span>
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </span>
            <span className="inline-flex items-center gap-1.5">
              Made with
              <Heart className="animate-footer-heartbeat h-3.5 w-3.5 text-destructive" fill="currentColor" />
              — Powered by Omnify
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CinematicFooter;