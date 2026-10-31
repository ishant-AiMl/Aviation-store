import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { lookupOrder } from "@/lib/orders.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OrderLookupForm({
  cta,
  onFound,
}: {
  cta: string;
  onFound: (orderNumber: string, key: string) => void;
}) {
  const lookup = useServerFn(lookupOrder);
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await lookup({ data: { orderNumber: orderNumber.trim(), email: email.trim() } });
      if (!res.found) setError("No order matches that ID and email.");
      else onFound(res.orderNumber, res.key);
    } catch {
      setError("Please enter a valid order ID and email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-border bg-card p-8 shadow-royal">
      <div className="space-y-1.5">
        <Label htmlFor="orderNumber">Order ID</Label>
        <Input id="orderNumber" required placeholder="RG-261031-1001" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email used at checkout</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" variant="royal" size="lg" className="w-full" disabled={busy}>
        {busy && <Loader2 className="animate-spin" />} {cta}
      </Button>
    </form>
  );
}
