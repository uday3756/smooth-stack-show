import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { SITE } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const closeTimer = useRef<number | undefined>(undefined);

  // Opening a menu is instant; closing is delayed by a short grace period so a
  // brief cursor slip (e.g. travelling from the trigger to the panel) doesn't
  // snap the dropdown shut before you can reach it. Any re-enter cancels the
  // pending close.
  const handleSetActive = (item: string | null) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (item === null) {
      closeTimer.current = window.setTimeout(() => setActive(null), 180);
    } else {
      setActive(item);
    }
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Track whether we've scrolled past the top so the glass effect only
      // kicks in once the page moves.
      setScrolled(scrollY > 8);
      // Hide when scrolling down (past a small threshold), reveal on scroll up.
      if (scrollY > lastScrollY.current && scrollY > 80) {
        setHidden(true);
      } else if (scrollY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (id: string) => setMobileSection((cur) => (cur === id ? null : id));

  return (
    <header
      className={cn(
        "shaped-edge shaped-header sticky top-0 z-40 border-b transition-transform duration-300 ease-out",
        hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-border/40 bg-surface/60 shadow-lg backdrop-blur-xl backdrop-saturate-150"
          : "border-border bg-surface/95 backdrop-blur",
      )}
    >
      {/* Utility ribbon: quick contact + account links. Only shown at the very
          top of the page — once scrolled, it collapses so the reveal-on-scroll-up
          brings back just the nav bar (not the ribbon). */}
      <div
        className={cn(
          "overflow-hidden bg-foreground text-background transition-all duration-300 ease-out",
          scrolled
            ? "max-h-0 border-b-0 opacity-0"
            : "max-h-12 border-b border-border/50 opacity-100",
        )}
      >
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-6 text-[11px] sm:text-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <span aria-hidden>📞</span>
              <span>{SITE.phone}</span>
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(SITE.fullAddress)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <span aria-hidden>📍</span>
              <span>Visit us</span>
            </a>
          </div>
          <a
            href="/sign-in"
            className="inline-flex items-center gap-1.5 font-medium transition-opacity hover:opacity-80"
          >
            <span aria-hidden>👤</span>
            <span>My acc</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="/" className="flex shrink-0 items-center gap-2.5 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            {SITE.initials}
          </span>
          <span className="text-[15px] tracking-tight">{SITE.name}</span>
        </a>

        <div className={cn("hidden lg:flex flex-1 justify-center")}>
          <Menu setActive={handleSetActive}>
            <a href="/" className="text-foreground hover:opacity-80 cursor-pointer">
              Home
            </a>

            <MenuItem setActive={handleSetActive} active={active} item="Services">
              <div className="flex flex-col space-y-2 text-sm">
                <HoveredLink href="#services">All services</HoveredLink>
                <HoveredLink href="#services">Enrollments</HoveredLink>
                <HoveredLink href="#class-cards">Class Cards</HoveredLink>
                <HoveredLink href="#services">Camps</HoveredLink>
                <HoveredLink href="#services">Parties</HoveredLink>
                <HoveredLink href="#trials">Trials</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={handleSetActive} active={active} item="Programs">
              <div className="grid grid-cols-2 gap-6 p-2">
                <ProductItem
                  title="Waddlers"
                  href="#services"
                  src="/yogamat.svg"
                  description="Beginner enrollment for our youngest athletes."
                />
                <ProductItem
                  title="Little Bunnies"
                  href="#services"
                  src="/resistanceband.svg"
                  description="Intermediate class building strength and skill."
                />
                <ProductItem
                  title="Champions"
                  href="#services"
                  src="/gymbag.svg"
                  description="Advanced training for competitive gymnasts."
                />
                <ProductItem
                  title="Summer Camp"
                  href="#services"
                  src="/waterbottle.svg"
                  description="Week-long camps packed with fun and fitness."
                />
              </div>
            </MenuItem>

            <MenuItem setActive={handleSetActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-2 text-sm">
                <HoveredLink href="#class-cards">Class Cards</HoveredLink>
                <HoveredLink href="#trials">Free Trial</HoveredLink>
                <HoveredLink href="#services">Enrollments</HoveredLink>
                <HoveredLink href="#services">Party Packages</HoveredLink>
              </div>
            </MenuItem>

            <a href="/calendar" className="text-foreground hover:opacity-80 cursor-pointer">
              Calendar
            </a>
          </Menu>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/sign-in"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <span aria-hidden>⇥</span>
            Sign In
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            <div className="space-y-1">
              <span className="block h-0.5 w-4 bg-foreground" />
              <span className="block h-0.5 w-4 bg-foreground" />
              <span className="block h-0.5 w-4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-surface px-4 py-3 lg:hidden">
          <a
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-alt"
          >
            Home
          </a>

          <MobileSection
            id="services"
            label="Services"
            open={mobileSection === "services"}
            onToggle={() => toggleSection("services")}
          >
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              All services
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Enrollments
            </a>
            <a
              href="#class-cards"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Class Cards
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Camps
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Parties
            </a>
            <a
              href="#trials"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Trials
            </a>
          </MobileSection>

          <MobileSection
            id="programs"
            label="Programs"
            open={mobileSection === "programs"}
            onToggle={() => toggleSection("programs")}
          >
            <div className="grid grid-cols-2 gap-3 p-2">
              <MobileProgram
                src="/yogamat.svg"
                title="Waddlers"
                desc="Beginner enrollment."
                onClick={() => setMobileOpen(false)}
              />
              <MobileProgram
                src="/resistanceband.svg"
                title="Little Bunnies"
                desc="Intermediate class."
                onClick={() => setMobileOpen(false)}
              />
              <MobileProgram
                src="/gymbag.svg"
                title="Champions"
                desc="Advanced training."
                onClick={() => setMobileOpen(false)}
              />
              <MobileProgram
                src="/waterbottle.svg"
                title="Summer Camp"
                desc="Week-long camps."
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </MobileSection>

          <MobileSection
            id="pricing"
            label="Pricing"
            open={mobileSection === "pricing"}
            onToggle={() => toggleSection("pricing")}
          >
            <a
              href="#class-cards"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Class Cards
            </a>
            <a
              href="#trials"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Free Trial
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Enrollments
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-primary"
            >
              Party Packages
            </a>
          </MobileSection>

          <a
            href="/calendar"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-alt"
          >
            Calendar
          </a>
        </nav>
      )}
    </header>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-alt"
      >
        {label}
        <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && <div className="pb-2 pl-2">{children}</div>}
    </div>
  );
}

function MobileProgram({
  src,
  title,
  desc,
  onClick,
}: {
  src: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <a
      href="#services"
      onClick={onClick}
      className="flex flex-col gap-1 rounded-lg border border-border p-2 hover:border-primary/40"
    >
      <img src={src} alt={title} className="h-14 w-full rounded object-contain" />
      <span className="text-sm font-semibold text-foreground">{title}</span>
      <span className="text-xs text-muted">{desc}</span>
    </a>
  );
}
