import { Link } from "@tanstack/react-router";
import { Plane, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/track", label: "Track Order" },
  { to: "/returns", label: "Returns" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-sidebar-border bg-royal text-royal-foreground print:hidden">
      <div className="bg-gold-gradient py-1 text-center eyebrow text-gold-foreground">
        Complimentary shipping on orders above ₹2,999
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-gold" />
          <span className="font-display text-2xl font-semibold tracking-[0.18em]">ROYAL WINGS</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow text-royal-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "eyebrow text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="eyebrow hidden text-royal-foreground/60 hover:text-gold sm:block">
            Admin
          </Link>
          <Link to="/cart" className="relative flex items-center gap-2 hover:text-gold" aria-label="Shopping bag">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      <nav className="flex justify-center gap-6 border-t border-sidebar-border py-2 md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="eyebrow text-royal-foreground/80" activeProps={{ className: "eyebrow text-gold" }}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
