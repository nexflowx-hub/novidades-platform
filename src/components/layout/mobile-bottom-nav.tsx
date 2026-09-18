"use client";

import { CircleHelp, Flame, Heart, House, Search } from "lucide-react";
import { useUI } from "@/lib/store/ui";
import { useFavorites } from "@/lib/store/favorites";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";

export function MobileBottomNav() {
  const mounted = useMounted();
  const openSearch = useUI((state) => state.openSearch);
  const openFavorites = useUI((state) => state.openFavorites);
  const setFilter = useUI((state) => state.setFilter);
  const favCount = useFavorites((state) => state.ids.length);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goTrending = () => {
    setFilter({ type: "badge", value: "em-alta", label: "Em alta" });
    scrollToId("destaques");
  };

  const items = [
    { label: "Início", icon: House, action: goTop, active: true },
    { label: "Explorar", icon: Search, action: openSearch },
    { label: "Em alta", icon: Flame, action: goTrending },
    {
      label: "Favoritos",
      icon: Heart,
      action: openFavorites,
      badge: mounted && favCount > 0 ? favCount : undefined,
    },
    {
      label: "Ajuda",
      icon: CircleHelp,
      action: () => window.location.assign("/ajuda"),
    },
  ];

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/97 shadow-header backdrop-blur lg:hidden"
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
                "relative flex h-[58px] w-full flex-col items-center justify-center gap-0.5 transition-colors active:bg-soft",
                active ? "text-brand-dark" : "text-muted-foreground"
              )}
            >
              <span className="relative">
                <Icon
                  className="h-[22px] w-[22px]"
                  aria-hidden="true"
                  strokeWidth={active ? 2.4 : 2}
                />
                {typeof badge === "number" && badge > 0 ? (
                  <span className="absolute -top-1 -right-2 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-coral px-0.5 text-[9px] font-bold text-white">
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
      <div className="pb-safe bg-white" aria-hidden="true" />
    </nav>
  );
}
