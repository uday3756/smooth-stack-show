import type { ReactNode } from "react";
import type { Service } from "@/data/services";

function Badge({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "success";
}) {
  const styles =
    tone === "success"
      ? "bg-accent text-primary-foreground"
      : "bg-white/95 text-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${styles}`}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
    >
      {children}
    </button>
  );
}

function CardShell({
  headerClass,
  badges,
  title,
  children,
  image,
}: {
  headerClass: string;
  badges: ReactNode;
  title: string;
  children: ReactNode;
  image?: string;
}) {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-sm transition-all duration-500 ease-out will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:[transform:perspective(1000px)_rotateX(4deg)_rotateY(-6deg)_scale(1.03)]">

      <div
        className={`relative flex h-44 flex-col items-center justify-center ${headerClass}`}
      >
        {image && (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        )}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {badges}
        </div>
        {!image && (
          <h3 className="px-4 text-center text-xl font-bold text-white drop-shadow-sm">
            {title}
          </h3>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">{children}</div>
    </article>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  if (service.type === "enrollment") {
    return (
      <CardShell
        headerClass="bg-primary pattern-grid"
        title={service.title}
        badges={
          <>
            <Badge>🎓 Enrollment</Badge>
            {service.trialAvailable && <Badge tone="success">Trial Available</Badge>}
          </>
        }
      >
        <p className="text-sm font-semibold">{service.title}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.schedule.map((slot) => (
            <span
              key={slot.day}
              className="inline-flex items-center gap-1 rounded-md bg-surface-alt px-2 py-1 text-[11px] text-muted"
            >
              <span className="font-semibold text-foreground">{slot.day}</span>
              {slot.time}
            </span>
          ))}
        </div>
        <div className="text-xs text-muted">
          <p>Trial: {service.trialPrice}</p>
          <p>{service.trialLength}</p>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Start your trial
          </button>
          <PrimaryButton>
            Book <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </CardShell>
    );
  }

  if (service.type === "camp") {
    return (
      <CardShell
        headerClass="bg-primary pattern-diagonal"
        title={service.title}
        badges={<Badge>⛺ Camp</Badge>}
      >
        <p className="text-sm font-semibold">{service.title}</p>
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <span aria-hidden>📅</span>
          {service.dateRange}
        </p>
        <p className="text-sm">
          <span className="font-bold">
            {service.priceMin} - {service.priceMax}
          </span>
          <span className="text-muted">/{service.unit}</span>
        </p>
        <div className="mt-auto pt-1">
          <PrimaryButton>
            Register <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </CardShell>
    );
  }

  if (service.type === "party") {
    return (
      <CardShell
        headerClass="bg-party pattern-cross"
        title={service.title}
        badges={<Badge>🎉 Party</Badge>}
      >
        <p className="text-sm font-semibold">{service.title}</p>
        <div className="divide-y divide-border border-y border-border">
          {service.tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex items-center justify-between py-2 text-xs"
            >
              <span className="text-muted">{tier.name}</span>
              <span className="font-semibold">{tier.price}</span>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold">From {service.fromPrice}</p>
        <div className="mt-auto pt-1">
          <PrimaryButton>
            Book a party <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell
      headerClass="bg-primary pattern-grid"
      title={service.title}
      badges={<Badge>🛍️ Product</Badge>}
      image={service.image}
    >
      <p className="text-sm font-semibold">{service.title}</p>
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <span aria-hidden>📦</span>
        {service.optionsCount} options available
      </p>
      <p className="text-sm font-bold">From {service.fromPrice}</p>
      <div className="mt-auto pt-1">
        <PrimaryButton>
          Buy <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </CardShell>
  );
}
