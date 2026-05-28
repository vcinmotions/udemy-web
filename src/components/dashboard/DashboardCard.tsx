'use client';

import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorBg: string;
  colorText: string;
  change?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  colorBg,
  colorText,
  change,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-white/10">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorBg}`}
        >
          <Icon className={colorText} size={20} />
        </div>

        {change && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
            {change}
          </span>
        )}
      </div>

      <h3 className="text-3xl font-black text-foreground">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {title}
      </p>
    </div>
  );
}