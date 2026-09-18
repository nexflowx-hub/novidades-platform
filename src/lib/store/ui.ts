import { create } from "zustand";

export interface CatalogFilter {
  type: "category" | "badge";
  value: string;
  label: string;
}

export interface InfoContent {
  title: string;
  message: string;
}

interface UIState {
  searchOpen: boolean;
  cartOpen: boolean;
  favoritesOpen: boolean;
  mobileMenuOpen: boolean;
  accountOpen: boolean;
  quickViewId: string | null;
  filter: CatalogFilter | null;
  info: InfoContent | null;
  openSearch: () => void;
  closeSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
  openFavorites: () => void;
  closeFavorites: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  openAccount: () => void;
  closeAccount: () => void;
  setQuickView: (id: string | null) => void;
  setFilter: (filter: CatalogFilter | null) => void;
  showInfo: (title: string, message: string) => void;
  closeInfo: () => void;
}

export const useUI = create<UIState>((set) => ({
  searchOpen: false,
  cartOpen: false,
  favoritesOpen: false,
  mobileMenuOpen: false,
  accountOpen: false,
  quickViewId: null,
  filter: null,
  info: null,
  openSearch: () =>
    set({
      searchOpen: true,
      mobileMenuOpen: false,
      cartOpen: false,
      favoritesOpen: false,
    }),
  closeSearch: () => set({ searchOpen: false }),
  openCart: () =>
    set({
      cartOpen: true,
      mobileMenuOpen: false,
      searchOpen: false,
      favoritesOpen: false,
    }),
  closeCart: () => set({ cartOpen: false }),
  openFavorites: () =>
    set({
      favoritesOpen: true,
      mobileMenuOpen: false,
      searchOpen: false,
      cartOpen: false,
    }),
  closeFavorites: () => set({ favoritesOpen: false }),
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openAccount: () => set({ accountOpen: true, mobileMenuOpen: false }),
  closeAccount: () => set({ accountOpen: false }),
  setQuickView: (id) => set({ quickViewId: id }),
  setFilter: (filter) => set({ filter }),
  showInfo: (title, message) => set({ info: { title, message } }),
  closeInfo: () => set({ info: null }),
}));

/** Fecha qualquer overlay aberto (usado ao navegar entre seções). */
export function closeAllOverlays() {
  useUI.setState({
    searchOpen: false,
    cartOpen: false,
    favoritesOpen: false,
    mobileMenuOpen: false,
    accountOpen: false,
    quickViewId: null,
    info: null,
  });
}
