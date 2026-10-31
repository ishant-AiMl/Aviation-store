import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/lib/catalog";
import { formatINR } from "@/lib/pricing";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group flex flex-col">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block overflow-hidden rounded-md bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-royal/85 px-3 py-1 eyebrow text-gold">
          {product.category}
        </span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-display text-2xl font-semibold leading-tight hover:text-primary">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-primary">{formatINR(product.price)}</span>
          <Button
            variant="outlineGold"
            size="sm"
            onClick={() => {
              add(product.id);
              toast.success(`${product.name} added to your bag`);
            }}
          >
            Add to bag
          </Button>
        </div>
      </div>
    </div>
  );
}
