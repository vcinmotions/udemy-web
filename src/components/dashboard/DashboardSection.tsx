'use client';

interface Props {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardSection({
  title,
  action,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {title}
        </h2>

        {action}
      </div>

      {children}
    </div>
  );
}