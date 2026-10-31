import { Plane } from "lucide-react";
import { format } from "date-fns";
import { GST_RATE, PAYMENT_METHODS, formatINR, type PaymentMethod } from "@/lib/pricing";
import { StatusBadge } from "./StatusBadge";

export type BillOrder = {
  order_number: string;
  invoice_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  created_at: string;
};

export type BillItem = {
  id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
};

export function Bill({ order, items }: { order: BillOrder; items: BillItem[] }) {
  const halfGst = Number(order.tax) / 2;
  return (
    <div className="print-area rounded-lg border border-border bg-card p-8 shadow-royal sm:p-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Plane className="h-6 w-6 text-gold" />
            <span className="font-display text-3xl font-semibold tracking-[0.18em]">ROYAL WINGS</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Royal Wings Aviation Pvt. Ltd. · Mumbai, Maharashtra · GSTIN 27AAAAA0000A1Z5
          </p>
        </div>
        <div className="text-right">
          <p className="eyebrow text-gold">Tax Invoice</p>
          <p className="mt-1 font-display text-2xl font-semibold text-primary">{order.invoice_number}</p>
          <p className="text-sm text-muted-foreground">{format(new Date(order.created_at), "dd MMM yyyy, hh:mm a")}</p>
        </div>
      </div>

      <div className="gold-rule my-8" />

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <p className="eyebrow text-muted-foreground">Billed to</p>
          <p className="mt-2 font-semibold">{order.customer_name}</p>
          <p className="text-sm text-muted-foreground">{order.address_line}</p>
          <p className="text-sm text-muted-foreground">
            {order.city}, {order.state} — {order.pincode}
          </p>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Contact</p>
          <p className="mt-2 text-sm">{order.email}</p>
          <p className="text-sm">{order.phone}</p>
        </div>
        <div className="sm:text-right">
          <p className="eyebrow text-muted-foreground">Order</p>
          <p className="mt-2 font-semibold">{order.order_number}</p>
          <p className="text-sm text-muted-foreground">
            {PAYMENT_METHODS[order.payment_method as PaymentMethod] ?? order.payment_method}
          </p>
          <StatusBadge status={order.status} className="mt-2" />
        </div>
      </div>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-3 eyebrow text-muted-foreground">#</th>
            <th className="py-3 eyebrow text-muted-foreground">Item</th>
            <th className="py-3 text-right eyebrow text-muted-foreground">Rate</th>
            <th className="py-3 text-right eyebrow text-muted-foreground">Qty</th>
            <th className="py-3 text-right eyebrow text-muted-foreground">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={it.id} className="border-b border-border/60">
              <td className="py-3 text-muted-foreground">{i + 1}</td>
              <td className="py-3 font-medium">{it.product_name}</td>
              <td className="py-3 text-right">{formatINR(Number(it.unit_price))}</td>
              <td className="py-3 text-right">{it.quantity}</td>
              <td className="py-3 text-right">{formatINR(Number(it.line_total))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <dl className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(Number(order.subtotal))}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">CGST ({(GST_RATE * 50).toFixed(0)}%)</dt><dd>{formatINR(halfGst)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">SGST ({(GST_RATE * 50).toFixed(0)}%)</dt><dd>{formatINR(halfGst)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{Number(order.shipping) === 0 ? "Free" : formatINR(Number(order.shipping))}</dd></div>
          <div className="gold-rule !my-3" />
          <div className="flex justify-between font-display text-2xl font-semibold text-primary">
            <dt>Total</dt><dd>{formatINR(Number(order.total))}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Thank you for shopping with Royal Wings. This is a computer-generated invoice and needs no signature.
      </p>
    </div>
  );
}
