"use client";

import Image from "next/image";
import { Minus, Plus, ShieldCheck, ShoppingCart, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProduct, getCategory } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { useUI } from "@/lib/store/ui";
import { useCart } from "@/lib/store/cart";
import { ProductBadge } from "@/components/commerce/product-badge";
import { RatingStars } from "@/components/commerce/rating-stars";

export function QuickViewDialog() {
  const quickViewId = useUI((s) => s.quickViewId);
  const setQuickView = useUI((s) => s.setQuickView);
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);

  const product = quickViewId ? getProduct(quickViewId) : undefined;
  const category = product ? getCategory(product.categoryId) : undefined;

  const close = () => {
    setQuickView(null);
    setQty(1);
  };

  const funnelHost = (() => {
    if (!product?.storefrontUrl) return null;
    try {
      return new URL(product.storefrontUrl).host;
    } catch {
      return null;
    }
  })();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={(o) => {
        if (!o) close();
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto p-0 sm:max-w-3xl">
        {product ? (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>{product.description}</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2">
              {/* Imagem */}
              <div className="relative aspect-square bg-soft md:aspect-auto md:min-h-[420px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover md:rounded-l-2xl"
                  priority
                />
                {product.badge ? (
                  <div className="absolute top-4 left-4">
                    <ProductBadge badge={product.badge} className="text-[11px]" />
                  </div>
                ) : null}
              </div>

              {/* Detalhes */}
              <div className="flex flex-col gap-4 p-5 md:p-7">
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                    {category?.name}
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                    {product.name}
                  </h2>
                  {product.tagline ? (
                    <p className="mt-1 font-editorial text-[15px] text-brand-dark italic">
                      {product.tagline}
                    </p>
                  ) : null}
                  <div className="mt-2.5">
                    <RatingStars
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      size="md"
                    />
                    {product.reviewsAreMock ? (
                      <p className="mt-1 text-[10px] text-faint">
                        Avaliações de demonstração — reviews reais chegam em breve.
                      </p>
                    ) : null}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[28px] font-extrabold tracking-tight">
                      {formatBRL(product.price)}
                    </span>
                    {product.originalPrice ? (
                      <span className="text-sm text-faint line-through">
                        {formatBRL(product.originalPrice)}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">
                    ou 12x de {formatBRL(product.price / 12)}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                    {product.freeShipping ? (
                      <span className="inline-flex items-center gap-1.5 font-semibold text-success">
                        <Truck className="h-4 w-4" aria-hidden="true" />
                        Frete grátis
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                      <Zap className="h-4 w-4 text-brand" aria-hidden="true" />
                      PIX com aprovação imediata
                    </span>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex gap-3">
                    <div className="inline-flex items-center rounded-[10px] border border-border">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="grid h-11 w-10 place-items-center rounded-l-[10px] transition-colors hover:bg-soft"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="w-9 text-center text-sm font-bold" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => setQty((q) => q + 1)}
                        className="grid h-11 w-10 place-items-center rounded-r-[10px] transition-colors hover:bg-soft"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <Button
                      className="h-11 flex-1 gap-2 bg-brand text-[15px] font-bold hover:bg-brand-dark"
                      onClick={() => {
                        addItem(product.id, qty);
                        toast.success("Adicionado ao carrinho", {
                          description: `${product.name} · ${qty}x`,
                        });
                      }}
                    >
                      <ShoppingCart className="h-[18px] w-[18px]" aria-hidden="true" />
                      Adicionar ao carrinho
                    </Button>
                  </div>

                  {product.storefrontUrl && funnelHost ? (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <Button
                          asChild
                          variant="outline"
                          className="h-11 w-full text-[15px] font-bold"
                        >
                          <a
                            href={product.storefrontUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver oferta completa
                          </a>
                        </Button>
                        <p className="text-center text-[11px] text-faint">
                          Você será direcionado para {funnelHost} · Uma experiência
                          Novidades.store
                        </p>
                      </div>
                    </>
                  ) : null}

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    Compra protegida · Pagamento seguro via XPAYMENTS
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
