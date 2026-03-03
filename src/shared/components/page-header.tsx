import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}

export const PageHeader = ({ title, description, actions, eyebrow }: PageHeaderProps) => (
  <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">{eyebrow}</p>
      ) : null}
      <h1 className="text-2xl font-bold leading-tight md:text-3xl">{title}</h1>
      {description ? <p className="max-w-2xl text-sm text-[hsl(var(--muted-foreground))]">{description}</p> : null}
    </div>
    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
  </header>
);
