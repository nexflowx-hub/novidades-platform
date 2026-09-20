"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
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
        "group relative flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#dbe7f3] bg-white text-[#07142a] shadow-[0_12px_34px_rgba(0,26,67,.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,47,120,.22)]",
        className
      )}
    >
      <Link
        href={href}
        aria-label={`Ver ${product.name}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
      >
        <div className="relative aspect-[1.06/1] overflow-hidden bg-gradient-to-b from-[#f8fbff] to-[#edf5fc]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 260px"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.035]"
          />

          {product.badge ? (
            <div className="absolute left-2.5 top-2.5">
              <ProductBadge badge={product.badge} />
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3.5 md:p-4">
          <p className="text-[9px] font-black tracking-[0.12em] text-[#6280a4] uppercase">
            {category?.name}
          </p>

          <h3 className="line-clamp-2 min-h-[2.45em] text-[13px] leading-snug font-extrabold md:text-sm">
            {product.name}
          </h3>

          {typeof product.rating === "number" &&
          typeof product.reviewCount === "number" &&
          product.reviewCount > 0 ? (
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          ) : (
            <p className="line-clamp-1 text-[10px] text-[#718096]">
              {product.tagline ?? "Descoberta selecionada"}
            </p>
          )}

          <Price
            price={product.price}
            currency={product.currency}
            paymentHint={product.currency === "BRL" ? "PIX no checkout" : undefined}
          />

          <div className="mt-auto pt-2">
            <span className="flex h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#0787ff] to-[#075bd8] text-xs font-black text-white shadow-[0_7px_20px_rgba(7,91,216,.2)] transition group-hover:brightness-110">
              Ver produto
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <p className="mt-2 text-center text-[9px] font-medium text-[#7890aa]">
              {product.fulfillmentType === "digital"
                ? "Entrega digital"
                : product.freeShipping
                  ? "Frete grátis"
                  : "Condições no checkout"}
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={isFavorite}
        onClick={() => toggleFavorite(product.id)}
        className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/95 shadow-md transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            isFavorite ? "fill-red-500 text-red-500" : "text-[#18304f]"
          )}
        />
      </button>
    </article>
  );
}
