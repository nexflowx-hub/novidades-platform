"use client";

import { BadgePercent, Heart, House, Search, ShoppingCart } from "lucide-react";
import { useUI } from "@/lib/store/ui";
import { useFavorites } from "@/lib/store/favorites";
import { useCart } from "@/lib/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";

export function MobileBottomNav() {
  const mounted = useMounted();
  const openSearch = useUI((state) => state.openSearch);
  const openFavorites = useUI((state) => state.openFavorites);
  const openCart = useUI((state) => state.openCart);
  const setFilter = useUI((state) => state.setFilter);
  const favCount = useFavorites((state) => state.ids.length);
  const cartCount = useCart((state) =>
    state.items.reduce((total, item) => total + item.qty, 0)
  );

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goOffers = () => {
    setFilter({ type: "badge", value: "oferta", label: "Ofertas Especiais" });
    scrollToId("destaques");
  };

  const items = [
    { label: "Início", icon: House, action: goTop, active: true },
    { label: "Explorar", icon: Search, action: openSearch },
    { label: "Ofertas", icon: BadgePercent, action: goOffers },
    {
      label: "Favoritos",
      icon: Heart,
      action: openFavorites,
      badge: mounted && favCount > 0 ? favCount : undefined,
    },
    {
      label: "Carrinho",
      icon: ShoppingCart,
      action: openCart,
      badge: mounted && cartCount > 0 ? cartCount : undefined,
    },
  ];

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-cyan-200/15 bg-[#03152f]/98 text-white shadow-[0_-8px_25px_rgba(0,12,40,.22)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ label, icon: Icon, action, active, badge }) => (
          <li key={label}>
            <button
              type="button"
              onClick={action}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-[60px] w-full flex-col items-center justify-center gap-0.5 transition-colors active:bg-white/8",
                active ? "text-cyan-300" : "text-white/65"
              )}
            >
              <span className="relative">
                <Icon className="h-[22px] w-[22px]" aria-hidden="true" strokeWidth={active ? 2.4 : 2} />
                {typeof badge === "number" && badge > 0 ? (
                  <span className="absolute -right-2 -top-1 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-red-500 px-0.5 text-[9px] font-black text-white">
                    {badge > 9 ? "9+" : badge}
                  </span>
                ) : null}
              </span>
              <span className={cn("text-[10px]", active ? "font-bold" : "font-medium")}>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="pb-safe bg-[#03152f]" aria-hidden="true" />
    </nav>
  );
}
