import { createFileRoute } from "@tanstack/react-router";
import FloatingNavDemo from "@/components/floating-navbar-demo";

export const Route = createFileRoute("/floating-navbar")({
  component: FloatingNavPage,
});

function FloatingNavPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="mb-2 text-center text-3xl font-bold text-neutral-800 dark:text-white">
        Floating Navbar Demo
      </h1>
      <p className="mb-10 text-center text-neutral-500 dark:text-neutral-400">
        Scroll down, then scroll back up to reveal the floating navbar.
      </p>

      <FloatingNavDemo />

      {/* Extra height so the page is scrollable and the reveal-on-scroll-up
          behavior can be triggered. */}
      <div className="mt-8 grid gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md border border-neutral-200 p-8 text-neutral-500 dark:border-white/[0.15] dark:text-neutral-400"
          >
            Filler section {i + 1} — keep scrolling.
          </div>
        ))}
      </div>
    </div>
  );
}
