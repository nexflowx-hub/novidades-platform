"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { useUI } from "@/lib/store/ui";
import { useCart } from "@/lib/store/cart";
import { useFavorites } from "@/lib/store/favorites";
import { scrollToId } from "@/lib/scroll";
import { useMounted } from "@/hooks/use-mounted";

export function FavoritesDrawer() {
  const open = useUI((s) => s.favoritesOpen);
  const close = useUI((s) => s.closeFavorites);
  const ids = useFavorites((s) => s.ids);
  const toggle = useFavorites((s) => s.toggle);
  const addItem = useCart((s) => s.addItem);
  const mounted = useMounted();

  const products = ids
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Sheet open={open} onOpenChange={(o) => (!o ? close() : undefined)}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-base font-extrabold">
            Favoritos {mounted && products.length > 0 ? `(${products.length})` : ""}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Produtos que você salvou para depois.
          </SheetDescription>
        </SheetHeader>

        {products.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-warm">
              <Heart className="h-7 w-7 text-brand" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">Nenhum favorito ainda</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Toque no coração dos produtos que você amar para salvá-los aqui.
              </p>
            </div>
            <Button
              className="mt-2 h-11 bg-primary hover:bg-brand-dark"
              onClick={() => {
                close();
                scrollToId("destaques");
              }}
            >
              Descobrir produtos
            </Button>
          </div>
        ) : (
          <ul className="scrollbar-slim flex-1 divide-y divide-border overflow-y-auto px-5">
            {products.map((product) => (
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
                      aria-label={`Remover ${product.name} dos favoritos`}
                      onClick={() => toggle(product.id)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors hover:bg-warm"
                    >
                      <Heart className="h-4 w-4 fill-coral text-coral" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-0.5 text-sm font-extrabold">
                    {formatBRL(product.price)}
                  </p>
                  <div className="mt-auto pt-2">
                    <Button
                      size="sm"
                      className="h-9 gap-1.5 bg-primary text-xs font-bold hover:bg-brand-dark"
                      onClick={() => {
                        addItem(product.id);
                        toast.success("Adicionado ao carrinho", {
                          description: product.name,
                        });
                      }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
                      Adicionar ao carrinho
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
}
