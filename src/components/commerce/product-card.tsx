"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { getCategory, type Product } from "@/lib/data";
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
  const toggleFavorite = useFavorites((state) => state.toggle);
  const favoriteIds = useFavorites((state) => state.ids);
  const isFavorite = favoriteIds.includes(product.id);
  const category = getCategory(product.categoryId);
  const href = `/${category?.slug ?? "produto"}/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating",
        className
      )}
    >
      <Link
        href={href}
        aria-label={`Ver ${product.name}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
      >
        <div className="relative aspect-square overflow-hidden bg-soft">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />

          {product.badge ? (
            <div className="absolute top-2.5 left-2.5">
              <ProductBadge badge={product.badge} />
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
            {category?.name}
          </p>

          <h3 className="line-clamp-2 min-h-[2.4em] text-[13px] leading-snug font-semibold md:text-sm">
            {product.name}
          </h3>

          {typeof product.rating === "number" &&
          typeof product.reviewCount === "number" &&
          product.reviewCount > 0 ? (
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          ) : (
            <p className="text-[11px] text-muted-foreground">
              {product.tagline ?? "Descoberta selecionada"}
            </p>
          )}

          <Price
            price={product.price}
            currency={product.currency}
            paymentHint={product.currency === "BRL" ? "PIX no checkout" : undefined}
          />

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <span className="text-[10px] font-medium text-muted-foreground">
              {product.freeShipping ? "Frete grátis" : "Condições no checkout"}
            </span>

            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-primary text-primary-foreground transition-colors group-hover:bg-brand-dark"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={isFavorite}
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-2 right-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Heart
          className={cn(
            "h-4.5 w-4.5 transition-colors",
            isFavorite ? "fill-coral text-coral" : "text-foreground"
          )}
        />
      </button>
    </article>
  );
}
