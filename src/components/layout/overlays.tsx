"use client";

import { SearchOverlay } from "./search-overlay";
import { FavoritesDrawer } from "./favorites-drawer";
import { MobileMenu } from "./mobile-menu";
import { InfoDialog } from "./info-dialog";
import { QuickViewDialog } from "./quick-view-dialog";

/**
 * Global launch overlays.
 *
 * Cart/account overlays are intentionally not mounted until their end-to-end
 * flows are production-ready. Dedicated product funnels currently own checkout.
 */
export function Overlays() {
  return (
    <>
      <SearchOverlay />
      <FavoritesDrawer />
      <MobileMenu />
      <InfoDialog />
      <QuickViewDialog />
    </>
  );
}
