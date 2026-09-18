"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import { getProduct, getCategory, type Product } from "@/lib/data";
import { useUI } from "@/lib/store/ui";
import { useCart } from "@/lib/store/cart";
import { useFavorites } from "@/lib/store/favorites";
import { cn } from "@/lib/utils";
import { Price } from "./price";
import { RatingStars } from "./rating-stars";
import { ProductBadge } from "./product-badge";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const setQuickView = useUI((s) => s.setQuickView);
  const addItem = useCart((s) => s.addItem);
  const toggleFavorite = useFavorites((s) => s.toggle);
  const favoriteIds = useFavorites((s) => s.ids);
  const isFavorite = favoriteIds.includes(product.id);
  const category = getCategory(product.categoryId);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.id);
    toast.success("Adicionado ao carrinho", {
      description: product.name,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    if (!isFavorite) {
      toast("Salvo nos favoritos", { description: product.name });
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Ver ${product.name}`}
      onClick={() => setQuickView(product.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setQuickView(product.id);
        }
      }}
      className={cn(
        "group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-[14px] border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
        className
      )}
    >
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden bg-soft">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-2.5 left-2.5">
          {product.badge ? <ProductBadge badge={product.badge} /> : null}
        </div>
        <button
          type="button"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorite}
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-110"
        >
          <Heart
            className={cn(
              "h-4.5 w-4.5 transition-colors",
              isFavorite ? "fill-coral text-coral" : "text-foreground"
            )}
          />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
        <h3 className="line-clamp-2 min-h-[2.4em] text-[13px] leading-snug font-semibold md:text-sm">
          {product.name}
        </h3>
        <p className="text-[11px] text-muted-foreground">{category?.name}</p>

        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <Price price={product.price} originalPrice={product.originalPrice} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
          {product.freeShipping ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-1 text-[10px] font-semibold text-success">
              <Truck className="h-3 w-3" aria-hidden="true" />
              Frete grátis
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            onClick={handleQuickAdd}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-primary text-primary-foreground transition-colors hover:bg-brand-dark active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
