"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  id?: string;
}

export function SectionHeader({ title, subtitle, action, id }: SectionHeaderProps) {
  return (
    <div id={id} className="mb-4 flex items-end justify-between gap-4 md:mb-6">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight md:text-[28px]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-[13px] text-muted-foreground md:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="group inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-foreground transition-colors hover:text-brand-dark md:text-sm"
        >
          {action.label}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className = "",
  ariaLabel,
  id,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`mx-auto w-full max-w-[1440px] scroll-mt-32 px-4 py-7 md:px-6 md:py-10 lg:px-8 lg:scroll-mt-36 ${className}`}
    >
      {children}
    </section>
  );
}
