import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-royal text-royal-foreground print:hidden">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-gold" />
            <span className="font-display text-2xl tracking-[0.18em]">ROYAL WINGS</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-royal-foreground/70">
            Airplane models, model kits and aviation gifts for every flying fan.
          </p>
        </div>
        <div>
          <p className="eyebrow text-gold">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-royal-foreground/80">
            <li><Link to="/shop" className="hover:text-gold">Shop all</Link></li>
            <li><Link to="/cart" className="hover:text-gold">Your Bag</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold">Care</p>
          <ul className="mt-4 space-y-2 text-sm text-royal-foreground/80">
            <li><Link to="/track" className="hover:text-gold">Track an Order</Link></li>
            <li><Link to="/returns" className="hover:text-gold">Returns & Refunds</Link></li>
            <li><Link to="/admin" className="hover:text-gold">Store Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-5 text-center text-xs text-royal-foreground/50">
        © {new Date().getFullYear()} Royal Wings. All prices in INR, GST extra.
      </div>
    </footer>
  );
}
