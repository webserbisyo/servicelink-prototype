export default function ProviderDashboardPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="max-w-md w-full rounded-lg border border-border p-6 bg-card text-card-foreground shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Provider Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Placeholder for Provider Dashboard views, job requests, schedule, and earnings.
        </p>
        <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Phase 2 — Stage 2
        </span>
      </div>
    </div>
  )
}
