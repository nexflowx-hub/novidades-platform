"use client";

import Image from "next/image";
import { ExternalLink, ShieldCheck, Zap } from "lucide-react";
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
import { ProductBadge } from "@/components/commerce/product-badge";
import { RatingStars } from "@/components/commerce/rating-stars";

export function QuickViewDialog() {
  const quickViewId = useUI((state) => state.quickViewId);
  const setQuickView = useUI((state) => state.setQuickView);

  const product = quickViewId ? getProduct(quickViewId) : undefined;
  const category = product ? getCategory(product.categoryId) : undefined;

  const close = () => setQuickView(null);

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
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="max-h-[92dvh] overflow-y-auto p-0 sm:max-w-3xl">
        {product ? (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>{product.description}</DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-soft md:aspect-auto md:min-h-[440px]">
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

                  {typeof product.rating === "number" &&
                  typeof product.reviewCount === "number" &&
                  product.reviewCount > 0 ? (
                    <div className="mt-2.5">
                      <RatingStars
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        size="md"
                      />
                    </div>
                  ) : null}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div>
                  <span className="text-[30px] font-extrabold tracking-tight">
                    {formatBRL(product.price)}
                  </span>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-medium text-muted-foreground">
                      <Zap className="h-4 w-4 text-brand" aria-hidden="true" />
                      PIX via XPAYMENTS no checkout dedicado
                    </span>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  {product.storefrontUrl && funnelHost ? (
                    <>
                      <Separator />
                      <Button
                        asChild
                        className="h-12 w-full gap-2 bg-brand text-[15px] font-bold hover:bg-brand-dark"
                      >
                        <a href={product.storefrontUrl}>
                          Ver oferta completa
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </Button>
                      <p className="text-center text-[11px] text-faint">
                        {funnelHost} · Uma experiência Novidades.store
                      </p>
                    </>
                  ) : (
                    <p className="rounded-xl bg-soft p-3 text-center text-xs text-muted-foreground">
                      Esta descoberta ainda não está disponível para compra.
                    </p>
                  )}

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    Identificação do vendedor e políticas disponíveis antes do pagamento
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
