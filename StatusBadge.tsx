import { cn } from "@/lib/utils";

const tone: Record<string, string> = {
  placed: "bg-secondary text-secondary-foreground border-border",
  confirmed: "bg-accent text-accent-foreground border-gold/50",
  shipped: "bg-primary/10 text-primary border-primary/30",
  delivered: "bg-success/15 text-success border-success/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  returned: "bg-muted text-muted-foreground border-border",
  requested: "bg-warning/20 text-warning-foreground border-warning/40",
  approved: "bg-primary/10 text-primary border-primary/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
  refunded: "bg-success/15 text-success border-success/30",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
        tone[status] ?? tone["placed"],
        className,
      )}
    >
      {status}
    </span>
  );
}
