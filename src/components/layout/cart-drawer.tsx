"use client";

import Image from "next/image";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProduct } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { useUI } from "@/lib/store/ui";
import { useCart } from "@/lib/store/cart";
import { scrollToId } from "@/lib/scroll";
import { useMounted } from "@/hooks/use-mounted";

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const close = useUI((s) => s.closeCart);
  const showInfo = useUI((s) => s.showInfo);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const mounted = useMounted();

  const entries = items
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter((e): e is { item: typeof e.item; product: NonNullable<typeof e.product> } =>
      Boolean(e.product)
    );

  const subtotal = entries.reduce(
    (acc, { item, product }) => acc + product.price * item.qty,
    0
  );
  const count = entries.reduce((acc, { item }) => acc + item.qty, 0);

  return (
    <Sheet open={open} onOpenChange={(o) => (!o ? close() : undefined)}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 sm:max-w-md p-0"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-base font-extrabold">
            Seu carrinho {mounted && count > 0 ? `(${count})` : ""}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Revise os itens e finalize sua compra com segurança.
          </SheetDescription>
        </SheetHeader>

        {entries.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-soft">
              <ShoppingBag className="h-7 w-7 text-faint" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore nossas descobertas e encontre algo especial.
              </p>
            </div>
            <Button
              className="mt-2 h-11 bg-primary hover:bg-brand-dark"
              onClick={() => {
                close();
                scrollToId("destaques");
              }}
            >
              Explorar produtos
            </Button>
          </div>
        ) : (
          <>
            <ul className="scrollbar-slim flex-1 divide-y divide-border overflow-y-auto px-5">
              {entries.map(({ item, product }) => (
                <li key={product.id} className="flex gap-3.5 py-4">
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[10px] bg-soft">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-[13px] leading-snug font-semibold">
                        {product.name}
                      </p>
                      <button
                        type="button"
                        aria-label={`Remover ${product.name}`}
                        onClick={() => {
                          removeItem(product.id);
                          toast("Item removido", { description: product.name });
                        }}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-faint transition-colors hover:bg-warm hover:text-coral"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {formatBRL(product.price)} cada
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-[10px] border border-border">
                        <button
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() => setQty(product.id, item.qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-l-[10px] transition-colors hover:bg-soft"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Aumentar quantidade"
                          onClick={() => setQty(product.id, item.qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-r-[10px] transition-colors hover:bg-soft"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm font-extrabold">
                        {formatBRL(product.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="block space-y-3 border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-extrabold">{formatBRL(subtotal)}</span>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                Brasil: PIX via XPAYMENTS no checkout da oferta.
              </p>
              <Button
                className="h-12 w-full bg-brand text-[15px] font-bold hover:bg-brand-dark"
                onClick={() => {
                  if (entries.length === 1 && entries[0].product.storefrontUrl) {
                    window.location.assign(entries[0].product.storefrontUrl);
                    return;
                  }

                  showInfo(
                    "Revisar ofertas",
                    "No lançamento, produtos com experiências de compra diferentes são concluídos no checkout próprio de cada oferta."
                  );
                }}
              >
                Continuar para o checkout
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Vendedor, total e condições confirmados antes do pagamento
              </p>
            </SheetFooter>
          </>
        )}
        <Separator className="hidden" />
      </SheetContent>
    </Sheet>
  );
}
