"use client";

import { SearchOverlay } from "./search-overlay";
import { CartDrawer } from "./cart-drawer";
import { FavoritesDrawer } from "./favorites-drawer";
import { MobileMenu } from "./mobile-menu";
import { AccountDialog } from "./account-dialog";
import { InfoDialog } from "./info-dialog";
import { QuickViewDialog } from "./quick-view-dialog";

/** Monta todos os overlays globais do Commerce (busca, carrinho, favoritos, etc). */
export function Overlays() {
  return (
    <>
      <SearchOverlay />
      <CartDrawer />
      <FavoritesDrawer />
      <MobileMenu />
      <AccountDialog />
      <InfoDialog />
      <QuickViewDialog />
    </>
  );
}
