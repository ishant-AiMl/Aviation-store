import { formatINR, type computeTotals } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function Totals({ totals, className }: { totals: ReturnType<typeof computeTotals>; className?: string }) {
  return (
    <dl className={cn("space-y-3 text-sm", className)}>
      <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(totals.subtotal)}</dd></div>
      <div className="flex justify-between"><dt className="text-muted-foreground">GST (18%)</dt><dd>{formatINR(totals.tax)}</dd></div>
      <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{totals.shipping === 0 ? "Free" : formatINR(totals.shipping)}</dd></div>
      <div className="gold-rule !my-4" />
      <div className="flex justify-between font-display text-2xl font-semibold text-primary"><dt>Total</dt><dd>{formatINR(totals.total)}</dd></div>
    </dl>
  );
}
